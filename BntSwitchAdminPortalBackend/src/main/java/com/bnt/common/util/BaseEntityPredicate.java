package com.bnt.common.util;

import jakarta.persistence.metamodel.EntityType;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.BooleanPath;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.core.types.dsl.StringPath;
import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BaseEntityPredicate {

	private SearchCriteria criteria;
	static final String COLON_OPERATION = ":";

	BaseEntityPredicate(SearchCriteria param) {
		this.criteria = param;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public BooleanExpression getPredicate(EntityType entityType) {
		String entityName = JPAUtils.getEntityName(entityType.getBindableJavaType());
		PathBuilder<BaseEntity> entityPath = new PathBuilder<>(BaseEntity.class, entityName);
		String key = criteria.getKey();
		String retval = criteria.getValue().toString();
		Class<?> fieldType = JPAUtils.getFieldType(entityType, key);
		if (fieldType == null) {
			return null;
		}
		String searchableFieldType = fieldType.getName().toLowerCase();
		if ("boolean".equals(searchableFieldType)) {
			BooleanPath path = entityPath.getBoolean(key);
			Boolean value = Boolean.parseBoolean(retval);
			if (criteria.getOperation().equalsIgnoreCase(":")) {
				return path.eq(value);
			}
		} else if (("int".equals(searchableFieldType) || ("Integer".equals(searchableFieldType)))
				&& StringUtil.isNumeric(criteria.getValue().toString())) {
			NumberPath<Integer> path = entityPath.getNumber(criteria.getKey(), Integer.class);
			int value = Integer.parseInt(retval);
			switch (criteria.getOperation()) {
			case ":":
				return path.eq(value);
			case ">":
				return path.goe(value);
			case "<":
				return path.loe(value);
			default:
				// Do nothing
			}
		} else {
			StringPath path = entityPath.getString(key);
			if (criteria.getOperation().equalsIgnoreCase(":")) {
				return path.eq(retval);
			}
		}
		return null;
	}
}
