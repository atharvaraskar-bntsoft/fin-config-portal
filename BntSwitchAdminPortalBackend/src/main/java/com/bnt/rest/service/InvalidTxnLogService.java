package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.InvalidMessageDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface InvalidTxnLogService {

	public ResponseWrapper findPagedInvalidTxnLogs(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	public InvalidMessageDto getInvalidTxnLogById(String id);

}
