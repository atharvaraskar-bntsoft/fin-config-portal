package com.bnt.rest.wrapper.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.DateUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StreamUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.service.mapper.TxnLogMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class KeyValueWrapper implements Comparable<KeyValueWrapper> {

	private static final Logger logger = LogManager.getLogger(KeyValueWrapper.class);

	public static final String REQUEST = "request_message";

	public static final String RESPONSE = "response_message";

	public static final String ADDITIONALFIELDS = "additionalFields";

	private static final String MATCHES_WITH = ".*\\d.*";

	private String key;

	private Object value;

	private String text;

	private String path;

	private String type;

	private String label;

	public String getType() {
		return type;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public KeyValueWrapper(String key, Object value) {
		this.key = key;
		this.value = value;
		setText();
		setType();
	}

	public KeyValueWrapper(String key, Object value, String path) {
		this.key = key;

		this.value = value;
		setText();
		setType();
		this.path = path;
	}

	private void setText() {
		String aliasName = null;
		if (!(CollectionUtil.isMapEmptyOrNull(TxnLogMapper.getTxnKeysMap()))) {
			aliasName = TxnLogMapper.getTxnKeysMap().get(key);
			if (!StringUtil.isNotNullOrBlank(aliasName)) {
				aliasName = getKeyLabelDynamicDigit(key);
			}
		}
		if (aliasName != null) {
			this.setText(aliasName);
		} else {
			toSetText();
		}
	}

//	private void toSetText() {
//		String partString = "";
//		if (key.contains(".")) {
//			String[] tokens = key.split("\\.");
//			String[] values = { REQUEST, RESPONSE, ADDITIONALFIELDS };
//			boolean contains = StreamUtils.arrayContains(tokens, values);
//			if (contains && tokens.length < 4) {
//				if (tokens.length == 3) {
//					partString = tokens[2];
//				} else {
//					partString = tokens[1];
//				}
//			} else if (tokens.length == 2 || tokens.length == 3) {
//				partString = tokens[tokens.length - 1];
//			} else if (tokens.length > 3) {
//				partString = tokens[tokens.length - 2] + " " + tokens[tokens.length - 1];
//			} else {
//				partString = tokens[0];
//			}
//
//			this.setText(StringUtil.getCamelCase(partString));
//		} else {
//			this.setText(StringUtil.getCamelCase(this.key));
//		}
//	}

	private void toSetText() {
		String partString = "";
		if (key.contains(".")) {
			if (key.contains("]")) {
				partString = key;
				// partString = key.replace("[", ".");
				// partString = partString.replace("]", "");
				String label = partString.substring(0, partString.lastIndexOf("."));
				String text1 = partString.substring(partString.lastIndexOf(".") + 1, partString.length());
				this.setText(text1);
				this.setLabel(label);
				this.setType("group");
			} else {
				if (key.contains(".value")) {
					String[] tokens = key.split("\\.");
					this.setText(tokens[tokens.length - 2] + "." + tokens[tokens.length - 1]);
				} else {
					String[] tokens = key.split("\\.");
					String[] values = { REQUEST, RESPONSE, ADDITIONALFIELDS };
					boolean contains = StreamUtils.arrayContains(tokens, values);
					if (contains && tokens.length < 4) {
						if (tokens.length == 3) {
							partString = tokens[2];
						} else {
							partString = tokens[1];
						}
					} else if (tokens.length == 2 || tokens.length == 3) {
						partString = tokens[tokens.length - 1];
					} else if (tokens.length > 3) {
						partString = tokens[tokens.length - 2] + " " + tokens[tokens.length - 1];
					} else {
						partString = tokens[0];
					}
					this.setText(StringUtil.getCamelCase(partString));
				}
			}
		} else {
			this.setText(StringUtil.getCamelCase(this.key));
		}
	}

	@SuppressWarnings("unused")
	private void setType() {

		try {
			if ((this.value instanceof String) && (!(StringUtil.isEmptyOrNull(this.value)))
					&& (DateUtil.isDateValid(this.value.toString()))) {
				Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(this.value.toString());
				this.setType("date");
				this.setValue(date.getTime());
			}
		} catch (Exception e) {
			logger.error("Error in setting type value");
		}
	}

	private void setType(String type) {
		this.type = type;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	private static String convertDateToString(String date) {
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat format2 = new SimpleDateFormat("MMM dd, yyyy HH:mm:ss");
		Date date1 = null;
		try {
			date1 = format1.parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return format2.format(date1);
	}

	public static List<KeyValueWrapper> getKeyValueWrapperList(Map<String, Object> wrapperMap,
			String requestResponsePath) {

		List<KeyValueWrapper> keyvalueWrapperList = new ArrayList<>();
		KeyValueWrapper keyValuewrapper = null;
		String key;
		Object value;
		String path = null;

		for (Map.Entry<String, Object> entry : wrapperMap.entrySet()) {

			key = entry.getKey();
			value = entry.getValue();

			if (key.contains("local_date_time")) {
				value = convertDateToString(value.toString());
			}

			if (!StringUtil.isEmptyOrNull(requestResponsePath)) {
				path = requestResponsePath + "." + key;
			}
			try {
				keyValuewrapper = new KeyValueWrapper(key, value, path);
				StringTokenizer st = null;
				StringBuilder text = new StringBuilder();

				if (path != null && path.contains(ADDITIONALFIELDS) && key.contains(".")) {
					st = new StringTokenizer(key, ".");
					while (st.hasMoreTokens()) {
						text.append(StringUtil.capitalizeFirstLetter(st.nextToken())).append(" ");
					}
					keyValuewrapper.setText(text.toString().trim());
				}
			}

			catch (Exception e) {
				logger.error("Error in adding key {},  value  {}", key, value);
			}

			keyvalueWrapperList.add(keyValuewrapper);
		}

		try {
			Collections.sort(keyvalueWrapperList, (o1, o2) -> compareString(o1.getText(), o2.getText()));
		} catch (Exception e) {
			logger.info(ExceptionLog.printStackTraceToString(e));
		}
		return keyvalueWrapperList;

	}

	/*
	 * null value will be treated as larger number
	 */
	public static int compareString(String argFirst, String argSecond) {
		if (argFirst != null && argSecond != null) {
			return compareIfParamsAvailable(argFirst, argSecond);
		} else if (null == argFirst && null != argSecond) {
			return 1;
		} else if (null != argFirst) {
			return -1;
		} else {
			return 0;
		}

		/**
		 * if (argFirst != null && argSecond != null) { return
		 * compareIfParamsAvailable(argFirst, argSecond); } else { if (null == argFirst
		 * && null != argSecond) { return 1; } else if (null != argFirst && null ==
		 * argSecond) { return -1; } else if (null == argFirst && null == argSecond) {
		 * return 0; } else { return argFirst.compareTo(argSecond); } }
		 */

	}

	private static int compareIfParamsAvailable(String argFirst, String argSecond) {
		if ((argFirst.matches(MATCHES_WITH) && argSecond.matches(MATCHES_WITH))) {
			String[] dataArray1 = argFirst.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)");
			String[] dataArray2 = argSecond.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)");
			return compareParams(dataArray1, dataArray2);
		} else {
			return argFirst.compareTo(argSecond);
		}
	}

	private static int compareParams(String[] dataArray1, String[] dataArray2) {
		String strSubData1 = "";
		String strSubData2 = "";
		int compareCount = 0;
		while (compareCount < dataArray1.length && compareCount < dataArray2.length) {
			strSubData1 = dataArray1[compareCount];
			strSubData2 = dataArray2[compareCount];
			if ((strSubData1.matches(MATCHES_WITH) && strSubData2.matches(MATCHES_WITH))) {
				int number1 = Integer.parseInt(dataArray1[compareCount]);
				int number2 = Integer.parseInt(dataArray2[compareCount]);
				if (number1 != number2) {
					return number1 - number2;
				}
			} else {
				if (strSubData1.compareTo(strSubData2) != 0) {
					return strSubData1.compareTo(strSubData2);
				}
			}
			compareCount++;
		}
		if (dataArray1.length < dataArray2.length) {
			return -1;
		} else if (dataArray1.length == dataArray2.length) {
			return 0;
		} else {
			return 1;
		}
	}

	@Override
	public int compareTo(KeyValueWrapper o) {
		return this.getText().compareTo(o.getText());
	}

	private static String getKeyLabelDynamicDigit(String key) {
		if (StringUtil.isNotNullOrBlank(key) && key.matches(MATCHES_WITH)) {
			String specialString = "#";
			/** String labelMapped = "Account# Balances# Account Card Number"; **/
			String labelMapped = "";
			String modifiedKey = key.replaceAll("\\d", specialString); // replace all integer to special String
			modifiedKey = modifiedKey.replaceAll(specialString + "+", specialString); // replace consecutive special
																						// string to single
																						// specialString
			if (!(CollectionUtil.isMapEmptyOrNull(TxnLogMapper.getTxnKeysMap()))) {
				labelMapped = TxnLogMapper.getTxnKeysMap().get(modifiedKey);
			}
			if (StringUtil.isNotNullOrBlank(labelMapped)) {
				return getLabel(key, specialString, labelMapped);
			}
		}
		return null;
	}

	private static String getLabel(String key, String specialString, String labelMapped) {
		if (labelMapped.contains(specialString)) {
			String[] dataLabelArray = labelMapped.split(specialString);
			String[] integerData = integerInString(key);
			String label = "";
			for (int i = 0; i < dataLabelArray.length; i++) {
				label = label + dataLabelArray[i];
				if (integerData != null && i < integerData.length) {
					label = label + integerData[i];
				}
			}
			return label;

		} else {
			return labelMapped;
		}
	}

	private static String[] integerInString(String key) {
		String[] data = null;
		String str = key.replaceAll("[^\\d]", " "); // replace all non integer to blank string
		str = str.trim();
		str = str.replaceAll(" +", " "); // replace consecutive blank string to single blank string
		if (str.equals("")) {
			return data;
		} else {
			data = str.split(" ");
		}
		return data;
	}
}
