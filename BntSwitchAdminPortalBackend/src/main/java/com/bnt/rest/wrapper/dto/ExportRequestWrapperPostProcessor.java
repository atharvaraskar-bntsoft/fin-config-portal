package com.bnt.rest.wrapper.dto;

import com.fasterxml.jackson.databind.util.StdConverter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExportRequestWrapperPostProcessor extends StdConverter<ExportRequestWrapper, ExportRequestWrapper> {

	@Override
	public ExportRequestWrapper convert(ExportRequestWrapper instance) {
		instance.postProcess();
		return instance;
	}
}
