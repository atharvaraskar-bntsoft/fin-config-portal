package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.management.MBeanServerConnection;
import javax.management.ObjectName;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.monitoring.jmx.JmxMetaInfo;
import com.bnt.rest.service.AlertService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AlertServiceImpl implements AlertService {

	@Value("${monitoring.core.helth.jmx.url}")
	private String url;

	@Value("${bswitchLicence.type}")
	private String health;

	@Value("${bswitchLicence.method.LicenceDetails}")
	private String method;

	private static final Logger LOGGER = LogManager.getLogger(AlertServiceImpl.class);

	@Override
	public ResponseWrapper getAlertMessage(Map<String, Object> requestParamMap) {

		JmxMetaInfo jmxMetaInfo = null;
		ResponseWrapper responseWrapper = new ResponseWrapper();
		if (jmxMetaInfo != null) {
			MBeanServerConnection conn = jmxMetaInfo.getMbsc();

			List<AlertDto> alertList = new ArrayList<>();

			AlertDto alertDto = getAlertForLicenceExpiry(conn);

			alertList.add(alertDto);
			responseWrapper.setContent(alertList);
		}
		return responseWrapper;
	}

	private AlertDto getAlertForLicenceExpiry(MBeanServerConnection conn) {
		AlertDto alertDto = new AlertDto();
		String message = getBNTLicence(conn);
		alertDto.setComponent("Licence Expiry");
		alertDto.setMessage(message);
		return alertDto;
	}

	private String getBNTLicence(MBeanServerConnection conn) {
		ObjectName name = null;
		String message = null;
		try {
			name = new ObjectName(health);
			if (null != conn.invoke(name, method, null, null)) {
				message = conn.invoke(name, method, null, null).toString();
			}

		} catch (Exception e1) {
			LOGGER.error("Exception occuring while fetching Licence attribute jmx data for url ");
		}
		return message;
	}

}

class AlertDto {

	private String message;

	private String component;

	public String getComponent() {
		return component;
	}

	public void setComponent(String component) {
		this.component = component;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
