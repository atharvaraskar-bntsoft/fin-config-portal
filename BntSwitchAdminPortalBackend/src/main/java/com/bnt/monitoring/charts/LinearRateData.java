package com.bnt.monitoring.charts;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LinearRateData {

	private final String title;
	private final String viewPer;
	private final Periods periods;

	public LinearRateData(final String title, final String viewPer, final Periods periods) {
		this.periods = periods;
		this.title = title;
		this.viewPer = viewPer;
	}

	public String getTitle() {
		return title;
	}

	public String getViewPer() {
		return viewPer;
	}

	public Periods getPeriods() {
		return periods;
	}
}
