package com.bnt.ruleengine.sample.adp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bnt.bswitch.transformer.mapper.MappingContext;
import com.bnt.bswitch.transformer.mapper.operation.function.FieldFunction;
import com.bnt.bswitch.transformer.mapper.operation.function.SystemDefinedFunctions;
import com.bnt.bswitch.transformer.mapper.operation.function.UserImplementedFunctions;
import com.bnt.bswitch.transformer.mapper.operation.function.ValueMappingFunctions;
import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FunctionUtility {

	public static List<FieldFunction<Optional<MappingContext>, Optional<Object>>> getListFunction(
			List<FunctionUI> listFunctionUI) {
		if (null != listFunctionUI && !listFunctionUI.isEmpty()) {
			return listFunctionUI.stream().map(each -> getFunction(each)).collect(Collectors.toList());
		}
		return null;
	}

	private static FieldFunction<Optional<MappingContext>, Optional<Object>> getFunction(FunctionUI functionUI) {
		if (null != functionUI) {
//			List<Object> listObjectParameters =new ArrayList<>();
//			if(functionUI.){
//				
//			}
//			List<Object> listObjectParameters = getFunctionParameters(functionUI);
			List<Object> listObjectParameters = transformParameters(functionUI);
			Map<String, String> map = new HashMap<String, String>();
			if (functionUI.getType().equals(AdpConstants.VALUE_MAPPER)) {
				List<Object> list = (List<Object>) listObjectParameters.get(0);
				for (Object obj : list) {
					Map<String, String> key = (Map<String, String>) obj;
					for (Map.Entry entry : key.entrySet()) {
						map.put(entry.getKey().toString(), entry.getValue().toString());
					}
				}
				return new ValueMappingFunctions(map, functionUI.getDefaultValue(), functionUI.isUseSameOnMatchFail());
			} else if (functionUI.getType().equals(AdpConstants.EXECUTE_FUNCTION)
					&& StringUtil.isNotNullOrBlank(functionUI.getName())) {
				return new SystemDefinedFunctions(functionUI.getName(), listObjectParameters);
			} else if (functionUI.getType().equals(AdpConstants.USER_DEFINED)
					&& StringUtil.isNotNullOrBlank(functionUI.getName())) {
				return new UserImplementedFunctions(functionUI.getName(), listObjectParameters);
			}
		}
		return null;
	}

	private static List<Object> transformParameters(FunctionUI functionUI) {
		List<Object> list = new ArrayList<>();
		String value;
		for (ParametersUI parametersUI : functionUI.getListParameters()) {
			if (parametersUI.getValueMap() != null) {
				for (ParameterMap parameterMap : parametersUI.getValueMap()) {
					Map<String, String> valueMap = new HashMap<>();
					String key = parameterMap.getKey();
					if (parameterMap.getIsText().equalsIgnoreCase("false")) {
						ImfFieldWrapper imfObj = getImfObjectFromValue(parameterMap);
						value = ImfUtility.getFinalString(imfObj);
					} else {
						value = (String) parameterMap.getValue();
					}
					valueMap.put(key, value);
					list.add(valueMap);
				}
			} else {
				list.add(parametersUI.getValue());
			}
		}
		return list;

	}

	private static ImfFieldWrapper getImfObjectFromValue(ParameterMap parameterMap) {
		Map map = (Map) parameterMap.getValue();
		ImfFieldWrapper imfObj = new ImfFieldWrapper();
		imfObj.setService(map.get("service").toString());
		imfObj.setText(map.get("text").toString());
		if (map.get("type") != null) {
			imfObj.setType(map.get("type").toString());
		} else {
			imfObj.setType(null);
		}
		if (map.get("useCase") != null) {
			imfObj.setUseCase(map.get("useCase").toString());
		} else {
			imfObj.setUseCase(null);
		}
		return imfObj;
	}

	public static List<Object> getFunctionParameters(FunctionUI functionUI) {
		List<Object> list = new ArrayList<>();
		if (null != functionUI.getListParameters()) {
			for (ParametersUI parametersUI : functionUI.getListParameters()) {
				list.add(parametersUI.getValue());
			}
		}
		return list;
	}
}
