package com.bnt.common.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DateUtil {

	private static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	private static final String DATE_FORMAT_UI = "dd MMM yyyy hh:mm:ss a";
	private static final Logger logger = LogManager.getLogger(DateUtil.class);

	private DateUtil() {
	}

	public static String getDateFormatUI(long time) {
		return convertTimeStampToDateString(time, DATE_FORMAT_UI);
	}

	private static String convertTimeStampToDateString(long time, String dateFormat) {
		String dateString = null;
		if (time > 0 && dateFormat != null) {
			SimpleDateFormat formatDate = new SimpleDateFormat(dateFormat);
			return formatDate.format(new Date(time));
		}
		return dateString;
	}

	public static java.sql.Timestamp convertUtilDateToTimestamp(Date date) {
		java.sql.Timestamp time = null;
		if (date != null) {
			time = new java.sql.Timestamp((date).getTime());
		}
		return time;
	}

	public static Timestamp convertStringToTimestamp(String dateStr) {
		SimpleDateFormat formatter = new SimpleDateFormat(DATE_FORMAT);
		Date strDate = null;
		try {
			strDate = formatter.parse(dateStr);
		} catch (ParseException e) {
			logger.error("parse error", e);
		}
		return convertUtilDateToTimestamp(strDate);
	}

	public static boolean isDateValid(String value) {
		try {
			new SimpleDateFormat(DATE_FORMAT).parse(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
