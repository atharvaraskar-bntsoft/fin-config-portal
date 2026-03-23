package com.bnt.dashboard.charts;

import com.google.common.collect.Lists;
import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.Content;
import com.bnt.dashboard.DashBoardData;
import com.bnt.dashboard.DashboardStats;
import com.bnt.monitoring.charts.LinearDate;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransactionVelocityLineChart implements Charts<LinearDate> {

	public DashBoardData<LinearDate> buildContent(ChartsConfig chartsConfig) {

		Content<LinearDate> content = DashboardStats
				.getLinearDateContent(
						Lists.newArrayList(DashboardStats.Trnsactions.TOTAL, DashboardStats.Trnsactions.APPROVED,
								DashboardStats.Trnsactions.FAILED),
						new ChartsConfig(chartsConfig.getNumberofEntries(), true));

		content.xCoordinateType = LINE_DATE_X_AXIS_TYPE;
		return new DashBoardData<>(BLOCK_TYPE_FULL, TRANSACTION_VELOCITY_TITLE, ACTION_LINK, ACTION_TITLE, content);
	}
}
