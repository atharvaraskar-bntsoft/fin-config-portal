package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "device_model_configuration")
public class DeviceModelConfiguration extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "device_model_id")
	@JsonBackReference
	private DeviceModel deviceModel;

	@Column(name = "version", nullable = false)
	private Integer version;

	@Column(name = "configuration_data")
	private String configurationData;

	@Lob
	@Column(name = "emv_data", nullable = false)
	private String emvData;

	@Column(name = "active", nullable = false)
	private Character active;

	public DeviceModel getDeviceModel() {
		return deviceModel;
	}

	public void setDeviceModel(DeviceModel deviceModel) {
		this.deviceModel = deviceModel;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public String getConfigurationData() {
		return configurationData;
	}

	public void setConfigurationData(String configurationData) {
		this.configurationData = configurationData;
	}

	public String getEmvData() {
		return emvData;
	}

	public void setEmvData(String emvData) {
		this.emvData = emvData;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
