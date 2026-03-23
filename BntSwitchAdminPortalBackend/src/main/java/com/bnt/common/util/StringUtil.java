package com.bnt.common.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.web.multipart.MultipartFile;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class StringUtil {

	private StringUtil() {
	}

	private static final String UNDEFINED = "undefined";

	public static boolean isNumeric(String str) {
		return str.matches("-?\\d+(\\.\\d+)?"); // match a number with optional '-' and decimal.
	}

	public static boolean isEmptyOrNull(String str) {
		return (str == null || str.trim().isEmpty() || UNDEFINED.equals(str));
	}

	public static boolean isEmptyOrNull(Object obj) {
		String str = null;
		if (obj != null) {
			str = (String) obj;
		}
		return isEmptyOrNull(str);
	}

	public static String capitalizeFirstLetter(String s) {
		s = s.replaceFirst("" + s.charAt(0), (s.charAt(0) + "").toUpperCase());
		return s;
	}

	private static String splitCamelCase(String s) {
		if (!(s.contains("_"))) {
			return s.replaceAll(String.format("%s|%s|%s", "(?<=[A-Z])(?=[A-Z][a-z])", "(?<=[^A-Z])(?=[A-Z])",
					"(?<=[A-Za-z])(?=[^A-Za-z])"), " ");
		}
		return s;
	}

	public static String capitalizeWord(String strValue) {
		strValue = strValue.toLowerCase();
		var stringBuilder = new StringBuilder();
		// Declare a character of space
		// To identify that the next character is the starting
		// of a new word
		var charValue = ' ';
		for (int i = 0; i < strValue.length(); i++) {
			// If previous character is space and current
			// character is not space then it shows that
			// current letter is the starting of the word
			if ((charValue == ' ' || charValue == '_') && strValue.charAt(i) != ' ') {
				stringBuilder.append(Character.toUpperCase(strValue.charAt(i)));
			} else {
				stringBuilder.append(strValue.charAt(i));
			}
			charValue = strValue.charAt(i);
		}
		// Return the string with removing underscores and trimming
		return stringBuilder.toString().replace("_", " ").trim();
	}

	public static String getCamelCase(String s) {
		s = splitCamelCase(s);
		return capitalizeWord(s);
	}

	public static String removeWhiteSpaces(String s) {
		return s.replaceAll("\\s", "");
	}

	public static boolean isNotNullOrBlank(String str) {
		if (str == null || str.isEmpty() || UNDEFINED.equals(str)) {
			return false;
		}
		return !("".equalsIgnoreCase(str) || "NULL".equalsIgnoreCase(str));
	}

	public static String getMultipartFileToString(MultipartFile multipartFile) throws IOException {
		return new String(multipartFile.getBytes(), StandardCharsets.UTF_8);
	}

	public static String getStringToEncodedString(String inputData) {
		if (!isNotNullOrBlank(inputData)) {
			return inputData;
		}
		return new String(inputData.getBytes(), StandardCharsets.UTF_8);
	}

	public static boolean validateText(String str, String regex) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}

	public static String readFileAsString(String filePath) throws IOException {
		return new String(Files.readAllBytes(Paths.get(filePath)));
	}
}
