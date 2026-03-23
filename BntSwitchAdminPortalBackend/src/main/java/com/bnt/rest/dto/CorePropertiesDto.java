package com.bnt.rest.dto;

import java.util.List;

import com.bnt.rest.wrapper.dto.IdAndVersionWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CorePropertiesDto {
	
	private Integer corePropertyId;

	private String type;

	private String name;

	private String subType;

	List<IdAndVersionWrapper> corePropertiesDetails;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubType() {
		return subType;
	}

	public void setSubType(String subType) {
		this.subType = subType;
	}
	
    public Integer getCorePropertyId() {
        return corePropertyId;
    }

    public void setCorePropertyId(Integer corePropertyId) {
        this.corePropertyId = corePropertyId;
    }

	public List<IdAndVersionWrapper> getCorePropertiesDetails() {
		return corePropertiesDetails;
	}

	public void setCorePropertiesDetails(List<IdAndVersionWrapper> corePropertiesDetails) {
		this.corePropertiesDetails = corePropertiesDetails;
	}
}
