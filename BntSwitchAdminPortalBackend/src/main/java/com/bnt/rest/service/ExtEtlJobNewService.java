package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.ExtEtlJobDto;
import com.bnt.rest.dto.ExtEtlJobNewDto;
import com.bnt.rest.dto.ExtEtlJobNewListDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExtEtlJobNewService {

	void saveEtlJob(ExtEtlJobNewDto extEtlJobDto);

	ResponseWrapper findAllExtEtlJobNew(Map<String, Object> requestParamMap);

	ExtEtlJobNewDto findExtEtlJobById(int id);

	Integer updateJob(ExtEtlJobNewDto extEtlJobDto, int id, String requestToken);

	List<ExtEtlJobNewListDto> getExEtlNotInDeployedComponentNew();

}
