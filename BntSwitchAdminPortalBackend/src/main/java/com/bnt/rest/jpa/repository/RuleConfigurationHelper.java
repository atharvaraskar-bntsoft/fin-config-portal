package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Rule;
import com.bnt.rest.entity.RuleConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface RuleConfigurationHelper extends CrudRepository<RuleConfiguration, Integer> {

	@Query("SELECT Max(m.version) + 1  AS nextcode FROM RuleConfiguration m where m.rule.id = ?1")
	public Integer findMax(Integer ruleid);

	@Query("SELECT Max(m.version) + 1  AS nextcode FROM RuleConfiguration m where m.rule.name = ?1")
	public Integer findMax(String name);

	public RuleConfiguration findByRuleAndVersion(Rule rule, Integer version);

	public List<RuleConfiguration> findByRule(Rule rule);

	@Query("SELECT m.id FROM RuleConfiguration m where m.rule.name = ?1")
	public List<Integer> findRuleConfigIdsByRule(Rule rule);

	@Query("SELECT m FROM RuleConfiguration m where m.rule.id = ?1 and m.version=?2")
	public RuleConfiguration getConfigurationForVersion(Integer id, Integer version);

	@Query("SELECT m FROM RuleConfiguration m where m.rule.name = ?1 and m.version=?2")
	public RuleConfiguration getConfigurationByNameAndVersion(String name, Integer version);

}
