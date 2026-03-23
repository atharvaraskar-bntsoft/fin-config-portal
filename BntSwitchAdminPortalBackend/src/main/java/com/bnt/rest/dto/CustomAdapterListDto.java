package com.bnt.rest.dto;

import java.util.List;

import com.bnt.rest.wrapper.dto.adapter.AdapterConfigSummaryUIWapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CustomAdapterListDto {

	private String adpId;

	private String adpName;

	private String template;

	private String versions;

	private List<AdapterConfigSummaryUIWapper> adapterConfigSummaryUIWapper;

	public String getAdpId() {
		return adpId;
	}

	public void setAdpId(String adpId) {
		this.adpId = adpId;
	}

	public String getAdpName() {
		return adpName;
	}

	public void setAdpName(String adpName) {
		this.adpName = adpName;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public String getVersions() {
		return versions;
	}

	public void setVersions(String versions) {
		this.versions = versions;
	}

	public List<AdapterConfigSummaryUIWapper> getAdapterConfigSummaryUIWapper() {
		return adapterConfigSummaryUIWapper;
	}

	public void setAdapterConfigSummaryUIWapper(List<AdapterConfigSummaryUIWapper> adapterConfigSummaryUIWapper) {
		this.adapterConfigSummaryUIWapper = adapterConfigSummaryUIWapper;
	}
}
