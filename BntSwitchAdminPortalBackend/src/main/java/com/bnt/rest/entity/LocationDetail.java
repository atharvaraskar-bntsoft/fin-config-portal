package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

import org.hibernate.envers.NotAudited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "location_detail")
//@Audited
public class LocationDetail extends AuditEntity {

	@Id
	private Integer id;

	@Column(name = "address_1", nullable = false)
	private String address1;

	@Column(name = "address_2", nullable = false)
	private String address2;

	@Column(name = "city", nullable = false)
	private String city;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "state", nullable = false)
	@NotAudited
	private CountryState countryState;

	@Column(name = "postal_code", nullable = false)
	private String zip;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "country", nullable = false)
	@NotAudited
	private Country country;

	@Column(name = "phone", nullable = false)
	@Size(max = 20)
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
	private Location location;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "LocationDetail [id=" + id + ",   address1=" + address1 + ", address2=" + address2 + ", city=" + city
				+ ", countryState=" + countryState + ", zip=" + zip + ", country=" + country + ", phone=" + phone
				+ ", fax=" + fax + ", webSite=" + webSite + ", email=" + email + ", location=" + location + "]";
	}
}
