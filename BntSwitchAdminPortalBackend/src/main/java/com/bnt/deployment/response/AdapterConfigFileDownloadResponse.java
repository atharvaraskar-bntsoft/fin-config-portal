package com.bnt.deployment.response;

import java.util.List;

import com.bnt.deployment.dto.AdapterConfigFileDTO;



public class AdapterConfigFileDownloadResponse {
	    private Long adapterId;
	    private Integer version;
	    private List<AdapterConfigFileDTO> files;

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

	    public List<AdapterConfigFileDTO> getFiles() {
	        return files;
	    }

	    public void setFiles(List<AdapterConfigFileDTO> files) {
	        this.files = files;
	    }

}
