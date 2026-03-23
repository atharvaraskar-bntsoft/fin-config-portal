package com.bnt.rest.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "setting")
@ExcludeExportMarker
public class Setting extends BaseEntity {

	private static final long serialVersionUID = 2L;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "system_user_id")
	private SystemUser systemUserId;

	@Column(name = "search", nullable = false)
	private String search;

	@Column(name = "locale", nullable = false)
	private String language;

	@Column(name = "pagination", nullable = false)
	private String pagination;

	public SystemUser getSystemUserId() {
		return systemUserId;
	}

	public void setSystemUserId(SystemUser systemUserId) {
		this.systemUserId = systemUserId;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
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
		return "Setting [systemUserId=" + systemUserId + ", search=" + search + ", languagePre=" + language
				+ ", pagination=" + pagination + "]";
	}
}
