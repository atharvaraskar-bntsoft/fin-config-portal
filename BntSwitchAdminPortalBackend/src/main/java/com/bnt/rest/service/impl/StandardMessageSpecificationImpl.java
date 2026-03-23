package com.bnt.rest.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.RippsAdminException;
import com.bnt.rest.dto.StandardMessageSpecificationDto;
import com.bnt.rest.entity.StandardMessageSpecification;
import com.bnt.rest.repository.StandardMessageSpecificationRepository;
import com.bnt.rest.service.StandardMessageSpecificationService;
import com.bnt.service.mapper.StandardMessageSpecificationMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class StandardMessageSpecificationImpl implements StandardMessageSpecificationService {

	private static final Logger logger = LogManager.getLogger(StandardMessageSpecificationImpl.class);
	@Autowired
	StandardMessageSpecificationRepository standardMessageSpecificationRepository;

	@Override
	public StandardMessageSpecificationDto getMessageSpecificationByTemplateId(Integer messageStandard) {
		logger.info("inside getMessageSpecificationByTemplateId()...");

		StandardMessageSpecification standardMessageSpecification = standardMessageSpecificationRepository
				.getMessageSpecification(messageStandard);
		if (standardMessageSpecification == null) {
			throw new RippsAdminException("Standard-Message-Specification is not maintained for this Template");
		}
		return StandardMessageSpecificationMapper.getStandardMessageSpecificationDto(standardMessageSpecification);
	}

}
