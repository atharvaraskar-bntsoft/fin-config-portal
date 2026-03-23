package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImfTemplateDto extends BaseDto {

	private String name;

	private String template;

	private String type;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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
}
