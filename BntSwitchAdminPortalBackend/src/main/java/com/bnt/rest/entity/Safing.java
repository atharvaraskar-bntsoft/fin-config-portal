package com.bnt.rest.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "txn_post_processing")
public class Safing implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	private String id;

	@Column(name = "status")
	private String status;

	@Column(name = "deleted")
	private Character deleted;

	@Column(name = "no_of_attempts")
	private Integer noOfAttempts;

	@Column(name = "last_attempt_time")
	private Timestamp lastAttemptTime;

	@Column(name = "next_attempt_time")
	private Timestamp nextAttemptTime;

//	@OneToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "route", nullable = true)
	@Column(name = "route")
	private String route;

	@Column(name = "dependent_data", columnDefinition = "jsonb")
	private String dependentData;

	@Column(name = "post_processing_action", columnDefinition = "jsonb")
	private String postProcessingAction;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getNoOfAttempts() {
		return noOfAttempts;
	}

	public void setNoOfAttempts(Integer noOfAttempts) {
		this.noOfAttempts = noOfAttempts;
	}

	public Timestamp getLastAttemptTime() {
		return lastAttemptTime;
	}

	public void setLastAttemptTime(Timestamp lastAttemptTime) {
		this.lastAttemptTime = lastAttemptTime;
	}

	public Timestamp getNextAttemptTime() {
		return nextAttemptTime;
	}

	public void setNextAttemptTime(Timestamp nextAttemptTime) {
		this.nextAttemptTime = nextAttemptTime;
	}

	public String getDependentData() {
		return dependentData;
	}

	public void setDependentData(String dependentData) {
		this.dependentData = dependentData;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	public String getPostProcessingAction() {
		return postProcessingAction;
	}

	public void setPostProcessingAction(String postProcessingAction) {
		this.postProcessingAction = postProcessingAction;
	}
}
