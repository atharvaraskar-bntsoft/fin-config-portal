package com.bnt.rest.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.common.util.exception.InvalidTokenException;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.service.PermissionService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/permissions")
@CrossOrigin(origins = "${crossOriginUrl}")
public class PermissionController {

	@Autowired
	private PermissionService permissionService;

	/**
	 * Fetch Permission based on token
	 * 
	 * @return
	 * @throws AccessDeniedException
	 * @throws InvalidTokenException ResponseEntity<Map<String,Object>>
	 */
	@GetMapping
	public ResponseEntity<Map<String, Object>> getPermission() throws AccessDeniedException {
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setData(permissionService.findCurrentUserPermission().getContent());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.CREATED);
	}
}
