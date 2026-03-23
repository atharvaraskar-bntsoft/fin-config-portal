package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransactionMappingUi {

	public TransactionMappingUi() {
		super();
	}

	public TransactionMappingUi(String adapterType, String templateType, List<MessageMapping> listMessageMapping) {
		super();
		this.adapterType = adapterType;
		this.templateType = templateType;
		this.listMessageMapping = listMessageMapping;
	}

	/* L1 or L3 */
	private String adapterType;

	/* ISO|JSON|HTTP|SOAP */
	private String templateType;

	private List<MessageMapping> listMessageMapping;

	public String getAdapterType() {
		return adapterType;
	}

	public void setAdapterType(String adapterType) {
		this.adapterType = adapterType;
	}

	public String getTemplateType() {
		return templateType;
	}

	public void setTemplateType(String templateType) {
		this.templateType = templateType;
	}

	public List<MessageMapping> getListMessageMapping() {
		return listMessageMapping;
	}

	public void setListMessageMapping(List<MessageMapping> listMessageMapping) {
		this.listMessageMapping = listMessageMapping;
	}
}
