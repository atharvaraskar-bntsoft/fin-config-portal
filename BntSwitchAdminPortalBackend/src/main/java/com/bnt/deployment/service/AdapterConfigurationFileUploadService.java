package com.bnt.deployment.service;

import com.bnt.deployment.request.AdapterConfigFileUploadRequest;
import com.bnt.deployment.request.CorePropertiesUploadRequest;
import com.bnt.deployment.request.ImfUploadRequest;
import com.bnt.deployment.request.WorkflowUploadRequest;
import com.bnt.deployment.response.AdapterConfigFileUploadResponse;
import com.bnt.deployment.response.CorePropertiesUploadResponse;
import com.bnt.deployment.response.ImfUploadResponse;
import com.bnt.deployment.response.WorkflowUploadResponse;

public interface AdapterConfigurationFileUploadService {
	
	public ImfUploadResponse uploadImfFile(ImfUploadRequest request);
	
	public CorePropertiesUploadResponse uploadCoreProperties(CorePropertiesUploadRequest request);
	
	public AdapterConfigFileUploadResponse uploadL1AdapterFiles(AdapterConfigFileUploadRequest request);
	
	public AdapterConfigFileUploadResponse uploadL3AdapterFiles(
	        AdapterConfigFileUploadRequest request);
	
	public WorkflowUploadResponse uploadWorkflow(WorkflowUploadRequest request);

}
