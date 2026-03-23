package com.bnt.ruleengine.sample;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.commons.io.IOUtils;

import com.bnt.bswitch.query.parser.Condition;
import com.bnt.common.util.JsonObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class VerifyIMF {
	public static void main(String[] args) {
		FileInputStream fis = null;
		String json = null;
		try {
			fis = new FileInputStream("D:\\Docs\\imf\\t56.json");
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		try {
			json = IOUtils.toString(fis, "UTF-8");
		} catch (IOException e) {
			e.printStackTrace();
		}
		JsonObjectUtil.getGenericObjectFromJsonString(json, Condition.class);
	}
}
