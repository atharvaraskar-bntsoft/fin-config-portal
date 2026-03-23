package com.bnt.rest.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.Constants;
import com.bnt.constant.RippsRestConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.service.UserServiceRest;
import com.bnt.rest.wrapper.dto.SystemUserRoleWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "${crossOriginUrl}")
public class UserController {

	private static final String USER_ID = "userId";

	private static final String FIND_ALL_USERS = "Find all Users";

	private static final Logger logger = LogManager.getLogger(UserController.class);

	private static final Logger userActivityLogger = LogManager.getLogger("userActivityLogger");

	@Autowired
	private UserServiceRest userServiceRest;

	@Autowired
	private HttpServletRequest request;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllUsers(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestParam(name = "type", defaultValue = "default") String type) throws Exception {
		logger.info(FIND_ALL_USERS);

		if (type.equals("current")) {
			String requestToken = RippsUtility.getToken(request);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Find all user",
					userServiceRest.findCurrentUser(requestToken)), HttpStatus.OK);
		} else {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = userServiceRest.findAllUsers(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_USERS);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("usersList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		}
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> createUser(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody SystemUserDto user) {
		logger.info("Create User");
		userActivityLogger.info("***********************Create User Operation***********************");
		userServiceRest.isUserExist(user);
		Integer userId = userServiceRest.saveUser(user, '1');
		Map<String, Integer> map = new HashMap<>();
		map.put("id", userId);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("User Created");
		responseEntityData.setData(map);
		if (userId > 0) {
			userActivityLogger.info("User Created with id:{}", userId);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
		} else {
			userActivityLogger.error("User Not Created");
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "User Not created", null),
					HttpStatus.CREATED);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getUserById(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Find User Id:{} ", id);
		SystemUser currentUser = userServiceRest.findSystemUserById(id);
		SystemUserDto systemUser = ObjectMapper.mapToDto(currentUser, SystemUserDto.class);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage(FIND_ALL_USERS);

		responseEntityData.setData(systemUser);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateUser(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id, @RequestBody SystemUserDto systemUserDto,
			@RequestParam(name = "type", defaultValue = "default") String type) {
		logger.info("Update User Id: {}", id);
		userActivityLogger.info("***********************Update User Id: {}{}", id, "************************");
		if (type.equals("current")) {
			return null;
		} else {
			SystemUser currentUser = userServiceRest.findSystemUserById(id);
			if (currentUser == null) {

				userActivityLogger.error(Constants.USER_NOT_FOUND, " userId:{}", id);
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, Constants.USER_NOT_FOUND, ""),
						HttpStatus.NOT_FOUND);
			}
			String requestToken = RippsUtility.getToken(request);

			Integer updatedUserId = userServiceRest.updateUser(systemUserDto, currentUser, requestToken);
			if (updatedUserId > 0) {
				userActivityLogger.info("User Updated for {}{}", USER_ID, id);
				return new ResponseEntity<>(
						RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "User Updated", systemUserDto),
						HttpStatus.OK);
			}

			userActivityLogger.error("User Not Updated for {}{}", USER_ID, id);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "User Not Updated", null),
					HttpStatus.OK);
		}
	}

	@PutMapping
	public ResponseEntity<Map<String, Object>> updateCurrentUser(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody SystemUserDto systemUserDto,
			@RequestParam(name = "type", defaultValue = "default") String type) {
		logger.info("Update Currnet User Id");
		userActivityLogger.info("***********************Update Current User Operation Id: {}{}", systemUserDto.getId(),
				"***********************");
		SystemUser currentUser = userServiceRest.findSystemUserById(systemUserDto.getId());
		String requestToken = RippsUtility.getToken(request);
		userServiceRest.updateUser(systemUserDto, currentUser, requestToken);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "User Updated", null),
				HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> deleteUser(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("Delete User Id: {}", id);
		userActivityLogger.info("***********************Delete  User Id: {}{}", id, "*************************");
		SystemUser currentUser = userServiceRest.findSystemUserById(id);
		if (currentUser == null) {
			userActivityLogger.error(Constants.USER_NOT_FOUND, "userId:{}", id);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, Constants.USER_NOT_FOUND, ""),
					HttpStatus.NOT_FOUND);
		}
		userServiceRest.deleteById(currentUser);
		userActivityLogger.info("User deleted for {}{}", USER_ID, id);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "User deleted", null),
				HttpStatus.OK);
	}

	@GetMapping(value = "/filter")
	public ResponseEntity<Map<String, Object>> getFilterData(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter User");
		Map<String, Object> map = userServiceRest.getFilterData();
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(map);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@GetMapping(value = "/check")
	public ResponseEntity<Map<String, Object>> getUserRoleList(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Filter User");
		String requestToken = RippsUtility.getToken(request);
		SystemUserRoleWrapper systemUser = userServiceRest.getUserRoleList(requestToken);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setData(systemUser);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
