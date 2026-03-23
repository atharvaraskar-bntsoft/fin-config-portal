package com.bnt.dashboard;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.bnt.monitoring.charts.Coordinates;
import com.bnt.monitoring.charts.Linear;
import com.bnt.monitoring.charts.LinearDate;
import com.bnt.rest.dto.DashBoardDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CountRepositoryData implements RepositoryData {

	private static final Logger logger = LogManager.getLogger(CountRepositoryData.class);
	private final List<Function<DashBoardDto, Boolean>> functions;

	private final Map<Long, AtomicInteger> map = new ConcurrentHashMap<>();

	public CountRepositoryData(List<Function<DashBoardDto, Boolean>> functions) {
		this.functions = functions;
	}

	public void addKeyPairCoordinates(String name, List<KeyPair> coordinates, ChartsConfig chartsConfig) {
		coordinates.add(new KeyPair(name, getCount(chartsConfig)));
	}

	public void addLinearCoordinates(String name, List<Linear> coordinates, ChartsConfig chartsConfig) {
		Map<Integer, Integer> internalMap = getData(chartsConfig);
		coordinates.add(
				new Linear(name, Lists.newArrayList(internalMap.keySet()), Lists.newArrayList(internalMap.values())));
	}

	public void addLinearDateCoordinates(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig) {
		Map<Integer, Integer> internalMap = getData(chartsConfig);
		// Convert minutes key map to Date Time key Map
		Map<Date, Integer> dateMap = convertMinutesKeyToTimeKeys(internalMap);
		coordinates
				.add(new LinearDate(name, Lists.newArrayList(dateMap.keySet()), Lists.newArrayList(dateMap.values())));
	}

	public void addLinearDateCoordinates2(String name, List<LinearDate> coordinates, ChartsConfig chartsConfig,
			long currentTime) {
		long timeInMiuteMillisecond = convertMilliSecondToMinute(currentTime);
		Map<Integer, Integer> internalMap = getData2(chartsConfig, timeInMiuteMillisecond);
		// Convert minutes key map to Date Time key Map
		Map<Date, Integer> dateMap = convertMinutesKeyToTimeKeys2(internalMap, timeInMiuteMillisecond);
		coordinates
				.add(new LinearDate(name, Lists.newArrayList(dateMap.keySet()), Lists.newArrayList(dateMap.values())));
	}

	private Map<Date, Integer> convertMinutesKeyToTimeKeys(Map<Integer, Integer> sourceMap) {

		Map<Date, Integer> resultMap = new TreeMap<>();

		for (Map.Entry<Integer, Integer> entry : sourceMap.entrySet()) {

			if (entry.getValue() != null && entry.getValue().longValue() != 0) {
				resultMap.put(new Date(System.currentTimeMillis() - entry.getKey() * 60000), entry.getValue());
			}
		}
		return resultMap;
	}

	private Map<Date, Integer> convertMinutesKeyToTimeKeys2(Map<Integer, Integer> sourceMap, long currentTime) {

		Map<Date, Integer> resultMap = new TreeMap<>();

		for (Map.Entry<Integer, Integer> entry : sourceMap.entrySet()) {

			if (entry.getValue() != null && entry.getValue().longValue() != 0) {
				resultMap.put(new Date(currentTime - entry.getKey() * 60000), entry.getValue());
			}
		}
		return resultMap;
	}

	private Map<Date, Integer> convertTimeStampToDate(Map<Long, AtomicInteger> sourceMap) {
		Map<Date, Integer> resultMap = new TreeMap<>();
		for (Map.Entry<Long, AtomicInteger> entry : sourceMap.entrySet()) {
			if (entry.getValue() != null && entry.getValue().longValue() != 0) {
				resultMap.put(new Date(entry.getKey()), entry.getValue().intValue());
			}
		}
		return resultMap;
	}

	public Coordinates getLinearRateCoordinates(ChartsConfig chartsConfig) {
		Map<Integer, Integer> internalMap = getData(chartsConfig);
		return new Coordinates(Lists.newArrayList(internalMap.keySet()), Lists.newArrayList(internalMap.values()));
	}

	public void add(final DashBoardDto entity) {

		try {
			for (Function<DashBoardDto, Boolean> function : functions) {

				if (function == null) {
					return;
				}
				if (entity == null || !function.apply(entity)) {
					return;
				}
			}
//			long key = findKey(entity.getRespTxnDateTime().getTime());
			// long key = entity.getRespTxnDateTime().getTime();
			long key = convertMilliSecondToMinute(entity.getRespTxnDateTime().getTime());
			// ("long : "+key);
			if (map.containsKey(key)) {
				map.get(key).incrementAndGet();
			} else {
				map.put(key, new AtomicInteger(1));
			}
		} catch (Exception e) {
			logger.error(e);
		}
	}

//	public static void main(String args[]) {
//		long time = 1699450322000L;
//		convertMilliSecondToMinute(time);
//		(time);
//	}

	private static long convertMilliSecondToMinute(long time) {
		int timeCofInMinute = (int) (time / 60000);
		BigDecimal newTime = new BigDecimal(timeCofInMinute);
		BigDecimal timeInMinute = newTime.multiply(new BigDecimal(60000));
		return timeInMinute.longValue();
	}

	private long findKey(long time) {
		// ("before : "+time);
		Calendar cal = Calendar.getInstance();
		cal.setTimeZone(TimeZone.getTimeZone("GMT"));
		cal.setTimeInMillis(time);
		cal.set(Calendar.MILLISECOND, 0);
		cal.set(Calendar.SECOND, 0);
		// (cal.getTime());
		return cal.getTimeInMillis();
	}

	private long findKey1(Integer time) {

		java.util.Date date = new java.util.Date();
		// Choose time zone in which you want to interpret your Date
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(date);
		int year = cal1.get(Calendar.YEAR);
		int month = cal1.get(Calendar.MONTH);
		int day = cal1.get(Calendar.DAY_OF_MONTH);

		// ("before : "+time);
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.DAY_OF_MONTH, day);
		cal.set(Calendar.MINUTE, time);
		cal.set(Calendar.MILLISECOND, 0);
		cal.set(Calendar.SECOND, 0);
		// ("find1 "+ cal.getTime());
		return cal.getTimeInMillis();
	}

	private int getTime(long time) {
		return (int) Math.ceil(((float) (System.currentTimeMillis() - time) / 60000));
	}

	private int getTime2(long time, long currentTime) {
		return (int) Math.ceil(((float) (currentTime - time) / 60000));
	}

	private Map<Long, Integer> getCopy() {
		Map<Long, Integer> copy = Maps.newTreeMap();
		map.entrySet().stream().forEach(x -> copy.put(x.getKey(), x.getValue().get()));
		return copy;
	}

	private int getCount(ChartsConfig chartsConfig) {
		int count = 0;

		for (Integer value : getData(chartsConfig).values()) {
			count += value;
		}
		return count;
	}

	public Map<Integer, Integer> getData2(ChartsConfig chartsConfig, long currentTime) {
		Map<Integer, Integer> data = Maps.newTreeMap();
		int entriesCount = chartsConfig != null ? chartsConfig.getNumberofEntries() : MAX_ENTRIES;
		getCopy().forEach((k, v) -> {
			int timeCount = getTime2(k, currentTime);
			if (timeCount <= entriesCount) {
				data.put(timeCount, v);
			}
		});

		int max = 0;
		int min = data.size() == 0 ? 1 : MAX_ENTRIES;
		for (int i : data.keySet()) {
			if (min > i) {
				min = i;
			}
			if (max < i) {
				max = i;
			}
		}
		getData1(data, max, min);

		if (chartsConfig.isZeroFill()) {
			for (Integer index = 1; index <= entriesCount; index++) {
				if (!data.containsKey(index)) {
					data.put(index, 0);
				}
			}
		}
		return data;
	}

	public Map<Integer, Integer> getData(ChartsConfig chartsConfig) {
		Map<Integer, Integer> data = Maps.newTreeMap();
		int entriesCount = chartsConfig != null ? chartsConfig.getNumberofEntries() : MAX_ENTRIES;
		getCopy().forEach((k, v) -> {
			int timeCount = getTime(k);
			if (timeCount <= entriesCount) {
				data.put(timeCount, v);
			}
		});

		int max = 0;
		int min = data.size() == 0 ? 1 : MAX_ENTRIES;
		for (int i : data.keySet()) {
			if (min > i) {
				min = i;
			}
			if (max < i) {
				max = i;
			}
		}
		getData1(data, max, min);

		if (chartsConfig.isZeroFill()) {
			for (Integer index = 1; index <= entriesCount; index++) {
				if (!data.containsKey(index)) {
					data.put(index, 0);
				}
			}
		}
		return data;
	}

	private void getData1(Map<Integer, Integer> data, int max, int min) {
		for (int index = 0; index < min; index++) {
			data.putIfAbsent(index, 0);
		}
		for (int index = 0; index < max; index++) {
			data.putIfAbsent(index, 0);
		}
	}

	@Override
	public void cleanup() {
		Map<Integer, Long> temp = Maps.newHashMap();
		map.entrySet().stream().forEach(x -> temp.put(getTime(x.getKey()), x.getKey()));
		for (Map.Entry<Integer, Long> entry : temp.entrySet()) {
			if (entry.getKey() > MAX_ENTRIES) {
				map.remove(entry.getValue());
			}
		}
	}
}