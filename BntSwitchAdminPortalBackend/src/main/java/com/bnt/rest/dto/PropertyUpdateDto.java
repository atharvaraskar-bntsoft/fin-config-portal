package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PropertyUpdateDto {

	private String beanName;

	private String jmxURL;

	private Object propertyKey;

	private Object propertyValue;

	public Object getPropertyKey() {
		return propertyKey;
	}

	public void setPropertyKey(Object propertyKey) {
		this.propertyKey = propertyKey;
	}

	public Object getPropertyValue() {
		return propertyValue;
	}

	public void setPropertyValue(Object propertyValue) {
		this.propertyValue = propertyValue;
	}

	public String getBeanName() {
		return beanName;
	}

	public void setBeanName(String beanName) {
		this.beanName = beanName;
	}

	public String getJmxURL() {
		return jmxURL;
	}

	public void setJmxURL(String jmxURL) {
		this.jmxURL = jmxURL;
	}
}
