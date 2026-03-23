package com.bnt.dashboard.charts;

import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.DashBoardData;

/**************************
 * @author vaibhav.shejol *
 **************************/

public enum DashBoardCharts {

	TRANSACTION_VELOCITY_LINE(new TransactionVelocityLineChart()),
	TRANSACTION_VELOCITY_DONUT(new TransactionPercentageDonutChart()), TXN_TYPE_DONUT(new TxnTypeDonutChart()),
	TOP_MERCHANT_TOTAL_DONUT(new TopMerchantTotalChart()), TOP_MERCHANT_REJECTED_DONUT(new TopMerchantRejectedCount());

	private Charts<?> chart;

	private DashBoardCharts(Charts<?> chart) {
		this.chart = chart;
	}

	public DashBoardData<?> buildContent(ChartsConfig chartsConfig) {
		return chart.buildContent(chartsConfig);
	}

}
