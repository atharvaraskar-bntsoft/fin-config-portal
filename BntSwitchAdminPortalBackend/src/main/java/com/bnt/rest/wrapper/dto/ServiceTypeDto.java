package com.bnt.rest.wrapper.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ServiceTypeDto {

	private Integer id;

	@JsonProperty("name")
	private String code;

	private boolean acqAdapterService;

	private boolean integrationFeatureServices;

	private boolean coreSystemService;

	public ServiceTypeDto(Integer id, String code) {
		super();
		this.id = id;
		this.code = code;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public ServiceTypeDto(String id) {
		this.id = Integer.parseInt(id);
	}

	public ServiceTypeDto(Integer id) {
		this.id = id;
	}

	public ServiceTypeDto() {

	}

	public boolean isAcqAdapterService() {
		return acqAdapterService;
	}

	public void setAcqAdapterService(boolean acqAdapterService) {
		this.acqAdapterService = acqAdapterService;
	}

	public boolean isIntegrationFeatureServices() {
		return integrationFeatureServices;
	}

	public void setIntegrationFeatureServices(boolean integrationFeatureServices) {
		this.integrationFeatureServices = integrationFeatureServices;
	}

	public boolean isCoreSystemService() {
		return coreSystemService;
	}

	public void setCoreSystemService(boolean coreSystemService) {
		this.coreSystemService = coreSystemService;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ServiceTypeDto other = (ServiceTypeDto) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
