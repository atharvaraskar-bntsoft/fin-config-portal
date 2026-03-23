package com.bnt.ruleengine.sample.adp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bnt.bswitch.transformer.mapper.operation.function.InBuiltValidation;
import com.bnt.bswitch.transformer.mapper.operation.function.ValidationFieldFunction;
import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ValidationFunctionUtility {

	private static List<Object> getValidateFunctionParameters(ValidationFunctionUI validationFunctionUI) {
		List<Object> list = new ArrayList<>();
		if (null != validationFunctionUI.getListValidationFunctionArgs()) {
			for (ValidationFunctionArgs validationFunctionArgs : validationFunctionUI.getListValidationFunctionArgs()) {
				list.add(validationFunctionArgs.getValue());
			}
		}
		return list;
	}

	public static InBuiltValidation getInBuiltValidation(ValidationFunctionUI validationFunctionUI) {
		if (null != validationFunctionUI && StringUtil.isNotNullOrBlank(validationFunctionUI.getName())) {
			List<Object> listObjectParameters = getValidateFunctionParameters(validationFunctionUI);
			return new InBuiltValidation(validationFunctionUI.getName(), listObjectParameters);
		}
		return null;
	}

	public static List<InBuiltValidation> getListInBuiltValidation(
			List<ValidationFunctionUI> listValidationFunctionUI) {
		if (null != listValidationFunctionUI) {
			return listValidationFunctionUI.stream().map(each -> getInBuiltValidation(each))
					.collect(Collectors.toList());
		}
		return null;
	}

	public static List<ValidationFieldFunction<Optional<Object>>> getListInBuiltValidation2(
			List<ValidationFunctionUI> listValidationFunctionUI) {
		if (null != listValidationFunctionUI) {
			return listValidationFunctionUI.stream().map(each -> getInBuiltValidation(each))
					.collect(Collectors.toList());
		}
		return null;
	}
}
