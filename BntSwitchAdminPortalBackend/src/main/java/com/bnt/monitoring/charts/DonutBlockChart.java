package com.bnt.monitoring.charts;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DonutBlockChart implements MonitoringChart {

	private final String type;
	private final String title;
	private final List<String> columns;
	private final List<? extends DonutBlocCoordinate> coordinates;

	public DonutBlockChart(final String type, final String title, final List<String> columns,
			List<? extends DonutBlocCoordinate> coordinates) {
		this.type = type;
		this.title = title;
		this.columns = columns;
		this.coordinates = coordinates;
	}

	public String getType() {
		return type;
	}

	public String getTitle() {
		return title;
	}

	public List<String> getColumns() {
		return columns;
	}

	public List<? extends DonutBlocCoordinate> getCoordinates() {
		return coordinates;
	}
}
