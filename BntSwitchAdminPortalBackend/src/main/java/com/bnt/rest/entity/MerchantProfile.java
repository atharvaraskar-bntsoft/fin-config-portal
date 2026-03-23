package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import org.hibernate.envers.Audited;

import com.querydsl.core.annotations.QueryInit;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "merchant_profile")
@Audited
public class MerchantProfile extends AuditEntity {

	private static final long serialVersionUID = -2588574105550847367L;

	@Id
	private Integer id;

	@Column(name = "partial_auth", nullable = false)
	private String partialAuth;

	@Column(name = "velocity", nullable = false)
	private String velocity;

	@Column(name = "merchant_category_code", nullable = false)
	private String category;

	@Column(name = "services", nullable = false)
	private String services;

	@Transient
	private String additionalServices;

	@OneToOne(fetch = FetchType.LAZY)
	@MapsId
	@JoinColumn(name = "id")
	@QueryInit("*")
	private Merchant merchant;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getVelocity() {
		return velocity;
	}

	public void setVelocity(String velocity) {
		this.velocity = velocity;
	}

	public Merchant getMerchant() {
		return merchant;
	}

	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPartialAuth() {
		return partialAuth;
	}

	public void setPartialAuth(String partialAuth) {
		this.partialAuth = partialAuth;
	}

	public void setServices(String services) {
		this.services = services;

	}

	@Transient
	public String getAdditionalServices() {
		return additionalServices;
	}

	public void setAdditionalServices(String additionalServices) {
		this.additionalServices = additionalServices;
	}

	public String getServices() {
		return services;
	}
}
