package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "core_property")
public class CoreProperties extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "type", nullable = false)
	private String type;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "sub_type", nullable = false)
	private String subType;

	@OneToMany(mappedBy = "coreProperties", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	// @JsonManagedReference
	private List<CorePropertiesDetails> corePropertiesDetails;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubType() {
		return subType;
	}

	public void setSubType(String subType) {
		this.subType = subType;
	}

	public List<CorePropertiesDetails> getCorePropertiesDetails() {
		return corePropertiesDetails;
	}

	public void setCorePropertiesDetails(List<CorePropertiesDetails> corePropertiesDetails) {
		this.corePropertiesDetails = corePropertiesDetails;
	}
}
