package com.bnt.dashboard.charts;

import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.DashBoardData;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface Charts<T> {

	public static final String BLOCK_TYPE_FULL = "full";
	public static final String BLOCK_TYPE_HALF = "half";
	public static final String TRANSACTION_VELOCITY_TITLE = "Transactions Velocity - Status";
	public static final String ACTION_LINK = "/";
	public static final String ACTION_TITLE = "";
	public static final String CARDTYPE_TITLE = "Transactions Velocity - Card Type ";
	public static final String CARDTYPE_DONUT_TITLE = "Transactions Percentage - Card Type ";
	public static final String ADAPTER_DONUT_TITLE = "Transactions Percentage - Adapter";
	public static final String PROVIDER_DONUT_TITLE = "Transactions Percentage - Provider";
	public static final String TXNTYPE_DONUT_TITLE = "Transactions Percentage - Transactions Type";
	public static final String TOP_MERCHANT_COUNT_DONUT_TITLE = "Transactions Count - Top 5 Merchant";
	public static final String TOP_MERCHANT_REJECTED_COUNT_DONUT_TITLE = "Rejected Transactions Count - Top 5 Merchant";
	public static final String TRANSACTION_VELOCITY_DONUT_TITLE = "Transactions Percentage - Status";
	public static final String LINE_DATE_X_AXIS_TYPE = "date";

	public DashBoardData<T> buildContent(ChartsConfig chartsConfig);
}
