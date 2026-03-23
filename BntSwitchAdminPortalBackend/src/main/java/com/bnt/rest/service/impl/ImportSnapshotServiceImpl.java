package com.bnt.rest.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.FileUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SnapshotImportDetailDto;
import com.bnt.rest.entity.SnapshotImportDetail;
import com.bnt.rest.jpa.repository.ExportSnapshotPersistenceHelper;
import com.bnt.rest.jpa.repository.SnapshotImportDetailPersistenceHelper;
import com.bnt.rest.repository.ExportSnapshotRepository;
import com.bnt.rest.repository.SnapshotImportDetailRepository;
import com.bnt.rest.service.ExportDelegatorService;
import com.bnt.rest.service.ImportDelegatorService;
import com.bnt.rest.service.ImportSnapshotService;
import com.bnt.service.mapper.ExportImportMapper;
import com.bnt.service.mapper.ImportSnapshotMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ImportSnapshotServiceImpl implements ImportSnapshotService {

	private static final String SNAPSHOT_IMPORT_DETAIL_DTO = "_SNAPSHOT_IMPORT_DETAIL_DTO";

	private static final Logger LOGGER = LogManager.getLogger(ImportSnapshotServiceImpl.class);

	@Autowired
	ExportSnapshotRepository repository;

	@Autowired
	ExportDelegatorService exportDelegatorService;

	@Autowired
	ExportSnapshotPersistenceHelper jpaHelper;

	@Autowired
	SnapshotImportDetailRepository snapshotImportRepository;

	@Autowired
	SnapshotImportDetailPersistenceHelper snapshotImportJpaHelper;

	@Autowired
	private ImportDelegatorService importDelegatorService;

	private ConcurrentHashMap<String, Object> storeMap = new ConcurrentHashMap<>();

	public Integer importSnapshot(String jsonObject, HttpServletRequest request, Map<String, Object> zipMap) {
		LOGGER.debug(jsonObject);
		JSONObject importJson = new JSONObject(jsonObject);
		Iterator<String> keys = importJson.keys();

		Integer result = -1;
		StringBuilder message = new StringBuilder("Import operation invoked for : ");
		while (keys.hasNext()) {
			String key = keys.next();
			if (importJson.get(key) instanceof JSONArray) {
				/** do something with jsonArray here **/
				JSONArray entityList = (JSONArray) importJson.get(key);
				if (Boolean.TRUE.equals(JsonObjectUtil.isJsonArrayNotNullAndNotEmpty(entityList))) {
					LOGGER.debug("Import operation initiated for{}", key);
					result = importSnapshot1(request, zipMap, result, key, entityList);
					if (result > 0) {
						message = message.append(key).append(",");
					}
				}
			}
		}

		return result;
	}

	private Integer importSnapshot1(HttpServletRequest request, Map<String, Object> zipMap, Integer result, String key,
			JSONArray entityList) {
		try {
			String isCustomImport = ExportImportMapper.getPropertyByEntityTypeChildPropertName(key, "isCustomImport");
			if ("true".equalsIgnoreCase(isCustomImport)) {
				LOGGER.debug("Custom operation initiated for{}", key);
				result = importDelegatorService.customImportEntityData(entityList, key, request, zipMap);

			} else {
				LOGGER.debug("Generic operation initiated for{}", key);
				result = importDelegatorService.genericImportEntityData(entityList, key, request, zipMap);

			}
		} catch (RippsAdminException e) {
			LOGGER.error("exception in setJsonData method() ", e);
			throw new RippsAdminException(e.getMessage());
		} catch (Exception e) {
			LOGGER.error("exception in setJsonData  method()", e);
		}
		return result;
	}

	@Override
	public Integer adapterImportConfirmation(JSONObject confirmationValue, HttpServletRequest request) {
		Integer result = -1;
		try {
			String fileName = confirmationValue.get("name").toString();
			SnapshotImportDetailDto snapshotImportDetailDto = (SnapshotImportDetailDto) storeMap
					.get(fileName + SNAPSHOT_IMPORT_DETAIL_DTO);
			result = importDelegatorService.customImportEntityDataConfirmation(confirmationValue, request);

			if (result > 0) {
				snapshotImportDetailDto.setStatus(Constants.SUCCESS);
			} else {
				snapshotImportDetailDto.setStatus(Constants.FAILED);
			}
			// if no delta fields found, persist snapshotimportdetail immediately.
			// if delta fields founds. persist snapshotimportdetail while confirmation msg
			// 'Y' received.
			SnapshotImportDetail entity = ObjectMapper.mapToEntity(snapshotImportDetailDto, SnapshotImportDetail.class);
			snapshotImportRepository.save(entity);
			storeMap.remove(fileName + SNAPSHOT_IMPORT_DETAIL_DTO);
			LOGGER.info("Snapshot has been imported");
			return result;

		} catch (RippsAdminException e) {
			LOGGER.error("exception in setJsonData method()", e);
			throw new RippsAdminException(e.getMessage());
		} catch (Exception e) {
			LOGGER.error("exception in setJsonData method()", e);
		}
		return null;
	}

	@Override
	public Integer uploadSnapshot(MultipartFile uplodedFile, HttpServletRequest request) {
		LOGGER.info("inside uploadSnapshot");
		Map<String, String[]> paramMap = request.getParameterMap();
		String comment = null;
		String snapshotData = null;
		Map<String, Object> zipMap = null;
		/** SnapshotImportDetailDto snapshotImportDetailDto = null; */
		if (paramMap.get("comment") != null) {
			comment = paramMap.get("comment")[0];
		}

		String fileName = uplodedFile.getOriginalFilename();
		if (!StringUtil.isNotNullOrBlank(fileName)) {
			throw new RippsAdminException("File name is invalid");
		}
		FileUtil.validateFileExtension(fileName, ".JSON,.ZIP");

		if (fileName != null && fileName.toUpperCase().contains(".ZIP")) {
			try {
				zipMap = ImportSnapshotMapper.unzip(uplodedFile.getInputStream());
			} catch (IOException e) {
				LOGGER.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException("Please upload valid file");
			}
			if (zipMap == null) {
				LOGGER.error("map is coming null hence returning with message");
				throw new RippsAdminException("Please upload valid file");
			}
			snapshotData = (String) zipMap.get(ImportSnapshotMapper.JSON_FILE);
		} else {
			zipMap = new HashMap<>();
			try {
				snapshotData = StringUtil.getMultipartFileToString(uplodedFile);
			} catch (IOException e) {
				LOGGER.error(e);
			}
		}

		/** Integer savedId = 0; */
		return getfileNamedetails(fileName, comment, snapshotData, request, zipMap);
	}

	public Integer process(SnapshotImportDetailDto snapshotImportDetailDto, HttpServletRequest request,
			Map<String, Object> zipMap) {
		return importSnapshot(snapshotImportDetailDto.getDataToImport(), request, zipMap);
	}

	@Override
	public ResponseWrapper getPagedSnapshotImportDetail(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<SnapshotImportDetail> page = null;

		long totalCount;
		totalCount = snapshotImportJpaHelper.count();
		if (filters == null) {
			page = snapshotImportRepository.findAll(pageable);
		}
		return JPAUtils.getResponseWrapperByPage(page, totalCount);
	}

	private Integer getfileNamedetails(String fileName, String comment, String snapshotData, HttpServletRequest request,
			Map<String, Object> zipMap) {
		Integer savedId = 0;
		SnapshotImportDetailDto snapshotImportDetailDto = null;
		if (null != fileName) {
			String file = fileName.subSequence(0, fileName.indexOf(".")).toString();
			request.setAttribute("fileName", file);
			snapshotImportDetailDto = new SnapshotImportDetailDto();
			snapshotImportDetailDto.setComment(comment);
			snapshotImportDetailDto.setFileName(fileName);
			snapshotImportDetailDto.setDataToImport(snapshotData);

			savedId = process(snapshotImportDetailDto, request, zipMap);

			if (savedId > 0) {
				snapshotImportDetailDto.setStatus(Constants.SUCCESS);
			} else {
				snapshotImportDetailDto.setStatus(Constants.FAILED);
			}

			storeMap.put(file + SNAPSHOT_IMPORT_DETAIL_DTO, snapshotImportDetailDto);

		}
		// if no delta fields found, persist snapshotimportdetail immediately.
		// if delta fields founds. persist snapshotimportdetail while confirmation msg
		// 'Y' received.
		if (request.getAttribute("responseData") == null) {
			SnapshotImportDetail entity = ObjectMapper.mapToEntity(snapshotImportDetailDto, SnapshotImportDetail.class);
			snapshotImportRepository.save(entity);
			LOGGER.info("Snapshot has been imported");
			return savedId;
		} else {
			return -1;
		}

	}
}
