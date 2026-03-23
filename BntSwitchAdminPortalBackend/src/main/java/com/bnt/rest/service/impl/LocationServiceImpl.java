package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.LocationDto;
import com.bnt.rest.entity.Location;
import com.bnt.rest.jpa.repository.LocationDetailPersistenceHelper;
import com.bnt.rest.jpa.repository.LocationPersistenceHelper;
import com.bnt.rest.repository.LocationRepository;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.service.LocationService;
import com.bnt.rest.wrapper.dto.AddressWrapper;
import com.bnt.rest.wrapper.dto.CoordinateDto;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class LocationServiceImpl implements LocationService {
	private static final Logger logger = LogManager.getLogger(LocationServiceImpl.class.getName());

	@Autowired
	private LocationPersistenceHelper locationPersistenceRepository;

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private LocationDetailPersistenceHelper locationDetailHelper;

	@Autowired
	private ListService listService;

	@Override
	public ResponseWrapper getAllLocations(Map<String, Object> requestParamMap) {
		logger.info("Fetch all Locations list");
		String sortColumn;
		if (requestParamMap.get(ParameterConstant.SORT_COLUMN) != null) {

			sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
			if (sortColumn.equalsIgnoreCase("status")) {
				requestParamMap.put(ParameterConstant.SORT_COLUMN, "status1");
			}

		}

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Location> institutionPage = null;
		if (filters == null) {
			institutionPage = locationPersistenceRepository.findLocationByDeleted('0', pageable);
		} else {
			institutionPage = locationRepository.getFilterData(pageable, filters);
		}
		List<LocationDto> locationList = new ArrayList<>();
		for (Location location : institutionPage.getContent()) {
			LocationDto dto = ObjectMapper.map(location, LocationDto.class);
			Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
			if (dto.getExpiryOn().compareTo(currentTimeStamp) < 0) {
				dto.setLocked('1');
			}
			CoordinateDto dto2 = new CoordinateDto();
			dto2.setLat(location.getLatitude());
			dto2.setLng(location.getLongitude());
			dto.setCoordinates(dto2);
			dto.setTotalDevice(location.getTotalDevice());
			locationList.add(dto);
		}
		Page<Location> count = locationPersistenceRepository.findLocationByDeleted('0', null);
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(institutionPage, count.getContent().size());
		pageJPAData.setContent(locationList);
		return pageJPAData;

	}

	@Override
	public Location findLocationById(int id) throws RippsAdminRestException {
		return locationPersistenceRepository.findById(id).orElse(null);
	}

	@Override
	public List<AddressWrapper> getAddressList() {
		List<Object[]> detailList = locationDetailHelper.findCityAndCountry();
		List<AddressWrapper> addressList = new ArrayList<>();
		for (Object[] detail : detailList) {
			AddressWrapper wrapperCity = new AddressWrapper();
			ArrayList<String> listCity = new ArrayList<>();
			if (detail[0] != null) {
				listCity.add(detail[0].toString());
			}
			if (detail[1] != null) {
				listCity.add(detail[1].toString());
			}
			wrapperCity.setName(listCity);
			wrapperCity.setType("city");

			addressList.add(wrapperCity);
		}
		return addressList;

	}

	@Override
	public Map<String, Object> getFilterData() {
		List<DtoWrapper> institutionList = listService.getAllMerchantInstitutionList();
		List<DtoWrapper> merchantList = listService.getAllMerchantList();
		List<IdAndNameStringWrapper> statusList = ListMapper.getStatus();
		List<AddressWrapper> addressList = getAddressList();
		Map<String, Object> map = new HashMap<>();
		map.put("status", statusList);
		map.put("merchantGroup", institutionList);
		map.put("merchant", merchantList);
		map.put("address", addressList);
		return map;
	}

}
