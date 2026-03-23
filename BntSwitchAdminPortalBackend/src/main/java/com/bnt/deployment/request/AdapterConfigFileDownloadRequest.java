package com.bnt.deployment.request;

public class AdapterConfigFileDownloadRequest {
	private Long adapterId;
    private Integer version;
    
    
    public Long getAdapterId() {
        return adapterId;
    }

    public void setAdapterId(Long adapterId) {
        this.adapterId = adapterId;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

}
