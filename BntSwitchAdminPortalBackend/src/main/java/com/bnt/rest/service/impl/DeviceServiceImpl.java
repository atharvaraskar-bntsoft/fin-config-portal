package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.Predicate;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DeviceDto;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.QDevice;
import com.bnt.rest.jpa.repository.DevicePersistenceRepository;
import com.bnt.rest.repository.DeviceRepository;
import com.bnt.rest.service.DeviceService;
import com.bnt.rest.service.impl.ListService;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class DeviceServiceImpl implements DeviceService {

	private static final Logger log = LogManager.getLogger(DeviceServiceImpl.class.getName());

	@Autowired
	private DevicePersistenceRepository jpaRepository;

	@Autowired
	private DeviceRepository deviceRepository;

	@Autowired
	private ListService listService;

	@Override
	public ResponseWrapper getDeviceList(Map<String, Object> requestParamMap) {
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("name")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "code");
		}

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Device> devicePage = null;
		if (filters == null) {
			devicePage = jpaRepository.findDeviceByDeleted('0', pageable);
		} else {
			devicePage = deviceRepository.findFilterData(pageable, filters);
		}

		List<DeviceDto> list = new ArrayList<>();
		for (Device device : devicePage.getContent()) {

			DeviceDto dto = null;
			try {
				dto = ObjectMapper.mapToDto(device, DeviceDto.class);
			}

			catch (Exception e) {
				log.error(e.getMessage(), e);

			}

			list.add(dto);
		}
		long count = countWithDeleted('0');
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(devicePage, count);
		pageJPAData.setContent(list);
		return pageJPAData;
	}

	@Override
	public Device findDeviceById(int id) {
		Optional<Device> optDevice = jpaRepository.findById(id);
		if (optDevice.isPresent()) {
			return optDevice.get();
		}
		return null;
	}

	private long countWithDeleted(Character deleted) {
		QDevice qDevice = QDevice.device;
		Predicate deletePredicate = qDevice.deleted.eq(deleted);
		return jpaRepository.count(deletePredicate);
	}

	@Override
	public Map<String, Object> getFilterData() {
		List<DtoWrapper> institutionList = listService.getAllMerchantInstitutionList();
		List<DtoWrapper> merchantList = listService.getAllMerchantList();
		List<DtoWrapper> locationList = listService.getAllLocationList();
		List<IdAndNameStringWrapper> statusList = ListMapper.getStatus();

		Map<String, Object> map = new HashMap<>();
		map.put("status", statusList);
		map.put("merchantGroup", institutionList);
		map.put("merchant", merchantList);
		map.put("location", locationList);
		return map;
	}
}