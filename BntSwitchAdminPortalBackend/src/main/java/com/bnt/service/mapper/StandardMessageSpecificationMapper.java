package com.bnt.service.mapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.rest.dto.StandardMessageSpecificationDto;
import com.bnt.rest.entity.StandardMessageSpecification;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class StandardMessageSpecificationMapper {

	private static final Logger logger = LogManager.getLogger(StandardMessageSpecificationMapper.class);

	private StandardMessageSpecificationMapper() {

	}

	public static StandardMessageSpecificationDto getStandardMessageSpecificationDto(
			StandardMessageSpecification standardMessageSpecification) {
		logger.info("SetStandardMessageSpecificationDto");
		StandardMessageSpecificationDto standardMessageSpecificationDto = new StandardMessageSpecificationDto();
		standardMessageSpecificationDto.setId(standardMessageSpecification.getId());
		standardMessageSpecificationDto
				.setMessageSchemaPackager(standardMessageSpecification.getMessageSchemaPackager());
		standardMessageSpecificationDto.setProperties(standardMessageSpecification.getProperties());
		standardMessageSpecificationDto.setActive(standardMessageSpecification.getActive());
		standardMessageSpecificationDto
				.setMessageStandard(LookUpMapper.getLookupValueDto(standardMessageSpecification.getMessageStandard()));
		standardMessageSpecificationDto
				.setMessageProtocol(LookUpMapper.getLookupValueDto(standardMessageSpecification.getMessageProtocol()));
		standardMessageSpecificationDto.setTransmissionProtocol(
				LookUpMapper.getLookupValueDto(standardMessageSpecification.getTransmissionProtocol()));
		return standardMessageSpecificationDto;
	}

	public static StandardMessageSpecification getStandardMessageSpecification(
			StandardMessageSpecificationDto standardMessageSpecificationDto) {
		StandardMessageSpecification standardMessageSpecification = new StandardMessageSpecification();
		standardMessageSpecification.setActive(standardMessageSpecificationDto.getActive());
		standardMessageSpecification.setId(standardMessageSpecificationDto.getId());
		standardMessageSpecification
				.setMessageSchemaPackager(standardMessageSpecificationDto.getMessageSchemaPackager());
		standardMessageSpecification.setProperties(standardMessageSpecificationDto.getProperties());
		standardMessageSpecification.setTransmissionProtocol(
				LookUpMapper.getLookupValue(standardMessageSpecificationDto.getTransmissionProtocol()));
		standardMessageSpecification
				.setMessageProtocol(LookUpMapper.getLookupValue(standardMessageSpecificationDto.getMessageProtocol()));
		standardMessageSpecification
				.setMessageStandard(LookUpMapper.getLookupValue(standardMessageSpecificationDto.getMessageStandard()));
		return standardMessageSpecification;
	}
}
