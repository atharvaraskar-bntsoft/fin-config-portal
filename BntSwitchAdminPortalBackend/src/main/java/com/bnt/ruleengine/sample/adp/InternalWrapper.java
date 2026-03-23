package com.bnt.ruleengine.sample.adp;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class InternalWrapper {

	private String useCase;
	private String sourceText;
	private String destinationText;

	public String getUseCase() {
		return useCase;
	}

	public void setUseCase(String useCase) {
		this.useCase = useCase;
	}

	public String getSourceText() {
		return sourceText;
	}

	public void setSourceText(String sourceText) {
		this.sourceText = sourceText;
	}

	public String getDestinationText() {
		return destinationText;
	}

	public void setDestinationText(String destinationText) {
		this.destinationText = destinationText;
	}
}
