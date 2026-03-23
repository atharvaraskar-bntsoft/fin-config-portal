package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
//@Audited
@Table(name = "configured_routes")
public class ConfiguredRoutes extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(optional = false)
	@JoinColumn(name = "routing_version", referencedColumnName = "id")
	@JsonBackReference
	private RoutingVersion routingVersion;

	@OneToOne
	@JoinColumn(name = "rule_configuration")
	@JsonBackReference
	private RuleConfiguration ruleConfiguration;

	@Column(name = "priority", nullable = false)
	private Integer priority;

	public RoutingVersion getRoutingVersion() {
		return routingVersion;
	}

	public void setRoutingVersion(RoutingVersion routingVersion) {
		this.routingVersion = routingVersion;
	}

	public Integer getPriority() {
		return priority;
	}

	public RuleConfiguration getRuleConfiguration() {
		return ruleConfiguration;
	}

	public void setRuleConfiguration(RuleConfiguration ruleConfiguration) {
		this.ruleConfiguration = ruleConfiguration;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}
}
