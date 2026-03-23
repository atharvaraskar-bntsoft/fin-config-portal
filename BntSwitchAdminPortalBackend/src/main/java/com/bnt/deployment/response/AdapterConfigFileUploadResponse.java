package com.bnt.deployment.response;

public class AdapterConfigFileUploadResponse {
	
	   private Integer adapterId;
	    private Integer version;
	    private String message;
	    private Integer statusCode;

	    public Integer getAdapterId() {
	        return adapterId;
	    }

	    public void setAdapterId(Integer adapterId) {
	        this.adapterId = adapterId;
	    }

	    public Integer getVersion() {
	        return version;
	    }

	    public void setVersion(Integer version) {
	        this.version = version;
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
