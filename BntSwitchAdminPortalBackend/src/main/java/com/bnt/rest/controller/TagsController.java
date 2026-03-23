package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

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
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.TagsDto;
import com.bnt.rest.service.TagsService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/tags")
@CrossOrigin(origins = "${crossOriginUrl}")
public class TagsController {

	private static final Logger logger = LogManager.getLogger(TagsController.class);

	@Autowired
	private TagsService tagsService;

	@Autowired
	private HttpServletRequest request;

	@GetMapping("all-pagable-list")
	public ResponseEntity<Map<String, Object>> getAlltagss(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = new HashMap<>();
		data.put("tagsList", tagsService.getPagableList(requestParamMap));
		responseEntityData.setData(data);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> gettagsById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") Integer id) {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Tags");
		responseEntityData.setData(tagsService.findTagsById(id));
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PostMapping("create")
	public ResponseEntity<Map<String, Object>> createTags(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody TagsDto tagsDto) {
		logger.info("inside createTags");
		Map<String, Integer> map = new HashMap<>();
		try {

			if (!StringUtil.isEmptyOrNull(tagsDto.getName())) {
				tagsDto.setName(HTMLInjectionUtil.validateHTMLInjection(tagsDto.getName()));
			}
			if (!StringUtil.isEmptyOrNull(tagsDto.getTag())) {
				tagsDto.setTag(HTMLInjectionUtil.validateHTMLInjection(tagsDto.getTag()));
			}

			if (!StringUtil.isEmptyOrNull(tagsDto.getServiceType())) {
				tagsDto.setServiceType(HTMLInjectionUtil.validateHTMLInjection(tagsDto.getServiceType()));
			}

			String requestToken = RippsUtility.getToken(request);
			Integer id = tagsService.create(tagsDto, requestToken);
			map.put("id", id);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Tags Created Successfully");
			responseEntityData.setData(map);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not created", null), HttpStatus.OK);
		}
	}

	@PutMapping(value = "update/{id}")
	public ResponseEntity<Map<String, Object>> updateTags(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") Integer id, @RequestBody TagsDto tagsDto) {
		logger.info("inside updateTags");
		Map<String, Integer> map = new HashMap<>();
		try {
			Integer flag = tagsService.update(tagsDto, id, RippsUtility.getToken(request));
			if (flag > 0) {
				ResponseEntityData responseEntityData = new ResponseEntityData();
				responseEntityData.setStatus(RippsRestConstant.SUCCESS);
				responseEntityData.setMessage("Tags Updated Successfully");
				map.put("id", id);
				responseEntityData.setData(map);
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
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Not created", null), HttpStatus.OK);
		}
	}

	@DeleteMapping(value = "delete/{id}")
	public ResponseEntity<Map<String, Object>> deletetags(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		tagsService.deleteById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("tags Deleted");
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
