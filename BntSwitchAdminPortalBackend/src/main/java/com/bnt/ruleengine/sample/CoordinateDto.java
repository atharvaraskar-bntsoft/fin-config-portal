package com.bnt.ruleengine.sample;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class CoordinateDto {

	private String name;

	private String[] types;

	private Integer[] counters;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String[] getTypes() {
		return types;
	}

	public void setTypes(String[] types) {
		this.types = types;
	}

	public Integer[] getCounters() {
		return counters;
	}

	public void setCounters(Integer[] counters) {
		this.counters = counters;
	}
}
