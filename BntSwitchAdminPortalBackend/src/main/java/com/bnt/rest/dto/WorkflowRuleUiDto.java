package com.bnt.rest.dto;

import java.util.List;

import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class WorkflowRuleUiDto {

	private Integer id;
	private String name;
	private boolean enabled;
	private String description;
	private Integer paymentMethod;
	private List<IdAndNameWrapper> workflow;
	private List<Condition> conditions;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(Integer paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public List<IdAndNameWrapper> getWorkflow() {
		return workflow;
	}

	public void setWorkflow(List<IdAndNameWrapper> workflow) {
		this.workflow = workflow;
	}

	public List<Condition> getConditions() {
		return conditions;
	}

	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
	}

	@Override
	public String toString() {
		return "WorkflowRuleUiDto [id=" + id + ", name=" + name + ", enabled=" + enabled + ", description="
				+ description + ", paymentMethod=" + paymentMethod + ", workflow=" + workflow + ", conditions="
				+ conditions + "]";
	}
}
