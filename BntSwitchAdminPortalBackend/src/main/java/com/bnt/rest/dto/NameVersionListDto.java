package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NameVersionListDto {

	String type;
	String name;
	List<Integer> versions;
	String template;

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

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

	public List<Integer> getVersions() {
		return versions;
	}

	public void setVersions(List<Integer> versions) {
		this.versions = versions;
	}
}
