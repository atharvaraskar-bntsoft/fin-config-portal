package com.bnt.dashboard;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.monitoring.charts.Coordinates;
import com.bnt.monitoring.charts.Linear;
import com.bnt.monitoring.charts.LinearDate;
import com.bnt.rest.dto.DashBoardDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterRepositoryData implements RepositoryData {

	private static final Logger logger = LogManager.getLogger(AdapterRepositoryData.class);

	private final List<Function<DashBoardDto, Boolean>> functions;

	public AdapterRepositoryData(List<Function<DashBoardDto, Boolean>> functions) {
		this.functions = functions;
	}

	private final Map<String, CountRepositoryData> map = new ConcurrentHashMap<>();

	public void add(final DashBoardDto entity) {
		try {
			String acquirerId = entity.getAdapterId();
			if (acquirerId == null) {
				return;
			}
			if (!map.containsKey(acquirerId)) {
				synchronized (this) {
					if (!map.containsKey(acquirerId)) {
						map.put(acquirerId, new CountRepositoryData(functions));
					}
				}
			}
			map.get(acquirerId).add(entity);
		} catch (Exception e) {
			logger.error(e);
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
		map.values().forEach(CountRepositoryData::cleanup);

	}

	@Override
	public Coordinates getLinearRateCoordinates(ChartsConfig chartsConfig) {
		return null;
	}

	@Override
	public void addLinearDateCoordinates2(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig,
			long currentTime) {
		// TODO Auto-generated method stub

	}

}