package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.ConfiguredRoutes;
import com.bnt.rest.entity.RuleConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface ConfiguredRoutesHelper extends CrudRepository<ConfiguredRoutes, Integer> {
	public List<ConfiguredRoutes> findByRuleConfiguration(RuleConfiguration id);

	public List<ConfiguredRoutes> findByRuleConfigurationIn(List<RuleConfiguration> list);
}