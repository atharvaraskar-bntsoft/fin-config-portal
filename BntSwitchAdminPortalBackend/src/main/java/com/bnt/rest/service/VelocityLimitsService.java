package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.VelocityLimitsDto;
import com.bnt.rest.entity.TransactionVelocity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface VelocityLimitsService {

	ResponseWrapper getvelocityLimitsServiceList(Map<String, Object> requestParamMap);

	ResponseWrapper addVelocityLimits(VelocityLimitsDto velocityLimitsDto, String requestToken);

	VelocityLimitsDto findVelocityLimitsById(int id);

	ResponseWrapper updateVelocityLimits(VelocityLimitsDto velocityLimitsDto, String requestToken, int id);

	Map<String, Object> getFilterData();

	public void deleteById(TransactionVelocity velocity);

	public TransactionVelocity findTransactionVelocityById(int id);

}
