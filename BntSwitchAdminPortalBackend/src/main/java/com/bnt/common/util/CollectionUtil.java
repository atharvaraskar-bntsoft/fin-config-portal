package com.bnt.common.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import com.bnt.rest.wrapper.dto.KeyValueWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CollectionUtil {

	private CollectionUtil() {
	}

	@SuppressWarnings("unchecked")
	public static void processMapForNotNull(Map<String, Object> map) {
		map.values().removeIf(Objects::isNull);
		Iterator<Map.Entry<String, Object>> iter = map.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry<String, Object> entry = iter.next();
			if (entry.getValue() instanceof Map) {
				Map<String, Object> valueMap = (Map<String, Object>) entry.getValue();
				if (valueMap.isEmpty()) {
					iter.remove();
				}
				processMapForNotNull(valueMap);

			} else if (entry.getValue() instanceof String && StringUtil.isEmptyOrNull(entry.getValue().toString())) {

				iter.remove();
			} else if (entry.getValue() instanceof List) {
				iter.remove();
			}
		}
	}

	@SuppressWarnings("rawtypes")
	public static boolean isCollectionEmptyOrNull(Collection collection) {
		return (collection == null || collection.isEmpty());
	}

	public static boolean isArrayEmptyOrNull(Object[] array) {
		return (array == null || array.length == 0);
	}

	public static boolean isMapEmptyOrNull(Map<?, ?> map) {
		return (map == null || map.size() == 0);
	}

	@SuppressWarnings("unlikely-arg-type")
	public static Set<String> getValueSetForGivenKeys(Map<Integer, String> map, List<String> keyList) {
		List<Integer> numKeyList = keyList.stream().map(Integer::parseInt).toList();
		Set<String> valueSet = new HashSet<>();
		for (Integer eachKey : numKeyList) {
			if (map.containsKey((eachKey))) {
				valueSet.add(map.get(eachKey));
			}
		}
		return valueSet;
	}

	public static <T> List<T> getTopValuesOnlyInList(List<T> sortedList, Integer numOfResults) {
		List<T> resultList = new LinkedList<>();
		if (!CollectionUtil.isCollectionEmptyOrNull(sortedList)) {
			int i = 0;
			while (i < numOfResults && i < sortedList.size()) {
				resultList.add(sortedList.get(i));
				i++;
			}
		}
		return resultList;
	}

	@SuppressWarnings("unchecked")
	public static List<? extends Object>[] splitList(List<? extends Object> originalList) {
		List<Object> third = new ArrayList<Object>();
		List<Object> duplicate = new ArrayList<Object>();
		for (int i = 0; i < originalList.size(); i++) {
			KeyValueWrapper kvw = (KeyValueWrapper) originalList.get(i);
			if (kvw.getType() != null) {
				if (kvw.getType().equalsIgnoreCase("group")) {
					third.add(originalList.get(i));
				} else {
					duplicate.add(originalList.get(i));
				}
			} else {
				duplicate.add(originalList.get(i));
			}
		}
		if (!(CollectionUtil.isCollectionEmptyOrNull(duplicate))) {
			int size = duplicate.size();
			List<Object> first = null;
			List<Object> second = null;
			if (size == 1) {
				first = new ArrayList<>(duplicate.subList(0, 1));

			} else {
				first = new ArrayList<>(duplicate.subList(0, (size) / 2));
				second = new ArrayList<>(duplicate.subList((size) / 2, size));

			}
			if (third.isEmpty()) {
				return new List[] { first, second, null };
			} else {
				return new List[] { first, second, third };
			}
		}
		return new List[] {};
	}

	public static Set<Integer> sort(Set<Integer> numbersSet) {
		List<Integer> numbersList = new ArrayList<>(numbersSet);
		Collections.sort(numbersList, Collections.reverseOrder());
		return new LinkedHashSet<>(numbersList);
	}
}
