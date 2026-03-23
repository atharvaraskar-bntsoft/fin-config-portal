package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.MasterConfigurationDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MasterConfigurationService {

	ResponseWrapper findStandardMessageSpecification(Map<String, Object> requestParamMap);

	MasterConfigurationDto findStandardMessageSpecificationDtoById(int id);

	Integer updateStandardMessageSpecification(MasterConfigurationDto standardMessageSpecificationDto, int id,
			String requestToken);

}
