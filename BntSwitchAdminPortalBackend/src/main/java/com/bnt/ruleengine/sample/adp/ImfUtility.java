package com.bnt.ruleengine.sample.adp;

import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImfUtility {

	public static ImfFieldWrapper getIMFObject(String text, ImfFieldWrapper obj) {
		if (!StringUtil.isEmptyOrNull(text)) {
			if (null == obj) {
				obj = new ImfFieldWrapper();
			}
			obj.setResultText(text);
			if (text.startsWith("${message_exchange[")) {
				String service = text.substring(text.indexOf("[") + 1, text.indexOf("]"));
				obj.setService(service);
				if (text.contains("request_message[")) {
					obj.setUseCase("3");
					obj.setType("request");
					obj.setText(text.substring(text.lastIndexOf('[') + 1, text.lastIndexOf(']')));
				} else if (text.contains("response_message[")) {
					obj.setUseCase("3");
					obj.setType("response");
					obj.setText(text.substring(text.lastIndexOf('[') + 1, text.lastIndexOf(']')));
				} else {
					obj.setUseCase("2");
					obj.setText(text.substring(text.lastIndexOf("]") + 2, text.length() - 1));
				}
			} else {
				obj.setUseCase("1");
				obj.setText(text.substring(2, text.length() - 1));
			}
			return obj;
		}
		return null;
	}

	public static String getFinalString(ImfFieldWrapper wrapper) {
		if (wrapper != null && !StringUtil.isEmptyOrNull(wrapper.getUseCase())
				&& !StringUtil.isEmptyOrNull(wrapper.getText())) {
			StringBuffer sb = new StringBuffer("${");
			if ("3".equals(wrapper.getUseCase()) && !StringUtil.isEmptyOrNull(wrapper.getService())) {
				if (wrapper.getType() == null) {
					wrapper.setType("request");
				}
				extractedFirst(wrapper, sb);
				sb.append(wrapper.getType());
				sb.append("_message[");
				sb.append(wrapper.getText());
				sb.append("]");
			} else if ("2".equals(wrapper.getUseCase()) && !StringUtil.isEmptyOrNull(wrapper.getService())) {
				extractedFirst(wrapper, sb);
				sb.append(wrapper.getText());
			} else if ("1".equals(wrapper.getUseCase())) {
				sb.append(wrapper.getText());
			}
			sb.append("}");
			return sb.toString();
		}
		return null;
	}

	private static void extractedFirst(ImfFieldWrapper wrapper, StringBuffer sb) {
		sb.append("message_exchange[");
		sb.append(wrapper.getService());
		sb.append("].");
	}
}
