package com.bnt.rest.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ComponentProfileMapping {

	@JsonProperty("component-profile-mapping")
	List<ComponentProfile> componentProfileMapping;

	public List<ComponentProfile> getComponentProfileMapping() {
		return componentProfileMapping;
	}

	public void setComponentProfileMapping(List<ComponentProfile> componentProfileMapping) {
		this.componentProfileMapping = componentProfileMapping;
	}
}
