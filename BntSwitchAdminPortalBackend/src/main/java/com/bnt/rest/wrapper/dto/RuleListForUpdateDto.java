package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleListForUpdateDto {

	private Integer id;

	private String name;

	private String description;

	private List<ValueAndTextWrapper> versionList;

	private String liveVersion;

	private boolean active;

	private String priority;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<ValueAndTextWrapper> getVersionList() {
		return versionList;
	}

	public void setVersionList(List<ValueAndTextWrapper> versionList) {
		this.versionList = versionList;
	}

	public String getLiveVersion() {
		return liveVersion;
	}

	public void setLiveVersion(String liveVersion) {
		this.liveVersion = liveVersion;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	@Override
	public String toString() {
		return "RuleListForUpdateDto [id=" + id + ", name=" + name + ", description=" + description + ", versionList="
				+ versionList + ", liveVersion=" + liveVersion + ", active=" + active + ", priority=" + priority + "]";
	}
}
