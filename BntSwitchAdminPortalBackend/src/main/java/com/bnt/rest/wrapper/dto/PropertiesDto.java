package com.bnt.rest.wrapper.dto;

import java.util.List;

import com.bnt.rest.dto.DefaultCorePropertiesDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PropertiesDto {

	private List<DefaultCorePropertiesDto> core;

	public List<DefaultCorePropertiesDto> getCore() {
		return core;
	}

	public void setCore(List<DefaultCorePropertiesDto> core) {
		this.core = core;
	}
}
