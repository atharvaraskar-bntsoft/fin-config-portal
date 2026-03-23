package com.bnt.rest.service;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.ExportImportSnapshotDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExportSnapshotService {

	ResponseWrapper findAllRecords(Map<String, Object> requestParamMap);

	ExportImportSnapshotDto findRecordById(Integer id);

	Integer exportSnapshot(ExportImportSnapshotDto dto);

	ResponseWrapper getAllVersionOfExortSnapshotCandidates(Map<String, Object> requestParamMap);

	Map<String, Object> downloadFile(int id, HttpServletRequest request);
}
