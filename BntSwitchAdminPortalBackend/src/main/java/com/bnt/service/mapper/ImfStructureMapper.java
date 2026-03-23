package com.bnt.service.mapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.entity.ImfStructure;

public class ImfStructureMapper {

	private ImfStructureMapper() {

	}

	private static final Logger logger = LogManager.getLogger(ImfStructureMapper.class);

	public static ImfStructureDto getImfStructureDto(ImfStructure imfStructure) {
		logger.info("inside getImfStructureDto()..");
		ImfStructureDto imfStructureDto = new ImfStructureDto();
		imfStructureDto.setId(imfStructure.getId());
		imfStructureDto.setImf(imfStructure.getImf());
		imfStructureDto.setName(imfStructure.getName());
		imfStructureDto.setVersion(imfStructure.getVersion());
		return imfStructureDto;
	}

	public static ImfStructure getImfStructure(ImfStructureDto imfId) {
		logger.info("inside getImfStructure()..");
		ImfStructure imfStructure = new ImfStructure();
		imfStructure.setId(imfId.getId());
		imfStructure.setImf(imfId.getImf());
		imfStructure.setName(imfId.getName());
		imfStructure.setVersion(imfId.getVersion());
		return imfStructure;
	}
}
