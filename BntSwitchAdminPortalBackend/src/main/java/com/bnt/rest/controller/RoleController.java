package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.RoleDto;
import com.bnt.rest.entity.Role;
import com.bnt.rest.service.RoleRestService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = "${crossOriginUrl}")
public class RoleController {

	@Autowired
	private RoleRestService roleRestService;

	@Autowired
	private HttpServletRequest request;

	private static Logger userActivityLogger = LogManager.getLogger("userActivityLogger");

	private static Log log = LogFactory.getLog(RoleController.class.getName());

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllRoles(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		log.info("Find all User Roles");
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = roleRestService.getRoles(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Roles");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("userRoleList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);

		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all user", null),
					HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createRole(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody RoleDto roleFinalDto) {
		log.info("Create User Role");
		userActivityLogger.info("***********************Create  User Role Operation***********************");
		Integer roleId = roleRestService.addRole(roleFinalDto);
		Map<String, Integer> map = new HashMap<>();
		map.put("id", roleId);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Role Created");
		responseEntityData.setData(map);
		if (roleId > 0) {
			log.info("Response send for role");
			userActivityLogger.info("Role Created with id:{}", roleId);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);

		} else {
			log.info("Response not send for role");
			userActivityLogger.error("Role Not created");
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Role Not created", null),
					HttpStatus.CREATED);
		}

	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getRoleById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		log.info("Get User Role Id: " + id);
		Role role = roleRestService.findRoleById(id);
		RoleDto roleDto = ObjectMapper.mapToDto(role, RoleDto.class);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Role");
		responseEntityData.setData(roleDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateRole(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id, @RequestBody RoleDto roleDto) {
		log.info("Update User Role Id: " + id);
		userActivityLogger.info("***********************Update User Role Id: {}{}", id, "***********************");
		Role role = roleRestService.findRoleById(id);
		if (null == role) {
			userActivityLogger.error("Role Not Found for User Role Id :{}", id);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Role Not Found", ""),
					HttpStatus.NOT_FOUND);
		}
		String requestToken = RippsUtility.getToken(request);
		roleRestService.updateRole(roleDto, role, requestToken);
		userActivityLogger.info("Role Updated for User Role Id :{}", id);
		return new ResponseEntity<>(
				RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Role Updated", roleDto), HttpStatus.OK);

	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		log.info("Find Filter User Role");
		Map<String, Object> map = roleRestService.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/adminportal-role-viewonly-links")
	public ResponseEntity<Map<String, Object>> roleViewOnlyAdminPortalLinks(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		log.info("Get roleViewOnlyAdminPortalLinks");
		List<DtoWrapper> linksList = roleRestService.roleViewOnlyAdminPortalLinks();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find adminportal-role-viewonly-links");
		responseEntityData.setData(linksList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
