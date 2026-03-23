package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.MerchantInstitutionDto;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.jpa.repository.MerchantInsDetailPersistenceRepository;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.repository.MerchantInstitutionRepository;
import com.bnt.rest.service.MerchantInstitutionService;
import com.bnt.rest.wrapper.dto.AddressWrapper;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class MerchantInstitutionServiceImpl implements MerchantInstitutionService {

	@Autowired
	private MerchantInstitutionPersistenceHelper jpaRepository;

	@Autowired
	private MerchantInstitutionRepository institutionRepository;

	@Autowired
	private MerchantInsDetailPersistenceRepository merchantInsReop;

	private static Log logger = LogFactory.getLog(MerchantInstitutionServiceImpl.class.getName());

	@Override
	public ResponseWrapper getMerchantInstitutionList(Map<String, Object> requestParamMap) {
		logger.debug("Fetch all Merchant Group List");
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("status")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "locked");
		}
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<MerchantInstitution> institutionPage = null;
		if (filters == null) {
			institutionPage = jpaRepository.findMerchantInstitutionByDeleted('0', pageable);
		} else {
			institutionPage = institutionRepository.getFilterData(pageable, filters);
		}
		List<MerchantInstitutionDto> miList = new ArrayList<>();
		for (MerchantInstitution merchantInstitution : institutionPage.getContent()) {
			MerchantInstitutionDto dto = ObjectMapper.mapToDto(merchantInstitution, MerchantInstitutionDto.class);
			Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
			if (dto.getExpiryOn().compareTo(currentTimeStamp) < 0) {
				dto.setLocked('1');
			}
			miList.add(dto);
		}
		long count = institutionRepository.countWithDeleted('0');
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(institutionPage, count);
		pageJPAData.setContent(miList);
		return pageJPAData;
	}

	@Override
	public MerchantInstitution findInstitutionById(int id) {
		Optional<MerchantInstitution> optMerchantInstitution = jpaRepository.findById(id);
		return optMerchantInstitution.isPresent() ? optMerchantInstitution.get() : null;
	}

	@Override
	public List<AddressWrapper> getAddressList() {
		List<Object[]> detailList = merchantInsReop.findCityAndCountry();
		List<AddressWrapper> addressList = new ArrayList<>();
		for (Object[] deatil : detailList) {
			AddressWrapper wrapperCity = new AddressWrapper();
			ArrayList<String> listCity = new ArrayList<>();
			listCity.add(deatil[0].toString());
			listCity.add(deatil[1].toString());
			wrapperCity.setName(listCity);
			wrapperCity.setType("city");
			addressList.add(wrapperCity);
		}
		return addressList;
	}

	@Override
	public Map<String, Object> getFilterData() {
		List<IdAndNameStringWrapper> statusList = ListMapper.getStatus();
		List<AddressWrapper> addressList = getAddressList();
		Map<String, Object> map = new HashMap<>();
		map.put("status", statusList);
		map.put("address", addressList);
		return map;
	}

	public boolean validateMerchantInstitutionData(MerchantInstitutionDto merchantInstitutionDto) {
		boolean validate = false;
		if (merchantInstitutionDto.getActivateOn() == null) {
			throw new RippsAdminException("Activation since shuold not be null/blank");
		}
		if (merchantInstitutionDto.getExpiryOn() == null) {
			throw new RippsAdminException("Activation On should not be null/blank");
		}
		if (merchantInstitutionDto.getActivateOn() != null && merchantInstitutionDto.getExpiryOn() != null
				&& merchantInstitutionDto.getActivateOn().after(merchantInstitutionDto.getExpiryOn())) {
			throw new RippsAdminException(
					"Merchant Group expiry date/time should be greater that activation date/time");
		}
		validate = true;
		return validate;
	}
}