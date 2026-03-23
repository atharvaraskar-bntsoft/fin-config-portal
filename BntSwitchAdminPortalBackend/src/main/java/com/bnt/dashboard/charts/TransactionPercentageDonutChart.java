package com.bnt.dashboard.charts;

import com.google.common.collect.Lists;
import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.Content;
import com.bnt.dashboard.DashBoardData;
import com.bnt.dashboard.DashboardStats;
import com.bnt.dashboard.KeyPair;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransactionPercentageDonutChart implements Charts<KeyPair> {

	public DashBoardData<KeyPair> buildContent(ChartsConfig chartsConfig) {

		Content<KeyPair> content = DashboardStats.buildContent(
				Lists.newArrayList(DashboardStats.Trnsactions.APPROVED, DashboardStats.Trnsactions.FAILED),
				chartsConfig);

		return new DashBoardData<>(BLOCK_TYPE_HALF, TRANSACTION_VELOCITY_DONUT_TITLE, ACTION_LINK, ACTION_TITLE,
				content);
	}
}
