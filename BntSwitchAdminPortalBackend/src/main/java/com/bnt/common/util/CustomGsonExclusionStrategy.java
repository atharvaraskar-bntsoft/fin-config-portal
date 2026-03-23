package com.bnt.common.util;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CustomGsonExclusionStrategy implements ExclusionStrategy {

	private Class<?> c;
	private String fieldName;

	public CustomGsonExclusionStrategy(String fullQualifiedFieldName) throws SecurityException, ClassNotFoundException {
		this.c = Class.forName(fullQualifiedFieldName.substring(0, fullQualifiedFieldName.lastIndexOf(".")));
		this.fieldName = fullQualifiedFieldName.substring(fullQualifiedFieldName.lastIndexOf(".") + 1);
	}

	public static CustomGsonExclusionStrategy[] getFactoryArray(List<String> fullQualifiedFieldNameList)
			throws SecurityException, NoSuchFieldException, ClassNotFoundException {

		List<CustomGsonExclusionStrategy> objectList = new ArrayList<>();
		for (String each : fullQualifiedFieldNameList) {
			CustomGsonExclusionStrategy eachObject = new CustomGsonExclusionStrategy(each);
			objectList.add(eachObject);
		}
		return objectList.toArray(new CustomGsonExclusionStrategy[objectList.size()]);
	}

	public boolean shouldSkipClass(Class<?> arg0) {
		return false;
	}

	@Override
	public boolean shouldSkipField(FieldAttributes f) {
		return (f.getDeclaringClass() == c && f.getName().equals(fieldName));
	}
}
