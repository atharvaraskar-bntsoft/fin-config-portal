package com.bnt.deployment.response;

public class CorePropertiesUploadResponse {
	
	  private Integer id;
	    private Integer parentId;
	    private Integer version;
	    private String message;
	    private Integer statusCode;


	    public Integer getId() {
	        return id;
	    }

	    public void setId(Integer id) {
	        this.id = id;
	    }

	    public Integer getParentId() {
	        return parentId;
	    }

	    public void setParentId(Integer parentId) {
	        this.parentId = parentId;
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
