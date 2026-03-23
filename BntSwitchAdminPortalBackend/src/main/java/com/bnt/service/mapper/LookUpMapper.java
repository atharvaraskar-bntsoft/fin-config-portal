package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.rest.dto.LookupTypeDto;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.entity.LookupType;
import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LookUpMapper {

	private static final Logger logger = LogManager.getLogger(LookUpMapper.class);

	public static final String SERVICE_TYPE = "SERVICE_TYPE";
	public static final String TRANSACTION_TYPE = "Transaction_Type";
	public static final String TAGS = "TAGS";

	private LookUpMapper() {

	}

	public static List<IdAndNameWrapper> mapToWrapper(List<LookupValue> lookUpValueList) {
		List<IdAndNameWrapper> dtoList = new ArrayList<>();
		for (LookupValue multihopService : lookUpValueList) {
			IdAndNameWrapper dto = new IdAndNameWrapper();
			dto.setId(multihopService.getId());
			dto.setName(multihopService.getValue());
			dtoList.add(dto);
		}
		return dtoList;
	}

	public static LookupValueDto getLookupValueDto(LookupValue lookupValue) {
		LookupValueDto lookupValueDto = new LookupValueDto();
		lookupValueDto.setLookupType(getLookupTypeDto(lookupValue.getLookupType()));
		lookupValueDto.setDescription(lookupValue.getDescription());
		lookupValueDto.setId(lookupValue.getId());
		lookupValueDto.setModifiable(lookupValue.getModifiable());
		lookupValueDto.setValue(lookupValue.getValue());
		return lookupValueDto;
	}

	public static LookupTypeDto getLookupTypeDto(LookupType lookupType) {
		LookupTypeDto lookupTypeDto = new LookupTypeDto();
		lookupTypeDto.setId(lookupType.getId());
		lookupTypeDto.setModifiable(lookupType.getModifiable());
		lookupTypeDto.setDescription(lookupType.getDescription());
		lookupTypeDto.setName(lookupType.getName());
		return lookupTypeDto;
	}

	public static LookupValue getLookupValue(LookupValueDto lookupValueDto) {
		LookupValue lookupValue = new LookupValue();
		lookupValue.setLookupType(getLookupType(lookupValueDto.getLookupType()));
		lookupValue.setDescription(lookupValueDto.getDescription());
		lookupValue.setId(lookupValueDto.getId());
		lookupValue.setModifiable(lookupValueDto.getModifiable());
		lookupValue.setValue(lookupValueDto.getValue());
		return lookupValue;
	}

	public static LookupType getLookupType(LookupTypeDto lookupTypeDto) {
		LookupType lookupType = new LookupType();
		lookupType.setId(lookupTypeDto.getId());
		lookupType.setModifiable(lookupTypeDto.getModifiable());
		lookupType.setDescription(lookupTypeDto.getDescription());
		lookupType.setName(lookupTypeDto.getName());
		return lookupType;
	}
}
