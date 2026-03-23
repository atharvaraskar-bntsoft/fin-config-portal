package com.bnt.rest.service;

import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.wrapper.dto.CheckerDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CheckerDelegatorService {

	boolean delegate(CheckerDto checkerDto);

	void processSpecificProcessing(BaseEntity entityObject);
}
