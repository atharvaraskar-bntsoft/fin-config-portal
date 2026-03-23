package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SelectedRule {

	private String name;

	private String description;

	private String version;

	private String priority;

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

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	@Override
	public String toString() {
		return "SelectedRule [name=" + name + ", description=" + description + ", version=" + version + ", priority="
				+ priority + ", getName()=" + getName() + ", getDescription()=" + getDescription() + ", getVersion()="
				+ getVersion() + ", getPriority()=" + getPriority() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
}
