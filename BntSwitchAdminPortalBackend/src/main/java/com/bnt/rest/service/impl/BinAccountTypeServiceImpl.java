package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.BinAccountTransactionTypeDto;
import com.bnt.rest.dto.BinAccountTypeDto;
import com.bnt.rest.dto.BinAccountTypeMasterDto;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.entity.BinAccountTransactionType;
import com.bnt.rest.entity.BinAccountType;
import com.bnt.rest.repository.BinAccountTypeRepository;
import com.bnt.rest.service.BinAccountTypeService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class BinAccountTypeServiceImpl implements BinAccountTypeService {

	private static Log logger = LogFactory.getLog(BinAccountTypeServiceImpl.class);

	@Autowired
	BinAccountTypeRepository binAccountTypeRepository;

	@Override
	public BinAccountTypeDto findBinAccountTypeDtoById(int id) {
		logger.info("inside findBinAccountTypeDtoById");
		BinAccountTypeDto binAccountTypeDto = null;
		BinAccountType binAccountType = binAccountTypeRepository.findBinAccountTypeById(id);
		if (binAccountType != null) {
			binAccountTypeDto = ObjectMapper.mapToDto(binAccountType, BinAccountTypeDto.class);
		}
		return binAccountTypeDto;
	}

	@Override
	public ResponseWrapper findPagedBinAccountType(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		logger.info("inside findPagedBinAccountType");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<BinAccountTypeDto> binAccountTypeDtoList = null;
		Page<BinAccountType> binAccountTypePagedList = binAccountTypeRepository.findAllPagedBinAccountType(pageable);
		if (binAccountTypePagedList != null) {
			binAccountTypeDtoList = getListDto(binAccountTypePagedList.getContent());
		} else {
			binAccountTypeDtoList = new ArrayList<>();
		}
		if (null != binAccountTypePagedList) {
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(binAccountTypePagedList,
					binAccountTypePagedList.getTotalElements());
			pageJPAData.setContent(binAccountTypeDtoList);
			return pageJPAData;
		}
		return null;
	}

	@Override
	public List<BinAccountTypeDto> findAll() {
		logger.info("inside findAll");
		List<BinAccountTypeDto> binAccountTypeDtoList = null;
		List<BinAccountType> binAccountTypeList = binAccountTypeRepository.findAll();
		if (binAccountTypeList != null) {
			binAccountTypeDtoList = ObjectMapper.mapListObjectToListDto(binAccountTypeList, BinAccountTypeDto.class);
		}
		return binAccountTypeDtoList;
	}

	@Override
	public ResponseWrapper findBinAccountTypeByBinTableId(int binTableId, Map<String, Object> requestParamMap) {
		logger.info("inside findBinAccountTypeByBinTableId with binTableId:" + binTableId);
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<BinAccountTypeDto> binAccountTypeDtoList = null;
		Page<BinAccountType> binAccountTypePagedList = binAccountTypeRepository
				.findBinAccountTypeByBinTableId(binTableId, pageable);
		if (binAccountTypePagedList != null) {
			binAccountTypeDtoList = getListDto(binAccountTypePagedList.getContent());
		} else {
			binAccountTypeDtoList = new ArrayList<>();
		}
		if (null != binAccountTypePagedList) {
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(binAccountTypePagedList,
					binAccountTypePagedList.getTotalElements());
			pageJPAData.setContent(binAccountTypeDtoList);
			return pageJPAData;
		}
		return null;
	}

	private List<BinAccountTypeDto> getListDto(List<BinAccountType> binAccountTypeList) {
		List<BinAccountTypeDto> binAccountTypeDtoList = new ArrayList<>();
		BinAccountTypeDto binAccountTypeDto = null;
		for (BinAccountType binAccountType : binAccountTypeList) {
			binAccountTypeDto = new BinAccountTypeDto();
			getDtoWithoutBinTable(binAccountType, binAccountTypeDto);
			binAccountTypeDtoList.add(binAccountTypeDto);
		}
		return binAccountTypeDtoList;
	}

	private void getDtoWithoutBinTable(BinAccountType binAccountType, BinAccountTypeDto binAccountTypeDto) {
		binAccountTypeDto.setId(binAccountType.getId());
		binAccountTypeDto.setActive(binAccountType.getActive());
		BinAccountTypeMasterDto binAccountTypeMasterId;
		binAccountTypeMasterId = ObjectMapper.mapToDto(binAccountType.getBinAccountTypeMasterId(),
				BinAccountTypeMasterDto.class);
		binAccountTypeDto.setBinAccountTypeMasterId(binAccountTypeMasterId);
		List<BinAccountTransactionTypeDto> binAccountTransactionTypeList = getBinAccountTransactionTypeDto(
				binAccountType);
		binAccountTypeDto.setBinAccountTransactionType(binAccountTransactionTypeList);
	}

	private List<BinAccountTransactionTypeDto> getBinAccountTransactionTypeDto(BinAccountType binAccountType) {
		BinAccountTransactionTypeDto dto = null;
		List<BinAccountTransactionTypeDto> binAccountTransactionTypeList = new ArrayList<>();
		for (BinAccountTransactionType binAccountTransactionType : binAccountType.getBinAccountTransactionType()) {
			dto = new BinAccountTransactionTypeDto();
			LookupValueDto transactionTypesId = new LookupValueDto();
			transactionTypesId.setId(binAccountTransactionType.getTransactionTypesId().getId());
			transactionTypesId.setValue(binAccountTransactionType.getTransactionTypesId().getValue());
			dto.setTransactionTypesId(transactionTypesId);
			dto.setActive(binAccountTransactionType.getActive());
			dto.setTxnTypeCode(binAccountTransactionType.getTxnTypeCode());
			binAccountTransactionTypeList.add(dto);
		}
		return binAccountTransactionTypeList;
	}

	@Override
	public List<BinAccountTypeDto> getAllBinAccountTypeByBinTableId(int binTableId) {
		logger.info("inside getAllBinAccountTypeByBinTableId");
		List<BinAccountTypeDto> binAccountTypeDtoList = null;
		List<BinAccountType> binAccountTypeList = binAccountTypeRepository.getBinAccountTypeByBinTableId(binTableId);
		if (binAccountTypeList != null) {
			binAccountTypeDtoList = ObjectMapper.mapListObjectToListDto(binAccountTypeList, BinAccountTypeDto.class);
		}
		return binAccountTypeDtoList;
	}
}
