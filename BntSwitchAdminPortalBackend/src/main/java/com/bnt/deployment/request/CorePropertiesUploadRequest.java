package com.bnt.deployment.request;

public class CorePropertiesUploadRequest {
	private Integer corePropertyId;   
    private Integer version;       
    private Boolean overwrite;
    private String properties;
    
    public Integer getCorePropertyId() {
        return corePropertyId;
    }

    public void setCorePropertyId(Integer corePropertyId) {
        this.corePropertyId = corePropertyId;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean getOverwrite() {
        return overwrite;
    }

    public void setOverwrite(Boolean overwrite) {
        this.overwrite = overwrite;
    }

    public String getProperties() {
        return properties;
    }

    public void setProperties(String properties) {
        this.properties = properties;
    }

}
