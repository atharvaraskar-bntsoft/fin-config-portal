package com.bnt.monitoring.charts;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Periods {

	private final List<Values> values;
	private final String active;

	public Periods(final List<Values> values, final String active) {
		this.values = values;
		this.active = active;
	}

	public List<Values> getValues() {
		return values;
	}

	public String getActive() {
		return active;
	}
}
