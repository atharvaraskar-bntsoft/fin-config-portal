package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
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
import com.bnt.rest.dto.AcquirerMappingDto;
import com.bnt.rest.entity.AcquirerMapping;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.jpa.repository.AcquirerMappingPersistenceRepository;
import com.bnt.rest.repository.AcquirerMappingServiceRest;
import com.bnt.rest.service.impl.AuthSessionService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AcquirerMappingServiceImpl implements AcquirerMappingServiceRest {

	private static final Logger log = LogManager.getLogger(AcquirerMappingServiceImpl.class.getName());

	@Autowired
	private AcquirerMappingPersistenceRepository jpaRepository;

	@Autowired
	private AuthSessionService authSessionService;

	@Override
	public AcquirerMappingDto findAcquirerMappingById(int id) {
		AcquirerMappingDto dto = null;
		AcquirerMapping acqMapping = jpaRepository.findById(id).orElse(null);
		if (acqMapping != null) {
			dto = ObjectMapper.mapToDto(acqMapping, AcquirerMappingDto.class);
		}
		return dto;
	}

	@Override
	public ResponseWrapper getAcquirerMappingList(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<AcquirerMapping> acqMappingPage = null;
		if (filters == null) {
			acqMappingPage = jpaRepository.findAcquirerMappingByDeleted('0', pageable);
		}
		List<AcquirerMappingDto> list = new ArrayList<>();

		if (acqMappingPage != null) {
			for (AcquirerMapping acqMapping : acqMappingPage.getContent()) {
				AcquirerMappingDto dto = null;
				try {
					dto = ObjectMapper.mapToDto(acqMapping, AcquirerMappingDto.class);
				} catch (Exception e) {
					log.error(e.getMessage(), e);

				}
				list.add(dto);
			}
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(acqMappingPage,
					acqMappingPage.getTotalElements());
			pageJPAData.setContent(list);
			return pageJPAData;
		}
		return null;

	}

	@Override
	public Integer addAcquirerMapping(AcquirerMappingDto acquirerMappingDto, String requestToken) {
		AcquirerMapping prevAcqMapping = null;
		if (acquirerMappingDto.getDevice() != null && acquirerMappingDto.getLocation() != null) {
			prevAcqMapping = jpaRepository.findAcquirerMappingByLocationIdAndMerchantIdAndDeviceIdAndAcquirerIdConfigId(
					acquirerMappingDto.getLocation().getId(), acquirerMappingDto.getMerchant().getId(),
					acquirerMappingDto.getDevice().getId(), acquirerMappingDto.getAcquirerIdConfig().getId());
		}
		if (prevAcqMapping != null) {
			throw new RippsAdminException("Record already exist");
		}
		AcquirerMapping acqMapping = ObjectMapper.mapToEntity(acquirerMappingDto, AcquirerMapping.class);
		return jpaRepository.save(acqMapping).getId();
	}

	@Override
	public AcquirerMapping getAcquirerMappingById(int id) {
		return jpaRepository.getAcquirerMappingById(id);
	}

	@Override
	public Integer updateAcquirerMapping(AcquirerMappingDto dto, Integer id, String requestToken) {
		AcquirerMapping acquirerMapping = getAcquirerMappingById(id);
		if (acquirerMapping == null) {
			throw new RippsAdminException("Record Not Found");
		}
		try {

			AcquirerMapping acqMapping = ObjectMapper.mapToEntity(dto, AcquirerMapping.class);
			acquirerMapping.setPaymentMethod(acqMapping.getPaymentMethod());
			acquirerMapping.setActive(acqMapping.getActive());
			acquirerMapping.setDeleted(acqMapping.getDeleted());
			acquirerMapping.setCreatedBy(authSessionService.getCreatedBy());
			acquirerMapping.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
		} catch (Exception e) {
			throw new RippsAdminException("Exception while updating entity Data");
		}
		return jpaRepository.save(acquirerMapping).getId();
	}

	@Override
	public void deleteAcquirerMappingById(Integer id) {
		AcquirerMapping acquirerMapping = getAcquirerMappingById(id);
		if (acquirerMapping == null) {
			throw new RippsAdminException("Record Not Found");
		}
		acquirerMapping.setDeleted('1');
		jpaRepository.save(acquirerMapping);
	}

}
