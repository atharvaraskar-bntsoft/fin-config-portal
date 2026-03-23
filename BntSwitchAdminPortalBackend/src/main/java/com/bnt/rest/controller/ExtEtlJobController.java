package com.bnt.rest.controller;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.security.KeyStore;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManagerBuilder;
import org.apache.hc.client5.http.io.HttpClientConnectionManager;
import org.apache.hc.client5.http.ssl.NoopHostnameVerifier;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.RippsRestConstant;
import com.bnt.rest.dto.ExtEtlJobDto;
import com.bnt.rest.service.ExtEtlJobService;

import jakarta.servlet.http.HttpServletRequest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/ext-etl-job")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ExtEtlJobController {

	private static final String FIND_ALL_EXT_ETL_JOB = "Find all Ext Etl Job";

	private static final Logger logger = LogManager.getLogger(ExtEtlJobController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private ExtEtlJobService extEtlJobService;

	@Autowired
	private RestTemplate restTemplate;

	@Value("${ext.url}")
	private String extUrl;

	@GetMapping
	public ResponseEntity<Map<String, Object>> findAllExtEtlJob(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info(FIND_ALL_EXT_ETL_JOB);
		try {
			Map<String, Object> requestParamMap = HttpCommons.createRequestParamMap(request);
			ResponseWrapper pageJPAData = extEtlJobService.findAllExtEtlJob(requestParamMap);
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(FIND_ALL_EXT_ETL_JOB);
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("extEtlJobList", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, FIND_ALL_EXT_ETL_JOB, null),
					HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> getExtEtlJobById(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id) {
		logger.info("Find device ID:{}", id);
		ExtEtlJobDto extEtlJobDto = extEtlJobService.findExtEtlJobById(id);
		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Find Device");
		responseEntityData.setData(extEtlJobDto);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Map<String, Object>> updateProperties(
			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @PathVariable("id") int id,
			@RequestBody ExtEtlJobDto extEtlJobDto) {
		String requestToken = RippsUtility.getToken(request);
		try {
			Integer jobId = extEtlJobService.updateJob(extEtlJobDto, id, requestToken);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, "Job Updated", jobId), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Job Update Failed", null),
					HttpStatus.OK);
		}
	}

	@GetMapping(value = "/schedule/{id}")
	public ResponseEntity<Map<String, Object>> scheduleEtlJob(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("id") int id) {
		logger.info("ScheduleByID {}", id);
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
			HttpEntity<String> entity = new HttpEntity<>(headers);
			String requiredUrl = extUrl + "/" + "schedule" + "/" + id;
			String response = restTemplate.exchange(requiredUrl, HttpMethod.PUT, entity, String.class).getBody();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(response);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"System Error: Please Contact Admin", null), HttpStatus.OK);
		}
	}

	@Value("${extractor.ssl.keystore.password}")
	private String keystorePassword;

	@Value("${tls.version}")
	private String tlsVersion;

	@Value("${extractor.ssl.truststore.path}")
	private String truststore;

	@Value("${extractor.ssl.identity.path}")
	private String identityPath;

	@Value("${extractor.ssl.enabled}")
	private String isExtractorOverSSL;

	private RestTemplate ssl() {
		try {
			logger.info("Extractor ssl() method called for SSL connection.");
			String keyStoreType = KeyStore.getDefaultType();
			Path trustStorePath = Paths.get(truststore);
			KeyStore trustStore = KeyStore.getInstance(keyStoreType);
			try (InputStream trustStoreStream = Files.newInputStream(trustStorePath, StandardOpenOption.READ)) {
				trustStore.load(trustStoreStream, keystorePassword.toCharArray());
			}
			String trustManagerFactoryAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
			TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(trustManagerFactoryAlgorithm);
			trustManagerFactory.init(trustStore);

			Path path = Paths.get(identityPath);
			KeyStore identity = KeyStore.getInstance(keyStoreType);
			try (InputStream identityStream = Files.newInputStream(path, StandardOpenOption.READ)) {
				identity.load(identityStream, keystorePassword.toCharArray());
			}
			String keyManagerFactoryAlgorithm = KeyManagerFactory.getDefaultAlgorithm();
			KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(keyManagerFactoryAlgorithm);
			keyManagerFactory.init(identity, keystorePassword.toCharArray());

			SSLContext sslContext = SSLContext.getInstance(tlsVersion);
			sslContext.init(keyManagerFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), null);

			SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(sslContext,
					NoopHostnameVerifier.INSTANCE);
			HttpClientConnectionManager connectionManager = PoolingHttpClientConnectionManagerBuilder.create()
					.setSSLSocketFactory(socketFactory).build();
			CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(connectionManager).build();

			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
			requestFactory.setHttpClient(httpClient);
			return new RestTemplate(requestFactory);

		} catch (Exception e) {
			logger.error(e);
			return null;
		}
	}

	@GetMapping(value = "/{action}/{jobName}/{jobGroup}")
	public ResponseEntity<Map<String, Object>> deleteEtlJob(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("action") String action, @PathVariable("jobName") String jobName,
			@PathVariable("jobGroup") String jobGroup) {
		logger.info("Delet Elt Job {} : {}", jobName, jobGroup);
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
			HttpEntity<String> entity = new HttpEntity<>(headers);
			List<String> list = Arrays.asList("pause", "resume", "delete");
			if (!list.contains(action)) {
				throw new RippsAdminException("Action not supported");
			}

			String requiredUrl = extUrl + "/" + action + "/" + jobName + "/" + jobGroup;
			String response = null;
			RestTemplate restTemplateSSl = ssl();

			if (Boolean.TRUE.equals(Boolean.valueOf(isExtractorOverSSL)) && null != restTemplateSSl) {
				logger.info("Extractor connection over SSL.");
				response = restTemplateSSl.exchange(requiredUrl, HttpMethod.PUT, entity, String.class).getBody();
			} else {
				logger.info("Extractor connection over Non SSL.");
				response = restTemplate.exchange(requiredUrl, HttpMethod.PUT, entity, String.class).getBody();
			}

//			String requiredUrl = extUrl + "/" + action + "/" + jobName + "/" + jobGroup;
//			String response = restTemplate.exchange(requiredUrl, HttpMethod.PUT, entity, String.class).getBody();
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(response);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"System Error: Please Contact Admin", null), HttpStatus.OK);
		}
	}

	@GetMapping(value = "/{action}/{id}")
	public ResponseEntity<Map<String, Object>> getEtlJob(@RequestHeader(value = "X-Auth-Token") String xAuthToken,
			@PathVariable("action") String action, @PathVariable("id") int id) {
		logger.info("get Elt Job {} : {}", id);
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
			HttpEntity<String> entity = new HttpEntity<>(headers);
			List<String> list = Arrays.asList("schedule", "stop", "pause", "resume");
			if (action.equalsIgnoreCase("start")) {
				action = "schedule";
			}
			if (!list.contains(action)) {
				throw new RippsAdminException("Action not supported");
			}

			String requiredUrl = extUrl + "/" + action + "/" + id;
			String response = null;
			RestTemplate restTemplateSSl = ssl();

			if (Boolean.TRUE.equals(Boolean.valueOf(isExtractorOverSSL)) && null != restTemplateSSl) {
				logger.info("Extractor connection over SSL.");
				response = restTemplateSSl.exchange(requiredUrl, HttpMethod.PUT, entity, String.class).getBody();
			} else {
				logger.info("Extractor connection over Non SSL.");
				response = restTemplate.exchange(requiredUrl, HttpMethod.PUT, entity, String.class).getBody();
			}

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage(response);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
					HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"System Error: Please Contact Admin", null), HttpStatus.OK);
		}
	}
}
