package com.bnt.deployment.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.deployment.dto.AdapterConfigFileDTO;
import com.bnt.deployment.request.AdapterConfigFileDownloadRequest;
import com.bnt.deployment.response.AdapterConfigFileDownloadResponse;
import com.bnt.deployment.service.AdapterConfigurationFileService;
import com.bnt.rest.entity.AdapterConfiguration;
import com.bnt.rest.entity.CorePropertiesDetails;
import com.bnt.rest.entity.DataFiles;
import com.bnt.rest.entity.DeploymentWorkflow;
import com.bnt.rest.entity.ImfStructure;
import com.bnt.rest.entity.SystemBeanConfiguration;
import com.bnt.rest.jpa.repository.AdapterConfigurationPersistenceHelper;
import com.bnt.rest.jpa.repository.CorePropertiesDetailsHelper;
import com.bnt.rest.jpa.repository.DataFilesPersistenceHelper;
import com.bnt.rest.jpa.repository.DataFilesPersistenceHelper;
import com.bnt.rest.jpa.repository.DeploymentWorkflowPersistenceHelper;
import com.bnt.rest.jpa.repository.ImfStructurePersistenceHelper;
import com.bnt.rest.jpa.repository.SystemBeanConfigurationPersistenceHelper;
import com.bnt.rest.repository.AdapterConfigurationRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import org.springframework.http.HttpStatus;
import java.util.Set;
import java.util.HashSet;
import java.util.LinkedHashMap;


@Service
public class AdapterConfigurationFileServiceImpl implements AdapterConfigurationFileService {
  
	@Autowired
	private AdapterConfigurationPersistenceHelper adapterConfigurationPersistenceHelper;

	@Autowired
	private SystemBeanConfigurationPersistenceHelper systemBeanConfigurationPersistenceHelper;
	
	@Autowired
    private DeploymentWorkflowPersistenceHelper deploymentWorkflowPersistenceHelper;
	
    @Autowired
    private ImfStructurePersistenceHelper imfRepository;
    
    @Autowired
    private CorePropertiesDetailsHelper corePropertiesDetailsHelper;
    
    @Autowired
    private DataFilesPersistenceHelper dataFilesPersistenceHelper;

    @Override
    public AdapterConfigFileDownloadResponse downloadL1AdapterConfigFiles(
            AdapterConfigFileDownloadRequest adapterConfigFileDownloadRequest) {

    	AdapterConfiguration config = adapterConfigurationPersistenceHelper
    	        .findByAdapter_IdAndVersion(
    	                adapterConfigFileDownloadRequest.getAdapterId(),
    	                adapterConfigFileDownloadRequest.getVersion())
    	        .orElseThrow(() -> new RippsAdminRestException(
    	                "Adapter configuration not found",
    	                HttpStatus.NOT_FOUND
    	        ));
        List<AdapterConfigFileDTO> files = new ArrayList<>();
        
        if (config.getProperties() != null) {
            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
            dto.setFileName("adapter_conf.properties");
            dto.setContentType("text/plain");
            dto.setContent(convertPropertiesJsonToText(config.getProperties()));
            files.add(dto);
        }
        
        if (config.getResponseCode() != null) {
            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
            dto.setFileName("response-code.properties");
            dto.setContentType("text/plain");
            dto.setContent(convertResponseCodeJsonToL1Properties(config.getResponseCode()));
            files.add(dto);
        }

        if (config.getMessageSchemaPackager() != null) {
            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
            dto.setFileName("packager.json");
            dto.setContentType("application/json");
            dto.setContent(config.getMessageSchemaPackager());
            files.add(dto);
        }

      
        if (config.getRequestMapping() != null) {
            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
            dto.setFileName("adapter_transactions_mapping.json");
            dto.setContentType("application/json");
            dto.setContent(config.getRequestMapping());
            files.add(dto);
        }
        
        if (config.getImfId() != null) {
            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
            dto.setFileName("imf.json");
            dto.setContentType("application/json");
            dto.setContent(config.getImfId().getImf());
            files.add(dto);
        }

        if (config.getResponseMapping() != null) {
            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
            dto.setFileName("response-mapping.json");
            dto.setContentType("application/json");
            dto.setContent(config.getResponseMapping());
            files.add(dto);
        }
        
        List<SystemBeanConfiguration> l1Beans =
                systemBeanConfigurationPersistenceHelper
                        .findLatestBeanByComponentTypePerFileType("L1");
        
        if (l1Beans == null || l1Beans.isEmpty()) {
            throw new RippsAdminRestException(
                    "No L3 system beans found",
                    HttpStatus.NOT_FOUND
            );
        }


        for (SystemBeanConfiguration bean : l1Beans) {

            if ("CHANNELS".equalsIgnoreCase(bean.getFileType())) {
                AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
                dto.setFileName("channels.xml");
                dto.setContentType("application/xml");
                dto.setContent(bean.getFileContentSingle());
                files.add(dto);
                System.out.println("Added channels.xml to download list.");
            }

            if ("WORKFLOW CHAIN".equalsIgnoreCase(bean.getFileType())) {
                AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
                dto.setFileName("workflow-chain.xml");
                dto.setContentType("application/xml");
                dto.setContent(bean.getFileContentSingle());
                files.add(dto);
                System.out.println("Added workflow-chain.xml to download list.");
            }
        }


        AdapterConfigFileDownloadResponse response = new AdapterConfigFileDownloadResponse();
        response.setAdapterId(adapterConfigFileDownloadRequest.getAdapterId());
        response.setVersion(adapterConfigFileDownloadRequest.getVersion());
        response.setFiles(files);

        return response;
    }

    

    
    
	@Override
	public AdapterConfigFileDownloadResponse downloadL3AdapterConfigFiles(AdapterConfigFileDownloadRequest request) {
		
		AdapterConfiguration config = adapterConfigurationPersistenceHelper
		        .findByAdapter_IdAndVersion(request.getAdapterId(), request.getVersion())
		        .orElseThrow(() -> new RippsAdminRestException(
		                "Adapter configuration not found",
		                HttpStatus.NOT_FOUND
		        ));

		
		List<AdapterConfigFileDTO> files = new ArrayList<>();
		
		 if (config.getProperties() != null) {
	            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
	            dto.setFileName("cart_conf.properties");
	            dto.setContentType("text/plain");
	            dto.setContent(convertPropertiesJsonToText(config.getProperties()));
	            files.add(dto);
	       } 
		  
		  if (config.getResponseCode() != null) {
	            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
	            dto.setFileName("response-code.properties");
	            dto.setContentType("text/plain");
	            dto.setContent(convertResponseCodeJsonToL3CartProperties(config.getResponseCode()));
	            files.add(dto);
	        }
		
		  if (config.getImfId() != null) {
	            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
	            dto.setFileName("imf.json");
	            dto.setContentType("application/json");
	            dto.setContent(config.getImfId().getImf());
	            files.add(dto);
	       }
		  if (config.getRequestMapping() != null) {
	            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
	            dto.setFileName("cart_transactions_mapping.json");
	            dto.setContentType("application/json");
	            dto.setContent(config.getRequestMapping());
	            files.add(dto);
	       }
		  if (config.getMessageSchemaPackager() != null) {
	            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
	            dto.setFileName("packager.xml");
	            dto.setContentType("application/xml");
	            dto.setContent(config.getMessageSchemaPackager());
	            files.add(dto);
	       }
		 
		  
		  List<SystemBeanConfiguration> l3Beans =
		            systemBeanConfigurationPersistenceHelper.findLatestBeanByComponentTypePerFileType("L3");

		   
		  if (l3Beans == null || l3Beans.isEmpty()) {
			    throw new RippsAdminRestException(
			            "No L3 system beans found",
			            HttpStatus.NOT_FOUND
			    );
			}

		    for (SystemBeanConfiguration bean : l3Beans) {
		      
		        if ("CHANNELS".equalsIgnoreCase(bean.getFileType())) {
		            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
		            dto.setFileName("channels.xml");
		            dto.setContentType("application/xml");
		            dto.setContent(bean.getFileContentSingle());
		            files.add(dto);
		            System.out.println("Added L3 channel.xml to download list.");
		        }

		        if ("WORKFLOW CHAIN".equalsIgnoreCase(bean.getFileType())) {
		            AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
		            dto.setFileName("workflow-chain.xml");
		            dto.setContentType("application/xml");
		            dto.setContent(bean.getFileContentSingle());
		            files.add(dto);
		            System.out.println("Added L3 workflow-chain.xml to download list.");
		        }
		    }
		    List<DataFiles> networkFiles =
		            dataFilesPersistenceHelper.findLatestFile("network_handler.json");

		    if (networkFiles != null && !networkFiles.isEmpty()) {

		        DataFiles latestFile = networkFiles.get(0);

		        AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
		        dto.setFileName("network_handler.json");
		        dto.setContentType("application/json");

		        String content = new String(latestFile.getFileContent());
		        dto.setContent(content);

		        files.add(dto);

		        System.out.println("Added network_handler.json to download list.");
		    }
		  AdapterConfigFileDownloadResponse response = new AdapterConfigFileDownloadResponse();
	      response.setAdapterId(request.getAdapterId());
	      response.setVersion(request.getVersion());
	      response.setFiles(files);
	      
	      return response;
		  
	}
	
	private String convertResponseCodeJsonToL1Properties(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode ipcList = root.get("ipcList");

            StringBuilder sb = new StringBuilder();
            if (ipcList != null && ipcList.isArray()) {
                for (JsonNode node : ipcList) {
                    sb.append(node.get("ipc").asText())
                      .append("=")
                      .append(node.get("responseCode").asText())
                      .append(",")
                      .append(node.get("description").asText())
                      .append("\n");
                }
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RippsAdminRestException(
                    "Invalid response code JSON format",
                    HttpStatus.BAD_REQUEST
            );
        }

    }
	
	
	
//	private String convertPropertiesJsonToText(String json) {
//        try {
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode root = mapper.readTree(json);
//            JsonNode messageArray = root.get("message");
//
//            StringBuilder sb = new StringBuilder();
//            if (messageArray != null && messageArray.isArray()) {
//                for (JsonNode node : messageArray) {
//                    sb.append(node.get("field").asText())
//                      .append("=")
//                      .append(node.get("value").asText())
//                      .append("\n");
//                }
//            }
//            return sb.toString();
//        } catch (Exception e) {
//            throw new RippsAdminRestException(
//                    "Invalid adapter properties JSON format",
//                    HttpStatus.BAD_REQUEST
//            );
//        }
//
//    }
    
	private String convertPropertiesJsonToText(String json) {

	    try {

	        ObjectMapper mapper = new ObjectMapper();
	        JsonNode root = mapper.readTree(json);

	        JsonNode messageArray = root.get("message");
	        JsonNode networkArray = root.get("network");

	        Map<String, String> messageMap = new LinkedHashMap<>();
	        Map<String, String> networkMap = new LinkedHashMap<>();

	        // MESSAGE (first value wins)
	        if (messageArray != null && messageArray.isArray()) {
	            for (JsonNode node : messageArray) {

	                String field = node.get("field").asText();
	                String value = node.path("value").asText("");

	                messageMap.putIfAbsent(field, value); // keep FIRST
	            }
	        }

	        // NETWORK (first value wins)
	        if (networkArray != null && networkArray.isArray()) {
	            for (JsonNode node : networkArray) {

	                String field = node.get("field").asText();
	                String value = node.path("value").asText("");

	                networkMap.putIfAbsent(field, value); // keep FIRST
	            }
	        }

	        // NETWORK overrides MESSAGE
	        for (String field : networkMap.keySet()) {
	            messageMap.remove(field);
	        }

	        StringBuilder result = new StringBuilder();

	        if (!messageMap.isEmpty()) {
	            result.append("#message\n");
	            messageMap.forEach((k,v) ->
	                result.append(k).append("=").append(v).append("\n"));
	        }

	        if (!networkMap.isEmpty()) {
	            result.append("\n#network\n");
	            networkMap.forEach((k,v) ->
	                result.append(k).append("=").append(v).append("\n"));
	        }

	        return result.toString();

	    } catch (Exception e) {
	        throw new RippsAdminRestException(
	                "Invalid adapter properties JSON format",
	                HttpStatus.BAD_REQUEST
	        );
	    }
	}
	
	private String convertL2PropertiesJsonToText(String json) {
	    try {
	        ObjectMapper mapper = new ObjectMapper();
	        JsonNode root = mapper.readTree(json);

	        JsonNode coreArray = root.get("core");

	        StringBuilder sb = new StringBuilder();

	        sb.append("#")
	          .append(new java.util.Date().toString())
	          .append("\n");

	        if (coreArray != null && coreArray.isArray()) {

	            for (JsonNode node : coreArray) {

	                JsonNode fieldNode = node.get("field");
	                JsonNode valueNode = node.get("value");

	            
	                if (fieldNode == null || fieldNode.isNull()) {
	                    continue;
	                }
	                
	                String field = fieldNode.asText();
	                String value = node.path("value").asText("");


	                sb.append(field)
	                  .append("=")
	                  .append(value)
	                  .append("\n");
	            }
	        }

	        return sb.toString();

	    } catch (Exception e) {
	        throw new RippsAdminRestException(
	                "Invalid Core Properties JSON format",
	                HttpStatus.BAD_REQUEST
	        );
	    }
	}



   
    
    private String convertResponseCodeJsonToL3CartProperties(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode ipcList = root.get("ipcList");

            StringBuilder sb = new StringBuilder();
            if (ipcList != null && ipcList.isArray()) {
                for (JsonNode node : ipcList) {
                    // L3 cart properties format: responseCode=ipc
                    sb.append(node.get("responseCode").asText())
                      .append("=")
                      .append(node.get("ipc").asText())
                      .append("\n");
                }
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RippsAdminRestException(
                    "Invalid response code JSON format",
                    HttpStatus.BAD_REQUEST
            );
        }

    }
    
    @Override
    public AdapterConfigFileDownloadResponse downloadL2WorkflowFiles(int deploymentId) {

        DeploymentWorkflow workflow = deploymentWorkflowPersistenceHelper
                .findByDeploymentId(deploymentId)
                .orElseThrow(() -> new RippsAdminRestException(
                        "Deployment workflow not found for ID: " + deploymentId,
                        HttpStatus.NOT_FOUND
                ));

        List<AdapterConfigFileDTO> files = new ArrayList<>();

       
        AdapterConfigFileDTO workflowDto = new AdapterConfigFileDTO();
        workflowDto.setFileName("workflow.json");
        workflowDto.setContentType("application/json");
        workflowDto.setContent(workflow.getWorkflowJson());
        files.add(workflowDto);

        List<SystemBeanConfiguration> l2Beans =
                systemBeanConfigurationPersistenceHelper
                        .findLatestBeanByComponentTypePerFileType("L2");

        if (l2Beans == null || l2Beans.isEmpty()) {
            throw new RippsAdminRestException(
                    "No L2 system beans found",
                    HttpStatus.NOT_FOUND
            );
        }

        for (SystemBeanConfiguration bean : l2Beans) {

            if ("CHANNELS".equalsIgnoreCase(bean.getFileType())) {
                AdapterConfigFileDTO channelDto = new AdapterConfigFileDTO();
                channelDto.setFileName("channels.xml");
                channelDto.setContentType("application/xml");
                channelDto.setContent(bean.getFileContentSingle());
                files.add(channelDto);
            }

            if ("ORCHESTRATION".equalsIgnoreCase(bean.getFileType())) {
                AdapterConfigFileDTO orchestrationDto = new AdapterConfigFileDTO();
                orchestrationDto.setFileName("orchestration.xml");
                orchestrationDto.setContentType("application/xml");
                orchestrationDto.setContent(bean.getFileContentSingle());
                files.add(orchestrationDto);
            }

        }

        AdapterConfigFileDownloadResponse response = new AdapterConfigFileDownloadResponse();
        response.setFiles(files);

        return response;
    }
    
    @Override
    public AdapterConfigFileDownloadResponse downloadImfFiles(Integer version) {

        ImfStructure imf = imfRepository.findByVersion(version)
                .orElseThrow(() -> new RippsAdminRestException(
                        "IMF not found for version: " + version,
                        HttpStatus.NOT_FOUND
                ));

        List<AdapterConfigFileDTO> files = new ArrayList<>();

        AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
        dto.setFileName("imf.json");
        dto.setContentType("application/json");
        dto.setContent(imf.getImf());

        files.add(dto);

        AdapterConfigFileDownloadResponse response =
                new AdapterConfigFileDownloadResponse();
        response.setFiles(files);

        return response;
    }
    
    @Override
    public AdapterConfigFileDownloadResponse downloadCorePropertiesFile(
            Integer versionId) {

        CorePropertiesDetails details =
                corePropertiesDetailsHelper.findById(versionId)
                .orElseThrow(() -> new RippsAdminRestException(
                        "Core Properties not found for id: " + versionId,
                        HttpStatus.NOT_FOUND
                ));

        AdapterConfigFileDTO dto = new AdapterConfigFileDTO();
        dto.setFileName("core_conf.properties");
        dto.setContentType("text/plain");
        dto.setContent(convertL2PropertiesJsonToText(details.getProperties()));

        List<AdapterConfigFileDTO> files = new ArrayList<>();
        files.add(dto);

        AdapterConfigFileDownloadResponse response =
                new AdapterConfigFileDownloadResponse();
        response.setFiles(files);

        return response;
    }





}
