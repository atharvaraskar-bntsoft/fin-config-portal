package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.ExtEtlJobDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExtEtlJobService {

	ResponseWrapper findAllExtEtlJob(Map<String, Object> requestParamMap);

	ExtEtlJobDto findExtEtlJobById(int id);

	Integer updateJob(ExtEtlJobDto extEtlJobDto, int id, String requestToken);

}
