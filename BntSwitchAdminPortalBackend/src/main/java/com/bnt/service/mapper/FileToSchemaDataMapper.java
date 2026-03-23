package com.bnt.service.mapper;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jpos.iso.ISOException;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.packager.GenericPackager;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;

import com.bnt.bswitch.message.packager.HttpPackager;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.XmlObjectUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.Constants;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FileToSchemaDataMapper {

	private static Log logger = LogFactory.getLog(FileToSchemaDataMapper.class.getName());

	private FileToSchemaDataMapper() {

	}

	private static final String ISO_FILE_EXTESION = ".xml";

	private static final String JSON_FILE_EXTESION = ".json";

	private static final String SOAP_FILE_EXTESION = ".txt";

	public static String getSchemaDataFromFile(MultipartFile templateFile, String templateName) {
		logger.info("inside getISOSchemaXMLFromFile");
		String schemadata = "";
		if (templateName.contains(Constants.ISO)) {
			schemadata = getISOSchemaXMLFromFile(templateFile, templateName);
		} else {
			logger.info("convert based on non-ISO");
			schemadata = getNonISOSchemaXMLFromFile(templateFile, templateName);
		}

		return schemadata;
	}

	public static boolean validateDataFilesAllowedFileType(String fileName, String inputfileExtension) {
		logger.info("inside validateAllowedFileType" + fileName);
		boolean allowedFlag = false;
		try {
			if (fileName != null) {
				fileName = fileName.trim();
				String fileExtension = fileName.substring(fileName.lastIndexOf("."), fileName.length());
				if (fileExtension.isBlank() || fileExtension.isEmpty()
						|| (fileExtension.length() == fileName.length())) {
					/** allowedFlag = false; */
				} else {
					fileExtension = fileExtension.toUpperCase();
					if (inputfileExtension.equalsIgnoreCase(fileExtension)) {
						allowedFlag = true;
					}
				}
			}
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			allowedFlag = false;
		}
		if (!allowedFlag) {
			throw new RippsAdminException(
					"Invalid File format : Please upload file with extension " + inputfileExtension);
		}

		return allowedFlag;
	}

	public static String getISOSchemaXMLFromFile(MultipartFile templateFile, String templateName) {
		logger.info("inside getISOSchemaXMLFromFile{}" + templateName);
		String schemadata = "";
		logger.info("convert based on ISO");
		try {
			InputStream inputStream = templateFile.getInputStream();
			Document doc = XmlObjectUtil.getXmlDocumentFromInputStream(inputStream);
			if (doc == null) {
				throw new RippsAdminException("XML file invalid");
			}
			schemadata = new String(templateFile.getBytes(), StandardCharsets.UTF_8);

		} catch (IOException e) {
			logger.error(e);
			throw new RippsAdminException("XML file not valid reason:" + e.getMessage());
		}
		logger.info("comleted getISOSchemaXMLFromFile");
		return schemadata;
	}

	public static String getNonISOSchemaXMLFromFile(MultipartFile templateFile, String templateName) {
		logger.info(
				"inside getNonISOSchemaXMLFromFile {} , templateFile {}" + templateFile + templateFile + templateName);

		return "";
	}

	public static boolean validateUploadedFile(MultipartFile templateFile, String templateName,
			String packagerFileData) {
		logger.info("inside validateUploadedFile");
		boolean isValidFile = false;
		String type = AdapterWrapperDtoMapper.getAdapterTypeByTemplateName(templateName);
		if (AdapterWrapperDtoMapper.ADAPTR_TYPE_ISO.equalsIgnoreCase(type)) {
			validateDataFilesAllowedFileType(templateFile.getOriginalFilename(), ISO_FILE_EXTESION);
			isValidFile = validateISOFile(templateFile, templateName, packagerFileData);
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_JSON.equalsIgnoreCase(type)) {
			logger.info("validate based on JSON");
			validateDataFilesAllowedFileType(templateFile.getOriginalFilename(), JSON_FILE_EXTESION);
			isValidFile = validateJsonPackagerFile(templateFile, templateName, packagerFileData);
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_SOAP.equalsIgnoreCase(type)) {
			logger.info("validate based on SOAP");
			validateDataFilesAllowedFileType(templateFile.getOriginalFilename(), SOAP_FILE_EXTESION);
			isValidFile = validateSaopPackagerFile(templateFile, templateName, packagerFileData);
		}
		return isValidFile;
	}

	public static boolean validateISOFile(MultipartFile templateFile, String templateName,
			String standaredPackagerFileData) {

		logger.info("validateISOFile() {}" + standaredPackagerFileData);
		boolean isValidFile = false;
		InputStream inputStream = null;
		Document doc = null;
		try {
			inputStream = templateFile.getInputStream();
			doc = XmlObjectUtil.getXmlDocumentFromInputStream(inputStream);
		} catch (Exception e) {
			logger.info("Invalid File :" + e.getMessage());
			return false;
		}
		if (doc == null) {
			throw new RippsAdminException("Invalid data format: Please upload .xml file with valid data.");
		}
		isValidFile = validateISOFile(templateFile, templateName);
		return isValidFile;
	}

	public static boolean validateJsonPackagerFile(MultipartFile adapterFile, String templateName,
			String standaredPackagerFileData) {

		logger.info("inside validateJsonPackagerFile {}" + standaredPackagerFileData);
		boolean isValidFile = false;
		String jsonContent = null;
		try {
			jsonContent = StringUtil.getMultipartFileToString(adapterFile);
		} catch (IOException e) {
			logger.error(e);
		}
		isValidFile = validateJsonPackagerFile(jsonContent, templateName);

		return isValidFile;
	}

	public static boolean validateJsonPackagerFile(String fileContent, String templateName) {
		logger.info("inside validateJsonPackagerFile {}" + templateName);
		boolean isValidFile = false;
		isValidFile = adapterJsonValidation(fileContent);
		if (!isValidFile) {
			logger.info("Invalid Packager");
			throw new RippsAdminException("Invalid Packager");
		}
		logger.info("valid json-Packager->passed");
		return isValidFile;
	}

	public static boolean validateSaopPackagerFile(MultipartFile templateFile, String templateName,
			String packagerFileData) {
		logger.info("inside validateSaopPackagerFile() templateName :{} , templateFile: {}, packagerFileData: {}"
				+ templateName + templateFile + packagerFileData);
		boolean isValidFile = false;
		// not implments hence returing true
		isValidFile = true;
		return isValidFile;
	}

	public static boolean validateISOFile(MultipartFile uplodedTemplateFile, String templateName) {
		// Create Packager based on XML that contain DE type
		logger.info("inside validateISOFile() templateName :{}" + templateName);
		boolean isValidFile = false;
		InputStream inputStream = null;
		try {
			inputStream = uplodedTemplateFile.getInputStream();
			isValidFile = extractedISOFile(inputStream);

		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new RippsAdminException("Please upload file with valid data.");
		}
		return isValidFile;
	}

	public static boolean validateISOFile(String fileContent, String templateName) {
		logger.info("inside validateISOFile() templateName :{}" + templateName);
		// Create Packager based on XML that contain DE type
		boolean isValidFile = false;
		InputStream inputStream = null;
		try {
			inputStream = new ByteArrayInputStream(fileContent.getBytes());
			isValidFile = extractedISOFile(inputStream);

		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("Please upload file with valid data.");
		}
		return isValidFile;
	}

	private static boolean extractedISOFile(InputStream inputStream) throws ISOException {
		boolean isValidFile;
		GenericPackager packager;
		packager = new GenericPackager(inputStream);
		// Create ISO Message
		ISOMsg isoMsg = new ISOMsg();
		isoMsg.setPackager(packager);
		isoMsg.setMTI("0200");
		isoMsg.set(3, "201234");
		logISOMsg(isoMsg);
		// Get and print the output result
		byte[] data = isoMsg.pack();
		logger.info("RESULT : " + new String(data));
		// Create ISO Message
		ISOMsg isoMsgUnpack = new ISOMsg();
		isoMsgUnpack.setPackager(packager);
		isoMsgUnpack.unpack(data);
		// print the DE list
		logISOMsg(isoMsgUnpack);
		isValidFile = true;
		return isValidFile;
	}

	private static void logISOMsg(ISOMsg msg) {
		try {
			logger.info("  MTI : {}" + msg.getMTI());
			for (int i = 1; i <= msg.getMaxField(); i++) {
				if (msg.hasField(i)) {
					logger.info("    Field-" + i + " : " + msg.getString(i));
				}
			}
		} catch (ISOException e) {
			logger.error(e);
		} finally {
			logger.info("--------------------");
		}
	}

	public static boolean validateSchemaDataContent(String schemaDataContent, String templateName) {
		logger.info("inside validateSchemaDataContent");
		boolean isValidContent = false;
		String type = AdapterWrapperDtoMapper.getAdapterTypeByTemplateName(templateName);
		if (AdapterWrapperDtoMapper.ADAPTR_TYPE_ISO.equalsIgnoreCase(type)) {
			isValidContent = validateISOFile(schemaDataContent, templateName);
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_JSON.equalsIgnoreCase(type)) {
			logger.info("validate based on JSON");
			isValidContent = validateJsonPackagerFile(schemaDataContent, templateName);
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_SOAP.equalsIgnoreCase(type)) {
			logger.info("validate based on SOAP");
			isValidContent = true;
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_HTTP_URLENCODED.equalsIgnoreCase(type)) {
			logger.info("validate based on HTTP_URLENCODED");
			isValidContent = validateJsonPackagerFile(schemaDataContent, templateName);
		} else if (AdapterWrapperDtoMapper.ADAPTR_TYPE_XML_OVER_HTTP.equalsIgnoreCase(type)) {
			logger.info("validate based on XML_OVER_HTTP");
			isValidContent = validateJsonPackagerFile(schemaDataContent, templateName);
		}
		logger.info("returning validateSchemaDataContent");
		return isValidContent;
	}

	private static boolean adapterJsonValidation(String json) {
		logger.info("inside adapterJsonValidation");
		boolean isValid = false;
		if (json != null) {
//			logger.info("json to validate:->" + json);
			try {
				JsonObjectUtil.validateJsonObject(json);
			} catch (Exception e) {
				throw new RippsAdminException("Json-Packager:" + e.getMessage());
			}
			logger.info("valid json object validation json Packager->passed");
			HttpPackager transformation = JsonObjectUtil.getGenericObjectFromJsonString(json, HttpPackager.class);
			if (transformation == null) {
				logger.error("Exception in HttpPacakger tarnsform data Json " + json);
				isValid = false;
			} else {
				logger.info("HttpPacakger Json has been parsed");
				isValid = true;
			}
		}
		return isValid;
	}
}
