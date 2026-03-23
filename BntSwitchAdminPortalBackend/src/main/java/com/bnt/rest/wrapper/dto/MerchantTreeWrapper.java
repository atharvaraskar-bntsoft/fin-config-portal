package com.bnt.rest.wrapper.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MerchantTreeWrapper {

	private Integer id;

	private String name;

	private Integer merchantInstitutionId;

	private String merchantInstitutionName;

	private List<LocationTreeWrapper> merchants;

	private List<LocationTreeWrapper> locations;

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

	public List<LocationTreeWrapper> getMerchants() {
		return merchants;
	}

	public void setMerchants(List<LocationTreeWrapper> merchants) {
		this.merchants = merchants;
	}

	public List<LocationTreeWrapper> getLocations() {
		return locations;
	}

	public void setLocations(List<LocationTreeWrapper> locations) {
		this.locations = locations;
	}

	public Integer getMerchantInstitutionId() {
		return merchantInstitutionId;
	}

	public void setMerchantInstitutionId(Integer merchantInstitutionId) {
		this.merchantInstitutionId = merchantInstitutionId;
	}

	public String getMerchantInstitutionName() {
		return merchantInstitutionName;
	}

	public void setMerchantInstitutionName(String merchantInstitutionName) {
		this.merchantInstitutionName = merchantInstitutionName;
	}
}
