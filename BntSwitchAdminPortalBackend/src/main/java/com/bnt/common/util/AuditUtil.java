package com.bnt.common.util;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.envers.AuditReader;
import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.AuditQuery;
import org.hibernate.envers.query.order.AuditOrder;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AuditUtil {

	private AuditUtil() {
	}

	private static final Logger logger = LogManager.getLogger(AuditUtil.class);

	public static AuditQuery getQueryObject(AuditReader auditReader, Class<?> classType, AuditOrder auditOrder) {
		AuditQuery queryObject = getQueryObject(auditReader, classType);
		if (auditOrder != null) {
			queryObject.addOrder(auditOrder);
		}
		queryObject.setCacheable(true);
		return queryObject;
	}

	public static AuditQuery getQueryObject(AuditReader auditReader, Class<?> classType) {
		return auditReader.createQuery().forRevisionsOfEntity(classType, false, true);
	}

	@SuppressWarnings({ "unchecked", "unused" })
	public static <T> T getPreviousVersion(AuditReader reader, Class<?> classType, Integer currentRevisionTypeId, int currentRev) {
		try {
			AuditQuery queryObject = getQueryObject(reader, classType);
			Number priorRevision = (Number) reader.createQuery().forRevisionsOfEntity(classType, false, true)
					.addProjection(AuditEntity.revisionNumber().max()).add(AuditEntity.id().eq(currentRevisionTypeId))
					.add(AuditEntity.revisionNumber().lt(currentRev)).getSingleResult();
			if (priorRevision != null)
				return (T) reader.find(classType, currentRevisionTypeId, priorRevision);
		} catch (Exception e) {
			logger.error("Error in getting previous revision");
		}
		return null;
	}
}
