package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.RoutingDto;
import com.bnt.rest.dto.RoutingUiDto;
import com.bnt.rest.dto.RoutingVersionDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RoutingService {

	public ResponseWrapper getAllRouting(Map<String, Object> requestParamMap, String routeType);

	public Integer addRouting(RoutingUiDto routingDto, String requestToken, boolean isCommit);

	public Integer updateRouting(String id, RoutingUiDto routingDto, String token, boolean isCommit);

	public ResponseWrapper getRoutingVersionById(String id);

	public Integer deleteVersion(int id);

	public Integer deleteRouting(int id);

	public String updateStatus(String id, boolean ruleActive, String token);

	public Integer updateVersionLive(String id, boolean live, String token);

	Integer updateRoutingVersionStatus(String id, boolean ruleActive, String token);

	public Map<String, Object> getServicesForFilter();

	List<RoutingVersionDto> getRoutingVersionNotInDeployedComponent();

	List<RoutingVersionDto> getRoutingVersionNotInDeployedComponentNew();

	RoutingUiDto getRoutingVersionUiDto(Integer id);

	RoutingUiDto getRoutingVersionUiDtoForImport(Integer id);

	Integer addRouting(RoutingDto routingDto);

	void getRoutingVersionDtoForExport(List<RoutingVersionDto> list);

	public Integer importRouting(RoutingDto dtoObject);

}
