package com.bnt.rest.dto;

import java.util.List;

import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RouteRuleUiDto {

	private boolean commit;
	private Integer id;
	private String name;
	private boolean enabled;
	private boolean active;
	private boolean schedule;
	private String description;
	private List<IdAndNameWrapper> versions;
	private List<IdAndNameWrapper> destinations;
	private List<Condition> conditions;

	public boolean isSchedule() {
		return schedule;
	}

	public void setSchedule(boolean schedule) {
		this.schedule = schedule;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public List<IdAndNameWrapper> getDestinations() {
		return destinations;
	}

	public void setDestinations(List<IdAndNameWrapper> destinations) {
		this.destinations = destinations;
	}

	public List<Condition> getConditions() {
		return conditions;
	}

	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
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

	public List<IdAndNameWrapper> getVersions() {
		return versions;
	}

	public void setVersions(List<IdAndNameWrapper> versions) {
		this.versions = versions;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean isCommit() {
		return commit;
	}

	public void setCommit(boolean isCommit) {
		this.commit = isCommit;
	}

	@Override
	public String toString() {
		return "RouteRuleUiDto [commit=" + commit + ", id=" + id + ", name=" + name + ", enabled=" + enabled
				+ ", active=" + active + ", schedule=" + schedule + ", description=" + description + ", versions="
				+ versions + ", destinations=" + destinations + ", conditions=" + conditions + "]";
	}
}
