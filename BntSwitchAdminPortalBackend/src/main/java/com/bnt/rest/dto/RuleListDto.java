package com.bnt.rest.dto;

import com.bnt.rest.wrapper.dto.ValueAndTextWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleListDto {

	private ValueAndTextWrapper version;

	private int priority;

	private boolean active;

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public ValueAndTextWrapper getVersion() {
		return version;
	}

	public void setVersion(ValueAndTextWrapper version) {
		this.version = version;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "RuleListDto [version=" + version + ", priority=" + priority + "]";
	}
}
