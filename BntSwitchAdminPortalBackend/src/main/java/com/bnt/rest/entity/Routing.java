package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "routing")
public class Routing extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false)
	private String routeDesc;

	@Column(name = "active", nullable = false)
	private boolean ruleActive;

//    @Column(name = "servicetype", nullable = false)
//    private String serviceType;

	@Column(name = "rule_type", nullable = false)
	private String ruletype;

	@Column(name = "route_type")
	private String routetype;

	@Column(name = "route_type_value")
	private String routetypevalue;

	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "routing", cascade = CascadeType.ALL)
	@OrderBy("version DESC")
	private List<RoutingVersion> routingVersion;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRouteDesc() {
		return routeDesc;
	}

	public void setRouteDesc(String routeDesc) {
		this.routeDesc = routeDesc;
	}

	public boolean isRuleActive() {
		return ruleActive;
	}

	public void setRuleActive(boolean ruleActive) {
		this.ruleActive = ruleActive;
	}

	public List<RoutingVersion> getRoutingVersion() {
		return routingVersion;
	}

	public void setRoutingVersion(List<RoutingVersion> routingVersion) {
		this.routingVersion = routingVersion;
		/**
		 * This is to be in sync for bidirectional association - Used in import
		 * operation during batch insert
		 */
		for (RoutingVersion eachRoutingVersion : this.routingVersion) {
			eachRoutingVersion.setRouting(this);
		}
	}

//	public String getServiceType() { 
//		return serviceType;
//	}
//	
//	public void setServiceType(String serviceType) { 
//		this.serviceType = serviceType;
//	}

	public String getRuletype() {
		return ruletype;
	}

	public void setRuletype(String ruletype) {
		this.ruletype = ruletype;
	}

	public String getRoutetype() {
		return routetype;
	}

	public void setRoutetype(String routetype) {
		this.routetype = routetype;
	}

	public String getRoutetypevalue() {
		return routetypevalue;
	}

	public void setRoutetypevalue(String routetypevalue) {
		this.routetypevalue = routetypevalue;
	}
}
