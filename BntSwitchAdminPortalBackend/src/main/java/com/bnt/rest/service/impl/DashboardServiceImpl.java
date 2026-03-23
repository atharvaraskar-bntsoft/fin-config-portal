package com.bnt.rest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.DashBoardData;
import com.bnt.dashboard.charts.DashBoardCharts;
import com.bnt.rest.service.DashboardService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service("dashboardService")
@Transactional
public class DashboardServiceImpl implements DashboardService {

	@Override
	public List<DashBoardData<?>> buildDashboard(ChartsConfig chartsConfig) throws RippsAdminRestException {
		return Lists.newArrayList(DashBoardCharts.TRANSACTION_VELOCITY_LINE.buildContent(chartsConfig),
				DashBoardCharts.TRANSACTION_VELOCITY_DONUT
						.buildContent(new ChartsConfig(chartsConfig.getNumberofEntries())),
				DashBoardCharts.TXN_TYPE_DONUT.buildContent(chartsConfig),
				DashBoardCharts.TOP_MERCHANT_TOTAL_DONUT.buildContent(chartsConfig),
				DashBoardCharts.TOP_MERCHANT_REJECTED_DONUT.buildContent(chartsConfig));
	}
}
