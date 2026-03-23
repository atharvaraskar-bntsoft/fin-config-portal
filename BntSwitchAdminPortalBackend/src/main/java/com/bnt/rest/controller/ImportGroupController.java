package com.bnt.rest.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.HttpCommons;
import com.bnt.common.ResponseEntityData;
import com.bnt.rest.service.ImportJsonService;
import com.bnt.rest.wrapper.dto.ExportRequestWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("")
@CrossOrigin(origins = "${crossOriginUrl}")
public class ImportGroupController {

	@Autowired
	private ImportJsonService importJsonService;

	@Value("${configbatch.import.temp.location}")
	private String tempFolderPath;

	@RequestMapping(value = "/import-group", method = RequestMethod.POST)
	public ResponseEntity<ResponseEntityData> validateAndImport(

			@RequestHeader(value = "X-Auth-Token") String xAuthToken, @RequestBody ExportRequestWrapper entityRequest)
			throws IOException {

		String message = importJsonService.validateAndImportJson(entityRequest, xAuthToken);
		return HttpCommons.setResponseEntityForPost(message, true);

	}

}
