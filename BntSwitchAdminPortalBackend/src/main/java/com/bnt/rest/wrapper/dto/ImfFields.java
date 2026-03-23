package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImfFields {

	private String name;
	private String alias;
	private String type;
	private boolean hide;

	public ImfFields(String name, String alias, String type, boolean hide) {
		super();
		this.name = name;
		this.alias = alias;
		this.type = type;
		this.hide = hide;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public boolean isHide() {
		return hide;
	}

	public void setHide(boolean hide) {
		this.hide = hide;
	}
}
