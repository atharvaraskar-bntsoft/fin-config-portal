package com.bnt.rest.service;

import com.bnt.rest.wrapper.dto.ExportRequestWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ImportJsonService {

	String validateAndImportJson(ExportRequestWrapper requestWrapper, String authToken);

}
