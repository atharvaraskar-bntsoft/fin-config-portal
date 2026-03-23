package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingConstantImdg {
	/*
	 * Either "imdg_enrich" or "field"
	 */
	private String type;

	private String entityName;

	List<InternalWrapper> listFields;

	private String imfEntityField;

	private String acctualEntityFieldName;

	/*
	 * L1 - GATEWAY_SERVICE L3 - SELECTED SERVICE on Network Tab
	 */
	private String networkService;

	/* request or response */
	private String tab;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
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

	public List<InternalWrapper> getListFields() {
		return listFields;
	}

	public void setListFields(List<InternalWrapper> listFields) {
		this.listFields = listFields;
	}

	public String getImfEntityField() {
		return imfEntityField;
	}

	public void setImfEntityField(String imfEntityField) {
		this.imfEntityField = imfEntityField;
	}

	public String getAcctualEntityFieldName() {
		return acctualEntityFieldName;
	}

	public void setAcctualEntityFieldName(String acctualEntityFieldName) {
		this.acctualEntityFieldName = acctualEntityFieldName;
	}
}
