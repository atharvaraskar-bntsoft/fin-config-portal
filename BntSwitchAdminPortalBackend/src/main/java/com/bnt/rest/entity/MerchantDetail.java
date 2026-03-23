package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "merchant_detail")
@Audited
public class MerchantDetail extends AuditEntity {

	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name = "address_1", nullable = false)
	private String address1;

	@Column(name = "address_2", nullable = false)
	private String address2;

	@Column(name = "city", nullable = false)
	private String city;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "state", insertable = true)
	@NotAudited
	private CountryState countryState;

	@Column(name = "postal_code", nullable = false)
	private String zip;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "country")
	@NotAudited
	private Country country;

	@Column(name = "phone", nullable = false)
	private String phone;

	@Column(name = "fax", nullable = false)
	private String fax;

	@Column(name = "website", nullable = false)
	private String webSite;

	@Column(name = "official_email", nullable = false)
	private String email;

	@OneToOne(fetch = FetchType.LAZY)
	@MapsId
	@JoinColumn(name = "id")
	private Merchant merchant;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getWebSite() {
		return webSite;
	}

	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}

	public Merchant getMerchant() {
		return merchant;
	}

	public void setMerchant(Merchant merchant) {
		this.merchant = merchant;
	}

	public CountryState getCountryState() {
		return countryState;
	}

	public void setCountryState(CountryState countryState) {
		this.countryState = countryState;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "MerchantDetail [id=" + id + "," + " address1=" + address1 + ", address2=" + address2 + ", city=" + city
				+ ", countryState=" + countryState + ", zip=" + zip + ", country=" + country + ", phone=" + phone
				+ ", fax=" + fax + ", webSite=" + webSite + ", email=" + email + ", merchant=" + merchant + "]";
	}
}
