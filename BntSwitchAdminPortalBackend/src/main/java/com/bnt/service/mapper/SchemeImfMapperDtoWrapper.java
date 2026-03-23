package com.bnt.service.mapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.bnt.rest.dto.SchemeImfMapperDto;
import com.bnt.rest.wrapper.dto.adapter.SchemeImfMapperUiWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SchemeImfMapperDtoWrapper {

	private SchemeImfMapperDtoWrapper() {

	}

	private static final Logger logger = LogManager.getLogger(SchemeImfMapperDtoWrapper.class);

	private static final String REQUEST = "REQUEST";
	private static final String RESPONSE = "RESPONSE";

	public static SchemeImfMapperUiWrapper dtoToUiWrapper(SchemeImfMapperDto schemeImfMapperDto, String type) {
		logger.info("inside uiWrapperToDto");
		SchemeImfMapperUiWrapper schemeImfMapperUiWrapper = new SchemeImfMapperUiWrapper();
		if (schemeImfMapperDto != null) {
			schemeImfMapperUiWrapper.setId(schemeImfMapperDto.getId());
			schemeImfMapperUiWrapper.setMessageStandard(schemeImfMapperDto.getMessageStandard());
			schemeImfMapperUiWrapper.setFieldId(schemeImfMapperDto.getFieldId());
			schemeImfMapperUiWrapper.setFieldType(type);

			if (REQUEST.equalsIgnoreCase(type)) {
				schemeImfMapperUiWrapper.setImfExpression(schemeImfMapperDto.getRequestImfExpression());
			}
			if (RESPONSE.equalsIgnoreCase(type)) {
				schemeImfMapperUiWrapper.setImfExpression(schemeImfMapperDto.getResponseImfExpression());
				schemeImfMapperUiWrapper.setResponseImfLeg(schemeImfMapperDto.getResponseImfLeg());
			}
		}
		return schemeImfMapperUiWrapper;
	}
}
