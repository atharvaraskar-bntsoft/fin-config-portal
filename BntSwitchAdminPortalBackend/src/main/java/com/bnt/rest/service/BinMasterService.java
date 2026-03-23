package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.BinMasterDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BinMasterService {

	public BinMasterDto findBinMasterDtoById(int id);

	public ResponseWrapper findPagedBinMaster(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	public List<BinMasterDto> findAll();

	boolean validateFileName(String fileName);

}