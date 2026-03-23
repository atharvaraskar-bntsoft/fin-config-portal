package com.bnt.common.util;

import java.io.InputStream;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import com.bnt.common.util.exception.ExceptionLog;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class XmlObjectUtil {

	private static final Logger logger = LogManager.getLogger(XmlObjectUtil.class);

	private XmlObjectUtil() {

	}

	public static Document getXmlDocumentFromInputStream(InputStream inputStream) {
		logger.info("inside getXmlDocumentFromInputStream");
		// Parser that produces DOM object trees from XML content
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		// API to obtain DOM Document instance
		DocumentBuilder builder = null;
		Document xmlDocument = null;
		try {
			// Create DocumentBuilder with default configuration
			builder = factory.newDocumentBuilder();
			// disabling DTD validation
			builder.setEntityResolver((publicId, systemId) -> {
				logger.info("ignoring systemId:{}", systemId);
				logger.info("ignoring publicId:{}", publicId);
				return new InputSource(new StringReader("")); // Returns a valid dummy source
			});
			// Parse the content to Document object
			xmlDocument = builder.parse(inputStream);
			return xmlDocument;
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		return xmlDocument;
	}
}
