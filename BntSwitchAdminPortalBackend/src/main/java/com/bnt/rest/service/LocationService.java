package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.Location;
import com.bnt.rest.wrapper.dto.AddressWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface LocationService {

	public ResponseWrapper getAllLocations(Map<String, Object> requestParamMap);

	public Location findLocationById(int id);

	public List<AddressWrapper> getAddressList();

	public Map<String, Object> getFilterData();
}
