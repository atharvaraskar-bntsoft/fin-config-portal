package com.bnt.monitoring.charts;

import java.util.List;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TableChart implements MonitoringChart {

	private final String type = "table";
	private final String title;
	private final List<String> columns;
	private final List<Map<String, Object>> data;

	public TableChart(final String title, final List<String> columns, List<Map<String, Object>> data) {
		this.title = title;
		this.columns = columns;
		this.data = data;
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

	public List<Map<String, Object>> getData() {
		return data;
	}
}
