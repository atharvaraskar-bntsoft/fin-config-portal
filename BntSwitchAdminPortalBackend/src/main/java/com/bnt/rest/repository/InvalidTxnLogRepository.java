package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.InvalidMessageEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface InvalidTxnLogRepository {

	ResponseWrapper findPagedInvalidTxnLogs(Map<String, Object> requestParamMap);

	InvalidMessageEntity getInvalidTxnLogById(String id);

}
