package com.bnt.rest.service.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bnt.common.util.StringUtil;
import com.bnt.rest.service.DeployedRouterService;
import com.bnt.rest.wrapper.dto.KeyValueTypeWrapper;
import com.bnt.service.mapper.DeployedRouterMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DeployedRouterServiceImpl implements DeployedRouterService {

	@Value("${monitoring.helth.jmx.url}")
	private String monitoringHealthJmxUrl;
	@Value("${workflow.routing_rule.type}")
	private String workflowRoutingRuleType;
	@Value("${destination.routing_rule.type}")
	private String destinationRoutingRuleType;

	@Override
	public List<KeyValueTypeWrapper> getRoutingRuleData() {
		// Auto-generated method stub
		List<KeyValueTypeWrapper> responseList = new LinkedList<>();
		String jmxWorflowRoutingResponse = DeployedRouterMapper.getRoutingRuleDataFromMBean(monitoringHealthJmxUrl,
				workflowRoutingRuleType);
		String jmxDestinationRoutingResponse = DeployedRouterMapper.getRoutingRuleDataFromMBean(monitoringHealthJmxUrl,
				destinationRoutingRuleType);

		if (!(StringUtil.isEmptyOrNull(jmxWorflowRoutingResponse))) {
			responseList = DeployedRouterMapper.parseRouterResponse(responseList, jmxWorflowRoutingResponse,
					"Workflow Router");
		}
		if (!(StringUtil.isEmptyOrNull(jmxDestinationRoutingResponse))) {
			responseList = DeployedRouterMapper.parseRouterResponse(responseList, jmxDestinationRoutingResponse,
					"Destination Router");
		}
		return responseList;

	}

}
