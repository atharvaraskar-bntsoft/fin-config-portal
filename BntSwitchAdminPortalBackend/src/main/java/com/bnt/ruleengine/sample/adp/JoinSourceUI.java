package com.bnt.ruleengine.sample.adp;

import java.util.List;

import com.bnt.bswitch.query.parser.Condition;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JoinSourceUI {

	/* IMF|TEXT */
	private String sourceType;

	private ImfFieldWrapper sourceImf;

	private ImfFieldWrapper targetImf;

	private String sourceText;

	private String targetText;

	private String ipc;

	private Condition condition;

	private List<FunctionUI> listFunction;

	private List<ValidationFunctionUI> listValidationFunction;

	private String packagerField;

	private boolean collapse;

	public String getSourceType() {
		return sourceType;
	}

	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}

	public ImfFieldWrapper getSourceImf() {
		return sourceImf;
	}

	public void setSourceImf(ImfFieldWrapper sourceImf) {
		this.sourceImf = sourceImf;
	}

	public String getSourceText() {
		return sourceText;
	}

	public void setSourceText(String sourceText) {
		this.sourceText = sourceText;
	}

	public String getIpc() {
		return ipc;
	}

	public void setIpc(String ipc) {
		this.ipc = ipc;
	}

	public List<FunctionUI> getListFunction() {
		return listFunction;
	}

	public void setListFunction(List<FunctionUI> listFunction) {
		this.listFunction = listFunction;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	public ImfFieldWrapper getTargetImf() {
		return targetImf;
	}

	public void setTargetImf(ImfFieldWrapper targetImf) {
		this.targetImf = targetImf;
	}

	public String getTargetText() {
		return targetText;
	}

	public void setTargetText(String targetText) {
		this.targetText = targetText;
	}

	public String getPackagerField() {
		return packagerField;
	}

	public void setPackagerField(String packagerField) {
		this.packagerField = packagerField;
	}

	public List<ValidationFunctionUI> getListValidationFunction() {
		return listValidationFunction;
	}

	public void setListValidationFunction(List<ValidationFunctionUI> listValidationFunction) {
		this.listValidationFunction = listValidationFunction;
	}

	public boolean isCollapse() {
		return collapse;
	}

	public void setCollapse(boolean collapse) {
		this.collapse = collapse;
	}
}
