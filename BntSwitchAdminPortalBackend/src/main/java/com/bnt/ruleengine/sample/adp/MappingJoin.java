package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingJoin extends MappingExtract {

	private String packagerField;

	private List<JoinSourceUI> listJoinSource;

	public List<JoinSourceUI> getListJoinSource() {
		return listJoinSource;
	}

	public void setListJoinSource(List<JoinSourceUI> listJoinSource) {
		this.listJoinSource = listJoinSource;
	}

	public String getPackagerField() {
		return packagerField;
	}

	public void setPackagerField(String packagerField) {
		this.packagerField = packagerField;
	}
}
