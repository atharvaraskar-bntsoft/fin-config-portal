package com.bnt.rest.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.RippsUtility;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Controller
@RestController
@RequestMapping("/portal-health")
@CrossOrigin(origins = "${crossOriginUrl}")
public class PortalHealthController {

	/**
	 * @Autowired private HealthEndpoint healthEndpoint;
	 * 
	 */
	@GetMapping
	public ResponseEntity<Map<String, Object>> getPortalHealth() {
		/**
		 * Health health = healthEndpoint.health();
		 * 
		 * SystemHealth systemHealth=null; Health health=null; CompositeHealth
		 * compositeHealth=null; Map<String, HealthComponent> component=null;
		 * HealthComponent healthComponent= healthEndpoint.health();
		 * 
		 * 
		 * responseEntityData.setStatus(RippsRestConstant.SUCCESS); Map<String, Object>
		 * data = new HashMap<>();
		 * 
		 * if(healthComponent instanceof SystemHealth){ systemHealth=(SystemHealth)
		 * healthComponent; component=systemHealth.getComponents();
		 * data.put("healthDetails", component); } else if(healthComponent instanceof
		 * Health) { health=(Health)healthComponent; Map<String, Object>
		 * comp=health.getDetails(); data.put("healthDetails", health.getDetails()); }
		 * if(healthComponent instanceof CompositeHealth) {
		 * compositeHealth=(CompositeHealth)healthComponent;
		 * component=compositeHealth.getComponents(); data.put("healthDetails",
		 * component); } // data.put("healthDetails", healthComponent);
		 * responseEntityData.setData(data);
		 */
		ResponseEntityData responseEntityData = new ResponseEntityData();
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}
}
