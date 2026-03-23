package com.bnt.rest.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Controller
@RestController
@RequestMapping("/meta-info")
@CrossOrigin(origins = "${crossOriginUrl}")
public class MetaInfoController {

	private static final Logger logger = LogManager.getLogger(MetaInfoController.class);

	@Value("${keycloak.url}")
	private String keyCloakUrl;

	@Value("${keycloak.realm}")
	private String keyCloakRealm;

	@Value("${keycloak.client.id}")
	private String keyCloakClientId;

	@Value("${spring.jpa.properties.hibernate.jdbc.time_zone}")
	private String timeZone;

	@Value("${session.expiry.time}")
	private String sessionExpiryTime;

	@Value("${time.interval.gap.for.txnlog}")
	private String intervalForTxnlog;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getMetaInfo(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			HttpServletRequest request) {
		logger.info("Find all Alerts list");

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		Map<String, Object> data = new HashMap<>();

		data.put("keycloak-info", getKeycloakInfo());
		data.put("timezone-info", timeZone);
		data.put("sessionExpiryTime", sessionExpiryTime);
		data.put("intervalForTxnlog", intervalForTxnlog);
		responseEntityData.setData(data);

		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	private Map<String, String> getKeycloakInfo() {
		Map<String, String> keycloakInfo = new HashMap<>();
		keycloakInfo.put("url", keyCloakUrl);
		keycloakInfo.put("realm", keyCloakRealm);
		keycloakInfo.put("clientId", keyCloakClientId);
		return keycloakInfo;
	}
}
