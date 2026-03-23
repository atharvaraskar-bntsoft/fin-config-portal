package com.bnt.rest.repository.impl;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.metamodel.EntityType;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.AuditReaderFactory;
import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionType;
import org.hibernate.envers.query.AuditQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.AuditUtil;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.AuditLogDto;
import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.BaseTimeEntity;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.entity.SystemUserRole;
import com.bnt.rest.jpa.repository.GenericDAO;
import com.bnt.rest.jpa.repository.GenericRepository;
import com.bnt.rest.jpa.repository.SystemUserRolePersistenceHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.repository.AuditLogRepository;
import com.bnt.rest.repository.mapper.AuditLogMapper;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class AuditLogRepositoryImpl implements AuditLogRepository {

	private static final Logger logger = LogManager.getLogger(AuditLogRepositoryImpl.class);
	@Autowired
	private EntityManager entityManager;

	private AuditReader auditReader;

	@SuppressWarnings("rawtypes")
	GenericDAO entityDao;

	@Autowired
	private UserPersistenceHelper userPersistenceHelper;

	@Autowired
	private SystemUserRolePersistenceHelper systemUserRolePersistenceHelper;

	private String revChangesSelectQuery;

	private String revChangesCountQuery;

	Set<EntityType<?>> entities;

	String entityName;

	@Value("${db.auditing.name}")
	private String auditingSchemaName;

	@Autowired
	GenericRepository<BaseEntity, Serializable> genericRepo;

	@PostConstruct
	public void setParam() {
		entities = entityManager.getMetamodel().getEntities();
		revChangesSelectQuery = "SELECT * FROM " + auditingSchemaName + "." + "REVCHANGES ORDER BY REVCHANGES.rev desc";
		revChangesCountQuery = "SELECT COUNT(*) FROM " + auditingSchemaName + "." + "REVCHANGES";
	}

	private AuditReader getAuditLogReader() {
		auditReader = AuditReaderFactory.get(this.entityManager);
		return auditReader;
	}

	@Override
	@Transactional
	public ResponseWrapper findAllAuditLogs(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		String auditEntityName = null;

		String action = null;
		Long fromMilliSeconds = null;
		Long toMilliSeconds = null;
		Integer systemUserId = null;
		String email = null;
		if (filters != null) {
			for (String eachFilter : filters) {
				String param = eachFilter.split(":")[0];
				String value = eachFilter.split(":")[1];
				switch (param) {
				case "entityType":
					auditEntityName = value;
					break;
				case "actionType":
					action = AuditLogMapper.getActionTypeValueForQuery(action, value);
					break;
				case "period":
					String[] periods = value.split("-");
					if (!(StringUtil.isNotNullOrBlank(periods[0]) && StringUtil.isNotNullOrBlank(periods[1]))) {
						throw new RippsAdminException("'From Date' and 'To Date' cannot be empty");
					}
					fromMilliSeconds = Long.parseLong(periods[0]) * 1000;
					toMilliSeconds = Long.parseLong(periods[1]) * 1000;
					break;
				case "user":
					systemUserId = Integer.parseInt(value);
					break;
				case "email":
					email = value;
					break;
				default:
					break;
				}
			}
		}
		Page<AuditLogDto> auditLogPage = null;
		Long totalCount = null;
		totalCount = getAuditLogsTotalCount();
		if (totalCount > 0) {
			Class<?> classType = null;
			if (StringUtil.isEmptyOrNull(auditEntityName)) {
				auditLogPage = getAllAuditLogs(requestParamMap, pageable, action, systemUserId, email, fromMilliSeconds,
						toMilliSeconds);
			} else {
				classType = JPAUtils.getClassTypeByEntityName(entities, auditEntityName);
				auditLogPage = getAuditLogsByEntity(requestParamMap, pageable, auditEntityName, action, systemUserId,
						email, fromMilliSeconds, toMilliSeconds, classType);
			}

			if (auditLogPage != null) {
				totalCount = (long) auditLogPage.getTotalElements();
			} else {
				totalCount = (long) 0;
			}
		}
		return JPAUtils.getResponseWrapperByPage(auditLogPage, totalCount);
	}

	@SuppressWarnings("unchecked")
	private Page<AuditLogDto> getAllAuditLogs(Map<String, Object> requestParamMap, Pageable pageable, String action,
			Integer systemUserId, String email, Long fromMilliSeconds, Long toMilliSeconds) {
		List<Object[]> revChangesList = JPAUtils.getListFromNativeQuery(this.entityManager, pageable,
				revChangesSelectQuery);
		if (CollectionUtil.isCollectionEmptyOrNull(revChangesList)) {
			return (Page<AuditLogDto>) JPAUtils.getPageObjectFromList(new ArrayList<>());
		}
		return mapQueryResultToAuditLogPage(revChangesList, requestParamMap, pageable, action, systemUserId, email,
				fromMilliSeconds, toMilliSeconds);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Page<AuditLogDto> mapQueryResultToAuditLogPage(List<Object[]> revisionList,
			Map<String, Object> requestParamMap, Pageable pageable, String action, Integer systemUserId, String email,
			Long fromMilliSeconds, Long toMilliSeconds) {
		Page<AuditLogDto> auditLogPage = null;
		List<AuditLogDto> auditLogList = new ArrayList<>();
		String entityQualifiedName = null;
		Pageable page = JPAUtils.getPageableObject(new HashMap<>());
		Class<?> classType = null;
		List<AuditLogDto> filteredList = null;
		for (Object[] each : revisionList) {
			entityQualifiedName = each[1].toString();
			classType = JPAUtils.getClassTypeByQualifiedName(entityQualifiedName);
			filteredList = getFilteredList(requestParamMap, page,
					JPAUtils.getClassNameFromQualifiedName(entityQualifiedName), action, systemUserId, email,
					fromMilliSeconds, toMilliSeconds, classType, (Integer) each[0]);
			if (!CollectionUtil.isCollectionEmptyOrNull(filteredList)) {
				auditLogList.addAll(filteredList);
			}
		}
		if (CollectionUtil.isCollectionEmptyOrNull(auditLogList)) {
			return null;
		}
		auditLogPage = (Page<AuditLogDto>) JPAUtils.getGenericPageObjectFromList(pageable, auditLogList);
		return auditLogPage;
	}

	@Transactional
	public String getDifference(Integer rev, Class<?> classType, Class<?> dtoClassType, Object[] revisionData) {
		RevisionType revisionType = (RevisionType) revisionData[2];
		Object currentEntity = revisionData[0];
		String difference = null;
		Integer entityId;
		entityId = JPAUtils.getId(currentEntity);
		Object currentDto = ObjectMapper.map(currentEntity, dtoClassType);
		if (JPAUtils.isOperationAuditUpdate(classType, revisionType)) {
			Object previousEntity = AuditUtil.getPreviousVersion(getAuditLogReader(), classType, entityId, rev);
			Object previousDto = ObjectMapper.map(previousEntity, dtoClassType);
			difference = GsonUtil.getDifference(previousDto, currentDto);
			logger.info("Updates in the revision are:{}", difference);
			return difference;
		} else if (JPAUtils.isOperationAuditCreate(classType, revisionType)) {
			difference = JsonObjectUtil.getJsonStringFromObject(currentDto);
		}
		return difference;
	}

	@SuppressWarnings("unchecked")
	private Page<AuditLogDto> getAuditLogsByEntity(Map<String, Object> requestParamMap, Pageable pageable,
			String auditEntityName, String action, Integer systemUserId, String email, Long fromMilliSeconds,
			Long toMilliSeconds, Class<?> classType) {
		long filteredCount = getAuditFilteredCountOfEntity(classType, action, fromMilliSeconds, toMilliSeconds,
				systemUserId);
		Page<AuditLogDto> auditLogPage = null;
		if (filteredCount > 0) {
			List<AuditLogDto> auditLogList = getFilteredList(requestParamMap, pageable, auditEntityName, action,
					systemUserId, email, fromMilliSeconds, toMilliSeconds, classType, null);
			auditLogPage = (Page<AuditLogDto>) JPAUtils.getPageObjectFromList(pageable, auditLogList, filteredCount);
		} else {
			auditLogPage = (Page<AuditLogDto>) JPAUtils.getPageObjectFromList(pageable, new ArrayList<>(),
					filteredCount);
		}
		return auditLogPage;
	}

	private List<AuditLogDto> getFilteredList(Map<String, Object> requestParamMap, Pageable pageable,
			String auditEntityName, String action, Integer systemUserId, String email, Long fromMilliSeconds,
			Long toMilliSeconds, Class<?> classType, Integer rev) {
		AuditQuery auditQuery = AuditLogMapper.getAuditLogQuery(getAuditLogReader(), classType, rev, action,
				fromMilliSeconds, toMilliSeconds, systemUserId, requestParamMap, email);
		List<Object[]> list = null;
		try {
			list = getAuditLogRecords(pageable, auditQuery);
		} catch (Exception e) {
			logger.error("Entity not found");
		}
		if (CollectionUtil.isCollectionEmptyOrNull(list)) {
			return new ArrayList<>();
		}
		return mapBaseEntityToAuditLogDto(list, auditEntityName, classType);
	}

	@Override
	@Transactional
	public long getAuditFilteredCountOfEntity(Class<?> classType, String action, Long fromMilliSeconds,
			Long toMilliSeconds, Integer systemUserId) {
		AuditQuery auditQuery = AuditLogMapper.getAuditLogQuery(getAuditLogReader(), classType, null, action,
				fromMilliSeconds, toMilliSeconds, systemUserId, null, null);
		return auditQuery.getResultList().size();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getAuditLogRecords(Pageable pageable, AuditQuery auditQuery) {
		return auditQuery.setMaxResults(pageable.getPageSize())
				.setFirstResult(pageable.getPageNumber() * pageable.getPageSize()).getResultList();
	}

	@Override
	public long getAuditLogsTotalCountOfEntity(Class<?> classType) {
		AuditReader auditReader1 = getAuditLogReader();
		AuditQuery countQuery = AuditUtil.getQueryObject(auditReader1, classType, null);
		return countQuery.getResultList().size();
	}

	@Override
	public long getAuditLogsTotalCount() {
		Query query = this.entityManager.createNativeQuery(revChangesCountQuery);
		return ((Number) query.getSingleResult()).longValue();
	}

	@Override
	public Set<String> findAuditEntityNameList() {
		return JPAUtils.getAuditTableSet(entities);
	}

	private List<AuditLogDto> mapBaseEntityToAuditLogDto(List<Object[]> data, String auditEntityName,
			Class<?> classType) {
		List<AuditLogDto> auditLogList = new ArrayList<>();
		DefaultRevisionEntity revisionEntityData = null;
		Integer rev = null;
		Class<? extends BaseDto> dtoClassType = (Class<? extends BaseDto>) JPAUtils
				.getDtoClassTypeBySimpleEntityName(classType.getSimpleName(), false);
		for (Object[] revisionData : data) {
			revisionEntityData = (DefaultRevisionEntity) revisionData[1];
			rev = revisionEntityData.getId();
			try {
				AuditLogDto auditLogDto = mapBaseEntityToAuditLogDto(auditEntityName, revisionData);
				if (rev != null) {
					String diff = null;
					diff = getDifference(rev, classType, dtoClassType, revisionData);
					auditLogDto.setDifference(diff);
					auditLogList.add(auditLogDto);
				}
			} catch (StackOverflowError e) {
				logger.error("Error occurs in difference for revision no:{} and entity type:{}", rev, classType);
			} catch (Exception e) {
				logger.error("Exception occurs for revision no:{}  and entity type:{}", rev, classType);
			}
		}
		return auditLogList;
	}

	private AuditLogDto mapBaseEntityToAuditLogDto(String auditEntityName, Object[] revisionData) {
		AuditLogDto auditLogDto = new AuditLogDto();
		Object revisionObject = revisionData[0];
		BaseEntity baseEntityObject = null;
		Integer id = null;
		Integer authorId = null;
		if (revisionObject instanceof BaseEntity) {
			baseEntityObject = (BaseEntity) revisionObject;
			id = baseEntityObject.getId();
		} else if (revisionObject instanceof BaseTimeEntity baseTimeEntityObject) {
			id = baseTimeEntityObject.getId();
		}
		DefaultRevisionEntity defaultRevisionEntityData = (DefaultRevisionEntity) revisionData[1];
		RevisionType revisionType = (RevisionType) revisionData[2];
		auditLogDto.setDate(new Timestamp(defaultRevisionEntityData.getTimestamp()));
		auditLogDto.setId(defaultRevisionEntityData.getId());
		AuditLogDto.AuditEntityWrapper object = auditLogDto.new AuditEntityWrapper();
		AuditLogDto.UserWrapper user = auditLogDto.new UserWrapper();
		object.setType(new IdAndNameWrapper(id, auditEntityName));
		object.setText(auditEntityName);
		auditLogDto.setObject(object);
		String description = "";
		if (baseEntityObject != null) {
			authorId = AuditLogMapper.setActionAndGetAuthorId(auditLogDto, baseEntityObject, revisionType);
			description = (String) ReflectionUtil.getFieldValueByFieldName(baseEntityObject, "description");
		}
		setUserDetails(auditLogDto, user, authorId);
		if (description != null) {
			auditLogDto.setDescription(description);
		}
		return auditLogDto;
	}

	private void setUserDetails(AuditLogDto auditLogDto, AuditLogDto.UserWrapper user, Integer authorId) {
		if (authorId == null) {
			authorId = 1;
		}
		user.setId(authorId);
		SystemUser systemUser = userPersistenceHelper.findById(authorId).orElse(null);
		if (null != systemUser)
			user.setName(systemUser.getFirstName() + " " + systemUser.getLastName());
		SystemUserRole userRoleMapping = null;
		try {
			userRoleMapping = systemUserRolePersistenceHelper.findSystemUserRoleBySystemUserID(systemUser);
			user.setRole(
					new IdAndNameWrapper(userRoleMapping.getRoleID().getId(), userRoleMapping.getRoleID().getName()));
		} catch (Exception e) {
			logger.error("Role mapping not found");
			user.setRole(null);
		}
		auditLogDto.setUser(user);
	}

}
