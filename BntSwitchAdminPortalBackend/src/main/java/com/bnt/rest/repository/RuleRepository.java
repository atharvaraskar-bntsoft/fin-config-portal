package com.bnt.rest.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Rule;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RuleRepository {

	Page<Rule> getFilterData(String[] filters, String ruleType, Pageable pageable);

	List<Map<String, String>> getdata(String tableName, String column1, String column2);

	List<Map<String, String>> getdata(String tableName, String column1, String column2, String column3);

	List<String> getFieldData(String tableName, String column1, String column2);

	boolean validateName(String name);

	List<Map<String, String>> getActivedata(String tableName, String column1, String column2);

	List<Map<String, String>> getActivedata(String tableName, String column1, String column2, String column3);

}
