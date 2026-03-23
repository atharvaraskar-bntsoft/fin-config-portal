package com.bnt.ruleengine.sample.adp;

import java.util.HashMap;
import java.util.Map;

import com.bnt.rest.dto.ComponentDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ComponentHelper {

	public static Map<String, Object> createCommonMap(ComponentDto componentDto) {
		Map<String, Object> mapObject = new HashMap<>();
		mapObject.put(AdpConstants.ADAPTER_TYPE, componentDto.getAdpType());
		mapObject.put(AdpConstants.NETWORK_SERVICE, componentDto.getNetworkService());
		mapObject.put(AdpConstants.TEMPLATE_TYPE, componentDto.getTemplate());
		mapObject.put(AdpConstants.SCHEME_TYPE, componentDto.getTab());
		return mapObject;
	}

	public static Object process(ComponentDto componentDto) {
		Map<String, Object> mapObject = createCommonMap(componentDto);
		if (componentDto.getFeature().equalsIgnoreCase(AdpConstants.COPY_AS_IS)) {
			return MappingUtiltiy.fetchCopyAsIsFieldList(componentDto.getListMappingCopyAsIs(), mapObject);
		} else if (componentDto.getFeature().equalsIgnoreCase(AdpConstants.EXTRACT)) {
			return MappingUtiltiy.fetchExtractFieldList(componentDto.getListExtract(), mapObject);
		} else if (componentDto.getFeature().equalsIgnoreCase(AdpConstants.SCRIPT)) {
			return MappingUtiltiy.fetchScriptFieldList(componentDto.getListScript());
		} else if (componentDto.getFeature().equalsIgnoreCase(AdpConstants.JOIN)) {
			return MappingUtiltiy.fetchJoinFieldList(componentDto.getListJoin(), mapObject);
		} else if (componentDto.getFeature().equalsIgnoreCase(AdpConstants.MAPPER)) {
			return MappingUtiltiy.fetchMapperFieldList(componentDto.getListMapperMapping(), mapObject);
		} else {
			return null;
		}
	}
}
