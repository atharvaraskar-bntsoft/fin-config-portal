package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class HolidayListDto {

	private String dateFormat;
	private List<String> weekOffDays;
	private List<String> holidays;

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	public List<String> getWeekOffDays() {
		return weekOffDays;
	}

	public void setWeekOffDays(List<String> weekOffDays) {
		this.weekOffDays = weekOffDays;
	}

	public List<String> getHolidays() {
		return holidays;
	}

	public void setHolidays(List<String> holidays) {
		this.holidays = holidays;
	}
}
