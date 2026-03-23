package com.bnt.deployment.controller;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.deployment.request.AdapterConfigFileUploadRequest;
import com.bnt.deployment.request.CorePropertiesUploadRequest;
import com.bnt.deployment.request.ImfUploadRequest;
import com.bnt.deployment.request.WorkflowUploadRequest;
import com.bnt.deployment.response.AdapterConfigFileUploadResponse;
import com.bnt.deployment.response.CorePropertiesUploadResponse;
import com.bnt.deployment.response.ImfUploadResponse;
import com.bnt.deployment.response.WorkflowUploadResponse;
import com.bnt.deployment.service.AdapterConfigurationFileUploadService;

@RestController
@RequestMapping("/adapterconfig")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AdapterConfigFileUploadController {
	
	
	  private static final Logger logger =
	            LogManager.getLogger(AdapterConfigFileUploadController.class);

	    @Autowired
	    private AdapterConfigurationFileUploadService uploadService;

	    @PostMapping("/upload-imf")
	    public ResponseEntity<Map<String, Object>> uploadImf(
	            @RequestBody ImfUploadRequest request) {

	        logger.info("Uploading IMF File");

	        ImfUploadResponse data= uploadService.uploadImfFile(request);

	        ResponseEntityData responseEntityData = new ResponseEntityData();
	        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
	        responseEntityData.setMessage("IMF uploaded successfully");
	        responseEntityData.setData(data);
	        return new ResponseEntity<>(
	                RippsUtility.setResponseEntityData(responseEntityData),
	                HttpStatus.OK
	        );
	    }
	    
	    @PostMapping("/upload-core-properties")
	    public ResponseEntity<Map<String, Object>> uploadCoreProperties(
	            @RequestBody CorePropertiesUploadRequest request) {

	        logger.info("Uploading Core Properties File");

	        CorePropertiesUploadResponse data =
	                uploadService.uploadCoreProperties(request);

	        ResponseEntityData responseEntityData = new ResponseEntityData();
	        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
	        responseEntityData.setMessage(data.getMessage());
	        responseEntityData.setData(data);

	        return new ResponseEntity<>(
	                RippsUtility.setResponseEntityData(responseEntityData),
	                HttpStatus.OK
	        );
	    }
	    
	    @PostMapping("/upload-l1-adapter-files")
	    public ResponseEntity<Map<String, Object>> uploadL1AdapterFiles(
	            @RequestBody AdapterConfigFileUploadRequest request) {

	        logger.info("Uploading L1 Adapter Configuration Files");

	        AdapterConfigFileUploadResponse data =
	        		uploadService.uploadL1AdapterFiles(request);

	        ResponseEntityData responseEntityData = new ResponseEntityData();
	        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
	        responseEntityData.setMessage(data.getMessage());
	        responseEntityData.setData(data);

	        return new ResponseEntity<>(
	                RippsUtility.setResponseEntityData(responseEntityData),
	                HttpStatus.OK
	        );
	    }
	    
	    @PostMapping("/upload-l3-adapter-files")
	    public ResponseEntity<Map<String, Object>> uploadL3AdapterFiles(
	            @RequestBody AdapterConfigFileUploadRequest request) {

	        logger.info("Uploading L3 Adapter Configuration Files");

	        AdapterConfigFileUploadResponse data =
	                uploadService.uploadL3AdapterFiles(request);

	        ResponseEntityData responseEntityData = new ResponseEntityData();
	        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
	        responseEntityData.setMessage(data.getMessage());
	        responseEntityData.setData(data);

	        return new ResponseEntity<>(
	                RippsUtility.setResponseEntityData(responseEntityData),
	                HttpStatus.OK
	        );
	    }
	    
	    @PostMapping("/upload-workflow")
	    public ResponseEntity<Map<String, Object>> uploadWorkflow(
	            @RequestBody WorkflowUploadRequest request) {

	        logger.info("Uploading Workflow JSON");

	        WorkflowUploadResponse data = uploadService.uploadWorkflow(request);

	        ResponseEntityData responseEntityData = new ResponseEntityData();
	        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
	        responseEntityData.setMessage(data.getMessage());
	        responseEntityData.setData(data);

	        return new ResponseEntity<>(
	                RippsUtility.setResponseEntityData(responseEntityData),
	                HttpStatus.OK
	        );
	    }

}
