package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SafingService {

	public ResponseWrapper getPagableExceptionQueueList(Map<String, Object> requestParamMap);

	public ResponseWrapper getPagableSafQueueList(Map<String, Object> requestParamMap);

	public boolean deleteExceptionById(String id, String requestToken);

	public String moveExceptionToSafById(String id, String requestToken);

	public ResponseWrapper getPagableByStatus(String status, Map<String, Object> requestParamMap);

	public List<String> getSafFilterList();

	public List<IdAndNameStringWrapper> getSafStatusFilterList();

	public boolean deleteRecords(List<String> ids, String requestToken);

	public List<String> moveExceptionToSaf(List<String> ids, String requestToken);

	public List<IdAndNameStringWrapper> getSafProcessorFilterList();
}
