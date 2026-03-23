package com.bnt.dashboard;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

import com.bnt.monitoring.charts.Coordinates;
import com.bnt.monitoring.charts.Linear;
import com.bnt.monitoring.charts.LinearDate;
import com.bnt.rest.dto.DashBoardDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CardTypeStatusRepositoryData implements RepositoryData {

	private final List<Function<DashBoardDto, Boolean>> functions;

	private final Map<String, CountRepositoryData> map = new ConcurrentHashMap<>();

	public CardTypeStatusRepositoryData(List<Function<DashBoardDto, Boolean>> functions) {
		this.functions = functions;
	}

	public void add(final DashBoardDto entity) {
		for (Function<DashBoardDto, Boolean> function : functions) {
			if (function.apply(entity).booleanValue()) {
				return;
			}
		}
	}

	@Override
	public void addLinearCoordinates(String name, List<Linear> coordinates, ChartsConfig chartsConfig) {
		map.entrySet().parallelStream()
				.forEach(action -> action.getValue().addLinearCoordinates(action.getKey(), coordinates, chartsConfig));
	}

	@Override
	public void addLinearDateCoordinates(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig) {
		map.entrySet().parallelStream().forEach(
				action -> action.getValue().addLinearDateCoordinates(action.getKey(), coordinates, chartsConfig));
	}

	@Override
	public void addKeyPairCoordinates(String name, List<KeyPair> coordinates, ChartsConfig chartsConfig) {
		map.entrySet().parallelStream()
				.forEach(action -> action.getValue().addKeyPairCoordinates(action.getKey(), coordinates, chartsConfig));
	}

	@Override
	public void cleanup() {
		map.values().forEach(action -> action.cleanup());

	}

	@Override
	public Coordinates getLinearRateCoordinates(ChartsConfig chartsConfig) {
		// Auto-generated method stub
		return null;
	}

	@Override
	public void addLinearDateCoordinates2(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig,
			long currentTime) {
		// TODO Auto-generated method stub

	}
}