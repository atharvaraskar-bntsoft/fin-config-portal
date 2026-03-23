package com.bnt.rest.repository.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.InvalidMessageDto;
import com.bnt.rest.entity.InvalidMessageEntity;
import com.bnt.rest.jpa.repository.InvalidTxnLogPersistenceHelper;
import com.bnt.rest.repository.InvalidTxnLogRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class InvalidTxnLogRepositoryImpl implements InvalidTxnLogRepository {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.bnt.rest.repository.InvalidTxnLogRepository#
	 * findPagedInvalidTxnLogs(java.util.Map)
	 */
	@Autowired
	InvalidTxnLogPersistenceHelper invalidTxnPersistenceHelper;

	@Override
	public ResponseWrapper findPagedInvalidTxnLogs(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<InvalidMessageEntity> page = null;

		long totalCount;
		totalCount = invalidTxnPersistenceHelper.count();
		if (filters == null) {
			page = invalidTxnPersistenceHelper.findAll(pageable);
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(page, totalCount);
			pageJPAData.setContent(ObjectMapper.mapListObjects(page.getContent(), InvalidMessageDto.class));
			return pageJPAData;

		} else {
			/** page = getFilterData(pageable, filters); */
		}
		return null;
	}

	@Override
	public InvalidMessageEntity getInvalidTxnLogById(String id) {
		return invalidTxnPersistenceHelper.findById(id).orElse(null);
	}
}
