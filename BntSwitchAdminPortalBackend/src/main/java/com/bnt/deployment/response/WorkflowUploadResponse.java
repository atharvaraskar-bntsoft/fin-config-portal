package com.bnt.deployment.response;

public class WorkflowUploadResponse {
	
	    private Integer id;                  
	    private Integer deploymentId;        
	    private Integer corePropertyDetailId;
	    private String message;
	    private Integer statusCode;

	    public Integer getId() {
	        return id;
	    }

	    public void setId(Integer id) {
	        this.id = id;
	    }

	    public Integer getDeploymentId() {
	        return deploymentId;
	    }

	    public void setDeploymentId(Integer deploymentId) {
	        this.deploymentId = deploymentId;
	    }

	    public Integer getCorePropertyDetailId() {
	        return corePropertyDetailId;
	    }

	    public void setCorePropertyDetailId(Integer corePropertyDetailId) {
	        this.corePropertyDetailId = corePropertyDetailId;
	    }

	    public String getMessage() {
	        return message;
	    }

	    public void setMessage(String message) {
	        this.message = message;
	    }

	    public Integer getStatusCode() {
	        return statusCode;
	    }

	    public void setStatusCode(Integer statusCode) {
	        this.statusCode = statusCode;
	    }

}
