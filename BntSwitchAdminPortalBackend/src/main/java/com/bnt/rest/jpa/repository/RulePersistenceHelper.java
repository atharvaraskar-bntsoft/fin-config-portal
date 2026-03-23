package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Rule;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface RulePersistenceHelper extends CrudRepository<Rule, Integer> {

	public Page<Rule> findByRuleType(String ruleType, Pageable pageable);

	public Rule findRuleByName(String name);

	public List<Rule> findByActive(Character active);

	public List<Rule> findByRuleType(String ruleType);

	public List<Rule> findByRuleTypeAndActive(String ruletype, Character active);

}
