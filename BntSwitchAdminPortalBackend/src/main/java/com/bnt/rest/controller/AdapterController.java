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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.bswitch.message.packager.BNTPackager;
import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.JsonDataCompListDto;
import com.bnt.rest.service.AdapterService;
import com.bnt.rest.service.AdapterToolKitTransformService;
import com.bnt.rest.wrapper.dto.adapter.AdapterTransformData;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/adapter")
@CrossOrigin(origins = "${crossOriginUrl}")
public class AdapterController {

	private static final Logger logger = LogManager.getLogger(AdapterController.class);

	@Autowired
	private AdapterService adapterService;

	@Autowired
	private AdapterToolKitTransformService adapterToolKitTransformService;

	@Autowired
	private HttpServletRequest request;

	private String logMsg = "sending response";

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> findAdapterByConfigurationId(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {

		logger.info("inside findAdapterByConfigurationId");
		try {

			AdapterUiResponseWrapper response = adapterService.findAdapterByConfigurationId(id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Adaptor");
			responseEntityData.setData(response);
			logger.info(logMsg);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	@PostMapping(value = "draft")
	public ResponseEntity<Map<String, Object>> draftAdapter(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("***********Draft Adapter Operation**********");

		Map<String, Integer> map = new HashMap<>();

		String requestToken = RippsUtility.getToken(request);
		if (StringUtil.isEmptyOrNull(adapterUiResponseWrapper.getMasterData().getAdapterDto().getName())) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter-Name is missing", null),
					HttpStatus.CREATED);
		}

		try {
			Integer adapterId = adapterService.draftAdapter(adapterUiResponseWrapper, requestToken);
			map.put("id", adapterId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Adapter Drafted");
			responseEntityData.setData(map);
			if (adapterId > 0) {
				logger.info("Adapter drafted with id: {}", adapterId);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {

				logger.error("Adapter Not drafted");
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter Not Drafted", null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter draft failed", null),
					HttpStatus.CREATED);
		}
	}

	@PostMapping(value = "version-it")
	public ResponseEntity<Map<String, Object>> versionItAdapter(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("*********************** Draft versionIt Adapter Operation***********************");
		String requestToken = RippsUtility.getToken(request);
		if ("".equalsIgnoreCase(adapterUiResponseWrapper.getMasterData().getAdapterDto().getName())
				|| adapterUiResponseWrapper.getMasterData().getAdapterDto().getName() == null) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter-Name is missing", null),
					HttpStatus.CREATED);
		}

		Integer adapterId = -1;
		Map<String, Integer> map = new HashMap<>();
		try {
			adapterId = adapterService.versionItAdapter(adapterUiResponseWrapper, requestToken);
			map.put("id", adapterId);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Adapter versioning successfully completed");
			responseEntityData.setData(map);

			if (adapterId > 0) {
				logger.info("Adapter Created with id  : {}", adapterId);
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {

				logger.error("Adapter Not Created");
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter Not created", null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter versioning failed", null),
					HttpStatus.CREATED);
		}
	}

	@GetMapping(value = "/validate-adapter-name/{adapterName}")
	public ResponseEntity<Map<String, Object>> validateAdapterName(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("adapterName") String adapterName) {
		logger.info("inside validateAdapterName:  {}", adapterName);
		try {
			boolean existAdapter = adapterService.validateAdapterName(adapterName);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			if (existAdapter) {
				responseEntityData.setMessage(Constants.INVALID_ADATPER_NAME);
			} else {
				responseEntityData.setMessage(Constants.ADAPTER_AREADY_EXISTS);
			}
			responseEntityData.setData(existAdapter);
			logger.info("completed...");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), false),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					Constants.INVALID_ADATPER_NAME, false), HttpStatus.OK);
		}
	}

	// Fetches list view details for L1 Adapters.
	@GetMapping(value = "/adapter-summary")
	public ResponseEntity<Map<String, Object>> getPagableAdapterUIList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {

		logger.info("inside getPagableAdapterUIList()...");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = adapterService.getPagableAdapterUIList(requestParamMap,
				Constants.ADAPTER_TYPE_L1);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Adaptor-List");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("adaptorlist", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@DeleteMapping(value = "configuration/{id}")
	public ResponseEntity<Map<String, Object>> deleteAdapterConfigurationById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("inside deleteAdapterConfigurationById ID: {}", id);
		String requestToken = RippsUtility.getToken(request);
		try {
			adapterService.deleteByConfigId(id, requestToken);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS,
					"Adapter with version '0' is deleted successfully", null), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
	}

	// Fetches list view details for L3/L1 Adapters.
	@GetMapping(value = "/adapter-summary/{type}")
	public ResponseEntity<Map<String, Object>> getPagableAdapterUIList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("type") String type) {
		logger.info("inside getPagableAdapterUIList with Type: {}", type);
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = adapterService.getPagableAdapterUIList(requestParamMap, type);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Adaptor-List");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("adaptorlist", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping(value = "copy")
	public ResponseEntity<Map<String, Object>> draftCopyAdapter(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestParam("adapterName") String adapterName,
			@RequestParam("imfId") Integer imfId, @RequestParam("configuraionId") Integer configuraionId) {
		logger.info("***********************Draft Adapter Operation***********************");
		String requestToken = RippsUtility.getToken(request);
		try {
			AdapterUiResponseWrapper response = adapterService.copyAdapterByConfigurationId(adapterName, imfId,
					configuraionId, requestToken);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Adapter Copied successfully");
			responseEntityData.setData(response);
			if (response != null) {
				logger.info("Adapter Copied");
				return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
			} else {

				logger.error("Adapter Not Copied");
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter Not Copied", null),
						HttpStatus.CREATED);
			}
		} catch (RippsAdminException ripException) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ripException.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Adapter Copy failed", null),
					HttpStatus.CREATED);
		}
	}

	@GetMapping(value = "/adapter-data-map")
	public ResponseEntity<Map<String, Object>> getAdapterDataMap(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("inside getAdapterDataMapper");
		Map<String, Object> map = new HashMap<>();
		map.put("AdapterdataMap", adapterToolKitTransformService.getAdapterDataMap());
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Adaptor Data Mapper");
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

	}

	@PostMapping(value = "convert-data")
	public ResponseEntity<Map<String, Object>> convertAdapterUiData(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("***********************convertAdapterUiData Operation***********************");
		String requestToken = RippsUtility.getToken(request);
		try {
			AdapterUiResponseWrapper response = adapterService.convertAdapterUiData(adapterUiResponseWrapper,
					requestToken);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Adaptor converted data");
			responseEntityData.setData(response);
			logger.info(logMsg);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

		catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Adapter data conversion failed", null), HttpStatus.CREATED);
		}
	}

	@PostMapping(value = "convertPackagerData")
	public ResponseEntity<Map<String, Object>> convertPackagerData(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody BNTPackager bntPackager) {
		logger.info("***********************convertPackagerData Operation***********************");
		try {

			List<AdapterTransformData> response = adapterService.convertPackagerData(bntPackager);

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find Adaptor converted data");
			responseEntityData.setData(response);
			logger.info(logMsg);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(e);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Adapter data conversion failed", null), HttpStatus.CREATED);
		}
	}

	@GetMapping(value = "/component-type/{type}")
	public ResponseEntity<Map<String, Object>> getComponentTypeDeatils(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("type") String type) {
		logger.info("inside getComponentTypeDeatils:  {}", type);

		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = adapterService.getCompTypeListForAdapter(requestParamMap, type);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find ComponentType-List");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("nameversionsdata", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping(value = "/component-type-json")
	public ResponseEntity<Map<String, Object>> getComponentTypeJsonDeatils(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody JsonDataCompListDto jsonDataCompListDto) {
		logger.info("inside getComponentTypeDeatils()..");
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseWrapper pageJPAData = adapterService.getCompTypeJsonPropListForAdapter(requestParamMap,
				jsonDataCompListDto);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find ComponentType-JSON");
		Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
		data.put("jsondatalist", pageJPAData.getContent());
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
