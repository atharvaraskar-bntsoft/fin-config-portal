package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.BinTableDto;
import com.bnt.rest.entity.BinTable;
import com.bnt.rest.repository.BinTableRepository;
import com.bnt.rest.service.BinTableService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class BinTableServiceImpl implements BinTableService {

	private static final Logger logger = LogManager.getLogger(BinTableServiceImpl.class);

	@Autowired
	private BinTableRepository binTableRepository;

	@Override
	public BinTableDto findBinTableDtoById(int id) {
		logger.info("inside findBinTableDtoById()..");
		BinTableDto binTableDto = null;
		BinTable binTable = binTableRepository.findBinTableById(id);
		if (binTable != null) {
			binTableDto = ObjectMapper.mapToDto(binTable, BinTableDto.class);
		}
		return binTableDto;
	}

	@Override
	public ResponseWrapper findPagedBinTable(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		List<BinTableDto> binTableDtoList = null;
		long totalRecords = 0;
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<BinTable> binTablePageList = binTableRepository.findFilterBinTable(pageable, filters);
		if (binTablePageList != null && !binTablePageList.getContent().isEmpty()) {
			binTableDtoList = getListDto(binTablePageList.getContent());
			totalRecords = binTablePageList.getTotalElements();
		} else {
			binTableDtoList = new ArrayList<>();
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(binTablePageList, totalRecords);
		pageJPAData.setContent(binTableDtoList);
		return pageJPAData;
	}

	@Override
	public List<BinTableDto> findAll() {
		List<BinTableDto> binTableDtoList = new ArrayList<>();
		BinTableDto dto = null;
		List<Object> binTableList = binTableRepository.findIdAndBinOnly();
		if (binTableList != null) {
			for (int start = 0; start < binTableList.size(); start++) {
				Object[] eachEntity = (Object[]) binTableList.get(start);
				dto = new BinTableDto();
				dto.setId((Integer) eachEntity[0]);
				dto.setBin((String) eachEntity[1]);
				binTableDtoList.add(dto);
			}
		}
		return binTableDtoList;
	}

	@Override
	public ResponseWrapper findBinTableByBinMasterId(int binMasterId, Map<String, Object> requestParamMap) {
		List<BinTableDto> binTableDtoList = null;
		long totalRecords = 0;
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		if (filters == null) {
			filters = new String[1];
			filters[0] = "binmasterid:" + binMasterId;
		} else {
			List<String> data = new ArrayList<>();
			Collections.addAll(data, filters);
			data.add("binmasterid:" + binMasterId);
			filters = data.stream().toArray(String[]::new);
		}
		Page<BinTable> binTablePageList = binTableRepository.findFilterBinTable(pageable, filters);
		if (binTablePageList != null && !binTablePageList.getContent().isEmpty()) {
			binTableDtoList = getListDto(binTablePageList.getContent());
			totalRecords = binTablePageList.getTotalElements();
		} else {
			binTableDtoList = new ArrayList<>();
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(binTablePageList, totalRecords);
		pageJPAData.setContent(binTableDtoList);
		return pageJPAData;
	}

	private static List<BinTableDto> getListDto(List<BinTable> binTableList) {
		List<BinTableDto> binTableDtoList = new ArrayList<>();
		if (binTableList != null) {
			BinTableDto binTableDto = null;
			for (BinTable binTable : binTableList) {
				binTableDto = new BinTableDto();
				getDtoWithoutBinAccountType(binTable, binTableDto);
				binTableDtoList.add(binTableDto);
			}
		}
		return binTableDtoList;
	}

	private static void getDtoWithoutBinAccountType(BinTable binTable, BinTableDto binTableDto) {
		if (binTable != null && binTableDto != null) {
			binTableDto.setId(binTable.getId());
			binTableDto.setBin(binTable.getBin());
			binTableDto.setBinAttributes(binTable.getBinAttributes());
			binTableDto.setBrand(binTable.getBrand());
			binTableDto.setCardProduct(binTable.getCardProduct());
			binTableDto.setInternational(binTable.getInternational());
			binTableDto.setLength(binTable.getLength());
			binTableDto.setMod10(binTable.getMod10());
			binTableDto.setProductType(binTable.getProductType());
			binTableDto.setOnus(binTable.getOnus());
		}
	}

	@Override
	public List<BinTableDto> getAllBinTableByBinMasterId(int binMasterId) {
		List<BinTableDto> binTableDtoList = null;

		List<BinTable> binTableList = binTableRepository.getAllBinTableByBinMasterId(binMasterId);
		if (binTableList != null && !binTableList.isEmpty()) {
			binTableDtoList = ObjectMapper.mapListObjectToListDto(binTableList, BinTableDto.class);
		} else {
			binTableDtoList = new ArrayList<>();
		}
		return binTableDtoList;
	}
}
