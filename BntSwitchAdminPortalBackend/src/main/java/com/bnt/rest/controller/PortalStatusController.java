package com.bnt.rest.controller;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.util.DatabaseUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StreamUtils;
import com.bnt.constant.RippsRestConstant;
import com.bnt.main.MainApp;
import com.bnt.rest.wrapper.dto.PropertyValueWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/portal-status")
@CrossOrigin(origins = { "${crossOriginUrl}" })
public class PortalStatusController {
	private static final Logger logger = LogManager.getLogger(PortalStatusController.class);

	@Value("${major}")
	private String major;

	@Value("${minor}")
	private String minor;

	@Value("${security}")
	private String security;

	@Value("${maintenance}")
	private String maintenance;

	@Value("${monitoring.helth.jmx.url}")
	private String monitoringHazlecast;

	@Value("${monitoring.core.helth.jmx.url}")
	private String monitoringCore;

	@Value("${spring.jpa.properties.hibernate.default_schema}")
	String schemaName;

	@Value("${ui.code.date}")
	private String uiCodeDate;

	@Autowired
	Environment environment;

	@PersistenceContext
	EntityManager entityManager;

	@Autowired
	DataSource dataSource;

	@Autowired
	private HttpServletRequest request;

	List<String> tableList;

	List<String> serverPortList;
	List<String> listInfoUrl;
	List<String> versionDetail;
	List<String> monitoringHazlecastDetail;
	List<String> monitoringCoreDetail;
	List<String> uiCodeDateList;

	private static Date classLoadingTime = new Date();

	@SuppressWarnings("rawtypes")
	@GetMapping
	public ResponseEntity<Map<String, Object>> listAllData() {
		logger.info("Find all Portal Status");
		Map<String, List> dataList = new HashMap<>();
		String version = getClass().getPackage().getImplementationVersion();
		logger.info("Version from MANIFEST.MF: {}", version);
		if (version == null) {
			version = MainApp.class.getPackage().getImplementationVersion();
			logger.info("version from MainApp class: {}", version);
		}
		if (version == null) {
			version = major + "." + minor + "." + security + "." + maintenance;
		}
		logger.info("final version: {}", version);
		String monitoringHazlecastUrl = monitoringHazlecast;

		String buildDateInfo = "";

		buildDateInfo = "Last Server started date : " + classLoadingTime.toString();

		List<String> tabbleList = getMetadata();
		List<PropertyValueWrapper> jvmDetailList = getJvmDetail();
		List<PropertyValueWrapper> dbDetailList = getDBDetailList();
		serverPortList = new ArrayList<>();
		listInfoUrl = new ArrayList<>();
		versionDetail = new ArrayList<>();
		monitoringHazlecastDetail = new ArrayList<>();
		monitoringCoreDetail = new ArrayList<>();
		uiCodeDateList = new ArrayList<>();

		String actuatorHealthUrl = request.getRequestURL().substring(0, request.getRequestURL().indexOf("rest") + 4)
				+ "/actuator/health";
		String swaggerUrl = request.getRequestURL().substring(0, request.getRequestURL().indexOf("rest") + 4)
				+ "/swagger-ui.html";
		listInfoUrl.add(actuatorHealthUrl);
		listInfoUrl.add(swaggerUrl);

		String serverPort = environment.getProperty("local.server.port");
		serverPortList.add(serverPort);
		versionDetail.add(version + " " + buildDateInfo);
		monitoringHazlecastDetail.add(monitoringHazlecastUrl);
		monitoringCoreDetail.add(monitoringHazlecastUrl);
		uiCodeDateList.add(uiCodeDate);
		dataList.put("tabbleList", tabbleList);
		dataList.put("jvmDetailList", jvmDetailList);
		dataList.put("dbDetailList", dbDetailList);
		dataList.put("serverPortList", serverPortList);

		dataList.put("listInfoUrl", listInfoUrl);
		dataList.put("versionDetail", versionDetail);
		dataList.put("monitoringHazlecastDetail", monitoringHazlecastDetail);
		dataList.put("monitoringCoreDetail", monitoringCoreDetail);
		dataList.put("uiCodeDate", uiCodeDateList);

		ResponseEntityData responseEntityData = new ResponseEntityData();
		responseEntityData.setStatus(RippsRestConstant.SUCCESS);
		responseEntityData.setMessage("Schema exported succcesfuly");
		responseEntityData.setData(dataList);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
	}

	public List<String> getMetadata() {
		return new ArrayList<>();
	}

	private List<PropertyValueWrapper> getJvmDetail() {
		List<PropertyValueWrapper> jvmDetailList = new ArrayList<>();
		jvmDetailList.add(new PropertyValueWrapper("Vendor", environment.getProperty("java.specification.vendor")));
		jvmDetailList.add(new PropertyValueWrapper("VM Name", environment.getProperty("java.vm.name")));
		jvmDetailList
				.add(new PropertyValueWrapper("Java Runtime Version", environment.getProperty("java.runtime.version")));
		jvmDetailList.add(new PropertyValueWrapper("Java Specification Version",
				environment.getProperty("java.specification.version")));

		return jvmDetailList;
	}

	private List<PropertyValueWrapper> getDBDetailList() {

		List<PropertyValueWrapper> dbDetailList = null;
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			Map<String, String> dbProperties = DatabaseUtil.getDatabaseProperties(conn.getMetaData().getURL());
			dbDetailList = StreamUtils.converMapToPropertyValueWrapperList(dbProperties);

		} catch (SQLException e) {
			logger.error("Error in connecting with database");
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					logger.error(e.getMessage(), e);
				}
			}
		}
		return dbDetailList;
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
