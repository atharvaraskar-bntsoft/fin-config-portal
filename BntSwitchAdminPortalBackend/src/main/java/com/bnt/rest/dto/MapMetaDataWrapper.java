package com.bnt.rest.dto;

import java.util.List;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MapMetaDataWrapper {

	List<Object> data;

	Map<String, Object> metaInfo;

	public List<Object> getData() {
		return data;
	}

	public void setData(List<Object> data) {
		this.data = data;
	}

	public Map<String, Object> getMetaInfo() {
		return metaInfo;
	}

	public void setMetaInfo(Map<String, Object> metaInfo) {
		this.metaInfo = metaInfo;
	}
}
