package com.bnt.rest.service;

import com.bnt.rest.dto.StandardMessageSpecificationDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface StandardMessageSpecificationService {

	public StandardMessageSpecificationDto getMessageSpecificationByTemplateId(Integer messageStandard);

}
