package com.bnt.service.mapper;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;

import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MessageConversionJsonMapper {

	private MessageConversionJsonMapper() {

	}

	private static final String ISO = "ISO";
	private static Log logger = LogFactory.getLog(MessageConversionJsonMapper.class.getName());

	private static final Charset defaultCharset = StandardCharsets.UTF_8;

	public static JSONObject getJsonFromXml(String xmlMessage, String messageStandard) {
		JSONObject jSONObject = null;
		xmlMessage = StringUtil.getStringToEncodedString(xmlMessage);
		if (messageStandard.contains(ISO) && !messageStandard.contains("JSON") && !messageStandard.contains("SOAP")) {
			logger.info("going to process ISO Packager");
			jSONObject = XMLtoJsonSchemaMapper.getJsonFromXml(xmlMessage);
		} else if ((messageStandard.contains("JSON") || messageStandard.contains("HTTP-URLENCODED")
				|| messageStandard.contains("XML-OVER-HTTP")) && !messageStandard.contains("SOAP")) {
			logger.info("going to process Non-ISO Packager");
			jSONObject = NonIsoJsonPacker.getJsonFromJsonPackager(xmlMessage);
		} else if (!messageStandard.contains(ISO) && !messageStandard.contains("JSON")
				&& messageStandard.contains("SOAP")) {
			logger.info("going to process Non-ISO Packager");
			jSONObject = SoapPackager.getJsonFromSoapPackager(xmlMessage);
		}
		return jSONObject;
	}
}
