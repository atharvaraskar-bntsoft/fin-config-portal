package com.bnt.rest.wrapper.dto.adapter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.StringUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkPropertiesResponseWrapper {

	private static final Logger logger = LogManager.getLogger(NetworkPropertiesResponseWrapper.class);
	@JsonIgnore
	transient Set<String> keySet;

	public NetworkPropertiesResponseWrapper() {

	}

	private List<PropertiesWrapper> message = new ArrayList<>();

	private List<PropertiesWrapper> network = new ArrayList<>();

	private boolean singleProperty;

	private boolean multiPackager;

	private boolean samePackager;

	public List<PropertiesWrapper> getMessage() {
		return message;
	}

	public void setMessage(List<PropertiesWrapper> message) {
		this.message = message;
	}

	public List<PropertiesWrapper> getNetwork() {

		return network;
	}

	public void setNetwork(List<PropertiesWrapper> network) {

		this.network = getTransformedList(network);
	}

	public boolean isSingleProperty() {
		return singleProperty;
	}

	public void setSingleProperty(boolean singleProperty) {
		this.singleProperty = singleProperty;
	}

	public boolean isMultiPackager() {
		return multiPackager;
	}

	public void setMultiPackager(boolean multiPackager) {
		this.multiPackager = multiPackager;
	}

	public boolean isSamePackager() {
		return samePackager;
	}

	public void setSamePackager(boolean samePackager) {
		this.samePackager = samePackager;
	}

	/**
	 * public List<PropertiesWrapper> getNetworkL3() { return networkL3; }
	 * 
	 * public void setNetworkL3(List<PropertiesWrapper> networkL3) { this.networkL3
	 * = getTransformedList(networkL3); }
	 */

	private List<PropertiesWrapper> getTransformedList(List<PropertiesWrapper> network) {
		for (PropertiesWrapper eachWrapper : network) {
			if (CollectionUtil.isCollectionEmptyOrNull(keySet) || !(keySet.contains(eachWrapper.getField()))) {
				mapFieldLabel(eachWrapper);
			}
		}
		return network;
	}

	private void mapFieldLabel(PropertiesWrapper eachWrapper) {
		if (eachWrapper.getLabel() == null) {
			eachWrapper.setLabel(StringUtil.getCamelCase(eachWrapper.getField()));

		}

	}

	public static class PropertiesWrapper {

		String field;
		String label;
		List<String> listvalues;
		Object value;
		String fileName;
		String datatype;
		String format;
		Boolean mandatory;
		Boolean hidden;

		public PropertiesWrapper() {
			logger.info("inside PropertiesWrapper()..");
		}

		public String getFileName() {
			return fileName;
		}

		public void setFileName(String fileName) {
			this.fileName = fileName;
		}

		public String getField() {
			return field;
		}

		public void setField(String field) {
			this.field = field;
		}

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		public List<String> getListvalues() {
			return listvalues;
		}

		public void setListvalues(List<String> listvalues) {
			this.listvalues = listvalues;
		}

		public Object getValue() {
			return value;
		}

		public void setValue(Object value) {
			this.value = value;

		}

		public String getDatatype() {
			return datatype;
		}

		public void setDatatype(String datatype) {
			this.datatype = datatype;
		}

		public String getFormat() {
			return format;
		}

		public void setFormat(String format) {
			this.format = format;
		}

		public Boolean getMandatory() {
			return mandatory;
		}

		public void setMandatory(Boolean mandatory) {
			this.mandatory = mandatory;
		}

		public Boolean getHidden() {
			return hidden;
		}

		public void setHidden(Boolean hidden) {
			this.hidden = hidden;
		}
	}
}
