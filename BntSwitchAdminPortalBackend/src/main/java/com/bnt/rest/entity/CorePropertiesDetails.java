package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "core_property_detail")
public class CorePropertiesDetails extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "version", nullable = false)
	private Integer version;

	@Column(name = "properties")
	private String properties;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	@JsonBackReference
	private CoreProperties coreProperties;

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public String getProperties() {
		return properties;
	}

	public void setProperties(String properties) {
		this.properties = properties;
	}

	public CoreProperties getCoreProperties() {
		return coreProperties;
	}

	public void setCoreProperties(CoreProperties coreProperties) {
		this.coreProperties = coreProperties;
	}
}
