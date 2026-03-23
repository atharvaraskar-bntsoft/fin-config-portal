package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.SchemeImfMapperDto;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.rest.wrapper.dto.adapter.SchemeImfMapperUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SchemeImfMapperService {

	public SchemeImfMapperDto getSchemeImfMapper(Integer messageStandard, String fieldId);

	public List<IdAndCodeWrapperString> fieldListMessageSpecification(Integer messageStandardId);

	public ResponseWrapper findPagedSchemeImfMapper(Map<String, Object> requestParamMap);

	public SchemeImfMapperDto getSchemeImfMapperDtoById(int id);

	public SchemeImfMapperUiWrapper getSchemeImfMapperUiWrapperByTypeID(String type, Integer id);

	public List<SchemeImfMapperDto> getSchemeImfMapperByMessageStandardId(Integer messageStandard);

	public List<SchemeImfMapperDto> getAllSchemeImfMapper();
}
