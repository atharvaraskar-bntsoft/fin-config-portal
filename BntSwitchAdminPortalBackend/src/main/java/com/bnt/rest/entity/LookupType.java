package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "lookup_type")
public class LookupType extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "modifiable")
	private Character modifiable;

	public Character getModifiable() {
		return modifiable;
	}

	public void setModifiable(Character modifiable) {
		this.modifiable = modifiable;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @OneToMany(mappedBy = "lookupType", cascade = CascadeType.ALL, fetch =
	 *                     FetchType.EAGER)
	 * 
	 * @JsonBackReference private LookupValue lookupValue;
	 */
}
