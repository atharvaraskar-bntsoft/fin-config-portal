package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterSummaryUIWrapper {

	private Integer id;

	private String template;

	private String name;

	private List<AdapterConfigSummaryUIWapper> adapterConfigSummaryUIWapper;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public List<AdapterConfigSummaryUIWapper> getAdapterConfigSummaryUIWapper() {
		return adapterConfigSummaryUIWapper;
	}

	public void setAdapterConfigSummaryUIWapper(List<AdapterConfigSummaryUIWapper> adapterConfigSummaryUIWapper) {
		this.adapterConfigSummaryUIWapper = adapterConfigSummaryUIWapper;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
