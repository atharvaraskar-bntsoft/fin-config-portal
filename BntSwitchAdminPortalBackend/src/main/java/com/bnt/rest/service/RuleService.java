package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.RuleConfiguration;
import com.bnt.rest.wrapper.dto.ConditionDto;
import com.bnt.ruleengine.ParentDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RuleService {

	Integer addRule(ParentDto parentDto, String token);

	ResponseWrapper getRules(Map<String, Object> requestParamMap);

	ResponseWrapper getRuleById(String id);

	Integer updateRule(String id, ParentDto parentDto, String token);

	List<RuleConfiguration> deleteRule(int id);

	List<RuleConfiguration> confirmRule(String id, String verified, String token);

	ResponseWrapper getAllRulesWithoutZero(String ruletype);

	ConditionDto getConditionList(String service);

	Integer updateRuleStatus(String id, ParentDto parentDto, String token);

}
