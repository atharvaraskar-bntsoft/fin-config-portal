package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImfStructureDto extends BaseDto {

	private String name;

	private Integer version;

	private String imf;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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
}
