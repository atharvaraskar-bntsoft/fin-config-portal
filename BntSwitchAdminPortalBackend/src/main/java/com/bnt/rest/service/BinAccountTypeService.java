package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.BinAccountTypeDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BinAccountTypeService {

	public BinAccountTypeDto findBinAccountTypeDtoById(int id);

	public ResponseWrapper findPagedBinAccountType(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	public List<BinAccountTypeDto> findAll();

	public ResponseWrapper findBinAccountTypeByBinTableId(int binTableId, Map<String, Object> requestParamMap);

	public List<BinAccountTypeDto> getAllBinAccountTypeByBinTableId(int binTableId);

}
