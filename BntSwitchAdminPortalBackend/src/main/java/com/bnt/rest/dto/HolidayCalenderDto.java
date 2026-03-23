package com.bnt.rest.dto;

import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class HolidayCalenderDto {

	private Integer id;
	private IdAndNameWrapper countryId;
	private String cuttOffTime;
	private String holidayList;
	private Integer year;

	public IdAndNameWrapper getCountryId() {
		return countryId;
	}

	public void setCountryId(IdAndNameWrapper countryId) {
		this.countryId = countryId;
	}

	public String getCuttOffTime() {
		return cuttOffTime;
	}

	public void setCuttOffTime(String cuttOffTime) {
		this.cuttOffTime = cuttOffTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getHolidayList() {
		return holidayList;
	}

	public void setHolidayList(String holidayList) {
		this.holidayList = holidayList;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}
}
