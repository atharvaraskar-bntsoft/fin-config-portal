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
import com.bnt.rest.entity.ProcessorAdapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ProviderRepositoryData implements RepositoryData {

	private static final Logger logger = LogManager.getLogger(ProviderRepositoryData.class);

	private final List<Function<DashBoardDto, Boolean>> functions;

	public ProviderRepositoryData(List<Function<DashBoardDto, Boolean>> functions) {
		this.functions = functions;
	}

	private final Map<String, CountRepositoryData> map = new ConcurrentHashMap<>();

	public void add(final DashBoardDto entity) {
		try {
			List<String> routes = entity.getRouteIdList();
			if (routes == null) {
				return;
			}
			for (String provider : routes) {
				if (provider == null) {
					continue;
				}
				ProcessorAdapter adpter = (ProcessorAdapter) RepositoryCache.getCache(RepositoryCache.PROVIDER_CACHE)
						.get(Integer.parseInt(provider));
				if (adpter != null && adpter.getCode() != null) {
					provider = adpter.getName();
				}

				if (!map.containsKey(provider)) {
					synchronized (this) {
						if (!map.containsKey(provider)) {
							map.put(provider, new CountRepositoryData(functions));
						}
					}
				}
				map.get(provider).add(entity);
			}

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
		map.entrySet().parallelStream().forEach(action -> {
			action.getValue().addKeyPairCoordinates(action.getKey(), coordinates, chartsConfig);
		});
	}

	@Override
	public void cleanup() {
		map.values().forEach(action -> action.cleanup());

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