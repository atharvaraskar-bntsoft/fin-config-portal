package com.bnt.ruleengine.sample.adp;

import java.util.List;

import com.bnt.bswitch.query.parser.Condition;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingCopyAsIs {

	/* M|C|O */
	private String status;

	private Condition condition;

	private ImfFieldWrapper imfField;

	private String type;

	private String packagerField;

	private List<ValidationFunctionUI> listValidationFunction;

	private String ipc;

	private boolean echo;

	private String parentField;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public ImfFieldWrapper getImfField() {
		return imfField;
	}

	public void setImfField(ImfFieldWrapper imfField) {
		this.imfField = imfField;
	}

	public String getPackagerField() {
		return packagerField;
	}

	public void setPackagerField(String packagerField) {
		this.packagerField = packagerField;
	}

	public String getIpc() {
		return ipc;
	}

	public void setIpc(String ipc) {
		this.ipc = ipc;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<ValidationFunctionUI> getListValidationFunction() {
		return listValidationFunction;
	}

	public void setListValidationFunction(List<ValidationFunctionUI> listValidationFunction) {
		this.listValidationFunction = listValidationFunction;
	}

	public boolean isEcho() {
		return echo;
	}

	public void setEcho(boolean echo) {
		this.echo = echo;
	}

	public String getParentField() {
		return parentField;
	}

	public void setParentField(String parentField) {
		this.parentField = parentField;
	}
}
