package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.dto.ExportSnapshotDetailDto;
import com.bnt.rest.dto.ExportImportSnapshotDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExportDelegatorService {

	ExportImportSnapshotDto setJsonData(ExportImportSnapshotDto dto);

//	List<?> getExportableList(String value);

//	List<ExportSnapshotDetailDto> groupObjectListByName(List<?> objectList, String entityName);

	Map<String, Object> downloadFile(ExportImportSnapshotDto dto, HttpServletRequest request);

	Page<Object> getRecordToExport(String[] valuesEntity, Pageable pageable);

	ExportSnapshotDetailDto getEntityExpotableData(Object[] newData);
}
