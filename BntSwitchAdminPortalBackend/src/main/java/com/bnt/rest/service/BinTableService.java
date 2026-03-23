package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.BinTableDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BinTableService {

	public BinTableDto findBinTableDtoById(int id);

	public ResponseWrapper findPagedBinTable(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	public List<BinTableDto> findAll();

	public ResponseWrapper findBinTableByBinMasterId(int binMasterId, Map<String, Object> requestParamMap);

	public List<BinTableDto> getAllBinTableByBinMasterId(int binMasterId);
}
