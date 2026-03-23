package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "lookup_value")
public class LookupValue extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "value", nullable = false)
	private String value;

	@Column(name = "description", nullable = false)
	private String description;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "lookup_type")
	private LookupType lookupType;

	@Column(name = "modifiable")
	private Character modifiable;

	@Column(name = "active")
	private Character active;

	public Character getModifiable() {
		return modifiable;
	}

	public void setModifiable(Character modifiable) {
		this.modifiable = modifiable;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LookupType getLookupType() {
		return lookupType;
	}

	public void setLookupType(LookupType lookupType) {
		this.lookupType = lookupType;
	}
}
