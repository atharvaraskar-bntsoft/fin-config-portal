package com.bnt.rest.service;

import java.util.Map;

import com.bnt.rest.dto.MEKDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MEKService {

	Integer addMek(MEKDto dto, String requestToken);

	MEKDto findAllMEK(String requestToken, Map<String, Object> requestParamMap);

}
