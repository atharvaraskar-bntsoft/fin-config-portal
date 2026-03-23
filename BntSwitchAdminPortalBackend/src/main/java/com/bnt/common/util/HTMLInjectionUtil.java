package com.bnt.common.util;

import org.jsoup.Jsoup;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class HTMLInjectionUtil {

	private HTMLInjectionUtil() {
	}

	public static String validateHTMLInjection(String input) {
		if (!StringUtil.isEmptyOrNull(input))
			return Jsoup.parse(input).text();
		else
			return input;
	}
}
