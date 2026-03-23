package com.bnt.monitoring.charts;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Coordinates {

	private final List<Integer> xCoordinats;
	private final List<Integer> yCoordinats;

	public Coordinates(final List<Integer> xCoordinats, final List<Integer> yCoordinats) {
		this.xCoordinats = xCoordinats;
		this.yCoordinats = yCoordinats;
	}

	public List<Integer> getX() {
		return xCoordinats;
	}

	public List<Integer> getY() {
		return yCoordinats;
	}
}
