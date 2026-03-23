package com.bnt.rest.repository;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.envers.query.AuditQuery;
import org.springframework.data.domain.Pageable;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AuditLogRepository {

	ResponseWrapper findAllAuditLogs(Map<String, Object> requestParamMap);

	Set<String> findAuditEntityNameList();

	long getAuditLogsTotalCountOfEntity(Class<?> classType);

	List<Object[]> getAuditLogRecords(Pageable pageable, AuditQuery auditQuery);

	long getAuditFilteredCountOfEntity(Class<?> classType, String action, Long fromMilliSeconds, Long toMilliSeconds,
			Integer systemUserId);

	long getAuditLogsTotalCount();

}
