package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class LocationTreeWrapper {

	private Integer id;

	private String name;

	private Integer merchantId;

	private String merchantName;

	private List<DeviceTreeWrapper> locations;

	private List<DeviceTreeWrapper> devices;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<DeviceTreeWrapper> getLocations() {
		return locations;
	}

	public void setLocations(List<DeviceTreeWrapper> locations) {
		this.locations = locations;
	}

	public List<DeviceTreeWrapper> getDevices() {
		return devices;
	}

	public void setDevices(List<DeviceTreeWrapper> devices) {
		this.devices = devices;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}
}
