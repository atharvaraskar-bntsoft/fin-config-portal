package com.bnt.common.util.generic.rest.client;

import java.io.IOException;
import java.util.Calendar;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class PortalGenericRestClient<T, V> {

	private static final Logger LOGGER = LogManager.getLogger(PortalGenericRestClient.class);

	@Autowired(required = true)
	@Qualifier("restTemplatePortal")
	RestTemplate restTemplatePortal;

	RestTemplate restTemplateNonSSL;

	@Value("${monitoring.health.rest.connection.timout.in.seconds}")
	private String connectionTimeout;

	private int getConnectionTimeout() {
		return Integer.parseInt(this.connectionTimeout) * 1000;
	}

	public V execute(PortalRestApiRequest request, T data, Class<V> genericClass)
			throws ResourceAccessException, Exception {
		LOGGER.info("inside execute()*****..." + restTemplatePortal);
		if (restTemplatePortal == null) {
			var clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();
			// clientHttpRequestFactory.setHttpClient((HttpClient) CloseableHttpClient);
			// clientHttpRequestFactory.setReadTimeout(10000);
			clientHttpRequestFactory.setConnectionRequestTimeout(getConnectionTimeout());
			clientHttpRequestFactory.setConnectTimeout(getConnectionTimeout());
			restTemplateNonSSL = new RestTemplate(clientHttpRequestFactory);
		}
//			restTemplateNonSSL = new RestTemplate();
		ResponseErrorHandler errorHandler = errorHandler();
		restTemplatePortal.setErrorHandler(errorHandler);
		HttpHeaders header = new HttpHeaders();
		header.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<T> entity = new HttpEntity<>(data, header);

		LOGGER.info("fetch detail for endpoint...{}", request);
		LOGGER.info("before req time*******************************...{}", Calendar.getInstance().getTime());
		ResponseEntity<V> response = null;

		try {

			LOGGER.info("default restTemplate object value ...." + restTemplatePortal);
			response = restTemplatePortal.exchange(request.getRestApi(), request.getRequestType(), entity,
					genericClass);
			LOGGER.info("after req time1*******************************...{}", Calendar.getInstance().getTime());

			/*
			 * if( request.getRestApi().contains("http://")) {
			 * LOGGER.info("inside *restTemplateNonSSL***..."+restTemplateNonSSL); response
			 * = restTemplateNonSSL.exchange(request.getRestApi(), request.getRequestType(),
			 * entity, genericClass);
			 * LOGGER.info("after req time2*******************************...{}",Calendar.
			 * getInstance().getTime());
			 * 
			 * }else { LOGGER.info("inside ***restTemplatePortal**..."+restTemplatePortal);
			 * response = restTemplatePortal.exchange(request.getRestApi(),
			 * request.getRequestType(), entity, genericClass);
			 * LOGGER.info("after req time1*******************************...{}",Calendar.
			 * getInstance().getTime());
			 * 
			 * }
			 */
		} catch (RestClientException e) {
			LOGGER.info("after req time*******************************...{}", Calendar.getInstance().getTime());
			LOGGER.error("Exception occured during rest call:  " + e.getMessage());
		}

//		LOGGER.info("before req time...{}",Calendar.getInstance().getTime());
//		response = restTemplatePortal.exchange(request.getRestApi(), request.getRequestType(), entity,
//				genericClass);

		return response != null ? response.getBody() : null;
	}

	private ResponseErrorHandler errorHandler() {
		ResponseErrorHandler responseHandler = new ResponseErrorHandler() {

			@Override
			public boolean hasError(ClientHttpResponse response) throws IOException {

				if (response.getStatusCode() != HttpStatus.OK) {
					System.out.println(response.getStatusText());
				}
				return response.getStatusCode() == HttpStatus.OK ? false : true;
			}

			@Override
			public void handleError(ClientHttpResponse response) throws IOException {
				// TODO Auto-generated method stub

			}
		};
		return responseHandler;
	}

}
