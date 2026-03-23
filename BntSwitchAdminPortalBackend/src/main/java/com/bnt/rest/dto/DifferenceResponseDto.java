package com.bnt.rest.dto;

import java.util.ArrayList;
import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DifferenceResponseDto {

	private List<JsonDataCompListChildDto> jsondata = new ArrayList<>();

	private String type;

	private String subtype;

	public List<JsonDataCompListChildDto> getJsondata() {
		return jsondata;
	}

	public void setJsondata(List<JsonDataCompListChildDto> jsondata) {
		this.jsondata = jsondata;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSubtype() {
		return subtype;
	}

	public void setSubtype(String subtype) {
		this.subtype = subtype;
	}
}
