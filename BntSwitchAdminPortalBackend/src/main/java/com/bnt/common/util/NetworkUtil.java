package com.bnt.common.util;

import com.bnt.bswitch.shared.lib.common.properties.conf.ConfigurationProperties;
import com.bnt.common.RippsAdminException;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkUtil {

	private NetworkUtil() {
		// restrict instance creation
	}

	public static String resolveIp(String ipString) {
		try {
			return ConfigurationProperties.resolvePlaceholder(ipString);
		} catch (Exception e) {
			throw new RippsAdminException("Invalid IP:" + ipString);
		}
	}

	public static String resolvePort(String portString) {
		try {
			return ConfigurationProperties.resolvePlaceholder(portString);
		} catch (Exception e) {
			throw new RippsAdminException("Invalid Port:" + portString);
		}
	}
}
