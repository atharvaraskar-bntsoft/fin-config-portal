package com.bnt.rest.wrapper.dto.workflow;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.bnt.bswitch.query.parser.Condition;
import com.bnt.service.mapper.TagsMapper;
import com.bnt.service.mapper.WorkFlowWrapperDtoMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkFlowServicesUiWrapper {

	private Integer id;

	private String serviceType;

	private String serviceName;

	private Integer ordinal;

	private String groupName;

	@JsonIgnore
	private String postDecisionRuleJson;

	private Object postDecisionRuleJsonUi;

	private PrecedingDecisionUiWrapper precedingDecisionUi;

	@JsonIgnore
	private String precedingDecision;

	@JsonIgnore
	private WorkFlowUiWrapper workFlow;

	@JsonIgnore
	private WorkFlowUiWrapper parentWorkFlowServiceId;

	private List<WorkFlowServicesUiWrapper> services;

	@JsonIgnore
	private String safingConditionJson;

	@JsonIgnore
	private String safingExceptionConditionJson;

	@JsonProperty("safingConditionJson")
	private Object safingConditionJsonUi;

	@JsonProperty("safingExceptionConditionJson")
	private Object safingExceptionConditionJsonUi;

	private Condition autoReversalEligibilityCondition;

	private Condition autoReversalFinalCondition;

	@JsonIgnore
	private String postDecision;

	@JsonIgnore
	private String safingCondition;

	@JsonIgnore
	private String safingExceptionCondition;

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
		this.postDecisionRuleJsonUi = TagsMapper.getConditionUiObjectFromConditionString(postDecisionRuleJson);
		this.postDecisionRuleJson = postDecisionRuleJson;
	}

	public Object getPostDecisionRuleJsonUi() {
		return postDecisionRuleJsonUi;
	}

	public void setPostDecisionRuleJsonUi(Object postDecisionRuleJsonUi) {
		this.postDecisionRuleJson = TagsMapper.getConditionStringFromConditionUiObject(postDecisionRuleJsonUi);
		this.postDecisionRuleJsonUi = postDecisionRuleJsonUi;
	}

	public PrecedingDecisionUiWrapper getPrecedingDecisionUi() {
		return precedingDecisionUi;
	}

	public void setPrecedingDecisionUi(PrecedingDecisionUiWrapper precedingDecisionUi) {
		this.precedingDecision = WorkFlowWrapperDtoMapper.getDtoFromPrecedingDecisionUiWrapper(precedingDecisionUi);
		this.precedingDecisionUi = precedingDecisionUi;
	}

	public String getPrecedingDecision() {
		return precedingDecision;
	}

	public void setPrecedingDecision(String precedingDecision) {
		this.precedingDecisionUi = WorkFlowWrapperDtoMapper.getPrecedingDecisionUiWrapperFromDto(precedingDecision);
		this.precedingDecision = precedingDecision;
	}

	public WorkFlowUiWrapper getWorkFlow() {
		return workFlow;
	}

	public void setWorkFlow(WorkFlowUiWrapper workFlow) {
		this.workFlow = workFlow;
	}

	public WorkFlowUiWrapper getParentWorkFlowServiceId() {
		return parentWorkFlowServiceId;
	}

	public void setParentWorkFlowServiceId(WorkFlowUiWrapper parentWorkFlowServiceId) {
		this.parentWorkFlowServiceId = parentWorkFlowServiceId;
	}

	public List<WorkFlowServicesUiWrapper> getServices() {
		return services;
	}

	public void setServices(List<WorkFlowServicesUiWrapper> services) {
		this.services = services;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSafingConditionJson() {
		return safingConditionJson;
	}

	public void setSafingConditionJson(String safingConditionJson) {
		this.safingConditionJsonUi = TagsMapper.getConditionUiObjectFromConditionString(safingConditionJson);
		this.safingConditionJson = safingConditionJson;
	}

	public String getSafingExceptionConditionJson() {
		return safingExceptionConditionJson;
	}

	public void setSafingExceptionConditionJson(String safingExceptionConditionJson) {
		this.safingExceptionConditionJsonUi = TagsMapper
				.getConditionUiObjectFromConditionString(safingExceptionConditionJson);
		this.safingExceptionConditionJson = safingExceptionConditionJson;
	}

	public Object getSafingConditionJsonUi() {
		return safingConditionJsonUi;
	}

	public void setSafingConditionJsonUi(Object safingConditionJsonUi) {
		this.safingConditionJson = TagsMapper.getConditionStringFromConditionUiObject(safingConditionJsonUi);
		this.safingConditionJsonUi = safingConditionJsonUi;
	}

	public Object getSafingExceptionConditionJsonUi() {
		return safingExceptionConditionJsonUi;
	}

	public void setSafingExceptionConditionJsonUi(Object safingExceptionConditionJsonUi) {
		this.safingExceptionConditionJson = TagsMapper
				.getConditionStringFromConditionUiObject(safingExceptionConditionJsonUi);
		this.safingExceptionConditionJsonUi = safingExceptionConditionJsonUi;
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
