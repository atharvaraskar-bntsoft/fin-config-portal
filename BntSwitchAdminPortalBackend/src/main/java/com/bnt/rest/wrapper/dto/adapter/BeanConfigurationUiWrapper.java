package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

import com.bnt.rest.dto.uiwrapper.CustomBeanConfigurationUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BeanConfigurationUiWrapper {

	private String persistRequired;

	private List<CustomBeanConfigurationUiWrapper> beans;

	public String getPersistRequired() {
		return persistRequired;
	}

	public void setPersistRequired(String persistRequired) {
		this.persistRequired = persistRequired;
	}

	public List<CustomBeanConfigurationUiWrapper> getBeans() {
		return beans;
	}

	public void setBeans(List<CustomBeanConfigurationUiWrapper> beans) {
		this.beans = beans;
	}

}
