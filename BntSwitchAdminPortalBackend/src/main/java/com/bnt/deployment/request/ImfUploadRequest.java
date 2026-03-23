package com.bnt.deployment.request;

public class ImfUploadRequest {
	
	    private Integer version;
	    private String imf;
	    private Boolean overwrite;  

	    public Integer getVersion() {
	        return version;
	    }

	    public void setVersion(Integer version) {
	        this.version = version;
	    }

	    public String getImf() {
	        return imf;
	    }

	    public void setImf(String imf) {
	        this.imf = imf;
	    }
	    
	    public Boolean getOverwrite() {
	        return overwrite;
	    }

	    public void setOverwrite(Boolean overwrite) {
	        this.overwrite = overwrite;
	    }

}
