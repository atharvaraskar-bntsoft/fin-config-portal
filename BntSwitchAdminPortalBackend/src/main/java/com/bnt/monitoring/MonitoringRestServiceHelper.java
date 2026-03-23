package com.bnt.monitoring;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.bnt.common.util.generic.rest.client.PortalGenericRestClient;
import com.bnt.common.util.generic.rest.client.PortalRestApiRequest;
import com.bnt.rest.dto.ComponentProfile;
import com.bnt.rest.dto.ComponentProfileMapping;
import com.bnt.rest.dto.MonitoringData;
import com.bnt.rest.dto.RestMonitoringData;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class MonitoringRestServiceHelper {

	protected static final Logger LOGGER = LogManager.getLogger(MonitoringRestServiceHelper.class);

	private static PortalGenericRestClient<String, String> portalGenericRestClient;
	private static PortalGenericRestClient<String, Map> portalGenericRestClientMap;

	@Autowired
	public MonitoringRestServiceHelper(PortalGenericRestClient<String, String> portalGenericRestClient,
			PortalGenericRestClient<String, Map> portalGenericRestClientMap) {
		MonitoringRestServiceHelper.portalGenericRestClient = portalGenericRestClient;
		MonitoringRestServiceHelper.portalGenericRestClientMap = portalGenericRestClientMap;
	}

	public static List<MonitoringData> getMonitoringHealthData(String restUrl) {
		LOGGER.info("inside getMonitoringHelthData()...");
		RestMonitoringData data = null;
		try {
			Optional<String> responseBody = MonitoringRestServiceHelper.restGetApiResponse(restUrl);
			ObjectMapper mapper = new ObjectMapper();
			try {
				data = mapper.readValue(responseBody.get(), RestMonitoringData.class);
			} catch (Exception e) {
				LOGGER.error(
						"error occured while getting response in getMonitoringHelthData()for url: {} , error is :{}",
						restUrl, e.getMessage());
			}
		} catch (Exception e) {
			LOGGER.error("error occured while getting response in getMonitoringHelthData()for url: {} , error is :{}",
					restUrl, e.getMessage());
		}

		return data.getMonitoringData();

	}

	public static List<ComponentProfile> getComponentProfileMapping(String restUrl) {
		LOGGER.info("inside getComponentProfileMapping()...");
		ComponentProfileMapping data = null;
		try {
			Optional<String> responseBody = restGetApiResponse(restUrl);
			ObjectMapper mapper = new ObjectMapper();
			try {
				if (responseBody != null && responseBody.isPresent())
					data = mapper.readValue(responseBody.get(), ComponentProfileMapping.class);
			} catch (Exception e) {
				LOGGER.error(
						"error occured while getting response in getComponentProfileMapping()for url: {} , error is :{}",
						restUrl, e.getMessage());
			}
		} catch (Exception e) {
			LOGGER.error(
					"error occured while getting response in getComponentProfileMapping()for url: {} , error is :{}",
					restUrl, e.getMessage());
		}

		return data != null ? data.getComponentProfileMapping() : null;
	}

	public static Optional<String> restGetApiResponse(String url) {
		LOGGER.info("inside restGetApiResponse()...");
		try {
			Optional<Object> response = Optional.ofNullable(
					portalGenericRestClient.execute(new PortalRestApiRequest(url, HttpMethod.GET), "", String.class));
			if (response.isEmpty())
				LOGGER.error("Unable to get response for endpoint:  {}", url);
			else
				LOGGER.info("received respnse:  {}", response.get().toString());
			return response.isEmpty() ? null : Optional.ofNullable(response.orElse(null).toString());
		} catch (Exception e) {
			LOGGER.error("error occured while getting response in restGetApiResponse()for url: {} , error is :{}", url,
					e);
		}
		return null;
	}

	@SuppressWarnings("rawtypes")
	public static Optional<Map> restGetApiResponseMap(String url) {
		LOGGER.info("restGetApiResponseMap for url {}", url);
		try {
			return Optional.ofNullable(
					portalGenericRestClientMap.execute(new PortalRestApiRequest(url, HttpMethod.GET), " ", Map.class));
		} catch (ResourceAccessException e) {
			LOGGER.error("error occured while getting response in restGetApiResponseMap()for url: {} , error is :{}",
					url, e.getMessage());
		} catch (Exception e) {
			LOGGER.error("error occured while getting response in restGetApiResponseMap():for url: {} , error is :{}",
					url, e.getMessage());
		}
		return null;
	}

	public static Optional<String> restPostApiResponse(String url, String bodyJson) {
		LOGGER.info("restPostApiResponse for url {}", url);
		try {
			return Optional.ofNullable(portalGenericRestClient.execute(new PortalRestApiRequest(url, HttpMethod.POST),
					bodyJson, String.class));
		} catch (ResourceAccessException e) {
			LOGGER.error("error occured while getting response in restPostApiResponse()for url: {} , error is :{}", url,
					e.getMessage());
		} catch (Exception e) {
			LOGGER.error("error occured while getting response in restPostApiResponse()for url: {} , error is :{}", url,
					e.getMessage());
		}
		return null;
	}
}
