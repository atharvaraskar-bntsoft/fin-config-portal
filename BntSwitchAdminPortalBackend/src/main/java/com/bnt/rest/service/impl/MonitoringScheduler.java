package com.bnt.rest.service.impl;

import java.util.Calendar;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import com.bnt.rest.dto.ComponentProfile;
import com.bnt.rest.dto.MonitoringData;
import com.bnt.rest.service.RestMonitoringService;
import com.bnt.service.mapper.MonitoringMapper;

import jakarta.annotation.PostConstruct;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
@EnableScheduling
public class MonitoringScheduler {

	@Autowired
	private RestMonitoringService restMonitoringService;

	private static final Logger LOGGER = LogManager.getLogger(MonitoringScheduler.class);

	List<ComponentProfile> componentProfile;

//	    @Scheduled(fixedDelayString = "${schedular.monitring.delay:60000}", initialDelayString = "${schedular.monitring.init.delay:10000}")
	@PostConstruct
	public void scheduleTaskWithFixedRate() {
		LOGGER.info("monitoring task start execution::::::{}", Calendar.getInstance().getTime());

		try {

			if (getComponentProfile() == null) {
				componentProfile = getRestMonitoringService().getComponentProfileMapping();
				setComponentProfile(componentProfile);
			}

			if (getComponentProfile() != null) {
				Object fetchMonitoringData = restMonitoringService.getMonitoringData(getComponentProfile());
				// if (fetchMonitoringData != null) {
				setMonitoringData(fetchMonitoringData);
				// }
			} else {
				setMonitoringData(null);
				// throw new RippsAdminException("Component profile mapping data missing.");
			}

		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("Exception in scheduleTaskWithFixedRate {}", e.getMessage());
		}
		LOGGER.info("monitoring task end execution::::::{}", Calendar.getInstance().getTime());
	}

	public Object individualComponentMonitoringDetail(MonitoringData monitoringData) {
		LOGGER.info("individualComponentMonitoringDetail task start execution::::::{}",
				Calendar.getInstance().getTime());

		try {

			if (getComponentProfile() == null) {
				componentProfile = getRestMonitoringService().getComponentProfileMapping();
				setComponentProfile(componentProfile);
			}

			if (getComponentProfile() != null) {
				Object fetchMonitoringData = restMonitoringService.getMonitoringData(getComponentProfile(),
						monitoringData);
				if (fetchMonitoringData != null) {
					setMonitoringData(fetchMonitoringData);
				}
			} else {
				setMonitoringData(null);
			}

		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("Exception in scheduleTaskWithFixedRate {}", e.getMessage());
		}
		LOGGER.info("individualComponentMonitoringDetail task end execution::::::{}", Calendar.getInstance().getTime());
		return getMonitoringData();

	}

	private void setMonitoringData(Object monitoringData) {
		MonitoringMapper.setMonitoringData(monitoringData);
	}

	public Object getMonitoringData() {
		return MonitoringMapper.getMonitoringData();
	}

	public List<ComponentProfile> getComponentProfile() {
		return componentProfile;
	}

	public void setComponentProfile(List<ComponentProfile> componentProfile) {
		this.componentProfile = componentProfile;
	}

	public RestMonitoringService getRestMonitoringService() {
		return restMonitoringService;
	}

	public void setRestMonitoringService(RestMonitoringService restMonitoringService) {
		this.restMonitoringService = restMonitoringService;
	}
}
