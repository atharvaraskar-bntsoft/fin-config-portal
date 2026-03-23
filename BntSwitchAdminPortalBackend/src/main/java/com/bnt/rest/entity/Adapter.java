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
@Table(name = "adapter")
public class Adapter extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "type", nullable = false)
	private String type;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "standard_message_specification")
	private StandardMessageSpecification standardMessageSpecification;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "adapter_id", nullable = false)
	private String adapterId;

	@Column(name = "active", nullable = false)
	private Character active;

	@Column(name = "guid")
	private String guid;

	@OneToMany(mappedBy = "adapter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<AdapterConfiguration> adapterConfiguration;

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public StandardMessageSpecification getStandardMessageSpecification() {
		return standardMessageSpecification;
	}

	public void setStandardMessageSpecification(StandardMessageSpecification standardMessageSpecification) {
		this.standardMessageSpecification = standardMessageSpecification;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(String adapterId) {
		this.adapterId = adapterId;
	}

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public List<AdapterConfiguration> getAdapterConfiguration() {
		return adapterConfiguration;
	}

	public void setAdapterConfiguration(List<AdapterConfiguration> adapterConfiguration) {
		this.adapterConfiguration = adapterConfiguration;
	}
}
