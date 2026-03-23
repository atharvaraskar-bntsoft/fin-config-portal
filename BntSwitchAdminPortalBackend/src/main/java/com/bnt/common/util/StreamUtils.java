package com.bnt.common.util;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.bnt.rest.wrapper.dto.PropertyValueWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class StreamUtils {

	private StreamUtils() {
	}

	public static <T> boolean arrayContains(T[] array, T[] values) {
		boolean flag = false;
		for (T t : values) {
			flag = Arrays.stream(array).anyMatch(t::equals);
			if (flag) {
				return flag;
			}
		}
		return flag;
	}

	public static List<PropertyValueWrapper> converMapToPropertyValueWrapperList(Map<String, String> inputMap) {
		return inputMap.entrySet().stream().map(e -> new PropertyValueWrapper(e.getKey(), e.getValue())).toList();
	}

	public static <T extends Enum<T>> String[] getEnumValues(Class<T> e, Function<? super T, String> mapper) {
		return Arrays.stream(e.getEnumConstants()).map(mapper).toArray(String[]::new);
	}

	public static Set<String> intersectionSet(Set<String> set1, Set<String> set2) {
		return set1.stream().distinct().filter(set2::contains).collect(Collectors.toSet());
	}

	public static Set<Integer> disjointSet(Set<Integer> set1, Set<Integer> set2) {
		return set1.stream().filter(element -> !set2.contains(element)).collect(Collectors.toSet());
	}
}
