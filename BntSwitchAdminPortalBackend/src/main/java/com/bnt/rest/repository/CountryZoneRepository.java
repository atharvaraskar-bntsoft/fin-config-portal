package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.CountryZoneSchemeDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CountryZoneRepository {

	ResponseWrapper findAllCountryZoneScheme(Map<String, Object> requestParamMap);

	CountryZoneSchemeDto findOneDto(int id);

	boolean findAndUpdateEntityById(int id, String zoneCode);

	Integer saveEntity(CountryZoneSchemeDto entityDto);

}
