package com.bnt.monitoring.charts;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DonutBlock2Coordinate implements DonutBlocCoordinate {

	private final String text;
	private final int value1;
	private final int value2;

	public DonutBlock2Coordinate(final String text, final int value1, final int value2) {
		this.text = text;
		this.value1 = value1;
		this.value2 = value2;
	}

	public String getText() {
		return text;
	}

	public int getValue1() {
		return value1;
	}

	public int getValue2() {
		return value2;
	}
}
