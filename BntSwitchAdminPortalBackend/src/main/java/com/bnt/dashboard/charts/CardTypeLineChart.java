package com.bnt.dashboard.charts;

import com.google.common.collect.Lists;
import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.Content;
import com.bnt.dashboard.DashBoardData;
import com.bnt.dashboard.DashboardStats;
import com.bnt.monitoring.charts.Linear;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CardTypeLineChart implements Charts<Linear> {

	public DashBoardData<Linear> buildContent(ChartsConfig chartsConfig) {

		Content<Linear> content = DashboardStats.getLinearContent(Lists.newArrayList(DashboardStats.Trnsactions.MASTER,
				DashboardStats.Trnsactions.VACP, DashboardStats.Trnsactions.BASEI, DashboardStats.Trnsactions.ORACLE,
				DashboardStats.Trnsactions.EURONET), new ChartsConfig(chartsConfig.getNumberofEntries(), true));
		return new DashBoardData<>(BLOCK_TYPE_FULL, CARDTYPE_TITLE, ACTION_LINK, ACTION_TITLE, content);
	}
}
