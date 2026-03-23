package com.bnt.service.mapper;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class PropertyFileMapper {

	private static Log logger = LogFactory.getLog(PropertyFileMapper.class);

	public static PropertiesConfiguration getpropertyConfiguration(String filePath) {
		logger.info("");
		PropertiesConfiguration properties = null;
		if (StringUtil.isNotNullOrBlank(filePath)) {
			try {
				properties = new PropertiesConfiguration(filePath);
			} catch (ConfigurationException e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException(e.getMessage());
			}
		}
		return properties;
	}

	public static Boolean updatePropertyfile(PropertiesConfiguration properties, String propertyKey,
			String propertyValue) {
		if (properties != null) {
			try {
				properties.setProperty(propertyKey, propertyValue);
				properties.save();
				return true;
			} catch (ConfigurationException e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
				throw new RippsAdminException(e.getMessage());
			}
		}
		return false;
	}
}
