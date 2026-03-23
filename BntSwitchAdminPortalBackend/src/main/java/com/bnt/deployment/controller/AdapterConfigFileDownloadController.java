package com.bnt.deployment.controller;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.deployment.request.AdapterConfigFileDownloadRequest;
import com.bnt.deployment.response.AdapterConfigFileDownloadResponse;
import com.bnt.deployment.service.AdapterConfigurationFileService;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/adapterconfig")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AdapterConfigFileDownloadController {

    private static final Logger logger = LogManager.getLogger(AdapterConfigFileDownloadController.class);

    @Autowired
    private AdapterConfigurationFileService adapterConfigurationFileService;

    
    @PostMapping("/download-l1-files")
    public ResponseEntity<Map<String, Object>> downloadL1Files(
            @RequestBody AdapterConfigFileDownloadRequest request) {

        logger.info("Download L1 Adapter Config Files");

        AdapterConfigFileDownloadResponse data =
                adapterConfigurationFileService.downloadL1AdapterConfigFiles(request);

        ResponseEntityData responseEntityData = new ResponseEntityData();
        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
        responseEntityData.setMessage("L1 Files downloaded successfully");
        responseEntityData.setData(data);

        return new ResponseEntity<>(
                RippsUtility.setResponseEntityData(responseEntityData),
                HttpStatus.OK
        );
    }
    
    
     
    @PostMapping("/download-l3-files")
    public ResponseEntity<Map<String, Object>> downloadL3Files(
            @RequestBody AdapterConfigFileDownloadRequest request) {

        logger.info("Download L3 Adapter Config Files");

        AdapterConfigFileDownloadResponse data =
                adapterConfigurationFileService.downloadL3AdapterConfigFiles(request);

        ResponseEntityData responseEntityData = new ResponseEntityData();
        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
        responseEntityData.setMessage("L3 Files downloaded successfully");
        responseEntityData.setData(data);

        return new ResponseEntity<>(
                RippsUtility.setResponseEntityData(responseEntityData),
                HttpStatus.OK
        );
    }
    
    @GetMapping("/download-l2-files/{deploymentId}")
    public ResponseEntity<Map<String, Object>> downloadL2Files( @PathVariable("deploymentId") int deploymentId) {

        logger.info("Download L2 Workflow Files for deploymentId: {}", deploymentId);

        AdapterConfigFileDownloadResponse data =
                adapterConfigurationFileService.downloadL2WorkflowFiles(deploymentId);

        ResponseEntityData responseEntityData = new ResponseEntityData();
        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
        responseEntityData.setMessage("L2 Workflow downloaded successfully");
        responseEntityData.setData(data);

        return new ResponseEntity<>(
                RippsUtility.setResponseEntityData(responseEntityData),
                HttpStatus.OK
        );
    }
    
    @GetMapping("/download-imf/{version}")
    public ResponseEntity<Map<String, Object>> downloadImf(
            @PathVariable("version") Integer version) {

        logger.info("Download IMF file for version: {}", version);

        AdapterConfigFileDownloadResponse data =
        		adapterConfigurationFileService.downloadImfFiles(version);

        ResponseEntityData responseEntityData = new ResponseEntityData();
        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
        responseEntityData.setMessage("IMF downloaded successfully");
        responseEntityData.setData(data);

        return new ResponseEntity<>(
                RippsUtility.setResponseEntityData(responseEntityData),
                HttpStatus.OK
        );
    }
    
    @GetMapping("/download-core-properties/{versionId}")
    public ResponseEntity<Map<String, Object>> downloadCoreProperties(
    		@PathVariable("versionId") Integer versionId) {

        AdapterConfigFileDownloadResponse data =
                adapterConfigurationFileService
                        .downloadCorePropertiesFile(versionId);

        ResponseEntityData responseEntityData = new ResponseEntityData();
        responseEntityData.setStatus(RippsRestConstant.SUCCESS);
        responseEntityData.setMessage("Core Properties downloaded successfully");
        responseEntityData.setData(data);

        return new ResponseEntity<>(
                RippsUtility.setResponseEntityData(responseEntityData),
                HttpStatus.OK
        );
    }




}
