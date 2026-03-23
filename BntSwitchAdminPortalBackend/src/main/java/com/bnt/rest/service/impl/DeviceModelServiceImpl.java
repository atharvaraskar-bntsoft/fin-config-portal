package com.bnt.rest.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeviceModelDto;
import com.bnt.rest.entity.DeviceModel;
import com.bnt.rest.repository.DeviceModelConfigurationRepository;
import com.bnt.rest.repository.DeviceModelRepository;
import com.bnt.rest.service.DeviceModelService;
import com.bnt.service.mapper.DeviceModelMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DeviceModelServiceImpl implements DeviceModelService {

	private static Log logger = LogFactory.getLog(DeviceModelServiceImpl.class.getName());

	@Autowired
	private DeviceModelRepository deviceModelRepository;

	@Autowired
	DeviceModelConfigurationRepository deviceModelConfigurationRepository;

	@Override
	public DeviceModelDto getDataModelById(Integer id) {
		DeviceModel deviceModel = deviceModelRepository.getDeviceModelById(id);
		DeviceModelDto deviceModelDto = null;
		if (deviceModel != null) {
			deviceModelDto = ObjectMapper.map(deviceModel, DeviceModelDto.class);
		}
		return deviceModelDto;
	}

	// Unused Method
	/*
	 * public Integer getLatestVersion(Integer deviceTypeId, String modelName) {
	 * logger.info("inside getLatestVersion with deviceTypeId:" + deviceTypeId +
	 * " modelName:" + modelName); Integer version = null; version =
	 * deviceModelConfigurationRepository.getMaxVersionByDeviceTypeAndModelName(
	 * deviceTypeId, modelName); version = RippsUtility.getVersion(version); if
	 * (version == 0) { version = RippsUtility.getVersion(version); } return
	 * version; }
	 */

	// Unused MEthod
	/*
	 * public Integer getLatestVersionByDeviceModelId(Integer deviceModelId) {
	 * logger.info("inside getLatestVersionByDeviceModelId with deviceModelId:" +
	 * deviceModelId); Integer version =
	 * deviceModelConfigurationRepository.getMaxVersionByDeviceModelId(deviceModelId
	 * ); version = RippsUtility.getVersion(version); if (version == 0) { version =
	 * RippsUtility.getVersion(version); } return version; }
	 */

	@Override
	public ResponseWrapper getPagableDeviceModel(Map<String, Object> requestParamMap) {
		logger.info("inside getPagableConfigUIList");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<DeviceModel> pageList = deviceModelRepository.getPagbleDeviceModel(pageable);
		List<DeviceModelDto> listUI = ObjectMapper.mapListObjectToListDto(pageList.getContent(), DeviceModelDto.class);
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(pageList, pageList.getTotalElements());
		pageJPAData.setContent(listUI);
		return pageJPAData;
	}

	@Override
	public boolean validateDeviceModelName(Integer deviceTypeId, String modelName) {
		logger.info("inside validateDeviceModelName");
		boolean existModelName = false;
		if (deviceTypeId == null || deviceTypeId < 1) {
			throw new RippsAdminException("Invalid in device-type");
		}
		if (StringUtil.isNotNullOrBlank(modelName)) {
			DeviceModel deviceModelList = deviceModelRepository.getDeviceModelByDeviceTypeAndModelName(deviceTypeId,
					modelName);
			if (deviceModelList == null) {
				existModelName = true;
			}
		} else {
			throw new RippsAdminException("Model-Name is invalid");
		}
		return existModelName;
	}

	@Override
	public List<DeviceModelDto> findAll() {
		List<DeviceModelDto> deviceModelDtoList = null;
		List<DeviceModel> deviceModelList = (List<DeviceModel>) deviceModelRepository.findAll();
		if (deviceModelList != null) {
			deviceModelDtoList = ObjectMapper.mapListObjectToListDto(deviceModelList, DeviceModelDto.class);
		}
		return deviceModelDtoList;
	}

	@Override
	public Map<String, List<DeviceModelDto>> getDeviceTypeDeviceModel() {
		logger.info("inside getDeviceTypeDeviceModel");
		List<DeviceModelDto> deviceModelDtoList = findAll();
		Map<String, List<DeviceModelDto>> deviceMap = DeviceModelMapper.getDeviceTypeDeviceModel(deviceModelDtoList);
		logger.info("completed getDeviceTypeDeviceModel");
		return deviceMap;
	}

}
