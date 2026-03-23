package com.bnt.ruleengine.sample.adp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IMDGUIEntityWrapper {

	private String mapName;// SW-Merchant
	private String fieldName;

	public IMDGUIEntityWrapper(String mapName, String fieldName) {
		super();
		this.mapName = mapName;
		this.fieldName = fieldName;
	}

	public String getMapName() {
		return mapName;
	}

	public void setMapName(String mapName) {
		this.mapName = mapName;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
}
