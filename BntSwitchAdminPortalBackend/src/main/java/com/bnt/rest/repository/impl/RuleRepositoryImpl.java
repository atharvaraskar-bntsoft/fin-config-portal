package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.JPAUtils;
import com.bnt.rest.entity.QRule;
import com.bnt.rest.entity.Rule;
import com.bnt.rest.repository.RuleRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class RuleRepositoryImpl implements RuleRepository {

	private static final String LABEL = "label";
	@PersistenceContext
	public EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Rule> getFilterData(String[] filters, String ruleType, Pageable pageable) {
		QRule rule = QRule.rule;
		Predicate ruleTypePredicate = rule.ruleType.eq(ruleType);
		Predicate namePredicate = null;
		for (String each : filters) {
			String param = each.split(":")[0];
			String value = each.split(":")[1];

			if (param.equals("name")) {
				namePredicate = rule.name.eq(value);
			}

		}
		Page<Rule> rulePage = null;
		JPAQuery<Rule> jpaQuery = null;
		jpaQuery = new JPAQuery<>(entityManager);
		jpaQuery.from(rule).where(ruleTypePredicate, namePredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());
		List<Rule> ruleList = jpaQuery.fetch();
		rulePage = (Page<Rule>) JPAUtils.getPageObjectFromList(pageable, ruleList, jpaQuery.fetchCount());
		return rulePage;
	}

	@Override
	public List<Map<String, String>> getdata(String tableName, String column1, String column2) {
		/** String s = "select " + column1 + "," + column2 + " from " + tableName; */
		StringBuilder sb = new StringBuilder().append("select  ").append(column1).append(",").append(column2)
				.append(" from ").append(tableName);
		List<Object[]> resultList = this.entityManager.createNativeQuery(sb.toString()).getResultList();
		return resultList.stream().map(value -> {
			Map<String, String> map = new HashMap<>();
			map.put("name", value[0].toString());
			map.put(LABEL, value[1].toString());
			return map;
		}).toList();

	}

	@Override
	public List<Map<String, String>> getActivedata(String tableName, String column1, String column2) {
		// String s = "select " + column1 + "," + column2 + " from " + tableName + " "+
		// "where" + " "+"active" + "=" + "1";
		// StringBuilder sb = new StringBuilder().append("select ")
		// .append(column1).append( ",").append(column2).append(" from
		// ").append(tableName).append(" where active = 1");
		Query query = this.entityManager
				.createNativeQuery("SELECT " + column1 + ", " + column2 + " from " + tableName + " where active = 1 ");
/*
		query.setParameter(1, column1);
		query.setParameter(2, column2);
		query.setParameter(3, tableName);
*/
		List<Object[]> resultList = query.getResultList();
		// List<Object[]> resultList =
		// this.entityManager.createNativeQuery(sb.toString()).getResultList();
		return resultList.stream().map(value -> {
			Map<String, String> map = new HashMap<>();
			map.put("name", value[0].toString());
			map.put(LABEL, value[1].toString());
			return map;
		}).toList();

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> getFieldData(String tableName, String column1, String column2) {
		String s = "select " + column1 + " from " + tableName;
		return this.entityManager.createNativeQuery(s).getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, String>> getdata(String tableName, String column1, String column2, String column3) {

		// String s = "select " + "workflow_id" + ", CONCAT(" + column2 + ", ' -
		// WorkflowID '," + column1
		// + ") as text , version from " + tableName + " where " + column3 + "='0' order
		// by version desc";
		StringBuilder sb = new StringBuilder().append("select  workflow_id ").append(", CONCAT(").append(column2)
				.append(", ' - WorkflowID ',").append(column1);
		sb.append(") as text , version from ").append(tableName).append(" where ").append(column3)
				.append("='0' order  by version desc");
		List<Object[]> resultList = this.entityManager.createNativeQuery(sb.toString()).getResultList();

		Set<String> workflowIdSet = new HashSet<>();
		List<Map<String, String>> list = new ArrayList<>();
		resultList.forEach(value -> {
			if (!(workflowIdSet.contains(value[1].toString()))) {
				workflowIdSet.add(value[1].toString());
				Map<String, String> map = new HashMap<>();
				map.put("name", value[0].toString());
				map.put(LABEL, value[1].toString());
				map.put("version", value[2].toString());
				list.add(map);
			}
		});
		return list;
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, String>> getActivedata(String tableName, String column1, String column2, String column3) {

		// String s = "select " + "workflow_id" + ", CONCAT(" + column2 + ", ' -
		// WorkflowID '," + column1
		// + ") as text , version from " + tableName + " where " + column3 + "='0'" + "
		// and status = '1'" +" "+ "order by version desc";
		// StringBuilder sb = new StringBuilder().append("select workflow_id
		// ").append(", CONCAT(").append(column2).append(", ' - WorkflowID
		// ',").append(column1);
		// sb.append(") as text , version from ").append(tableName).append(" where
		// ").append(column3).append("='0' and status = '1' order by version desc");
		Query query = this.entityManager.createNativeQuery("SELECT workflow_id,  CONCAT(" + column2
				+ ",  ' - WorkflowID '," + column1 + " ) as text , version from  " + tableName + " where " + column3
				+ "='0'" + "  and status = '1' order  by version desc");
/*
		query.setParameter(1, column2);
		query.setParameter(2, column1);
		query.setParameter(3, tableName);
		query.setParameter(4, column3);
*/
		List<Object[]> resultList = query.getResultList();
		// List<Object[]> resultList =
		// this.entityManager.createNativeQuery(sb.toString()).getResultList();

		Set<String> workflowIdSet = new HashSet<>();
		List<Map<String, String>> list = new ArrayList<>();
		resultList.forEach(value -> {
			if (!(workflowIdSet.contains(value[1].toString()))) {
				workflowIdSet.add(value[1].toString());
				Map<String, String> map = new HashMap<>();
				map.put("name", value[0].toString());
				map.put(LABEL, value[1].toString());
				map.put("version", value[2].toString());
				list.add(map);
			}
		});
		return list;
	}

	@Override
	public boolean validateName(String name) {
		return JPACriteriaUtils.validateName(entityManager, Rule.class, name, "name");
	}
}
