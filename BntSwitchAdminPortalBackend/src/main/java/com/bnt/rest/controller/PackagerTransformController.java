package com.bnt.rest.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/transformpackager")
@CrossOrigin(origins = "${crossOriginUrl}")
public class PackagerTransformController {
	private static final Logger logger = LogManager.getLogger(PackagerTransformController.class);

//	@PostMapping
//	public ResponseEntity<Map<String, Object>> tranform(@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody String jsonstring) throws JsonMappingException, JsonProcessingException {
//		logger.info("Transform JSON");
//		try {
//			String outputObject = JsonObjectUtil.transformStringToJson(jsonstring);
//			ResponseEntityData responseEntityData = new ResponseEntityData();
//			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
//			responseEntityData.setMessage("Find all Devices");
//			Map<String, Object> data = new HashMap<>();
//			data.put("responseData", outputObject);
//			responseEntityData.setData(data);
//			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
//		} catch (RippsAdminException e) {
//			return new ResponseEntity<>(
//					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Transform JSON", null),
//					HttpStatus.FORBIDDEN);
//		}		
//	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> tranformXML(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@RequestBody String xmlString) {
		logger.info("Transform XML");
		try {
			String outputObject = null;
			try {
				outputObject = JsonObjectUtil.transformXmlToPackager(xmlString);
			} catch (ParserConfigurationException e) {
				e.printStackTrace();
			} catch (SAXException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Find all Devices");
			Map<String, Object> data = new HashMap<>();
			data.put("responseData", outputObject);
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Transform JSON", null),
					HttpStatus.FORBIDDEN);
		}
	}
}
