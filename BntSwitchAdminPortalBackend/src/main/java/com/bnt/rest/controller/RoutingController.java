package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.RoutingUiDto;
import com.bnt.rest.service.LookupValueService;
import com.bnt.rest.service.RoutingService;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.RoutingWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/routing")
@CrossOrigin(origins = "${crossOriginUrl}")
public class RoutingController {

	private static final String SERVICE = "service";

	private static final String NOT_CREATED = "Not created";

	private static final Logger logger = LogManager.getLogger(RoutingController.class);

	@Autowired
	private RoutingService routingService;

	@Autowired
	LookupValueService lookupValueService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/routeType/{routeType}")
	public ResponseEntity<Map<String, Object>> getAllRouting(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("routeType") String routeType) {
		logger.info("Find Route Type: {}", routeType);
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		ResponseWrapper pageJPAData = routingService.getAllRouting(requestParamMap, routeType);
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("routingList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createRouting(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody RoutingUiDto routingDto) {
		logger.info("Create Routing");
		String requestToken = RippsUtility.getToken(request);

		if (SERVICE.equals(routingDto.getRoutetype())
				&& (routingDto.getRoutetypevalue() == null || routingDto.getRoutetypevalue().getId() == -1)) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Please select service type", null),
					HttpStatus.OK);
		}

		boolean isCommit = false;
		Integer id = routingService.addRouting(routingDto, requestToken, isCommit);
		if (id > 0) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Destination Router Drafted Successfully");
			responseEntityData.setData(null);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not Created", null), HttpStatus.OK);
		}
	}

	@PostMapping(value = "/commit")
	public ResponseEntity<Map<String, Object>> createRoutingCommit(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody RoutingUiDto routingDto) {
		logger.info("Create Routing Commit");
		String requestToken = RippsUtility.getToken(request);

		boolean isCommit = true;
		Integer id = routingService.addRouting(routingDto, requestToken, isCommit);
		if (id > 0) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Destination Router Published Successfully");
			responseEntityData.setData(null);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, NOT_CREATED, null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/{routingVersionId}")
	public ResponseEntity<Map<String, Object>> getRoutingByRoutingVersionId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("routingVersionId") String routingVersionId) {
		logger.info("Find Routing Id: {}", routingVersionId);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = new HashMap<>();
		data.put("routingRule", routingService.getRoutingVersionById(routingVersionId).getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateRouting(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") String id, @RequestBody RoutingUiDto routingDto) {
		logger.info("Update Rule: {}", id);
		boolean isCommit = false;
		Integer flag = routingService.updateRouting(id, routingDto, RippsUtility.getToken(request), isCommit);
		if (flag > 0) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Router Updated");
			responseEntityData.setData(null);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, NOT_CREATED, null), HttpStatus.OK);
		}
	}

	@PutMapping(value = "/status/{id}")
	public ResponseEntity<Map<String, Object>> updateStatus(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") String id, @RequestBody RoutingUiDto routingDto) {
		logger.info("Update Status: {}", id);
		String flag = routingService.updateStatus(id, routingDto.getRuleActive(), RippsUtility.getToken(request));

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(flag + " status updated");
		responseEntityData.setData(null);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);

	}

	@PutMapping(value = "/version/live/{id}")
	public ResponseEntity<Map<String, Object>> updateVersionLive(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") String id,
			@RequestBody RoutingWrapper live) {
		logger.info("Update Version Live: {}", id);
		Integer flag = routingService.updateRoutingVersionStatus(id, live.isLive(), RippsUtility.getToken(request));
		if (flag > 0) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Status Updated");
			responseEntityData.setData(null);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, NOT_CREATED, null), HttpStatus.OK);
		}
	}

	@PutMapping(value = "/commit/{id}")
	public ResponseEntity<Map<String, Object>> updateRuleCommit(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") String id,
			@RequestBody RoutingUiDto routingDto) {
		logger.info("Update Commit:{} ", id);
		boolean isCommit = true;
		Integer flag = routingService.updateRouting(id, routingDto, RippsUtility.getToken(request), isCommit);
		if (flag > 0) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Routing Updated");
			responseEntityData.setData(null);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, NOT_CREATED, null), HttpStatus.OK);
		}
	}

	@DeleteMapping(value = "/version/{id}")
	public ResponseEntity<Map<String, Object>> deleteVersion(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Delete Version: {}", id);
		Integer flag = routingService.deleteVersion(id);
		if (flag > 0) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Version deleted");
			responseEntityData.setData(null);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not deleted", null), HttpStatus.OK);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteRouting(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Delete Routing: {}", id);
		Integer flag = routingService.deleteRouting(id);
		if (flag > 0) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Router deleted");
			responseEntityData.setData(null);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not deleted", null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/services-list/{routeType}")
	public ResponseEntity<Map<String, Object>> findRouterServices(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("routeType") String routeType) {
		logger.info("Find Router Services:{} ", routeType);
		try {
			List<IdAndNameWrapper> routerServiceList = null;
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Router Services");
			if (SERVICE.equals(routeType)) {
				routerServiceList = lookupValueService.getServicesList();
			}
			responseEntityData.setData(routerServiceList);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all Router Services", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter Routing");
		Map<String, Object> multihopServiceList = routingService.getServicesForFilter();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(multihopServiceList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
