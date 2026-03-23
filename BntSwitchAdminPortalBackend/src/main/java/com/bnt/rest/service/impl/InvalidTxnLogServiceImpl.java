package com.bnt.rest.service.impl;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.InvalidMessageDto;
import com.bnt.rest.entity.InvalidMessageEntity;
import com.bnt.rest.repository.InvalidTxnLogRepository;
import com.bnt.rest.service.InvalidTxnLogService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class InvalidTxnLogServiceImpl implements InvalidTxnLogService {

	private static final Logger logger = LogManager.getLogger(InvalidTxnLogServiceImpl.class);

	@Autowired
	private InvalidTxnLogRepository invalidTxnLogRepository;

	@SuppressWarnings("unchecked")
	@Override
	public ResponseWrapper findPagedInvalidTxnLogs(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		return invalidTxnLogRepository.findPagedInvalidTxnLogs(requestParamMap);
	}

	@Override
	public InvalidMessageDto getInvalidTxnLogById(String id) {
		logger.info("Inside getInvalidTxnLogById!");
		InvalidMessageEntity invalidMessageEntity = invalidTxnLogRepository.getInvalidTxnLogById(id);
		return ObjectMapper.mapToDto(invalidMessageEntity, InvalidMessageDto.class);
	}

}
