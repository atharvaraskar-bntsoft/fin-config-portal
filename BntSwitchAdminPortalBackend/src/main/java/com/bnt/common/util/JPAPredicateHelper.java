package com.bnt.common.util;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.ComparablePath;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.SimpleExpression;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JPAPredicateHelper {

	private JPAPredicateHelper() {
	}

	public static Predicate getTimestampPredicate(DateTimePath<Timestamp> dateTimePath, String value) {
		String[] periods = value.split("-");
		long fromMilliseconds = Long.parseLong(periods[0]) * 1000;
		long toMilliseconds = Long.parseLong(periods[1]) * 1000;
		Timestamp fromDate = new Timestamp(fromMilliseconds);
		Timestamp toDate = new Timestamp(toMilliseconds);
		return dateTimePath.between(fromDate, toDate);
	}

	public static Predicate getTimestampPredicateForDate(DateTimePath<Timestamp> dateTimePath, String value) {

		String[] periods = value.split("-");
		long fromMilliseconds = Long.parseLong(periods[0]);
		long toMilliseconds = Long.parseLong(periods[1]);
		Timestamp fromDate = new Timestamp(fromMilliseconds);
		Timestamp toDate = new Timestamp(toMilliseconds);
		return dateTimePath.between(fromDate, toDate);
	}

	public static Predicate getStringPredicate(StringPath stringPath, String value) {
		return stringPath.eq(value);
	}

	public static Predicate getCharacterPredicate(ComparablePath<Character> characterPath, Character value) {
		return characterPath.eq(value);
	}

	public static Predicate getStatusPredicate(ComparablePath<Character> locked, String value) {
		Predicate lockedPredicate;
		if (value.equals("1")) {
			lockedPredicate = getCharacterPredicate(locked, '0');
		} else {
			lockedPredicate = getCharacterPredicate(locked, '1');
		}
		return lockedPredicate;
	}

	public static Predicate getExpiryPredicate(String value, DateTimePath<Timestamp> expiryOn, Timestamp expiry) {
		Predicate expiryOnPredicate = null;
		if (value.equals("1")) {
			expiryOnPredicate = getExpiryOnPredicate(expiryOn, expiry);
		}
		return expiryOnPredicate;
	}

	private static Predicate getExpiryOnPredicate(DateTimePath<Timestamp> expiryOn, Timestamp expiry) {
		return expiryOn.after(expiry);
	}

	public static Predicate getArrayPredicate(StringPath stringPath, List<String> value) {
		return stringPath.in(value);
	}

	public static Predicate getPredicateFromFunction(String functionExp, StringPath stringPath, String jsonPath,
			String value) {
		SimpleExpression<String> exp = Expressions.simpleTemplate(String.class, functionExp, stringPath, jsonPath);
		return exp.eq(value);
	}

	public static Predicate getPredicateFromFunctionBigDecimal(String functionExp, StringPath stringPath,
			String jsonPath, String value) {
		BigDecimal value1 = new BigDecimal(value);
		SimpleExpression<BigDecimal> exp = Expressions.simpleTemplate(BigDecimal.class, functionExp, stringPath,
				jsonPath);
		return exp.eq(value1);
	}

	public static Predicate getPredicateFromFunctionContains(String functionExp, StringPath stringPath, String jsonPath,
			String value) {
		StringExpression exp1 = Expressions.stringTemplate(functionExp, stringPath, jsonPath);
		return exp1.contains(value);
	}

	public static Predicate getCustomStartsWithPredicateFromFunction(String functionExp, StringPath stringPath,
			String jsonPath, String value) {
		StringExpression exp1 = Expressions.stringTemplate(functionExp, stringPath, jsonPath);
		return exp1.startsWith(value);
	}

	public static Predicate getCustomEndsWithPredicateFromFunction(String functionExp, StringPath stringPath,
			String jsonPath, String value) {
		StringExpression exp1 = Expressions.stringTemplate(functionExp, stringPath, jsonPath);
		return exp1.endsWith(value);
	}
}
