package com.bnt.rest.entity;

import java.io.Serializable;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
//@Audited
@Table(name = "rule")
public class Rule extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -558553967080513790L;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "rule_type", nullable = false)
	private String ruleType;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "active", nullable = false)
	private Character active;

	@Column(name = "versionable", nullable = false)
	private boolean versionable;

	@Column(name = "editable", nullable = false)
	private boolean editable;

	@OneToMany(mappedBy = "rule", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonBackReference
	@OrderBy("version DESC")
	private List<RuleConfiguration> ruleConfiguration;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Rule other = (Rule) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRuleType() {
		return ruleType;
	}

	public void setRuleType(String ruleType) {
		this.ruleType = ruleType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public boolean isVersionable() {
		return versionable;
	}

	public void setVersionable(boolean versionable) {
		this.versionable = versionable;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public List<RuleConfiguration> getRuleConfiguration() {
		return ruleConfiguration;
	}

	public void setRuleConfiguration(List<RuleConfiguration> ruleConfiguration) {
		this.ruleConfiguration = ruleConfiguration;

		// Replace with Stream later
		for (RuleConfiguration eachConfig : this.ruleConfiguration) {
			eachConfig.setRule(this);
		}
	}

	@Override
	public String toString() {
		return "Rule [id=" + this.getId() + ", name=" + name + ", ruleType=" + ruleType + ", description=" + description
				+ ", active=" + active + ", versionable=" + versionable + ", editable=" + editable
				+ ", ruleConfiguration=" + ruleConfiguration + ", createdOn=" + this.getCreatedOn() + ", createdBy="
				+ this.getCreatedBy() + ", updatedOn=" + this.getUpdatedOn() + ", updatedBy=" + this.getUpdatedBy()
				+ "]";
	}
}
