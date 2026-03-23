package com.bnt.rest.dto;

import java.util.List;

import jakarta.persistence.Column;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.bswitch.query.parser.Condition;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkFlowServicesDto extends BaseDto {

	private String serviceType;

	private String serviceName;

	private Integer ordinal;

	private String groupName;

	private String postDecisionRuleJson;

	private String precedingDecision;

	private String safingConditionJson;

	private String safingExceptionConditionJson;

	private String postDecision;

	private String safingCondition;

	private String safingExceptionCondition;

	@JsonIgnore
	private WorkFlowDto workFlow;

	@JsonIgnore
	private WorkFlowServicesDto parentWorkFlowServiceId;

	private List<WorkFlowServicesDto> services;

	private Condition autoReversalEligibilityCondition;

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

	public String getPrecedingDecision() {
		return precedingDecision;
	}

	public void setPrecedingDecision(String precedingDecision) {
		this.precedingDecision = precedingDecision;
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

	public WorkFlowDto getWorkFlow() {
		return workFlow;
	}

	public void setWorkFlow(WorkFlowDto workFlow) {
		this.workFlow = workFlow;
	}

	public WorkFlowServicesDto getParentWorkFlowServiceId() {
		return parentWorkFlowServiceId;
	}

	public void setParentWorkFlowServiceId(WorkFlowServicesDto parentWorkFlowServiceId) {
		this.parentWorkFlowServiceId = parentWorkFlowServiceId;
	}

	public List<WorkFlowServicesDto> getServices() {
		return services;
	}

	public void setServices(List<WorkFlowServicesDto> services) {
		this.services = services;
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
