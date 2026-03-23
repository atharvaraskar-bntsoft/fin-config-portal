package com.bnt.rest.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.MasterConfigurationDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.StandardMessageSpecification;
import com.bnt.rest.jpa.repository.MasterConfigurationPersistenceHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.service.MasterConfigurationService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class MasterConfigurationServiceImpl implements MasterConfigurationService {

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private MasterConfigurationPersistenceHelper helper;

	@Override
	public ResponseWrapper findStandardMessageSpecification(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<StandardMessageSpecification> pageStandardMessageSpecification = null;
		if (null == filters) {
			pageStandardMessageSpecification = helper.findAll(pageable);
			long count = helper.count();
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(pageStandardMessageSpecification, count);
			List<MasterConfigurationDto> listDTO = ObjectMapper
					.mapListObjects(pageStandardMessageSpecification.getContent(), MasterConfigurationDto.class);
			pageJPAData.setContent(listDTO);
			return pageJPAData;
		}
		return null;
	}

	@Override
	public MasterConfigurationDto findStandardMessageSpecificationDtoById(int id) {
		Optional<StandardMessageSpecification> optional = helper.findById(id);

		if (optional.isPresent()) {
			StandardMessageSpecification entity = optional.get();
			return ObjectMapper.mapToDto(entity, MasterConfigurationDto.class);
		}
		return null;
	}

	@Override
	public Integer updateStandardMessageSpecification(MasterConfigurationDto standardMessageSpecificationDto, int id,
			String requestToken) {

		Optional<StandardMessageSpecification> optional = helper.findById(id);

		if (optional.isPresent()) {
			StandardMessageSpecification entity = optional.get();
			if (entity == null) {
				throw new RippsAdminException("Record Not Found");
			}
			try {

				StandardMessageSpecification standardMessageSpecification = ObjectMapper
						.mapToEntity(standardMessageSpecificationDto, StandardMessageSpecification.class);
				entity.setProperties(standardMessageSpecification.getProperties());
				entity.setCreatedBy(authSessionService.getCreatedBy());
				entity.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
			} catch (Exception e) {
				throw new RippsAdminException("Exception while updating entity Data");
			}
			return helper.save(entity).getId();
		}
		return null;
	}
}
