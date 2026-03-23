package com.bnt.rest.service;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import com.bnt.common.ResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ImportSnapshotService {

	Integer uploadSnapshot(MultipartFile uplodedFile, HttpServletRequest request);

	ResponseWrapper getPagedSnapshotImportDetail(Map<String, Object> requestParamMap);

	Integer adapterImportConfirmation(JSONObject confirmationValue, HttpServletRequest request);
}
