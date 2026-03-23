
package com.bnt.enums;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**************************
 * @author vaibhav.shejol *
 **************************/

public enum EntityGroupEnum {

	MERCHANT_GROUP("Institution", "MerchantInstitution", "Merchant", "Location", "Device", "DeviceType"),
	// RULE("WorkflowGroup","WorkflowService" ,"Multihop", "Routing", "Rule"),
	RULE("Routing", "Rule"), SETTINGS("Country", "CountryState", "Currency"),

	ALL;

	public String[] getValueArray() {
		return valueArray;
	}

	public void setValueArray(String[] valueArray) {
		this.valueArray = valueArray;
	}

	private String[] valueArray;

	private EntityGroupEnum(String... valueArray) {

		this.valueArray = valueArray;
	}

	public static List<String> getValueList(String groupType) {
		return Arrays.asList(EntityGroupEnum.valueOf(groupType).getValueArray());
	}

	public static boolean isEntityExistsInGroup(String groupType, String entityName) {
		List<String> list = Arrays.asList(EntityGroupEnum.valueOf(groupType).getValueArray());

		return list.contains(entityName);
		/**
		 * if(list.contains(entityName)) { return true; } else { return false; }
		 */
	}

	public static List<String> getAllValues() {

		List<EntityGroupEnum> enumList = Stream.of(EntityGroupEnum.values()).map(value -> value).toList();

		List<String> allValueList = new ArrayList<>();

		enumList.forEach(eachEnum -> {

			allValueList.addAll(Arrays.asList(eachEnum.getValueArray()));
		});

		return allValueList;
	}

	public static String findByValue(String value) {
		for (EntityGroupEnum e : values()) {
			if (Arrays.asList(e.getValueArray()).contains((value))) {
				return e.toString();
			}
		}
		return null;
	}

	public static Map<String, List<String>> getAllEntityGroupMap() {

		Map<String, List<String>> resultMap = Stream.of(EntityGroupEnum.values())
				.collect(Collectors.toMap(EntityGroupEnum::name, value -> Arrays.asList(value.getValueArray())));

		resultMap.put(EntityGroupEnum.ALL.name(), EntityGroupEnum.getAllValues());

		return resultMap;

	}
}
