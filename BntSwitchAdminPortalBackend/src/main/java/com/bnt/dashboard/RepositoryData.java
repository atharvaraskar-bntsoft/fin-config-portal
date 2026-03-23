package com.bnt.dashboard;

import java.util.List;

import org.springframework.stereotype.Component;

import com.bnt.monitoring.charts.Coordinates;
import com.bnt.monitoring.charts.Linear;
import com.bnt.monitoring.charts.LinearDate;
import com.bnt.rest.dto.DashBoardDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public interface RepositoryData {

	public static final Integer MAX_ENTRIES = 1440;

	public Coordinates getLinearRateCoordinates(ChartsConfig chartsConfig);

	public void addLinearCoordinates(String name, List<Linear> coordinates, ChartsConfig chartsConfig);

	public void addLinearDateCoordinates(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig);

	public void addKeyPairCoordinates(String name, List<KeyPair> coordinate, ChartsConfig chartsConfigs);

	public void add(DashBoardDto txnLogEntity);

	public void cleanup();

	public void addLinearDateCoordinates2(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig,
			long currentTime);

}