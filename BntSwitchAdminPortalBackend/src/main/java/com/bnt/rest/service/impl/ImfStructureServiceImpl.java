package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.Constants;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.constant.ParameterConstant;
import com.bnt.constant.RippsRestConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.IdNameVersionWrapper;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.dto.ImfTemplateDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.ImfStructure;
import com.bnt.rest.entity.ImfTemplate;
import com.bnt.rest.jpa.repository.ImfStructurePersistenceHelper;
import com.bnt.rest.jpa.repository.ImfTemplatePersistenceHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.service.ImfStructureService;
import com.bnt.service.mapper.AdapterToolKitImfMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ImfStructureServiceImpl implements ImfStructureService {

	public static final String EXCEPTION_IN_COPYING_DTO_TO_ENTITY = "Exception in copying Dto to entity";

	public static final String INVALID_JSON_VALUE_FOR_IMF = "Invalid JSON value for IMF";

	private static final Logger logger = LogManager.getLogger(ImfStructureServiceImpl.class);

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private ImfStructurePersistenceHelper imfStructurePersistenceHelper;

	@Autowired
	private ImfTemplatePersistenceHelper imfTemplatePersistenceHelper;

	@Override
	public ResponseWrapper findPagedImfStructure(Map<String, Object> requestParamMap) throws RippsAdminRestException {
		logger.info("inside findPagedImfStructure()...");
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("status")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "locked");
		}
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);

		Page<ImfStructure> imfStructurePageList = imfStructurePersistenceHelper.findAll(pageable);

		List<ImfStructureDto> list = ObjectMapper.mapListObjectToListDto(imfStructurePageList.getContent(),
				ImfStructureDto.class);

		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(imfStructurePageList,
				imfStructurePageList.getTotalElements());
		pageJPAData.setContent(list);
		return pageJPAData;
	}

	@Override
	public ImfStructure findImfStructureById(int id) {
		return imfStructurePersistenceHelper.findById(id).orElse(null);
	}

	/*
	 * this method is used for create
	 * 
	 */
	@Override
	@Transactional
	public Integer addImfStructure(ImfStructureDto imfStructureDto, String requestToken) {
		logger.info("addImfStructure: {}", imfStructureDto.getName());
		logger.info("Validating imf data");

		try {
			validateImfData(imfStructureDto.getImf());
		} catch (RippsAdminException e) {
			throw new RippsAdminException(INVALID_JSON_VALUE_FOR_IMF);
		}

		logger.info("IMF JSON validation success");

		List<String> ignoreUpdateAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS);
		ImfStructure imfStructure = new ImfStructure();

		try {
			ReflectionUtil.copy(imfStructure, imfStructureDto, ignoreUpdateAuditField);
			imfStructure.setCreatedBy(authSessionService.getCreatedBy());
			imfStructure.setCreatedOn(RippsUtility.getCurrentTimeStamp());

			imfStructure.setVersion(RippsUtility.getVersion(getMaxVersion()));
			imfStructure.setName("IMF Structure " + imfStructure.getVersion().toString());

		} catch (Exception e) {
			throw new RippsAdminException(EXCEPTION_IN_COPYING_DTO_TO_ENTITY);
		}
		ImfStructure savedImfStructure = imfStructurePersistenceHelper.save(imfStructure);
		logger.info("created successfully with Id:{}", savedImfStructure.getId());
		return savedImfStructure.getId();
	}

	@Override
	@Transactional
	public void deleteById(Integer id, String requestToken) {

		logger.info("deleteById() with id:{}", id);
		ImfStructureDto imfStructureDto = findImfStructureDtoById(id);
		if (imfStructureDto == null) {
			throw new RippsAdminException("IMF Structure not found");
		}
		if (imfStructureDto.getVersion() == 0) {
			imfStructurePersistenceHelper.deleteById(id);
			logger.info("record deleted successfully");
		} else {
			throw new RippsAdminException("IMF Structure with only '0' version can be deleted");
		}

	}

	@Override
	public Map<String, Object> updateImfStructure(ImfStructureDto imfStructureDto, String requestToken, Integer id) {

		logger.info("Inside updateImfStructure()...");
		Map<String, Object> updateRecordMap = new HashMap<>();
		updateRecordMap.put(Constants.DTO, imfStructureDto);
		updateRecordMap.put(Constants.STATUS, RippsRestConstant.FAILURE);
		try {
			ImfStructure imfStructurePrev = findImfStructureById(id);
			if (imfStructurePrev == null) {

				updateRecordMap.put(Constants.MESSAGE, "IMF Structure not Found");
				return updateRecordMap;
			}
			if (imfStructurePrev.getVersion() != 0) {
				updateRecordMap.put(Constants.MESSAGE, "IMF Structure with '0' version only can be updated ");
				return updateRecordMap;
			}
			validateImfData(imfStructureDto.getImf());
			logger.info("IMF JSON validation success");

			List<String> ignoreUpdateAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_NONE);
			ImfStructure imfStructure = new ImfStructure();

			ReflectionUtil.copy(imfStructure, imfStructureDto, ignoreUpdateAuditField);

			imfStructure.setCreatedBy(imfStructurePrev.getCreatedBy());
			imfStructure.setCreatedOn(imfStructurePrev.getCreatedOn());
			imfStructure.setUpdatedBy(authSessionService.getCreatedBy());
			imfStructure.setUpdatedOn(RippsUtility.getCurrentTimeStamp());

			ImfStructure savedImfStructure = imfStructurePersistenceHelper.save(imfStructure);

			ImfStructureDto modifiedImfStructureDto = ObjectMapper.mapToDto(savedImfStructure, ImfStructureDto.class);
			updateRecordMap.put(Constants.STATUS, RippsRestConstant.SUCCESS);
			updateRecordMap.put(Constants.MESSAGE, "IMF Structure updated successfully");
			updateRecordMap.put(Constants.DTO, modifiedImfStructureDto);

			/**
			 * if(savedImfStructure !=null){ ImfStructureDto modifiedImfStructureDto =
			 * ObjectMapper.mapToDto(savedImfStructure, ImfStructureDto.class);
			 * updateRecordMap.put(Constants.STATUS, RippsRestConstant.SUCCESS);
			 * updateRecordMap.put(Constants.MESSAGE, "IMF Structure updated successfully");
			 * updateRecordMap.put(Constants.DTO, modifiedImfStructureDto); } else {
			 * updateRecordMap.put(Constants.STATUS, RippsRestConstant.FAILURE);
			 * updateRecordMap.put(Constants.MESSAGE, "IMF Structure modification failed");
			 * }
			 */
		} catch (Exception ex) {
			updateRecordMap.put(Constants.STATUS, RippsRestConstant.FAILURE);
			updateRecordMap.put(Constants.MESSAGE, ex.getMessage());
		}
		return updateRecordMap;
	}

	@Override
	public Integer getMaxVersion() {
		Integer maxVersion = imfStructurePersistenceHelper.findMaxVersion();
		logger.info("Max version: {}", maxVersion);
		return maxVersion;
	}

	@Override
	public ImfStructureDto findMaxVersionImfStructure() {
		ImfStructureDto imfStructureDto = null;
		Integer maxVersion = imfStructurePersistenceHelper.findMaxVersion();
		ImfStructure imfStructure = imfStructurePersistenceHelper.findMaxVersionImfStructure(maxVersion);
		if (imfStructure != null) {
			imfStructureDto = ObjectMapper.mapToDto(imfStructure, ImfStructureDto.class);
		}

		return imfStructureDto;
	}

	@Override
	public ImfTemplate getImfTemplate(Integer id) {
		logger.info("getImfTemplate for id: {}", id);
		return imfTemplatePersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public ImfTemplateDto getImfTemplateDto(Integer id) {
		logger.info("getImfTemplateDto for id:{}", id);
		ImfTemplate imfTemplate = getImfTemplate(id);
		ImfTemplateDto imfTemplateDto = null;
		if (imfTemplate != null) {
			imfTemplateDto = ObjectMapper.mapToDto(imfTemplate, ImfTemplateDto.class);
			logger.info("imfTemplateDto is not null");
		}
		return imfTemplateDto;
	}

	@Override
	public ImfStructureDto findImfStructureDtoById(int id) {
		logger.info("findImfStructureDtoById for id: {}", id);
		ImfStructureDto imfStructureDto = null;
		ImfStructure imfStructure = findImfStructureById(id);
		if (imfStructure != null) {
			imfStructureDto = ObjectMapper.mapToDto(imfStructure, ImfStructureDto.class);

			AdapterToolKitImfMapper.parseImfJson(imfStructureDto.getImf());

		}
		return imfStructureDto;
	}

	@Override
	@Transactional
	public Integer versionItImf(ImfStructureDto imfStructureDto, String requestToken) {
		logger.info("inside versionIt()...");

		ImfStructure imfStructure = imfStructurePersistenceHelper.findMaxVersionImfStructure(0);
		if (imfStructure != null) {
			imfStructureDto.setId(imfStructure.getId());
		} else {
			imfStructureDto.setId(null);
		}
		return addImfStructure(imfStructureDto, requestToken);
	}

	@Override
	@Transactional
	public Integer draftImf(ImfStructureDto imfStructureDto, String requestToken) {
		logger.info("inside draftImf()...");
		Integer draftVesrion = 0;
		ImfStructure imfStructure = null;
		imfStructureDto.setId(null);
		try {
			validateImfData(imfStructureDto.getImf());
		} catch (RippsAdminException e) {
			logger.info("JSON validation fail");
			throw new RippsAdminException(INVALID_JSON_VALUE_FOR_IMF);
		}

		imfStructure = imfStructurePersistenceHelper.findMaxVersionImfStructure(0);
		if (imfStructure != null) {

			imfStructure.setImf(imfStructureDto.getImf());
			imfStructure.setName(imfStructureDto.getName());
		} else {
			imfStructure = new ImfStructure();
			try {
				ReflectionUtil.copy(imfStructure, imfStructureDto);
			} catch (Exception e) {
				throw new RippsAdminException(EXCEPTION_IN_COPYING_DTO_TO_ENTITY);
			}
		}

		imfStructure.setVersion(draftVesrion);
		imfStructure.setName("IMF Structure " + imfStructure.getVersion().toString());

		ImfStructure savedImfStructure = imfStructurePersistenceHelper.save(imfStructure);
		logger.info("created successfully with Id: {}", savedImfStructure.getId());

		return savedImfStructure.getId();
	}

	@Override
	public List<IdNameVersionWrapper> getImfVersionList() {
		List<Object> versionList = imfStructurePersistenceHelper.findImfVersionList();
		List<IdNameVersionWrapper> versionListWrapper = new ArrayList<>();
		IdNameVersionWrapper idNameVersionWrapper = null;
		for (int start = 0; start < versionList.size(); start++) {
			Object[] eachEntity = (Object[]) versionList.get(start);
			idNameVersionWrapper = new IdNameVersionWrapper();
			idNameVersionWrapper.setVersion((Integer) eachEntity[0]);
			idNameVersionWrapper.setId((Integer) eachEntity[1]);
			idNameVersionWrapper.setName(eachEntity[2].toString());
			versionListWrapper.add(idNameVersionWrapper);
		}
		return versionListWrapper;
	}

	@Override
	public String getRunTimeImfStructure(String imfJson) {
		JsonObjectUtil.validateJsonObject(imfJson);
		return AdapterToolKitImfMapper.mapTemplateJsonToRunTimeJson(imfJson);

	}

	@Override
	public List<ImfStructureDto> findAllImf() {
		List<ImfStructureDto> imfStructureDtoList = null;
		List<ImfStructure> imfStructureList = (List<ImfStructure>) imfStructurePersistenceHelper.findAll();

		imfStructureDtoList = ObjectMapper.mapListObjectToListDto(imfStructureList, ImfStructureDto.class);

		/**
		 * if (imfStructureList != null) { imfStructureDtoList =
		 * ObjectMapper.mapListObjectToListDto(imfStructureList, ImfStructureDto.class);
		 * }
		 */
		return imfStructureDtoList;
	}

	public void validateImfData(String imfJson) {
		try {
			JsonObjectUtil.validateJsonObject(imfJson);
			Object packager = AdapterToolKitImfMapper.getImfPackager(imfJson);
			if (packager == null) {
				throw new RippsAdminException(INVALID_JSON_VALUE_FOR_IMF);
			}
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException(e.getMessage());
		}
	}

}
