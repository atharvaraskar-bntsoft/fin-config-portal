package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jayway.jsonpath.JsonPath;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SchemeImfMapperDto;
import com.bnt.rest.entity.SchemeImfMapper;
import com.bnt.rest.entity.StandardMessageSpecification;
import com.bnt.rest.repository.SchemeImfMapperRepository;
import com.bnt.rest.repository.StandardMessageSpecificationRepository;
import com.bnt.rest.service.SchemeImfMapperService;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.rest.wrapper.dto.adapter.SchemeImfMapperUiWrapper;
import com.bnt.service.mapper.MessageConversionJsonMapper;
import com.bnt.service.mapper.SchemeImfMapperDtoWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class SchemeImfMapperServiceImpl implements SchemeImfMapperService {

	private static Log logger = LogFactory.getLog(SchemeImfMapperServiceImpl.class.getName());

	@Autowired
	SchemeImfMapperRepository schemeImfMapperRepository;

	@Autowired
	StandardMessageSpecificationRepository standardMessageSpecificationRepository;

	@Lazy
	@Autowired
	private SchemeImfMapperServiceImpl self;

	@Override
	public SchemeImfMapperDto getSchemeImfMapper(Integer messageStandard, String fieldId) {
		SchemeImfMapperDto schemeImfMapperDto = null;
		SchemeImfMapper schemeImfMapper = schemeImfMapperRepository.getSchemeImfMapper(messageStandard, fieldId);
		if (schemeImfMapper != null) {
			schemeImfMapperDto = ObjectMapper.mapToDto(schemeImfMapper, SchemeImfMapperDto.class);
		}
		return schemeImfMapperDto;
	}

	public List<IdAndCodeWrapperString> fieldListMessageSpecification(Integer messageStandardId) {
		List<IdAndCodeWrapperString> idAndCodeWrapperStringList = new ArrayList<>();
		StandardMessageSpecification standardMessageSpecification = standardMessageSpecificationRepository
				.getMessageSpecification(messageStandardId);
		String schemaXml = standardMessageSpecification.getMessageSchemaPackager();
		JSONObject jSONObject = MessageConversionJsonMapper.getJsonFromXml(schemaXml,
				standardMessageSpecification.getMessageStandard().getValue());
		String fieldpath = "$.template.field[*]";
		List<Map<String, Object>> filedList = JsonPath.parse(jSONObject.toString()).read(fieldpath);
		String id = "";
		IdAndCodeWrapperString idAndCodeWrapperString;
		for (int i = 0; i < filedList.size(); i++) {
			id = "" + filedList.get(i).get("id");
			id = id.replace("\"", "");
			idAndCodeWrapperString = new IdAndCodeWrapperString();
			idAndCodeWrapperString.setId(id);
			idAndCodeWrapperString.setCode("" + filedList.get(i).get("name"));
			idAndCodeWrapperStringList.add(idAndCodeWrapperString);

		}

		return idAndCodeWrapperStringList;

	}

	public ResponseWrapper findPagedSchemeImfMapper(Map<String, Object> requestParamMap)
			throws RippsAdminRestException {
		logger.info("insid findPagedSchemeImfMapper");
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, sortColumn);
		}
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);

		Page<SchemeImfMapper> schemeImfMapperPageList = schemeImfMapperRepository.getFilterData(pageable, filters);
		List<SchemeImfMapperDto> list = ObjectMapper.mapListObjectToListDto(schemeImfMapperPageList.getContent(),
				SchemeImfMapperDto.class);

		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(schemeImfMapperPageList,
				schemeImfMapperPageList.getTotalElements());
		pageJPAData.setContent(list);
		return pageJPAData;
	}

	@Override
	public SchemeImfMapperDto getSchemeImfMapperDtoById(int id) {
		SchemeImfMapperDto schemeImfMapperDto = null;
		SchemeImfMapper schemeImfMapper = schemeImfMapperRepository.getSchemeImfMapperBYId(id);
		if (schemeImfMapper != null) {
			schemeImfMapperDto = ObjectMapper.mapToDto(schemeImfMapper, SchemeImfMapperDto.class);
		}

		return schemeImfMapperDto;
	}

	@Override
	public SchemeImfMapperUiWrapper getSchemeImfMapperUiWrapperByTypeID(String type, Integer id) {
		SchemeImfMapperDto schemeImfMapperDto = getSchemeImfMapperDtoById(id);
		return SchemeImfMapperDtoWrapper.dtoToUiWrapper(schemeImfMapperDto, type);
	}

	@Override
	public List<SchemeImfMapperDto> getSchemeImfMapperByMessageStandardId(Integer messageStandard) {

		List<SchemeImfMapper> schemeImfMapperList = schemeImfMapperRepository
				.getSchemeImfMapperByMessageStandardId(messageStandard);
		return ObjectMapper.mapListObjectToListDto(schemeImfMapperList, SchemeImfMapperDto.class);

	}

	@Override
	public List<SchemeImfMapperDto> getAllSchemeImfMapper() {
		List<SchemeImfMapper> schemeImfMapperList = (List<SchemeImfMapper>) schemeImfMapperRepository
				.getAllSchemeImfMapper();
		return ObjectMapper.mapListObjectToListDto(schemeImfMapperList, SchemeImfMapperDto.class);
	}

}
