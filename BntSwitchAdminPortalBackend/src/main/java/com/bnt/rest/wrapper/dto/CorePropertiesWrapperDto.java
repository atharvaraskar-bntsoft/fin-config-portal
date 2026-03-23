package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CorePropertiesWrapperDto {

	public static final String SAVETYPE_DRAFT = "DRAFT";
	public static final String SAVETYPE_VERSIONIT = "VERSIONIT";

	private String type;
	private String subType;
	private String name;
	private Integer id;
	private Integer version;
	private Boolean saveDraft;
	private PropertiesDto properties;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSubType() {
		return subType;
	}

	public void setSubType(String subType) {
		this.subType = subType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Boolean getSaveDraft() {
		return saveDraft;
	}

	public void setSaveDraft(Boolean saveDraft) {
		this.saveDraft = saveDraft;
	}

	public PropertiesDto getProperties() {
		return properties;
	}

	public void setProperties(PropertiesDto properties) {
		this.properties = properties;
	}
}
