package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingLoop extends MappingCopyAsIs {

//	private String parentField;

	private List<FunctionUI> listFunction;

//	public String getParentField() {
//		return parentField;
//	}

//	public void setParentField(String parentField) {
//		this.parentField = parentField;
//	}

	public List<FunctionUI> getListFunction() {
		return listFunction;
	}

	public void setListFunction(List<FunctionUI> listFunction) {
		this.listFunction = listFunction;
	}
}
