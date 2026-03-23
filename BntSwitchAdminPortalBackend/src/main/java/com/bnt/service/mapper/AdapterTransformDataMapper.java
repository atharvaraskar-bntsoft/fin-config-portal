package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.dto.SchemeImfMapperDto;
import com.bnt.rest.wrapper.dto.adapter.TransformSchemeMapperUIDto;
import com.bnt.rest.wrapper.dto.adapter.postsaction.ActionParametersDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterTransformDataMapper {

	private static final String NEW_LINE = "{\r\n";

	private AdapterTransformDataMapper() {
	}

	private static Log logger = LogFactory.getLog(AdapterTransformDataMapper.class.getName());

	private static final String DBMAPPPER_TYPE = "DBMapper";

	private static final String BUILT_IN_MAPPER_TYPE = "BuiltInMapper";

	private static final String BLANK_FIELDID = "ALL";

	private static final String IMF_FIELDS_IDENTIFER = "IMF_";

	private static TransformSchemeMapperUIDto schemeMapperUIfromDbDto(SchemeImfMapperDto schemeImfMapperDto) {
		logger.info("Inside schemeMapperUIfromDbDto");
		TransformSchemeMapperUIDto transformSchemeMapperUIDto = new TransformSchemeMapperUIDto();
		String fieldId = "";
		if (schemeImfMapperDto != null) {
			transformSchemeMapperUIDto.setName(schemeImfMapperDto.getName());
			transformSchemeMapperUIDto.setType(DBMAPPPER_TYPE);
			fieldId = schemeImfMapperDto.getFieldId();
			if (fieldId == null || "".equalsIgnoreCase(fieldId)) {
				fieldId = BLANK_FIELDID;
			}
			transformSchemeMapperUIDto.setFieldId(fieldId);
			transformSchemeMapperUIDto.setParametersUi(getObjectUiFromStringDto(schemeImfMapperDto.getParameters()));
			transformSchemeMapperUIDto
					.setRequestJson(getObjectUiFromStringDto(schemeImfMapperDto.getRequestImfExpression()));
		}
		return transformSchemeMapperUIDto;
	}

	public static TransformSchemeMapperUIDto schemeMapperUIfromInBuiltMapper(String name, String parameters,
			String fieldId) {
		logger.info("Inside schemeMapperUIfromInBuiltMapper");
		String requestJson = NEW_LINE + "   \"type\":\"in_built_mapper\",\r\n"
				+ "   \"source\":\"${source_field}\",\r\n" + "   \"mapper\":\"BUILTINMAPPERNAME\",\r\n"
				+ "   \"parameters\":[ ],\r\n" + "   \"ipc\":\"SYSTEM_ERROR\"\r\n" + "}";

		requestJson = requestJson.replace("BUILTINMAPPERNAME", name);
		TransformSchemeMapperUIDto transformSchemeMapperUIDto = new TransformSchemeMapperUIDto();
		transformSchemeMapperUIDto.setName(name);
		transformSchemeMapperUIDto.setType(BUILT_IN_MAPPER_TYPE);
		if (fieldId == null || "".equalsIgnoreCase(fieldId)) {
			fieldId = BLANK_FIELDID;
		}
		transformSchemeMapperUIDto.setFieldId(fieldId);
		transformSchemeMapperUIDto.setParametersUi(getObjectUiFromStringDto(parameters));
		transformSchemeMapperUIDto.setRequestJson(getObjectUiFromStringDto(requestJson));
		return transformSchemeMapperUIDto;
	}

	private static Object getObjectUiFromStringDto(String stringDto) {
		Object objectUi = null;
		if (stringDto != null || "".equalsIgnoreCase(stringDto)) {
			objectUi = JsonObjectUtil.getObjectFromString(stringDto, Object.class);
		}
		return objectUi;
	}

	public static List<TransformSchemeMapperUIDto> schemeMapperUIfromDbDto(
			List<SchemeImfMapperDto> listSchemeImfMapperDto) {
		logger.info("Inside schemeMapperUIfromDbDto list");
		List<TransformSchemeMapperUIDto> transformSchemeMapperUIDtoList = new ArrayList<>();
		if (listSchemeImfMapperDto != null) {
			TransformSchemeMapperUIDto transformSchemeMapperUIDto = null;
			for (SchemeImfMapperDto schemeImfMapperDto : listSchemeImfMapperDto) {
				transformSchemeMapperUIDto = schemeMapperUIfromDbDto(schemeImfMapperDto);
				transformSchemeMapperUIDtoList.add(transformSchemeMapperUIDto);
			}
		}
		return transformSchemeMapperUIDtoList;
	}

	public static String createParameters(Class<?>[] objPrameter, String[] parameterLabels, String toolTip) {

		String parameterStart = NEW_LINE + "    \"tooltip\": \"" + toolTip + "\"," + " \r\n   \"signature\":";
		String parameterEnd = "\r\n" + "}";
		String paramter = "";
		String jsoObject = "";

		List<String> paramList = new ArrayList<>();

		String simpleName = "";
		String labelName = "";
		if (objPrameter != null && objPrameter.length > 0) {
			for (int i = 0; i < objPrameter.length; i++) {
				jsoObject = "\r\n" + NEW_LINE + "            \"name\": \"";
				simpleName = objPrameter[0].getSimpleName();
				try {
					labelName = parameterLabels[i];
				} catch (Exception e) {
					logger.info("issue in label for parameter:" + simpleName);
					labelName = simpleName;
				}
				jsoObject = jsoObject + labelName;

				jsoObject = jsoObject + "\",\r\n" + "            \"ordinal\": ";
				jsoObject = jsoObject + (i + 1);
				jsoObject = jsoObject + ",\r\n" + "            \"type\": \"";

				jsoObject = jsoObject + simpleName;

				jsoObject = jsoObject + "\"\r\n" + "  }";
				paramList.add(jsoObject);
			}
		}
		paramter = parameterStart + paramList + parameterEnd;
//		logger.info("El-Dto-Parameter-Json->"+paramter);
		return paramter;
	}

	public static void setDisplayValue(ActionParametersDto actionParametersDto) {
		if (actionParametersDto != null) {
			if (actionParametersDto.getPossibleValue() == null) {
				if (actionParametersDto.getName() != null
						&& actionParametersDto.getName().toUpperCase().contains(IMF_FIELDS_IDENTIFER)) {
					actionParametersDto.setDisplayName("Select Value");
					return;
				}
				actionParametersDto.setDisplayName("Enter Value");
			} else {
				actionParametersDto.setDisplayName("Select Value");
			}
		}
	}
}
