package com.bnt.deployment.request;

public class WorkflowUploadRequest {
	
	    private String workflowJson;
	    private Integer corePropertyDetailId;

	    public String getWorkflowJson() {
	        return workflowJson;
	    }

	    public void setWorkflowJson(String workflowJson) {
	        this.workflowJson = workflowJson;
	    }

	    public Integer getCorePropertyDetailId() {
	        return corePropertyDetailId;
	    }

	    public void setCorePropertyDetailId(Integer corePropertyDetailId) {
	        this.corePropertyDetailId = corePropertyDetailId;
	    }

}
