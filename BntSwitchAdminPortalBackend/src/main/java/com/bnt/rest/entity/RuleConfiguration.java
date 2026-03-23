package com.bnt.rest.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
//@Audited
@Table(name = "rule_configuration")
public class RuleConfiguration extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -558553967080513791L;

	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "rule_id", referencedColumnName = "id")
	private Rule rule;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((rule == null) ? 0 : rule.hashCode());
		result = prime * result + ((version == null) ? 0 : version.hashCode());
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
		RuleConfiguration other = (RuleConfiguration) obj;
		if (rule == null) {
			if (other.rule != null)
				return false;
		} else if (!rule.equals(other.rule))
			return false;
		if (version == null) {
			if (other.version != null)
				return false;
		} else if (!version.equals(other.version))
			return false;
		return true;
	}

	@Column(name = "destinations", nullable = false)
	private String destination;

	@Column(name = "version")
	private Integer version;

	@Column(name = "verified", nullable = false)
	private Integer verified;

	@Column(name = "active", nullable = false)
	private Character active;

	@Column(name = "drool_rule")
	private String droolRule;

	@Column(name = "node_json", nullable = false)
	private String json;

	@Column(name = "rule_json", nullable = false)
	private String ruleJson;

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public Rule getRule() {
		return rule;
	}

	public void setRule(Rule rule) {
		this.rule = rule;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Integer getVerified() {
		return verified;
	}

	public void setVerified(Integer verified) {
		this.verified = verified;
	}

	public String getDroolRule() {
		return droolRule;
	}

	public void setDroolRule(String droolRule) {
		this.droolRule = droolRule;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String getRuleJson() {
		return ruleJson;
	}

	public void setRuleJson(String ruleJson) {
		this.ruleJson = ruleJson;
	}

	@Override
	public String toString() {
		return "RuleConfiguration [id=" + this.getId() + ", rule=" + rule + ", destination=" + destination
				+ ", version=" + version + ", verified=" + verified + ", droolRule=" + droolRule + ", json=" + json
				+ ", createdOn=" + this.getCreatedOn() + ", createdBy=" + this.getCreatedBy() + ", updatedOn="
				+ this.getUpdatedOn() + ", updatedBy=" + this.getUpdatedBy() + "]";
	}
}
