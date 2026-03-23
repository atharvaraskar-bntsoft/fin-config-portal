package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SwitchClusterDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.SwitchCluster;
import com.bnt.rest.jpa.repository.SwitchClusterPersistenceHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.impl.SwitchClusterRepositoryImpl;
import com.bnt.rest.service.SwitchClusterServiceRest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class SwitchClusterServiceImpl implements SwitchClusterServiceRest {

	@Autowired
	private SwitchClusterPersistenceHelper switchClusterPersistenceHelper;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private SwitchClusterRepositoryImpl switchClusterRepositoryImpl;

	private static final Logger logger = LogManager.getLogger(SwitchClusterServiceImpl.class);

	@Override
	public ResponseWrapper getSwitchCluster(Map<String, Object> requestParamMap) {
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("status")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "locked");
		}
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<SwitchCluster> switchClusterPage = null;
		switchClusterPage = switchClusterPersistenceHelper.findAll(pageable);
		List<SwitchClusterDto> list = new ArrayList<>();
		for (SwitchCluster switchCluster : switchClusterPage.getContent()) {
			SwitchClusterDto dto = ObjectMapper.mapToDto(switchCluster, SwitchClusterDto.class);
			list.add(dto);
		}
		long count = switchClusterPersistenceHelper.count();
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(switchClusterPage, count);
		pageJPAData.setContent(list);
		return pageJPAData;
	}

	@Override
	public SwitchCluster findSwitchClusterById(int id) {
		return switchClusterPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Integer addSwitch(SwitchClusterDto clusterDto, String requestToken) {

		clusterDto.setCreatedBy(authSessionService.getCreatedBy());
		clusterDto.setCreatedOn(RippsUtility.getCurrentTimeStamp());
		clusterDto.setClusterKey("0000");
		sanitizeSwitchCluster(clusterDto);
		boolean validName = switchClusterRepositoryImpl.validateName(clusterDto.getDataCentre());
		if (!validName) {
			throw new RippsAdminException("Data Centre already exist");
		}
		SwitchCluster cluster = ObjectMapper.mapToEntity(clusterDto, SwitchCluster.class);
		cluster.setClusterkey(clusterDto.getClusterKey());
		SwitchCluster cluster1 = switchClusterPersistenceHelper.save(cluster);
		int id = cluster1.getId();
		int b = Integer.toString(id).length();
		if (b > 4) {
			throw new RippsAdminException("key is too long");
		} else {
			String key = String.format("%04d", id);
			cluster1.setClusterkey(key);
		}
		return switchClusterPersistenceHelper.save(cluster1).getId();
	}

	@Override
	public SwitchCluster updateSwitchCluster(SwitchClusterDto clusterDto, SwitchCluster cluster, String requestToken) {
		SwitchCluster savedCluster = null;
		try {
			sanitizeSwitchCluster(clusterDto);
			cluster.setRegion(clusterDto.getRegion());
			cluster.setActive(clusterDto.getActive());
			savedCluster = switchClusterPersistenceHelper.save(cluster);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Failed to update");
		}
		return savedCluster;
	}

	private void sanitizeSwitchCluster(SwitchClusterDto switchClusterDto) {
		switchClusterDto.setClusterKey(HTMLInjectionUtil.validateHTMLInjection(switchClusterDto.getClusterKey()));
		switchClusterDto.setRegion(HTMLInjectionUtil.validateHTMLInjection(switchClusterDto.getRegion()));
		switchClusterDto.setDataCentre(HTMLInjectionUtil.validateHTMLInjection(switchClusterDto.getDataCentre()));
	}

}
