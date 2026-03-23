package com.bnt.common.util.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExceptionLog {

	public static String printStackTraceToString(Exception exception) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		exception.printStackTrace(pw);
		return sw.toString();
	}
}
