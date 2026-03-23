package com.bnt.rest.wrapper.dto.adapter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.bnt.rest.dto.ImfStructureDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterUiResponseWrapper {

	private MasterAdapterWrapper masterData;
	private SchemaUiResponseWrapper schemaData;
	private NetworkUiResponseWrapper networkData;
	private TransformUiResponseWrapper transformData;
	private ResponseCodeUiResponseWrapper responseCodeData;
	private BeanConfigurationUiWrapper beanconfiguationData;
	private Integer configurationId;
	private Integer configurationVersion;

	@JsonIgnoreProperties({ "imf" })
	private ImfStructureDto imfId;

	private boolean beanTabDisable;

	public MasterAdapterWrapper getMasterData() {
		return masterData;
	}

	public void setMasterData(MasterAdapterWrapper masterData) {
		this.masterData = masterData;
	}

	public SchemaUiResponseWrapper getSchemaData() {
		return schemaData;
	}

	public void setSchemaData(SchemaUiResponseWrapper schemaData) {
		this.schemaData = schemaData;
	}

	public NetworkUiResponseWrapper getNetworkData() {
		return networkData;
	}

	public void setNetworkData(NetworkUiResponseWrapper networkData) {
		this.networkData = networkData;
	}

	public TransformUiResponseWrapper getTransformData() {
		return transformData;
	}

	public void setTransformData(TransformUiResponseWrapper transformData) {
		this.transformData = transformData;
	}

	public ResponseCodeUiResponseWrapper getResponseCodeData() {
		return responseCodeData;
	}

	public void setResponseCodeData(ResponseCodeUiResponseWrapper responseCodeData) {
		this.responseCodeData = responseCodeData;
	}

	public BeanConfigurationUiWrapper getBeanconfiguationData() {
		return beanconfiguationData;
	}

	public void setBeanconfiguationData(BeanConfigurationUiWrapper beanconfiguationData) {
		this.beanconfiguationData = beanconfiguationData;
	}

	public Integer getConfigurationId() {
		return configurationId;
	}

	public void setConfigurationId(Integer configurationId) {
		this.configurationId = configurationId;
	}

	public Integer getConfigurationVersion() {
		return configurationVersion;
	}

	public void setConfigurationVersion(Integer configurationVersion) {
		this.configurationVersion = configurationVersion;
	}

	public ImfStructureDto getImfId() {
		return imfId;
	}

	public void setImfId(ImfStructureDto imfId) {
		this.imfId = imfId;
	}

	public boolean isBeanTabDisable() {
		return beanTabDisable;
	}

	public void setBeanTabDisable(boolean beanTabDisable) {
		this.beanTabDisable = beanTabDisable;
	}

}
