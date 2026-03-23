package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.MerchantDto;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.entity.MerchantCategoryCode;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.jpa.repository.MerchantCategoryCodePersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantDetailPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantInstitutionPersistenceHelper;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.repository.MerchantRepository;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.service.MerchantServiceRest;
import com.bnt.rest.wrapper.dto.AddressWrapper;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class MerchantServiceRestImpl implements MerchantServiceRest {

	@Autowired
	private MerchantRepository merchantRepository;

	@Autowired
	private MerchantInstitutionPersistenceHelper institutionRepository;

	@Autowired
	private MerchantPersistenceHelper merchantPersistenceHelper;

	@Autowired
	private MerchantDetailPersistenceHelper merchantDetailHelper;

	@Autowired
	private MerchantCategoryCodePersistenceHelper categoryCodeRepo;

	@Autowired
	private ListService listService;

	@Override
	public ResponseWrapper findAllMerchants(Map<String, Object> requestParamMap) {

		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("status")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "locked");
		}

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Merchant> merchantPage = null;

		if (filters == null) {
			merchantPage = merchantPersistenceHelper.findMerchantByDeleted('0', pageable);
		} else {
			merchantPage = merchantRepository.findFilterData(pageable, filters);

		}
		List<MerchantDto> list = new ArrayList<>();
		for (Merchant merchant : merchantPage.getContent()) {
			MerchantDto merchantDto = ObjectMapper.mapToDto(merchant, MerchantDto.class);
			Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
			if (merchantDto.getExpiryOn().compareTo(currentTimeStamp) < 0) {
				merchantDto.setLocked('1');
			}
			merchantDto.setTotalLocation(merchant.getTotalLocation());
			merchantDto.setTotalDevice(merchant.getTotalDevice());
			list.add(merchantDto);
		}
		long count = merchantRepository.countWithDeleted('0');
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(merchantPage, count);
		pageJPAData.setContent(list);
		return pageJPAData;

	}

	@Override
	public ResponseWrapper findAllMerchants() {
		List<Merchant> merchantPage = null;
		merchantPage = (List<Merchant>) merchantPersistenceHelper.findAll();
		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setContent(ObjectMapper.mapListObjects(merchantPage, MerchantDto.class));
		return pageJPAData;
	}

	@Override
	public String getCodeByMerchantInstitution(Integer merchantInstitutionId) {
		Integer nextCode = RippsUtility
				.fetchNextIntCode(merchantPersistenceHelper.findAllCodeByMerchantInstitution(merchantInstitutionId));
		return RippsUtility.nextCodeLeftPad(nextCode.toString(), 11, '0');
	}

	@Override
	public Merchant findMerchantById(int id) {
		return merchantRepository.findOne(id);
	}

	@Override
	public MerchantDto findMerchantDtoById(int id) {
		Merchant merchant = findMerchantById(id);
		return ObjectMapper.mapToDto(merchant, MerchantDto.class);
	}

	@Override
	public List<DtoWrapper> getCategoryCode() {

		List<MerchantCategoryCode> merchantList = (List<MerchantCategoryCode>) categoryCodeRepo.findAll();
		List<DtoWrapper> dtoWrapperList = new ArrayList<>();
		for (MerchantCategoryCode merchant : merchantList) {
			DtoWrapper dtoWrapper = new DtoWrapper();
			dtoWrapper.setId(merchant.getId().toString());
			dtoWrapper.setName(merchant.getCode());
			dtoWrapperList.add(dtoWrapper);
		}
		return dtoWrapperList;
	}

	@Override
	public List<AddressWrapper> getAddressList() {

		List<Object[]> detailList = merchantDetailHelper.findCityAndCountry();
		List<AddressWrapper> addressList = new ArrayList<>();
		for (Object[] detail : detailList) {
			AddressWrapper wrapperCity = new AddressWrapper();
			ArrayList<String> listCity = new ArrayList<>();

			if (detail[0] != null) {
				listCity.add(detail[0].toString());
			}
			if (detail[1] != null) {
				listCity.add(detail[1].toString());
			}
			wrapperCity.setName(listCity);
			wrapperCity.setType("city");

			addressList.add(wrapperCity);

		}
		return addressList;

	}

	@Override
	public Map<String, Object> getFilterData() {

		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());
		map.put("merchantGroup", listService.getAllMerchantInstitutionList());
		map.put("address", getAddressList());
		map.put("service-list", listService.getMerchantServiceList());
		map.put("additional-service-list", null);
		return map;
	}

	@Override
	public List<DtoWrapper> getMerchantByIntitutionId(int id) {

		Optional<MerchantInstitution> optional = institutionRepository.findById(id);

		if (optional.isPresent()) {
			MerchantInstitution merchantInstitution = optional.get();
			List<Merchant> merchantList = merchantPersistenceHelper
					.findMerchantByMerchantInstitution(merchantInstitution);
			List<DtoWrapper> dtoList = new ArrayList<>();
			for (Merchant merchant : merchantList) {
				DtoWrapper dto = new DtoWrapper();
				dto.setId(merchant.getId().toString());
				dto.setName(merchant.getName());
				dtoList.add(dto);
			}

			return dtoList;
		}
		return new ArrayList<>();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.bnt.rest.service.MerchantServiceRest#findMerchantByCode(
	 * java.lang.String)
	 */
	@Override
	public String findMerchantNameByCode(String code) {

		List<String> merchantDetails = merchantPersistenceHelper.getCodeAndNameOnly(code);

		if (!(CollectionUtil.isCollectionEmptyOrNull(merchantDetails))) {
			return merchantDetails.get(0);
		}
		return null;
	}

//	public boolean validateMerchantData(MerchantDto merchantDto) {
//		boolean validate = false;
//		if (merchantDto.getActivateOn() == null) {
//			throw new RippsAdminException("Activation since shuold not be null/blank");
//		}
//		if (merchantDto.getExpiryOn() == null) {
//			throw new RippsAdminException("Activation On should not be null/blank");
//		}
//		if (merchantDto.getActivateOn() != null && merchantDto.getExpiryOn() != null
//				&& merchantDto.getActivateOn().after(merchantDto.getExpiryOn())) {
//			throw new RippsAdminException("Merchant expiry date/time should be greater that activation date/time");
//		}
//		validate = true;
//		return validate;
//	}

}
