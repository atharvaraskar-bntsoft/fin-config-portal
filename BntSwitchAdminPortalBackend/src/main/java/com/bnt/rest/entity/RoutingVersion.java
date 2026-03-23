package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
//@Audited
@Table(name = "routing_version")
public class RoutingVersion extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
	@JoinColumn(name = "routing_id", referencedColumnName = "id")
	private Routing routing;

	@Column(name = "version", nullable = false)
	private Integer version;

	@Column(name = "status", nullable = false)
	private boolean status;

	@OneToMany(mappedBy = "routingVersion", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@OrderBy("priority ASC")
	private List<ConfiguredRoutes> configuredRoutes;

	public Routing getRouting() {
		return routing;
	}

	public void setRouting(Routing routing) {
		this.routing = routing;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public List<ConfiguredRoutes> getConfiguredRoutes() {
		return configuredRoutes;
	}

	public void setConfiguredRoutes(List<ConfiguredRoutes> configuredRoutes) {
		this.configuredRoutes = configuredRoutes;
		/*
		 * This is to be in sync for bidirectional association - Used in import
		 * operation during batch insert
		 */
		// Replace with Stream later
		for (ConfiguredRoutes eachConfiguredRoute : this.configuredRoutes) {
			eachConfiguredRoute.setRoutingVersion(this);
		}
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
}
