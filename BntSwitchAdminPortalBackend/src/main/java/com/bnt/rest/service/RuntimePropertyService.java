package com.bnt.rest.service;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.wrapper.dto.PropertyFileWrapperDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RuntimePropertyService {

	ResponseWrapper getFolderList();

	PropertyFileWrapperDto getPropertyFileContent(PropertyFileWrapperDto propertyFileWrapperDto);

	PropertyFileWrapperDto editPropertyFileContent(PropertyFileWrapperDto propertyFileWrapperDto);

}
