package com.bnt.common.util;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.metamodel.EntityType;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BaseEntityPredicatesBuilder {

	private List<SearchCriteria> params;

	public BaseEntityPredicatesBuilder() {
		params = new ArrayList<>();
	}

	private BaseEntityPredicatesBuilder with(String key, String operation, Object value) {
		params.add(new SearchCriteria(key, operation, value));
		return this;
	}

	@SuppressWarnings("rawtypes")
	private BooleanExpression build(EntityType entityType) {
		if (params.isEmpty()) {
			return null;
		}
		List<BooleanExpression> predicates = new ArrayList<>();
		BaseEntityPredicate predicate;
		for (SearchCriteria param : params) {
			predicate = new BaseEntityPredicate(param);
			BooleanExpression exp = predicate.getPredicate(entityType);
			if (exp != null) {
				predicates.add(exp);
			}
		}
		BooleanExpression result = predicates.get(0);
		for (int i = 1; i < predicates.size(); i++) {
			result = result.and(predicates.get(i));
		}
		return result;
	}

	private static BaseEntityPredicatesBuilder getBaseEntityPredicateBuilder(String[] filters) {

		BaseEntityPredicatesBuilder builder = new BaseEntityPredicatesBuilder();

		if (filters != null) {
			for (String filter : filters) {

				if (filter.contains(BaseEntityPredicate.COLON_OPERATION)) {
					String[] filterValue = filter.split(BaseEntityPredicate.COLON_OPERATION);

					builder = builder.with(filterValue[0], BaseEntityPredicate.COLON_OPERATION, filterValue[1]);
				}
			}
		}
		return builder;
	}

	static Predicate getPredicate(@SuppressWarnings("rawtypes") EntityType entityType, String[] filters) {

		BaseEntityPredicatesBuilder builder = getBaseEntityPredicateBuilder(filters);

		return builder.build(entityType);
	}
}
