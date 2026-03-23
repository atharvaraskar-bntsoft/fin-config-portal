package com.bnt.rest.service;

import java.util.List;

import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.DashBoardData;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DashboardService {

	public List<DashBoardData<?>> buildDashboard(ChartsConfig chartsConfig) throws RippsAdminRestException;

}
