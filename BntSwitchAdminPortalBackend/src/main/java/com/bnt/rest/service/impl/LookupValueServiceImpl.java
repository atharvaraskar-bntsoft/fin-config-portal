package com.bnt.rest.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.jpa.repository.LookupValuePersistenceHelper;
import com.bnt.rest.repository.LookupValueRepository;
import com.bnt.rest.service.LookupValueService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.service.mapper.GenericMapper;
import com.bnt.service.mapper.LookUpMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class LookupValueServiceImpl implements LookupValueService {

	@Autowired
	private LookupValuePersistenceHelper lookUpValuePersistancehelper;

	@Autowired
	private LookupValueRepository lookupValueRepo;

	private static final Logger logger = LogManager.getLogger(LookupValueServiceImpl.class);

	@Override
	public void addUpdateRLookupValue(List<LookupValueDto> lookupValueDtoList, String requestToken, Integer id) {
		for (LookupValueDto lookupValueDto : lookupValueDtoList) {

			if (lookupValueDto.getModifiable() == null) {
				lookupValueDto.setModifiable('1');
			}
			if (lookupValueDto.getActive() == null) {
				lookupValueDto.setActive('1');
			}
			if (lookupValueDto.getId() == null) {
				LookupValue newLookupValue = ObjectMapper.mapToEntity(lookupValueDto, LookupValue.class);
				lookUpValuePersistancehelper.save(newLookupValue);
			} else {
				Optional<LookupValue> lookupValue = lookUpValuePersistancehelper.findById(lookupValueDto.getId());
				LookupValueDto newLookupValueDto = ObjectMapper.mapToDto(lookupValue, LookupValueDto.class);
				try {
					ReflectionUtil.copy(newLookupValueDto, lookupValueDto);
				} catch (Exception e) {
					logger.error(e.getMessage());
				}
				LookupValue updatedLookupValue = ObjectMapper.mapToEntity(newLookupValueDto, LookupValue.class);
				lookUpValuePersistancehelper.save(updatedLookupValue);
			}
		}

	}

	@Override
	public List<LookupValueDto> findLookupValueById(int lookupTypeid, Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<LookupValue> lookupValueList = lookUpValuePersistancehelper.findLookupValueByLookupTypeId(lookupTypeid,
				pageable);
		return ObjectMapper.mapListObjectToListDto(lookupValueList, LookupValueDto.class);
	}

	@Override
	public List<IdAndNameWrapper> getServicesList() {
		List<LookupValue> lookUpValueList = lookupValueRepo.getLookUpValueByType(LookUpMapper.SERVICE_TYPE);
		return LookUpMapper.mapToWrapper(lookUpValueList);

	}

	@Override
	public List<String> getTxnTypes() {
		return lookUpValuePersistancehelper.getValueListByType(LookUpMapper.TRANSACTION_TYPE);

	}

	@Override
	public List<DtoWrapper> getTagRules() {
		return GenericMapper.getDtoWrapperListFromObjectArray(
				lookUpValuePersistancehelper.getValueObjectListByType(LookUpMapper.TAGS));
	}

}
