package com.bnt.rest.repository.mapper;

import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.hibernate.envers.query.criteria.AuditCriterion;
import org.hibernate.envers.query.order.AuditOrder;
import com.bnt.common.util.AuditUtil;
import com.bnt.common.util.JpaAuditHelper;
import com.bnt.constant.DBConstants;
import com.bnt.constant.ParameterConstant;
import com.bnt.rest.dto.AuditLogDto;
import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AuditLogMapper {

	private static final Logger logger = LogManager.getLogger(AuditLogMapper.class);

	public static final String ADD = "ADD";
	public static final String DEL = "DEL";
	public static final String MOD = "MOD";

	private AuditLogMapper() {
		super();
	}

	public static AuditQuery getAuditLogQuery(AuditReader auditReader, Class<?> classType, Integer rev, String action,
			Long fromMilliSeconds, Long toMilliSeconds, Integer systemUserId, Map<String, Object> requestParamMap,
			String email) {
		AuditQuery queryObject = getQueryObjectFromRequest(auditReader, classType, requestParamMap);
		setFilterCriteria(queryObject, rev, action, fromMilliSeconds, toMilliSeconds, systemUserId, email, classType);
		return queryObject;
	}

	private static void setFilterCriteria(AuditQuery queryObject, Integer rev, String action, Long fromMilliSeconds,
			Long toMilliSeconds, Integer systemUserId, String email, Class<?> classType) {
		AuditLogMapper.setRevisionCriteria(queryObject, rev);
		String createdOrUpdatedBy = AuditLogMapper.setActionCriteria(queryObject, action);
		AuditLogMapper.setDateCriteria(queryObject, fromMilliSeconds, toMilliSeconds);
		AuditLogMapper.setAuthorCriteria(queryObject, systemUserId, createdOrUpdatedBy, classType);
		AuditLogMapper.setEmailCriteria(queryObject, email);
	}

	public static AuditQuery getQueryObjectFromRequest(AuditReader auditReader, Class<?> classType,
			Map<String, Object> requestParamMap) {
		AuditQuery queryObject = null;
		AuditOrder auditOrder = null;
		if (requestParamMap != null) {
			String sortOrder = (String) requestParamMap.get(ParameterConstant.SORT_ORDER);
			auditOrder = JpaAuditHelper.getAuditOrder(sortOrder);
		} else {
			auditOrder = AuditEntity.revisionNumber().desc();
		}
		queryObject = AuditUtil.getQueryObject(auditReader, classType, auditOrder);
		queryObject.setCacheable(true);
		return queryObject;
	}

	public static String setActionCriteria(AuditQuery queryObject, String action) {
		String createdOrUpdatedBy = null;
		if (action != null) {
			if (action.equals(ADD)) {
				createdOrUpdatedBy = DBConstants.CREATED_BY;
				queryObject.add(AuditEntity.revisionType().eq(RevisionType.ADD));
			} else if (action.equals(DEL)) {
				createdOrUpdatedBy = DBConstants.UPDATED_BY;
				queryObject.add(AuditEntity.revisionType().eq(RevisionType.DEL));
			} else if (action.equals(MOD)) {
				createdOrUpdatedBy = DBConstants.UPDATED_BY;
				queryObject.add(AuditEntity.revisionType().eq(RevisionType.MOD));
			}
		}
		return createdOrUpdatedBy;
	}

	public static void setDateCriteria(AuditQuery queryObject, Long fromMilliSeconds, Long toMilliSeconds) {
		if (fromMilliSeconds != null && toMilliSeconds != null) {
			queryObject.add(AuditEntity.revisionProperty("timestamp").ge(fromMilliSeconds))
					.add(AuditEntity.revisionProperty("timestamp").lt(toMilliSeconds));
		}
	}

	public static void setAuthorCriteria(AuditQuery queryObject, Integer systemUserId, String createdOrUpdatedBy,
			Class<?> classType) {
		logger.debug("inside setAuthorCriteria().. for classType {}", classType.getClass());
		if (systemUserId != null) {
			if (createdOrUpdatedBy != null) {
				queryObject.add(AuditEntity.property(createdOrUpdatedBy).eq(systemUserId));
			} else {
				AuditCriterion criterionCreatedBy = AuditEntity.property(DBConstants.CREATED_BY).eq(systemUserId);
				AuditCriterion criterionupdatedBy = AuditEntity.property(DBConstants.UPDATED_BY).eq(systemUserId);
				queryObject.add(AuditEntity.or(criterionCreatedBy, criterionupdatedBy));
			}
		}
	}

	public static void setEmailCriteria(AuditQuery queryObject, String email) {
		if (email != null) {
			queryObject.add(AuditEntity.property(email).eq(email));
		}
	}

	private static void setRevisionCriteria(AuditQuery queryObject, Integer rev) {
		if (rev != null) {
			queryObject.add(AuditEntity.revisionNumber().eq(rev));
		}
	}

	public static String getActionTypeValueForQuery(String action, String value) {
		if (value.equals("1"))
			action = ADD;
		else if (value.equals("2"))
			action = "MOD";
		if (value.equals("3"))
			action = DEL;
		return action;
	}

	public static Integer setActionAndGetAuthorId(AuditLogDto auditLogDto, BaseEntity baseEntityObject,
			RevisionType revisionType) {
		Integer authorId;
		if (revisionType.name().equalsIgnoreCase("add")) {
			authorId = baseEntityObject.getCreatedBy();
			auditLogDto.setAction("c");
		} else if (revisionType.name().equalsIgnoreCase("mod")) {
			auditLogDto.setAction("u");
			authorId = baseEntityObject.getUpdatedBy();
		} else {
			auditLogDto.setAction("d");
			authorId = baseEntityObject.getUpdatedBy();
		}
		return authorId;
	}
}
