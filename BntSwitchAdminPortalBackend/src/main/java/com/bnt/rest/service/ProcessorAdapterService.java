package com.bnt.rest.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.ProcessorAdapterDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ProcessorAdapterService {

	List<IdAndNameStringWrapper> getProAdpList();

	List<IdAndNameStringWrapper> getProAdpIdNameList();

	ResponseWrapper findAllRecords();

	List<IdAndNameStringWrapper> findAll();

	Map<Integer, String> getAuthorizedSchemeMap();

	Set<String> getAllAuthorizedDestinationNameFromRoutes(List<String> routeIdList);

	String getIdFromCode(String value);

	ResponseWrapper findPagedProcessorAdapter(Map<String, Object> requestParamMap);

	Integer addProcessorAdapter(ProcessorAdapterDto processorAdapterDto, String requestToken);

	Integer updateProcessorAdapter(int id, ProcessorAdapterDto processorAdapterDto, String requestToken);

	ProcessorAdapterDto findProcessorAdapterById(int id);

	Map<String, String> getProcessorAdapterCodeAndName();

	List<IdAndNameStringWrapper> getProAdpIdNameListIsSAFEnabled();

}