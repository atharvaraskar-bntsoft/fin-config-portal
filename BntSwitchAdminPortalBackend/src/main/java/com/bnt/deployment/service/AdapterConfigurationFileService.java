package com.bnt.deployment.service;

import com.bnt.deployment.request.AdapterConfigFileDownloadRequest;
import com.bnt.deployment.response.AdapterConfigFileDownloadResponse;

public interface AdapterConfigurationFileService {

	AdapterConfigFileDownloadResponse downloadL1AdapterConfigFiles(AdapterConfigFileDownloadRequest request);
	
	AdapterConfigFileDownloadResponse downloadL3AdapterConfigFiles(AdapterConfigFileDownloadRequest request);

	AdapterConfigFileDownloadResponse downloadL2WorkflowFiles(int deploymentId);
	
	AdapterConfigFileDownloadResponse downloadImfFiles(Integer version);
	
	AdapterConfigFileDownloadResponse downloadCorePropertiesFile(Integer versionId);

}
