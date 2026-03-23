package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.SwitchClusterDto;
import com.bnt.rest.entity.SwitchCluster;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SwitchClusterServiceRest {

	ResponseWrapper getSwitchCluster(Map<String, Object> requestParamMap);

	SwitchCluster findSwitchClusterById(int id);

	Integer addSwitch(SwitchClusterDto clusterDto, String requestToken);

	SwitchCluster updateSwitchCluster(SwitchClusterDto clusterDto, SwitchCluster cluster, String requestToken);

}
