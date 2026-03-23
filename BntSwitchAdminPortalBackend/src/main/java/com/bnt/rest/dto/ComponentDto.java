package com.bnt.rest.dto;

import java.util.List;

import com.bnt.ruleengine.sample.adp.MappingCopyAsIs;
import com.bnt.ruleengine.sample.adp.MappingExtract;
import com.bnt.ruleengine.sample.adp.MappingJoin;
import com.bnt.ruleengine.sample.adp.MappingMapper;
import com.bnt.ruleengine.sample.adp.MappingScript;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ComponentDto {

	private String adpType;
	private String networkService;
	private String tab;
	private String template;
	private String feature;
	private String field;
	private List<MappingCopyAsIs> listMappingCopyAsIs;
	private List<MappingExtract> listExtract;
	private List<MappingScript> listScript;
	private List<MappingJoin> listJoin;
	private List<MappingMapper> listMapperMapping;
	private List<Object> listCommon;

	public List<MappingCopyAsIs> getListMappingCopyAsIs() {
		return listMappingCopyAsIs;
	}

	public void setListMappingCopyAsIs(List<MappingCopyAsIs> listMappingCopyAsIs) {
		this.listMappingCopyAsIs = listMappingCopyAsIs;
	}

	public String getAdpType() {
		return adpType;
	}

	public void setAdpType(String adpType) {
		this.adpType = adpType;
	}

	public String getNetworkService() {
		return networkService;
	}

	public void setNetworkService(String networkService) {
		this.networkService = networkService;
	}

	public String getTab() {
		return tab;
	}

	public void setTab(String tab) {
		this.tab = tab;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public String getFeature() {
		return feature;
	}

	public void setFeature(String feature) {
		this.feature = feature;
	}

	public List<Object> getListCommon() {
		return listCommon;
	}

	public void setListCommon(List<Object> listCommon) {
		this.listCommon = listCommon;
	}

	public List<MappingExtract> getListExtract() {
		return listExtract;
	}

	public void setListExtract(List<MappingExtract> listExtract) {
		this.listExtract = listExtract;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public List<MappingScript> getListScript() {
		return listScript;
	}

	public void setListScript(List<MappingScript> listScript) {
		this.listScript = listScript;
	}

	public List<MappingJoin> getListJoin() {
		return listJoin;
	}

	public void setListJoin(List<MappingJoin> listJoin) {
		this.listJoin = listJoin;
	}

	public List<MappingMapper> getListMapperMapping() {
		return listMapperMapping;
	}

	public void setListMapperMapping(List<MappingMapper> listMapperMapping) {
		this.listMapperMapping = listMapperMapping;
	}
}
