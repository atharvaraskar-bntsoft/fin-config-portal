package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.RippsUtility;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.repository.AuditLogRepository;
import com.bnt.rest.service.AuditLogService;
import com.bnt.rest.service.impl.ListService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
@Transactional
public class AuditLogServiceImpl implements AuditLogService {

	@Autowired
	private AuditLogRepository auditLogRepository;

	@Autowired
	private ListService listService;

	@Override
	public ResponseWrapper findAllAuditLogs(Map<String, Object> requestParamMap) {

		return auditLogRepository.findAllAuditLogs(requestParamMap);
	}

	private List<IdAndNameStringWrapper> getActionType() {
		List<IdAndNameStringWrapper> list = new ArrayList<>();
		list.add(RippsUtility.getWrapper("1", "Created"));
		list.add(RippsUtility.getWrapper("2", "Updated"));
		list.add(RippsUtility.getWrapper("3", "Deleted"));
		return list;
	}

	private List<IdAndNameStringWrapper> getLoginResult() {
		List<IdAndNameStringWrapper> list = new ArrayList<>();
		list.add(RippsUtility.getWrapper("1", "Succeeded"));
		list.add(RippsUtility.getWrapper("2", "Failed"));
		return list;
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("entityType", listService.getAuditEntityList());
		map.put("user", listService.getUserList());
		map.put("actionType", getActionType());
		map.put("loginResult", getLoginResult());

		return map;
	}
}
