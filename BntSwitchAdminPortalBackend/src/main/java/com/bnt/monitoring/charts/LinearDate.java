package com.bnt.monitoring.charts;

import java.sql.Date;
import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LinearDate {

	private final String text;
	private final List<Date> xCoordinats;
	private final List<Integer> yCoordinats;

	public LinearDate(final String text, List<Date> xCoordinats, List<Integer> yCoordinats) {
		this.text = text;
		this.xCoordinats = xCoordinats;
		this.yCoordinats = yCoordinats;
	}

	public String getText() {
		return text;
	}

	public List<Date> getXCoordinats() {
		return xCoordinats;
	}

	public List<Integer> getYCoordinats() {
		return yCoordinats;
	}
}
