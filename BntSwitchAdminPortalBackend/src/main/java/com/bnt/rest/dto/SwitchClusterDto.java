package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SwitchClusterDto extends BaseDto {

	private String clusterKey;

	private String region;

	private String dataCentre;

	private Character active;

	public String getClusterKey() {
		return clusterKey;
	}

	public void setClusterKey(String clusterKey) {
		this.clusterKey = clusterKey;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getDataCentre() {
		return dataCentre;
	}

	public void setDataCentre(String dataCentre) {
		this.dataCentre = dataCentre;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
