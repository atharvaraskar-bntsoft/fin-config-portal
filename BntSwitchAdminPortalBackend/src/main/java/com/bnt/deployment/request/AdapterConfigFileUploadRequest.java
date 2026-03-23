package com.bnt.deployment.request;

public class AdapterConfigFileUploadRequest {
	
    private Integer adapterId;
    private Integer version;

    private String properties;
    private String responseCode;
    private String packager;
    private String requestMapping;
    private String imf;
    private String networkHandler;

    private Boolean overwrite;

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

    public String getProperties() {
        return properties;
    }

    public void setProperties(String properties) {
        this.properties = properties;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public String getPackager() {
        return packager;
    }

    public void setPackager(String packager) {
        this.packager = packager;
    }

    public String getRequestMapping() {
        return requestMapping;
    }

    public void setRequestMapping(String requestMapping) {
        this.requestMapping = requestMapping;
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
    
    public String getNetworkHandler() {
        return networkHandler;
    }

    public void setNetworkHandler(String networkHandler) {
        this.networkHandler = networkHandler;
    }


}
