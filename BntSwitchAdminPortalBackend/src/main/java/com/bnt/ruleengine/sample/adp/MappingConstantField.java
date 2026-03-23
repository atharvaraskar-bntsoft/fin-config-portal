package com.bnt.ruleengine.sample.adp;

import com.bnt.bswitch.query.parser.Condition;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingConstantField {

	/* source text */
	private String source;

	/* IMF field info */
	private ImfFieldWrapper destination;

	/* packager field */
	private String packagerField;

	private boolean isSourceImf;

	private boolean isDestinationImf;

	private Condition condition;

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public boolean isSourceImf() {
		return isSourceImf;
	}

	public void setSourceImf(boolean isSourceImf) {
		this.isSourceImf = isSourceImf;
	}

	public boolean isDestinationImf() {
		return isDestinationImf;
	}

	public void setDestinationImf(boolean isDestinationImf) {
		this.isDestinationImf = isDestinationImf;
	}

	public ImfFieldWrapper getDestination() {
		return destination;
	}

	public void setDestination(ImfFieldWrapper destination) {
		this.destination = destination;
	}

	public String getPackagerField() {
		return packagerField;
	}

	public void setPackagerField(String packagerField) {
		this.packagerField = packagerField;
	}

	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}
}
