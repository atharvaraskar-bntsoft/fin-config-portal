package com.bnt.monitoring.charts;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Linear {

	private final String text;
	private final List<Integer> xCoordinats;
	private final List<Integer> yCoordinats;

	public Linear(final String text, List<Integer> xCoordinats, List<Integer> yCoordinats) {
		this.text = text;
		this.xCoordinats = xCoordinats;
		this.yCoordinats = yCoordinats;
	}

	public String getText() {
		return text;
	}

	public List<Integer> getX() {
		return xCoordinats;
	}

	public List<Integer> getY() {
		return yCoordinats;
	}
}