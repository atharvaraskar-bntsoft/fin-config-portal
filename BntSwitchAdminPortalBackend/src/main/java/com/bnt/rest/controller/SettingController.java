package com.bnt.rest.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.SettingDto;
import com.bnt.rest.service.SettingService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/view-setting")
@CrossOrigin(origins = "${crossOriginUrl}")
public class SettingController {
	private static final Logger logger = LogManager.getLogger(SettingController.class);

	@Autowired
	private SettingService settingService;

	@Value("${locale.default}")
	public String defaultLocale;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllSetting() {
		logger.info("Find all Settings");
		List<SettingDto> settingList;
		try {
			settingList = settingService.findAllSetting();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Setting");
			Map<String, Object> settingData = new HashMap<>();
			settingData.put("pagination", Arrays.asList("20", "25", "30", "40", "50"));
			settingData.put("language", Arrays.asList(defaultLocale.split(",")));
			settingData.put("searchOption", Arrays.asList("contain", "contain2"));
			settingData.put("settingDto", settingList.get(0));
			responseEntityData.setData(settingData);

			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Error while retrieving view settings", null), HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> findSettingById(@PathVariable("id") int id) {
		logger.info("Find Setting Id: {}", id);
		SettingDto settingDto = settingService.findSettingById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find all Setting");
		responseEntityData.setData(RippsUtility.getMapData("settingDto", settingDto));
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{view-setting-id}")
	public ResponseEntity<Map<String, Object>> updateSetting(@PathVariable("view-setting-id") int id,
			@RequestBody SettingDto settingDto) {
		logger.info("Update Setting Id: {}", id);
		boolean settingUpdateStatus = settingService.updateSetting(id, settingDto);
		if (settingUpdateStatus) {
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Update Setting");
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Error while updating setting", null),
					HttpStatus.FORBIDDEN);
		}
	}
}
