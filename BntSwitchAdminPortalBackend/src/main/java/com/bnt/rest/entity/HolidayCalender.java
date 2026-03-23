package com.bnt.rest.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "holiday")
public class HolidayCalender extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "country_id")
	private Integer countryId;

	@Column(name = "cutt_off_time")
	private String cuttOffTime;

	@Column(name = "holiday_list")
	private String holidayList;

	@Column(name = "year")
	private Integer year;

	public Integer getCountryId() {
		return countryId;
	}

	public void setCountryId(Integer countryId) {
		this.countryId = countryId;
	}

	public String getCuttOffTime() {
		return cuttOffTime;
	}

	public void setCuttOffTime(String cuttOffTime) {
		this.cuttOffTime = cuttOffTime;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
