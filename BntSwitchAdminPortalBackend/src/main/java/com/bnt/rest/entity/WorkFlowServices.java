package com.bnt.rest.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.bnt.bswitch.query.parser.Condition;
import io.hypersistence.utils.hibernate.type.json.JsonStringType;
import io.hypersistence.utils.hibernate.type.json.JsonType;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "workflow_services")
public class WorkFlowServices extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "service_type", nullable = false)
	private String serviceType;

	@Column(name = "service_name", nullable = false)
	private String serviceName;

	@Column(name = "ordinal", nullable = false)
	private Integer ordinal;

	@JsonBackReference
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "parent_workflow_service_id")
	private WorkFlowServices parentWorkFlowServiceId;

	@JsonManagedReference
	@OneToMany(mappedBy = "parentWorkFlowServiceId")
	private List<WorkFlowServices> services = new ArrayList<>();

	@Column(name = "group_name")
	private String groupName;

	@Column(name = "post_decision_rule_json")
	private String postDecisionRuleJson;

	@Column(name = "preceding_decision")
	private String precedingDecision;

	@Column(name = "safing_condition_json")
	private String safingConditionJson;

	@Column(name = "safing_exception_condition_json")
	private String safingExceptionConditionJson;

	@Column(name = "post_decision")
	private String postDecision;

	@Column(name = "safing_condition")
	private String safingCondition;

	@Column(name = "safing_exception_condition")
	private String safingExceptionCondition;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "wf_id")
	@JsonBackReference
	private WorkFlow workFlow;

	@Type(JsonType.class)
	@Column(name = "auto_reversal_eligibility_condition", columnDefinition = "json")
	private Condition autoReversalEligibilityCondition;

	@Type(JsonType.class)
	@Column(name = "auto_reversal_final_condition", columnDefinition = "json")
	private Condition autoReversalFinalCondition;

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public Integer getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(Integer ordinal) {
		this.ordinal = ordinal;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getPostDecisionRuleJson() {
		return postDecisionRuleJson;
	}

	public void setPostDecisionRuleJson(String postDecisionRuleJson) {
		this.postDecisionRuleJson = postDecisionRuleJson;
	}

	public String getPrecedingDecision() {
		return precedingDecision;
	}

	public void setPrecedingDecision(String precedingDecision) {
		this.precedingDecision = precedingDecision;
	}

	public WorkFlow getWorkFlow() {
		return workFlow;
	}

	public void setWorkFlow(WorkFlow workFlow) {
		this.workFlow = workFlow;
	}

	public WorkFlowServices getParentWorkFlowServiceId() {
		return parentWorkFlowServiceId;
	}

	public void setParentWorkFlowServiceId(WorkFlowServices parentWorkFlowServiceId) {
		this.parentWorkFlowServiceId = parentWorkFlowServiceId;
	}

	public List<WorkFlowServices> getServices() {
		return services;
	}

	public void setServices(List<WorkFlowServices> services) {
		this.services = services;
		this.services.forEach(child -> child.setParentWorkFlowServiceId(this));
	}

	public String getSafingConditionJson() {
		return safingConditionJson;
	}

	public void setSafingConditionJson(String safingConditionJson) {
		this.safingConditionJson = safingConditionJson;
	}

	public String getSafingExceptionConditionJson() {
		return safingExceptionConditionJson;
	}

	public void setSafingExceptionConditionJson(String safingExceptionConditionJson) {
		this.safingExceptionConditionJson = safingExceptionConditionJson;
	}

	public String getPostDecision() {
		return postDecision;
	}

	public void setPostDecision(String postDecision) {
		this.postDecision = postDecision;
	}

	public String getSafingCondition() {
		return safingCondition;
	}

	public void setSafingCondition(String safingCondition) {
		this.safingCondition = safingCondition;
	}

	public String getSafingExceptionCondition() {
		return safingExceptionCondition;
	}

	public void setSafingExceptionCondition(String safingExceptionCondition) {
		this.safingExceptionCondition = safingExceptionCondition;
	}

	public Condition getAutoReversalEligibilityCondition() {
		return autoReversalEligibilityCondition;
	}

	public void setAutoReversalEligibilityCondition(Condition autoReversalEligibilityCondition) {
		this.autoReversalEligibilityCondition = autoReversalEligibilityCondition;
	}

	public Condition getAutoReversalFinalCondition() {
		return autoReversalFinalCondition;
	}

	public void setAutoReversalFinalCondition(Condition autoReversalFinalCondition) {
		this.autoReversalFinalCondition = autoReversalFinalCondition;
	}
}
