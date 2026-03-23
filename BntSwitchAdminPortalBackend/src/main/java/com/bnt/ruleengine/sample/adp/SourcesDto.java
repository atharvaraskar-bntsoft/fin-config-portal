package com.bnt.ruleengine.sample.adp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SourcesDto {

//	private String key;
//	
//	private String value;
//	
//	private String source;

	private String source;

	private String feature;

	private String destination;

	private String parentField;

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getFeature() {
		return feature;
	}

	public void setFeature(String feature) {
		this.feature = feature;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getParentField() {
		return parentField;
	}

	public void setParentField(String parentField) {
		this.parentField = parentField;
	}
}
