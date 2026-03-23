package com.bnt.dashboard;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class KeyPair {
	private final String text;
	private final Object value;

	public KeyPair(final String text, final Object value) {
		this.text = text;
		this.value = value;
	}

	public String getText() {
		return text;
	}

	public Object getValue() {
		return value;
	}

}