package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "merchant_category_code")
public class MerchantCategoryCode extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "code", nullable = false)
	private String code;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "active", nullable = false)
	private Character active;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}
}
