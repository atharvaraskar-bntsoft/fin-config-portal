package com.bnt.rest.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "bin_table")
public class BinTable extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "brand", nullable = false)
	private String brand;

	@Column(name = "bin", nullable = false)
	private String bin;

	@Column(name = "bin_attributes")
	private String binAttributes;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "bin_master_id")
	@JsonBackReference
	private BinMaster binMasterId;

	@Column(name = "card_product", nullable = false)
	private String cardProduct;

	@Column(name = "onus", nullable = false)
	private Character onus;

	@Column(name = "mod10", nullable = false)
	private Character mod10;

	@Column(name = "international", nullable = false)
	private Character international;

	@Column(name = "product_type", nullable = false)
	private Character productType;

	@Column(name = "length", nullable = false)
	private String length;

	@OneToMany(mappedBy = "binTableId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<BinAccountType> binAccountType;

	public String getBin() {
		return bin;
	}

	public void setBin(String bin) {
		this.bin = bin;
	}

	public String getBinAttributes() {
		return binAttributes;
	}

	public void setBinAttributes(String binAttributes) {
		this.binAttributes = binAttributes;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public BinMaster getBinMasterId() {
		return binMasterId;
	}

	public void setBinMasterId(BinMaster binMasterId) {
		this.binMasterId = binMasterId;
	}

	public String getCardProduct() {
		return cardProduct;
	}

	public void setCardProduct(String cardProduct) {
		this.cardProduct = cardProduct;
	}

	public Character getOnus() {
		return onus;
	}

	public void setOnus(Character onus) {
		this.onus = onus;
	}

	public Character getMod10() {
		return mod10;
	}

	public void setMod10(Character mod10) {
		this.mod10 = mod10;
	}

	public Character getInternational() {
		return international;
	}

	public void setInternational(Character international) {
		this.international = international;
	}

	public Character getProductType() {
		return productType;
	}

	public void setProductType(Character productType) {
		this.productType = productType;
	}

	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}

	public List<BinAccountType> getBinAccountType() {
		return binAccountType;
	}

	public void setBinAccountType(List<BinAccountType> binAccountType) {
		this.binAccountType = binAccountType;
	}
}
