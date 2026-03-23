package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeploymentDto;
import com.bnt.rest.entity.Deployment;
import com.bnt.rest.jpa.repository.HistoryPersistenceHelper;
import com.bnt.rest.service.HistoryServiceRest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class HistoryServiceRestImpl implements HistoryServiceRest {

	@Autowired
	private HistoryPersistenceHelper historyPersistenceHelper;

	@Override
	public ResponseWrapper getHistory(Map<String, Object> requestParamMap) {
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("status")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "locked");
		}
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<Deployment> historyPage = null;
		historyPage = historyPersistenceHelper.findAll(pageable);
		List<DeploymentDto> list = new ArrayList<>();
		for (Deployment deployment : historyPage.getContent()) {
			DeploymentDto dto = ObjectMapper.mapToDto(deployment, DeploymentDto.class);
			list.add(dto);
		}
		long count = historyPersistenceHelper.count();
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(historyPage, count);
		pageJPAData.setContent(list);
		return pageJPAData;
	}

}
