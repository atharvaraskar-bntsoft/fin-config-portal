package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class StateWrapperDto {

	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	private String stateName;

	public StateWrapperDto() {

	}

	public StateWrapperDto(String countryState) {
		id = Integer.parseInt(countryState);
	}

	public StateWrapperDto(Integer id, String stateName) {
		super();
		this.id = id;
		this.stateName = stateName;
	}

	/**
	 * // public StateWrapperDto(StateWrapperDto countryState) { // ("zxz"); // }
	 * 
	 * // public StateWrapperDto(Integer id,String stateName) { // this.id=id; //
	 * this.stateName=stateName; // }
	 */
}
