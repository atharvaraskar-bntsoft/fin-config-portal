package com.bnt.rest.entity;

import java.util.Set;

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
@Table(name = "ext_etl_job")
public class ExtEtlJobNew extends BaseEntity {

	@Column(name = "job_name")
	private String jobName;

	@Column(name = "type")
	private String type;

	@Column(name = "description")
	private String description;

	@Column(name = "job_group")
	private String jobGroup;

	@Column(name = "active")
	private Character active;

	@OneToMany(mappedBy = "extEtlJobId", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<ExtEtlJobNewDetail> details;

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getJobGroup() {
		return jobGroup;
	}

	public void setJobGroup(String jobGroup) {
		this.jobGroup = jobGroup;
	}

	public Set<ExtEtlJobNewDetail> getDetails() {
		return details;
	}

	public void setDetails(Set<ExtEtlJobNewDetail> details) {
		this.details = details;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
