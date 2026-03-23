package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.bswitch.shared.lib.entities.StringUtil;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.ExportImportSnapshotDto;
import com.bnt.rest.dto.ExportSnapshotDetailDto;
import com.bnt.rest.entity.ExportSnapshot;
import com.bnt.rest.jpa.repository.ExportSnapshotPersistenceHelper;
import com.bnt.rest.repository.ExportSnapshotRepository;
import com.bnt.rest.service.ExportDelegatorService;
import com.bnt.rest.service.ExportSnapshotService;
import com.bnt.service.mapper.ExportImportMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ExportSnapshotServiceImpl implements ExportSnapshotService {

	private static final Logger LOGGER = LogManager.getLogger(ExportSnapshotServiceImpl.class);
	@Autowired
	ExportSnapshotRepository repository;

	@Autowired
	ExportDelegatorService exportDelegatorService;

	@Autowired
	ExportSnapshotPersistenceHelper jpaHelper;

	@Override
	public ResponseWrapper findAllRecords(Map<String, Object> requestParamMap) {

		return repository.findAll(requestParamMap);
	}

	@Override
	public ExportImportSnapshotDto findRecordById(Integer id) {
		ExportImportSnapshotDto dto = null;
		ExportSnapshot entity = repository.findRecordById(id);
		if (entity != null) {
			dto = ObjectMapper.mapToDto(entity, ExportImportSnapshotDto.class);
		}
		return dto;
	}

	@Override
	@Transactional
	public Integer exportSnapshot(ExportImportSnapshotDto dto) {

		if (StringUtil.isEmptyOrNull(dto.getName())) {
			dto.setName("snapshot_timestamp_" + (new Date().getTime()));
		}
		if (!StringUtil.isEmptyOrNull(dto.getComment())) {
			dto.setComment(HTMLInjectionUtil.validateHTMLInjection(dto.getComment()));
		}
		try {
			exportDelegatorService.setJsonData(dto);
			ExportSnapshot entity = ObjectMapper.mapToEntity(dto, ExportSnapshot.class);

			return jpaHelper.save(entity).getId();
		} catch (Exception e) {

			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException(e.getMessage());
		}
	}

	@Override
	public ResponseWrapper getAllVersionOfExortSnapshotCandidates(Map<String, Object> requestParamMap) {
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);

		String[] values = null;
		if (filters != null) {

			values = filters[0].split(":")[1].split(",");

		}

		else {
			values = ExportImportMapper.getEntityList();
		}
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		return getRecordToExport(values, pageable);
	}

	@Override
	public Map<String, Object> downloadFile(int id, HttpServletRequest request) {
		LOGGER.info("inside downloadFile with id:{}", id);
		Map<String, Object> map;
		ExportImportSnapshotDto dto = findRecordById(id);
		if (dto == null) {
			throw new RippsAdminException("No record found");
		}
		map = exportDelegatorService.downloadFile(dto, request);
		return map;
	}

	public ResponseWrapper getRecordToExport(String[] valuesEntity, Pageable pageable) {

		Page<Object> pagedData = exportDelegatorService.getRecordToExport(valuesEntity, pageable);
		List<ExportSnapshotDetailDto> resultList = new ArrayList<>();
		ResponseWrapper pageJPAData = null;
		if (pagedData != null && !pagedData.isEmpty()) {
			for (Object object : pagedData.getContent()) {
				Object[] newData = (Object[]) object;
				resultList.add(exportDelegatorService.getEntityExpotableData(newData));
			}
		}
		if (pagedData != null && !pagedData.isEmpty()) {
			pageJPAData = JPAUtils.getResponseWrapperByPage(pagedData, pagedData.getTotalElements());
			pageJPAData.setContent(resultList);
		} else {
			pageJPAData = JPAUtils.getResponseWrapperByPage(pagedData, 0);
		}
		return pageJPAData;
	}

}
