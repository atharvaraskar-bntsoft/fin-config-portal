package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class InstitutionTreeWrapper {

	private Integer id;

	private String name;

	private List<MerchantTreeWrapper> devices;

	private List<MerchantTreeWrapper> merchants;

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

	public List<MerchantTreeWrapper> getDevices() {
		return devices;
	}

	public void setDevices(List<MerchantTreeWrapper> devices) {
		this.devices = devices;
	}

	public List<MerchantTreeWrapper> getMerchants() {
		return merchants;
	}

	public void setMerchants(List<MerchantTreeWrapper> merchants) {
		this.merchants = merchants;
	}
}
