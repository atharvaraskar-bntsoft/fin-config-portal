package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.hibernate.annotations.Where;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
//@Audited
@Table(name = "country_state")
@Where(clause = "deleted='0'")
public class CountryState extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "code", nullable = false)
	private String code;

	@Column(name = "display_name", nullable = false)
	private String stateName;

	@Column(name = "active", nullable = false)
	private Character active;

	@ManyToOne
	@JoinColumn(name = "country", nullable = false)
	private Country country;

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "CountryState [getId()=" + getId() + "]";
	}

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}
}
