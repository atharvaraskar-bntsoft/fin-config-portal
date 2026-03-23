package com.bnt.common.util.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Payload;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Documented
//@Constraint(validatedBy = PhoneValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface PhoneFormat {
	String message() default "Please add valid 10 digit valid phone number";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
