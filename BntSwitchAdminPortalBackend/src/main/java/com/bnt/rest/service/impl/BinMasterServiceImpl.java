package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.BinMasterDto;
import com.bnt.rest.entity.BinMaster;
import com.bnt.rest.repository.BinMasterRepository;
import com.bnt.rest.service.BinMasterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class BinMasterServiceImpl implements BinMasterService {

	private static Logger logger = LogManager.getLogger(BinMasterServiceImpl.class);

	@Autowired
	private BinMasterRepository binMasterRepository;

	@Override
	public BinMasterDto findBinMasterDtoById(int id) {
		BinMasterDto binMasterDto = null;
		BinMaster binMaster = binMasterRepository.findBinMasterById(id);
		if (binMaster != null) {
			binMasterDto = ObjectMapper.mapToDto(binMaster, BinMasterDto.class);
		}
		return binMasterDto;
	}

	@Override
	public ResponseWrapper findPagedBinMaster(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		List<BinMasterDto> binMasterDtoList;
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<BinMaster> binMasterPageList = binMasterRepository.findPagedBinMaster(pageable);
		if (binMasterPageList != null && !binMasterPageList.getContent().isEmpty()) {
			logger.info("Inside findPagedBinMaster!");
			binMasterDtoList = getListDto(binMasterPageList.getContent());
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(binMasterPageList,
					binMasterPageList.getTotalElements());
			pageJPAData.setContent(binMasterDtoList);
			return pageJPAData;
		}
		return new ResponseWrapper();

	}

	private static List<BinMasterDto> getListDto(List<BinMaster> binMasterList) {
		List<BinMasterDto> binMasterDtoList = new ArrayList<>();
		BinMasterDto binMasterDto = null;
		for (BinMaster binMaster : binMasterList) {
			binMasterDto = new BinMasterDto();
			getDtoWithoutBinMaster(binMaster, binMasterDto);
			binMasterDtoList.add(binMasterDto);
		}
		return binMasterDtoList;
	}

	private static void getDtoWithoutBinMaster(BinMaster binMaster, BinMasterDto binMasterDto) {
		if (binMaster != null) {
			binMasterDto.setId(binMaster.getId());
			binMasterDto.setFileName(binMaster.getFileName());
			binMasterDto.setUploadedOn(binMaster.getUploadedOn());
			binMasterDto.setActivateOn(binMaster.getActivateOn());
			binMasterDto.setActive(binMaster.getActive());
			binMasterDto.setBinTable(null);
		}
	}

	@Override
	public List<BinMasterDto> findAll() {
		List<BinMasterDto> binMasterDtoList = new ArrayList<>();
		List<Object> binMasterList = binMasterRepository.findIdAndFileNameOnly();
		BinMasterDto dto = null;
		if (binMasterList != null) {
			for (int start = 0; start < binMasterList.size(); start++) {
				Object[] eachEntity = (Object[]) binMasterList.get(start);
				dto = new BinMasterDto();
				dto.setId((Integer) eachEntity[0]);
				dto.setFileName((String) eachEntity[1]);
				binMasterDtoList.add(dto);
			}
		}
		return binMasterDtoList;
	}

	@Override
	public boolean validateFileName(String fileName) {
		logger.info("Inside validateFileName:{}", fileName);
		boolean existFile = false;
		if (StringUtil.isNotNullOrBlank(fileName)) {
			fileName = fileName.trim();
			if (fileName.length() > 0) {
				BinMaster binMaster = binMasterRepository.findBinMasterByFileName(fileName);
				if (binMaster == null) {
					existFile = true;
				}
			} else {
				throw new RippsAdminException("File Name is invalid");
			}
		} else {
			throw new RippsAdminException("File Name is invalid");
		}
		return existFile;
	}

}
