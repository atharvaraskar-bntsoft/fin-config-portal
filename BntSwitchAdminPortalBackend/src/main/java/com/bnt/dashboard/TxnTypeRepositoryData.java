package com.bnt.dashboard;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

import com.google.common.collect.Maps;
import com.bnt.common.util.StringUtil;
import com.bnt.monitoring.charts.Coordinates;
import com.bnt.monitoring.charts.Linear;
import com.bnt.monitoring.charts.LinearDate;
import com.bnt.rest.dto.DashBoardDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnTypeRepositoryData implements RepositoryData {

	private final List<Function<DashBoardDto, Boolean>> functions;

	public TxnTypeRepositoryData(List<Function<DashBoardDto, Boolean>> functions) {
		this.functions = functions;
	}

	private final Map<String, CountRepositoryData> map = new ConcurrentHashMap<>();

	public void add(final DashBoardDto entity) {
		if (!(StringUtil.isEmptyOrNull(entity.getPosTxnType()))) {
			String name = replace(entity.getPosTxnType());

			if (!map.containsKey(name)) {
				synchronized (this) {
					if (!map.containsKey(name)) {
						map.put(name, new CountRepositoryData(functions));
					}
				}
			}
			map.get(name).add(entity);
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

	private static Map<String, String> replacemap = Maps.newHashMap();

	static {
		/** replacemap.put("CREDIT", "CR"); */
		replacemap.put("AUTHORIZATION", "AUTH");
		/**
		 * replacemap.put("REVERSAL", "REV"); replacemap.put("REFUND", "REF");
		 * replacemap.put("CAPTURE", "CAP"); replacemap.put("DEBIT", "DR");
		 * replacemap.put("VERIFICATION", "VER"); replacemap.put("ACCOUNT", "ACC");
		 * replacemap.put("ACTIVATION", "ACT"); replacemap.put("PREPAID", "PRE");
		 * replacemap.put("BALANCE", "BAL"); replacemap.put("INQUIRY", "INQ");
		 * replacemap.put("REDEMPTION", "RED"); replacemap.put("RELOAD", "REL");
		 * replacemap.put("RECONCILE", "REC"); replacemap.put("REQUEST", "REQ");
		 * replacemap.put("REDEMPTION", "RED");
		 */

	}

	private String replace(String name) {
		for (Map.Entry<String, String> entry : replacemap.entrySet()) {
			name = name.replaceAll(entry.getKey(), entry.getValue());
		}
		return name;
	}

	@Override
	public void addLinearDateCoordinates2(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig,
			long currentTime) {
		// TODO Auto-generated method stub

	}
}