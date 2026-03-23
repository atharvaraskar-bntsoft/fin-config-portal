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
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.entity.RuleConfiguration;
import com.bnt.rest.service.RuleService;
import com.bnt.rest.wrapper.dto.ConditionDto;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.RoutingWrapper;
import com.bnt.ruleengine.ParentDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/rule-new")
@CrossOrigin(origins = "${crossOriginUrl}")
public class RuleController {

	private static final Logger logger = LogManager.getLogger(RuleController.class);

	@Autowired
	private RuleService ruleService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllRules(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		requestParamMap.put("ruletype", request.getParameter("ruletype"));
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		ResponseWrapper pageJPAData = ruleService.getRules(requestParamMap);
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("ruleList", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/routing/{ruletype}")
	public ResponseEntity<Map<String, Object>> getAllRulesWithOutZero(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("ruletype") String ruletype) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = new HashMap<>();
		data.put("ruleList", ruleService.getAllRulesWithoutZero(ruletype).getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getRuleById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") String id) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = new HashMap<>();
		data.put("rule", ruleService.getRuleById(id).getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createRule(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody ParentDto parentDto) {
		try {
			String requestToken = RippsUtility.getToken(request);
			if (StringUtil.isNotNullOrBlank(parentDto.getName())) {
				parentDto.setName(HTMLInjectionUtil.validateHTMLInjection(parentDto.getName()));
			}
			if (StringUtil.isNotNullOrBlank(parentDto.getDescription())) {
				parentDto.setDescription(HTMLInjectionUtil.validateHTMLInjection(parentDto.getDescription()));
			}
			sanatizeParentDTO(parentDto);
			Integer id = ruleService.addRule(parentDto, requestToken);
			if (id > 0) {
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("Rule Created");
				responseEntityData.setData(null);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not created", null),
						HttpStatus.OK);
			}
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not created", null), HttpStatus.OK);
		}
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateRule(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") String id, @RequestBody ParentDto parentDto) {
		try {
			sanatizeParentDTO(parentDto);
			Integer flag = ruleService.updateRule(id, parentDto, RippsUtility.getToken(request));
			if (flag > 0) {
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage(" Rule Updated");
				responseEntityData.setData(null);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not updated", null),
						HttpStatus.OK);
			}
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not updated", null), HttpStatus.OK);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteRule(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		List<RuleConfiguration> list = ruleService.deleteRule(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Rule Deleted");
		responseEntityData.setData(list);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/confirm-rule/{id}")
	public ResponseEntity<Map<String, Object>> confirmRule(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") String id, @RequestBody RoutingWrapper routingWrapper) {
		ruleService.confirmRule(id, routingWrapper.getVerified(), RippsUtility.getToken(request));

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		if (routingWrapper.getVerified().equals("1")) {
			responseEntityData.setMessage("Rule Verified");
		} else {
			responseEntityData.setMessage("Rule Rejected");
		}
		responseEntityData.setData(null);
		logger.info("returned after verification");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
	}

	@GetMapping(value = "/condition-list/{service}")
	public ResponseEntity<Map<String, Object>> getConditionList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("service") String service) {
		logger.info("To fectch condition-list");
		ConditionDto list = ruleService.getConditionList(service);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(list);
		logger.info("To fectch condition-list complete");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	private void sanatizeParentDTO(ParentDto parentDTO) {
		parentDTO.setName(HTMLInjectionUtil.validateHTMLInjection(parentDTO.getName()));
		parentDTO.setDescription(HTMLInjectionUtil.validateHTMLInjection(parentDTO.getDescription()));
		parentDTO.setRuleType(HTMLInjectionUtil.validateHTMLInjection(parentDTO.getRuleType()));
		parentDTO.setCondition(HTMLInjectionUtil.validateHTMLInjection(parentDTO.getCondition()));

		if (null != parentDTO.getDestinations()) {
			for (IdAndNameWrapper destination : parentDTO.getDestinations()) {
				destination.setName(HTMLInjectionUtil.validateHTMLInjection(destination.getName()));
			}
		}
	}
}
