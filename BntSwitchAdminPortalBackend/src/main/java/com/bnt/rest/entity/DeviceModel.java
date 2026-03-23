
package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "device_model")
public class DeviceModel extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "device_type")
	private DeviceType deviceType;

	@Column(name = "model_name", nullable = false)
	private String modelName;

	@OneToMany(mappedBy = "deviceModel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<DeviceModelConfiguration> deviceModelConfiguration;

	public DeviceType getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(DeviceType deviceType) {
		this.deviceType = deviceType;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public List<DeviceModelConfiguration> getDeviceModelConfiguration() {
		return deviceModelConfiguration;
	}

	public void setDeviceModelConfiguration(List<DeviceModelConfiguration> deviceModelConfiguration) {
		this.deviceModelConfiguration = deviceModelConfiguration;
	}
}
