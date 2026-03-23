package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SettingDto extends BaseDto {

	private String systemUserId;

	private String search;

	private String language;

	private String pagination;

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getSystemUserId() {
		return systemUserId;
	}

	public void setSystemUserId(String systemUserId) {
		this.systemUserId = systemUserId;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getPagination() {
		return pagination;
	}

	public void setPagination(String pagination) {
		this.pagination = pagination;
	}

	@Override
	public String toString() {
		return "Setting [Search=" + search + ", language=" + language + ", pagination=" + pagination + "]";
	}
}
