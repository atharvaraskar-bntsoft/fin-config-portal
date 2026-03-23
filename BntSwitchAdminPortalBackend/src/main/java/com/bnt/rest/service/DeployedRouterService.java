package com.bnt.rest.service;

import java.util.List;

import com.bnt.rest.wrapper.dto.KeyValueTypeWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DeployedRouterService {

	List<KeyValueTypeWrapper> getRoutingRuleData();
}
