package com.bnt.rest.wrapper.dto;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class KeyValueGenericWrapper implements Comparable<KeyValueGenericWrapper> {

	String key;
	Object value;

	public KeyValueGenericWrapper(String key, Object value) {
		this.key = key;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public static List<KeyValueGenericWrapper> getKeyValueWrapperList(Map<String, Object> wrapperMap) {

		List<KeyValueGenericWrapper> keyvalueWrapperList = new ArrayList<>();
		KeyValueGenericWrapper keyValuewrapper = null;
		String key;
		Object value;

		for (Map.Entry<String, Object> entry : wrapperMap.entrySet()) {

			key = entry.getKey();
			value = entry.getValue();

			keyValuewrapper = new KeyValueGenericWrapper(key, value);

			keyvalueWrapperList.add(keyValuewrapper);
		}

		Collections.sort(keyvalueWrapperList);
		return keyvalueWrapperList;

	}

	@Override
	public int compareTo(KeyValueGenericWrapper o) {
		return this.getKey().compareTo(o.getKey());
	}
}
