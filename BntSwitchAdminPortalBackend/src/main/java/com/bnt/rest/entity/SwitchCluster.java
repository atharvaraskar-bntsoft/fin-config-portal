package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "switch_cluster")
@Audited
public class SwitchCluster extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "cluster_key")
	private String clusterkey;

	@Column(name = "region")
	private String region;

	@Column(name = "data_centre")
	private String dataCentre;

	@Column(name = "active", nullable = false)
	private Character active;

	public String getClusterkey() {
		return clusterkey;
	}

	public void setClusterkey(String clusterkey) {
		this.clusterkey = clusterkey;
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
