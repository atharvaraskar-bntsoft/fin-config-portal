package com.bnt.rest.service.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ImportService {

	Map<String, Object> validateAndImport(MultipartFile inputFile, String tempFolderPath) throws IOException;

}
