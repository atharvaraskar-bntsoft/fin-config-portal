package com.bnt.deployment.service.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.deployment.request.AdapterConfigFileUploadRequest;
import com.bnt.deployment.request.CorePropertiesUploadRequest;
import com.bnt.deployment.request.ImfUploadRequest;
import com.bnt.deployment.request.WorkflowUploadRequest;
import com.bnt.deployment.response.AdapterConfigFileUploadResponse;
import com.bnt.deployment.response.CorePropertiesUploadResponse;
import com.bnt.deployment.response.ImfUploadResponse;
import com.bnt.deployment.response.WorkflowUploadResponse;
import com.bnt.deployment.service.AdapterConfigurationFileUploadService;
import com.bnt.rest.entity.Adapter;
import com.bnt.rest.entity.AdapterConfiguration;
import com.bnt.rest.entity.CoreProperties;
import com.bnt.rest.entity.CorePropertiesDetails;
import com.bnt.rest.entity.DataFiles;
import com.bnt.rest.entity.Deployment;
import com.bnt.rest.entity.DeploymentWorkflow;
import com.bnt.rest.entity.ImfStructure;
import com.bnt.rest.jpa.repository.AdapterConfigurationPersistenceHelper;
import com.bnt.rest.jpa.repository.AdapterPersistenceHelper;
import com.bnt.rest.jpa.repository.CorePropertiesDetailsHelper;
import com.bnt.rest.jpa.repository.CorePropertiesHelper;
import com.bnt.rest.jpa.repository.DataFilesPersistenceHelper;
import com.bnt.rest.jpa.repository.DeploymentPersistenceHelper;
import com.bnt.rest.jpa.repository.DeploymentWorkflowPersistenceHelper;
import com.bnt.rest.jpa.repository.ImfStructurePersistenceHelper;
import com.bnt.rest.repository.CorePropertiesDetailsRepository;
import com.bnt.rest.repository.CorePropertiesRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class AdapterConfigurationFileUploadServiceImpl implements AdapterConfigurationFileUploadService {
	
	@Autowired
    private ImfStructurePersistenceHelper imfRepository;
	
	@Autowired
	private CorePropertiesHelper corePropertiesHelper;

	@Autowired
	private CorePropertiesDetailsHelper corePropertiesDetailsHelper;
	
	@Autowired
	private AdapterConfigurationPersistenceHelper adapterConfigurationPersistenceHelper;
	
	@Autowired
	private AdapterPersistenceHelper adapterRepository;
	
	 @Autowired
	 private DataFilesPersistenceHelper dataFilesPersistenceHelper;
	 
	@Autowired
	private DeploymentWorkflowPersistenceHelper deploymentWorkflowRepository;
	
	@Autowired
	DeploymentPersistenceHelper deploymentPersistenceHelper;

	

	@Override
	public ImfUploadResponse uploadImfFile(ImfUploadRequest request) {

	    if (request.getImf() == null || request.getImf().isBlank()) {
	        throw new RippsAdminRestException(
	                "IMF content cannot be empty",
	                HttpStatus.BAD_REQUEST
	        );
	    }

	    Integer newVersion;

	    if (request.getVersion() != null) {

	        Optional<ImfStructure> optionalExisting =
	                imfRepository.findByVersion(request.getVersion());

	        if (optionalExisting.isPresent()) {

	            ImfStructure existing = optionalExisting.get();

	            if (Boolean.TRUE.equals(request.getOverwrite())) {

	                // UPDATE EXISTING
	                existing.setImf(request.getImf());
	                existing.setName("IMF Structure " + request.getVersion());

	                ImfStructure updated = imfRepository.save(existing);

	                return buildResponse(updated, "IMF updated successfully", 200);
	            } else {
	            	   return buildResponse(existing, "IMF version already exists", 309);
	            }
	        }

	        newVersion = request.getVersion();

	    } else {
	        Integer maxVersion = imfRepository.findMaxVersion();
	        newVersion = (maxVersion == null) ? 1 : maxVersion + 1;
	    }

	    ImfStructure imf = new ImfStructure();
	    imf.setVersion(newVersion);
	    imf.setName("IMF Structure " + newVersion);
	    imf.setImf(request.getImf());

	    ImfStructure saved = imfRepository.save(imf);

	    return buildResponse(saved, "IMF uploaded successfully", 200);
	}
	
	
	private ImfUploadResponse buildResponse(ImfStructure saved, String message,Integer statuscode) {
	    ImfUploadResponse response = new ImfUploadResponse();
	    response.setId(saved.getId());
	    response.setName(saved.getName());
	    response.setVersion(saved.getVersion());
	    response.setMessage(message);
	    response.setStatusCode(statuscode);
	    return response;
	}

	
	

	@Override
	public CorePropertiesUploadResponse uploadCoreProperties(CorePropertiesUploadRequest request) {

	    if (request.getProperties() == null || request.getProperties().isBlank()) {
	        throw new RippsAdminRestException(
	                "Core Properties content cannot be empty",
	                HttpStatus.BAD_REQUEST
	        );
	    }

	    Optional<CoreProperties> coreProperty =
	            corePropertiesHelper.findById(request.getCorePropertyId());

	    if (!coreProperty.isPresent()) {
	        throw new RippsAdminRestException(
	                "Core Property not found",
	                HttpStatus.NOT_FOUND
	        );
	    }

	    CoreProperties parent = coreProperty.get();

	    Integer finalVersion;
	    
	    String propertiesJson;
	    try {
	        propertiesJson = convertPropertiesToJson(request.getProperties());
	    } catch (Exception e) {
	        throw new RippsAdminRestException(
	            "Failed to convert properties to JSON: " + e.getMessage(),
	            HttpStatus.INTERNAL_SERVER_ERROR
	        );
	    }

	    if (request.getVersion() != null) {

	        CorePropertiesDetails corePropertiesDetails =
	                corePropertiesDetailsHelper.getCorePropertiesDetailsForVersion(
	                        parent.getId(),
	                        request.getVersion());

	        if (corePropertiesDetails != null) {

	            if (Boolean.TRUE.equals(request.getOverwrite())) {
	                // UPDATE EXISTING
	                corePropertiesDetails.setProperties(propertiesJson);

	                CorePropertiesDetails updatedCorePropertiesDetails =
	                        corePropertiesDetailsHelper.save(corePropertiesDetails);

	                return buildCoreResponse(updatedCorePropertiesDetails,
	                        "Core Properties updated successfully", 200);

	            } else {
	                return buildCoreResponse(corePropertiesDetails,
	                        "Version already exists", 309);
	            }
	        }

	        finalVersion = request.getVersion();

	    } else {

	        Integer maxVersion =
	                corePropertiesDetailsHelper.getMaxVersion(parent.getId());

	        finalVersion = (maxVersion == null) ? 1 : maxVersion + 1;
	    }

	    CorePropertiesDetails newDetail = new CorePropertiesDetails();
	    newDetail.setCoreProperties(parent);
	    newDetail.setVersion(finalVersion);
	    newDetail.setProperties(propertiesJson);

	    CorePropertiesDetails saved =
	            corePropertiesDetailsHelper.save(newDetail);

	    return buildCoreResponse(saved,
	            "Core Properties uploaded successfully", 200);
	}
	
	private CorePropertiesUploadResponse buildCoreResponse(
	        CorePropertiesDetails saved,
	        String message,
	        Integer statusCode) {

	    CorePropertiesUploadResponse response =
	            new CorePropertiesUploadResponse();

	    response.setId(saved.getId());
	    response.setParentId(saved.getCoreProperties().getId());
	    response.setVersion(saved.getVersion());
	    response.setMessage(message);
	    response.setStatusCode(statusCode);

	    return response;
	}
	
	public static String convertPropertiesToJson(String propertiesContent) throws Exception {

	    ObjectMapper mapper = new ObjectMapper();
	    ArrayNode arrayNode = mapper.createArrayNode();

	    String[] lines = propertiesContent.split("\\r?\\n");

	    for (String line : lines) {

	        line = line.trim();

	        if (line.isEmpty() || line.startsWith("#")) {
	            continue;
	        }

	        String[] parts = line.split("=", 2);

	        String key = parts[0].trim();
	        String value = parts.length > 1 ? parts[1].trim() : null;

	        if (value != null && value.isEmpty()) {
	            value = null;
	        }

	        ObjectNode obj = mapper.createObjectNode();

	        obj.put("field", key);
	        obj.put("label", key.replace(".", " "));
	        obj.putNull("format");
	        obj.put("hidden", false);
	        obj.putNull("fileName");
	        obj.putNull("listvalues");
	        obj.put("isEditable", true);
           
	        // mandatory should be NULL
	        obj.put("mandatory", false);

	        // -------- datatype detection --------

	        if (value == null || value.trim().isEmpty()) {

	            obj.putNull("value");
	            obj.put("datatype", "String");

	        }
	        else if (value.startsWith("[") && value.endsWith("]")) {

	            // LIST TYPE
	            obj.put("datatype", "List");
	            obj.put("value", value);

	        }
	        else if (value.matches("-?\\d+")) {

	            // Integer / Long detection
	            try {
	                Integer.parseInt(value);
	                obj.put("datatype", "Integer");
	            } catch (NumberFormatException e) {
	                obj.put("datatype", "Long");
	            }

	            obj.put("value", value);

	        }
	        else if (value.equalsIgnoreCase("true") || value.equalsIgnoreCase("false")) {

	            obj.put("datatype", "Boolean");
	            obj.put("value", value);

	        }
	        else {

	            obj.put("datatype", "String");
	            obj.put("value", value);

	        }

	        arrayNode.add(obj);
	    }

	    // wrap inside core array
	    ObjectNode root = mapper.createObjectNode();
	    root.set("core", arrayNode);

	    return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(root);
	}


	@Override
	public AdapterConfigFileUploadResponse uploadL1AdapterFiles(AdapterConfigFileUploadRequest request) {

	    AdapterConfiguration config = null;
	    Integer finalVersion;

	    Adapter adapter = adapterRepository.findById(request.getAdapterId())
	            .orElseThrow(() -> new RippsAdminRestException(
	                    "Adapter not found",
	                    HttpStatus.NOT_FOUND
	            ));

	    if (request.getVersion() != null) {

	        Optional<AdapterConfiguration> optionalConfig =
	                adapterConfigurationPersistenceHelper
	                        .findByAdapter_IdAndVersion(request.getAdapterId(), request.getVersion());

	        if (optionalConfig.isPresent()) {

	            config = optionalConfig.get();

	            if (Boolean.TRUE.equals(request.getOverwrite())) {

	                // UPDATE EXISTING VERSION
	                finalVersion = config.getVersion();

	            } else {

	                return buildAdapterResponse(
	                        config,
	                        "Version already exists",
	                        309
	                );
	            }

	        } else {

	            // CREATE NEW WITH PROVIDED VERSION
	            finalVersion = request.getVersion();

	            config = new AdapterConfiguration();
	            config.setAdapter(adapter);
	            config.setVersion(finalVersion);
	            config.setStatus("ACTIVE");
	        }

	    } else {

	        // AUTO VERSION
	        Integer maxVersion =
	                adapterConfigurationPersistenceHelper
	                        .getMaxVersionForAdaptor(request.getAdapterId());

	        finalVersion = (maxVersion == null) ? 1 : maxVersion + 1;

	        config = new AdapterConfiguration();
	        config.setAdapter(adapter);
	        config.setVersion(finalVersion);
	        config.setStatus("ACTIVE");
	    }

	    // PACKAGER
	    if (request.getPackager() != null) {
	        config.setMessageSchemaPackager(request.getPackager());
	    }

	    // REQUEST MAPPING
	    if (request.getRequestMapping() != null) {
	        config.setRequestMapping(request.getRequestMapping());
	    }

	    // IMF FILE
	    if (request.getImfId() != null) {

	        ImfStructure imf = imfRepository.findById(request.getImfId())
	            .orElseThrow(() -> new RippsAdminRestException(
	                "IMF not found",
	                HttpStatus.NOT_FOUND
	            ));

	        config.setImfId(imf);
	    }

	    // PROPERTIES
	    if (request.getProperties() != null) {
	        try {
	            config.setProperties(convertL1PropertiesToJson(request.getProperties()));
	        } catch (Exception e) {
	            throw new RippsAdminRestException(
	                    "Failed to convert properties to JSON: " + e.getMessage(),
	                    HttpStatus.INTERNAL_SERVER_ERROR
	            );
	        }
	    }

	    // RESPONSE CODE
	    if (request.getResponseCode() != null) {
	        try {
	            config.setResponseCode(convertL1ResponseCodeToJson(request.getResponseCode()));
	        } catch (Exception e) {
	            throw new RippsAdminRestException(
	                    "Failed to convert response code to JSON: " + e.getMessage(),
	                    HttpStatus.INTERNAL_SERVER_ERROR
	            );
	        }
	    }

	    AdapterConfiguration saved =
	            adapterConfigurationPersistenceHelper.save(config);

	    return buildAdapterResponse(
	            saved,
	            "L1 Adapter files uploaded successfully",
	            200
	    );
	}
	
	public static String convertL1PropertiesToJson(String propertiesContent) throws Exception {

	    ObjectMapper mapper = new ObjectMapper();

	    ArrayNode messageArray = mapper.createArrayNode();
	    ArrayNode networkArray = mapper.createArrayNode();

	    String[] lines = propertiesContent.split("\\r?\\n");

	    String section = "message"; // default

	    for (String line : lines) {

	        line = line.trim();

	        if (line.isEmpty()) {
	            continue;
	        }

	        // detect section
	        if (line.equalsIgnoreCase("#message")) {
	            section = "message";
	            continue;
	        }

	        if (line.equalsIgnoreCase("#network")) {
	            section = "network";
	            continue;
	        }

	        if (line.startsWith("#")) {
	            continue;
	        }

	        String[] parts = line.split("=", 2);

	        String key = parts[0].trim();
	        String value = parts.length > 1 ? parts[1].trim() : "";

	        ObjectNode obj = mapper.createObjectNode();

	        obj.put("field", key);

	        // create label
	        String labelName = key.replace(".", " ");
	        if (!labelName.isEmpty()) {
	            labelName = Character.toUpperCase(labelName.charAt(0)) + labelName.substring(1);
	        }

	        if ("network".equals(section)) {
	            obj.put("label", labelName + "(Network)");
	        } else {
	            obj.put("label", labelName + "(Message)");
	        }

	        obj.putNull("format");
	        obj.put("hidden", false);
	        if (key.equals("network.request.handler.mapping.path")) {
	        	obj.put("datatype", "file");

	            // ✅ value = full path
	            obj.put("value", value.isEmpty() ? null : value);

	          
	            if (value.contains("/")) {
	                obj.put("fileName", value.substring(value.lastIndexOf("/") + 1));
	            } else {
	                obj.put("fileName", "network_handler.json");
	            }

	            ArrayNode allowed = mapper.createArrayNode();
	            allowed.add(".JSON");
	            obj.set("listvalues", allowed);
	        	   
	        }
	        else {
	        obj.put("datatype", "String");
	        obj.put("value", value.isEmpty() ? null : value);
	        obj.putNull("fileName");
	        obj.putNull("listvalues");
	        }
	        obj.put("mandatory", false);

	        // datatype detection
	       

	        if ("network".equals(section)) {
	            networkArray.add(obj);
	        } else {
	            messageArray.add(obj);
	        }
	    }

	    ObjectNode root = mapper.createObjectNode();
	    root.set("message", messageArray);
	    root.set("network", networkArray);

	    root.put("samePackager", false);
	    root.put("multiPackager", false);
	    root.put("singleProperty", true);

	    return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(root);
	}
	
	public static String convertL1ResponseCodeToJson(String content) throws Exception {

	    ObjectMapper mapper = new ObjectMapper();
	    ArrayNode arrayNode = mapper.createArrayNode();

	    String[] lines = content.split("\\r?\\n");

	    for (String line : lines) {

	        line = line.trim();

	        if (line.isEmpty() || line.startsWith("#")) {
	            continue;
	        }

	        String[] parts = line.split("=", 2);

	        String ipc = parts[0].trim();

	        String value = parts.length > 1 ? parts[1].trim() : "";

	        String[] responseParts = value.split(",", 2);

	        String responseCode = responseParts[0].trim();
	        String description = responseParts.length > 1 ? responseParts[1].trim() : "";

	        ObjectNode obj = mapper.createObjectNode();

	        obj.put("ipc", ipc);
	        obj.put("description", description);
	        obj.put("responseCode", responseCode);

	        arrayNode.add(obj);
	    }

	    ObjectNode root = mapper.createObjectNode();
	    root.set("ipcList", arrayNode);

	    return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(root);
	}
	
	private AdapterConfigFileUploadResponse buildAdapterResponse(
	        AdapterConfiguration saved,
	        String message,
	        Integer statusCode) {

	    AdapterConfigFileUploadResponse response =
	            new AdapterConfigFileUploadResponse();

	    response.setAdapterId(saved.getAdapter().getId());
	    response.setVersion(saved.getVersion());
	    response.setMessage(message);
	    response.setStatusCode(statusCode);

	    return response;
	}
	
	@Override
	public AdapterConfigFileUploadResponse uploadL3AdapterFiles(AdapterConfigFileUploadRequest request) {

	    AdapterConfiguration config = null;
	    Integer finalVersion;

	    Adapter adapter = adapterRepository.findById(request.getAdapterId())
	            .orElseThrow(() -> new RippsAdminRestException(
	                    "Adapter not found",
	                    HttpStatus.NOT_FOUND
	            ));

	    if (request.getVersion() != null) {

	        Optional<AdapterConfiguration> optionalConfig =
	                adapterConfigurationPersistenceHelper
	                        .findByAdapter_IdAndVersion(request.getAdapterId(), request.getVersion());

	        if (optionalConfig.isPresent()) {

	            config = optionalConfig.get();

	            if (Boolean.TRUE.equals(request.getOverwrite())) {

	                finalVersion = config.getVersion();

	            } else {

	                return buildAdapterResponse(
	                        config,
	                        "Version already exists",
	                        309
	                );
	            }

	        } else {

	            finalVersion = request.getVersion();

	            config = new AdapterConfiguration();
	            config.setAdapter(adapter);
	            config.setVersion(finalVersion);
	            config.setStatus("ACTIVE");
	        }

	    } else {

	        Integer maxVersion =
	                adapterConfigurationPersistenceHelper
	                        .getMaxVersionForAdaptor(request.getAdapterId());

	        finalVersion = (maxVersion == null) ? 1 : maxVersion + 1;

	        config = new AdapterConfiguration();
	        config.setAdapter(adapter);
	        config.setVersion(finalVersion);
	        config.setStatus("ACTIVE");
	    }

	    // Packager
	    if (request.getPackager() != null) {
	        config.setMessageSchemaPackager(request.getPackager());
	    }

	    // Request Mapping
	    if (request.getRequestMapping() != null) {
	        config.setRequestMapping(request.getRequestMapping());
	    }

	  

	    // IMF
	    if (request.getImfId() != null) {

	        ImfStructure imf = imfRepository.findById(request.getImfId())
	            .orElseThrow(() -> new RippsAdminRestException(
	                "IMF not found",
	                HttpStatus.NOT_FOUND
	            ));

	        config.setImfId(imf);
	    }
	    //netwrok handler
	    if (request.getNetworkHandler() != null) {

	        DataFiles file = new DataFiles();

	        file.setFileName("network_handler.json");
	        file.setFileContent(request.getNetworkHandler().getBytes());
	        file.setDeleted('0');
	        file.setFileSizeKb(request.getNetworkHandler().getBytes().length / 1024);
	        file.setFileMimeType("application/json");

	        dataFilesPersistenceHelper.save(file);
	    }

	    // Properties
	    if (request.getProperties() != null) {
	        try {
	            config.setProperties(convertL1PropertiesToJson(request.getProperties()));
	        } catch (Exception e) {
	            throw new RippsAdminRestException(
	                    "Failed to convert properties to JSON: " + e.getMessage(),
	                    HttpStatus.INTERNAL_SERVER_ERROR
	            );
	        }
	    }
	    
	    //response code
	    if (request.getResponseCode() != null) {
	        try {
	            config.setResponseCode(convertL3ResponseCodeToJson(request.getResponseCode()));
	        } catch (Exception e) {
	            throw new RippsAdminRestException(
	                    "Failed to convert response code to JSON: " + e.getMessage(),
	                    HttpStatus.INTERNAL_SERVER_ERROR
	            );
	        }
	    }

	    AdapterConfiguration saved =
	            adapterConfigurationPersistenceHelper.save(config);

	    return buildAdapterResponse(
	            saved,
	            "L3 Adapter files uploaded successfully",
	            200
	    );
	}
	
	public static String convertL3ResponseCodeToJson(String content) throws Exception {

	    ObjectMapper mapper = new ObjectMapper();
	    ArrayNode arrayNode = mapper.createArrayNode();

	    String[] lines = content.split("\\r?\\n");

	    for (String line : lines) {

	        line = line.trim();

	        if (line.isEmpty() || line.startsWith("#")) {
	            continue;
	        }

	        String[] parts = line.split("=", 2);

	        String responseCode = parts[0].trim();
	        String ipc = parts.length > 1 ? parts[1].trim() : "";

	        // Convert IPC to readable description
	        String description = ipc.replace("_", " ").toLowerCase();
	        description = Character.toUpperCase(description.charAt(0)) + description.substring(1);

	        ObjectNode obj = mapper.createObjectNode();

	        obj.put("ipc", ipc);
	        obj.put("description", description);
	        obj.put("responseCode", responseCode);

	        arrayNode.add(obj);
	    }

	    ObjectNode root = mapper.createObjectNode();
	    root.set("ipcList", arrayNode);

	    return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(root);
	}


	@Override
	public WorkflowUploadResponse uploadWorkflow(WorkflowUploadRequest request) {
		 if (request.getWorkflowJson() == null || request.getWorkflowJson().isBlank()) {
	            throw new RippsAdminRestException(
	                    "Workflow JSON cannot be empty",
	                    HttpStatus.BAD_REQUEST
	            );
	        }

	        try {
	            new ObjectMapper().readTree(request.getWorkflowJson());
	        } catch (Exception e) {
	            throw new RippsAdminRestException(
	                    "Invalid Workflow JSON",
	                    HttpStatus.BAD_REQUEST
	            );
	        }
	        
	     Integer count = deploymentPersistenceHelper.countWorkflowUploads() + 1;

	     String date = new SimpleDateFormat("dd-MM-yyyy").format(new Date());
	     String name = "Workflow Upload#" + count + "(" + date + ")";

	     Deployment deployment = new Deployment();
	     deployment.setName(name);
	     deployment.setStatus("UPLOADED");
	     deployment.setScheduledOn(new Timestamp(System.currentTimeMillis()));
	     deployment.setDeployedOn(null);

	     deploymentPersistenceHelper.save(deployment);;
	        

	        DeploymentWorkflow workflow = new DeploymentWorkflow();
	        workflow.setWorkflowJson(request.getWorkflowJson());
	        workflow.setDeploymentId(deployment.getId());
	        workflow.setComponentDetailsJson(null);
	        workflow.setCorePropertyDetailId(request.getCorePropertyDetailId());
	        DeploymentWorkflow saved = deploymentWorkflowRepository.save(workflow);


	        WorkflowUploadResponse response = new WorkflowUploadResponse();

	        response.setId(saved.getId());
	        response.setDeploymentId(saved.getDeploymentId()); 
	        response.setCorePropertyDetailId(saved.getCorePropertyDetailId());
	        response.setMessage("Workflow uploaded successfully");
	        response.setStatusCode(200);

	        return response;
	}

}
