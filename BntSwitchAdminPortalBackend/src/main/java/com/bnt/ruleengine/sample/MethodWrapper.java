package com.bnt.ruleengine.sample;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MethodWrapper {
	private String jmxUrl;
	private String mbeanName;
	private String selectedmethod;
	private List<MethodsInfo> listMethodInfo;

	public String getJmxUrl() {
		return jmxUrl;
	}

	public void setJmxUrl(String jmxUrl) {
		this.jmxUrl = jmxUrl;
	}

	public String getMbeanName() {
		return mbeanName;
	}

	public void setMbeanName(String mbeanName) {
		this.mbeanName = mbeanName;
	}

	public List<MethodsInfo> getListMethodInfo() {
		return listMethodInfo;
	}

	public void setListMethodInfo(List<MethodsInfo> listMethodInfo) {
		this.listMethodInfo = listMethodInfo;
	}

	public String getSelectedmethod() {
		return selectedmethod;
	}

	public void setSelectedmethod(String selectedmethod) {
		this.selectedmethod = selectedmethod;
	}
}
