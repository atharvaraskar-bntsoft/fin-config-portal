package com.bnt.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class InputValidator implements ConstraintValidator<InputValidation, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		String regex = "(^[A-Za-z0-9-_\\.]*$)";
		Pattern p = Pattern.compile(regex);
		if (value == null) {
			return true;
		}
		Matcher m = p.matcher(value);
		return m.matches();
	}
}
