package com.bnt.ruleengine.sample.adp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImfFieldWrapper {

	private String useCase;

	private String text;

	private String service;

	private String type;

	private String resultText;

	private String alias;

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public ImfFieldWrapper() {
		super();
	}

	public ImfFieldWrapper(String useCase, String text, String service, String type) {
		super();
		this.useCase = useCase;
		this.text = text;
		this.service = service;
		this.type = type;
	}

	public String getUseCase() {
		return useCase;
	}

	public void setUseCase(String useCase) {
		this.useCase = useCase;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getResultText() {
		return resultText;
	}

	public void setResultText(String resultText) {
		// ImfUtility.getIMFObject(resultText, this);
		this.resultText = resultText;
	}
}
