package com.bnt.ruleengine.sample;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper.PropertiesWrapper;
import com.bnt.service.mapper.AdapterWrapperDtoMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class VerifyProperty {

	public static void main(String[] args) {
		FileInputStream fis = null;
		String json = null;
		try {
			fis = new FileInputStream("D:\\Docs\\props\\t2.json");
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		try {
			json = IOUtils.toString(fis, StandardCharsets.UTF_8.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}

		NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper = JsonObjectUtil
				.getGenericObjectFromJsonString(json, NetworkPropertiesResponseWrapper.class);
		List<PropertiesWrapper> message = networkPropertiesResponseWrapper.getMessage();
		List<PropertiesWrapper> network = networkPropertiesResponseWrapper.getNetwork();
		List<PropertiesWrapper> messageFiltered = new ArrayList<>();
		List<PropertiesWrapper> networkFiltered = new ArrayList<>();

		AdapterWrapperDtoMapper.filterNewtokPropertyData(message, "message", messageFiltered);
		AdapterWrapperDtoMapper.filterNewtokPropertyData(network, "network", networkFiltered);
	}
}
