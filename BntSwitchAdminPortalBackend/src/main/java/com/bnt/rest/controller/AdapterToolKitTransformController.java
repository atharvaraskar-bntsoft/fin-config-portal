package com.bnt.rest.controller;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.ELFunctionDto;
import com.bnt.rest.service.AdapterToolKitTransformService;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.rest.wrapper.dto.adapter.FieldSchemeImfMapperUiWrapper;
import com.bnt.rest.wrapper.dto.adapter.TransformSchemeMapperUIDto;
import com.bnt.rest.wrapper.dto.adapter.postsaction.ActionDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/AdapterToolKit-Transform")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AdapterToolKitTransformController {

	private static final Logger logger = LogManager.getLogger(AdapterToolKitTransformController.class);

	@Autowired
	private AdapterToolKitTransformService adapterToolKitTransformService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping(value = "/rule-list/{templateId}/{formatId}")
	public ResponseEntity<Map<String, Object>> getTranformRuleList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("templateId") int templateId,
			@PathVariable("formatId") int formatId) {

		logger.info("inside getTranformRuleList() with formatId: {} and templateId : {}", formatId, templateId);

		List<IdAndCodeWrapperString> listIdRule = adapterToolKitTransformService.getRuleList(templateId, formatId);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Adaptor-JSON-Trasform Rule");
		responseEntityData.setData(listIdRule);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/data-map")
	public ResponseEntity<Map<String, Object>> draftAdapter(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		return HttpCommons.setResponseEntityData(adapterToolKitTransformService.getDataMap(), "get data map",
				"Error in getting record by Id");
	}

	@GetMapping(value = "/get-field-scheme-imf-mapper/{templateId}")
	public ResponseEntity<Map<String, Object>> getFieldSchemeImfMapperUiWrapper(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("templateId") int templateId) {

		logger.info("inside getFieldSchemeImfMapperUiWrapper()...with templateId: {} ", templateId);

		List<FieldSchemeImfMapperUiWrapper> fieldSchemeImfMapperUiWrapperList = adapterToolKitTransformService
				.getFieldSchemeImfMapperUiWrapper(templateId);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Field-Scheme-Imf-Mapper List");
		responseEntityData.setData(fieldSchemeImfMapperUiWrapperList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "el-function-list")
	public ResponseEntity<Map<String, Object>> getAllELFunctions(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("inside getAllELFunctions");
		List<ELFunctionDto> eLFunctionDtoList = adapterToolKitTransformService.getElFunctionList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find EL Expession/Function list");
		responseEntityData.setData(eLFunctionDtoList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/get-scheme-mapper-list/{templateId}")
	public ResponseEntity<Map<String, Object>> getTransformSchemeMapperList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("templateId") int templateId) {

		logger.info("inside getTransformSchemeMapperList() with templateId: {}", templateId);

		List<TransformSchemeMapperUIDto> uiMapper = adapterToolKitTransformService
				.getTransformSchemeMapperList(templateId);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Scheme-Mapper List");
		responseEntityData.setData(uiMapper);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "adapter-post-actions-method-list")
	public ResponseEntity<Map<String, Object>> adapterPostActionsMethodList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside adapterPostActionsMethodList");
		List<ActionDto> actionList = adapterToolKitTransformService.adapterPostActionsMethodList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find adapter-post-actions-method list");
		responseEntityData.setData(actionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "adapter-pre-actions-method-list")
	public ResponseEntity<Map<String, Object>> adapterPreActionsMethodList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside adapterPreActionsMethodList()..");
		List<ActionDto> actionList = adapterToolKitTransformService.adapterPreActionsMethodList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find adapter-pre-actions-method list");
		responseEntityData.setData(actionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "adapter-l3-post-actions-method-list")
	public ResponseEntity<Map<String, Object>> adapterL3PostActionsMethodList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside adapterL3PostActionsMethodList()..");
		List<ActionDto> actionList = adapterToolKitTransformService.adapterL3PostActionsMethodList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find adapter-l3-post-actions-method list");
		responseEntityData.setData(actionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "adapter-post-actions-method-l3-list")
	public ResponseEntity<Map<String, Object>> adapterPostActionsMethodL3List(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside adapterPostActionsMethodL3List");
		List<ActionDto> actionList = adapterToolKitTransformService.adapterPostActionsMethodL3List();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find adapter-post-actions-method list");
		responseEntityData.setData(actionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "adapter-l3-step-method-list")
	public ResponseEntity<Map<String, Object>> adapterL3StepMethodList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside adapterL3StepMethodList");
		List<ActionDto> actionList = adapterToolKitTransformService.adapterL3StepMethodList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find adapter-step-method list");
		responseEntityData.setData(actionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "adapter-l1-steps-validation-list")
	public ResponseEntity<Map<String, Object>> adapterL1StepsValidationList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside adapterL1StepMethodList");
		List<ActionDto> actionList = adapterToolKitTransformService.adapterL1StepsValidationList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find L1-adapter-step-validation list");
		responseEntityData.setData(actionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "cart-pre-actions-method-list")
	public ResponseEntity<Map<String, Object>> cartPreActionsMethodList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside cartPreActionsMethodList");
		List<ActionDto> actionList = adapterToolKitTransformService.cartPreActionsMethodList();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find cart-pre-actions-method list");
		responseEntityData.setData(actionList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
