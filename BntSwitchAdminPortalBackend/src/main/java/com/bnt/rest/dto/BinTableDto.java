package com.bnt.rest.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.bnt.common.util.JsonObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class BinTableDto extends BaseDto {

	private String brand;

	private String bin;

	@JsonIgnore
	private String binAttributes;

	@JsonProperty("binAttributes")
	private Object binAttributesUi;

	@JsonBackReference
	private BinMasterDto binMasterId;

	private String cardProduct;

	private Character onus;

	private Character mod10;

	private Character international;

	private Character productType;

	private String length;

	@JsonIgnore
	private List<String> linkedAccounts;

	@JsonManagedReference
	private List<BinAccountTypeDto> binAccountType;

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

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
		this.binAttributesUi = JsonObjectUtil.getObjectFromJsonString(binAttributes);
		this.binAttributes = binAttributes;
	}

	public Object getBinAttributesUi() {
		return binAttributesUi;
	}

	public void setBinAttributesUi(Object binAttributesUi) {
		this.binAttributes = JsonObjectUtil.getJsonStringFromObject(binAttributesUi);
		this.binAttributesUi = binAttributesUi;
	}

	public BinMasterDto getBinMasterId() {
		return binMasterId;
	}

	public void setBinMasterId(BinMasterDto binMasterId) {
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

	public List<String> getLinkedAccounts() {
		return linkedAccounts;
	}

	public void setLinkedAccounts(List<String> linkedAccounts) {
		this.linkedAccounts = linkedAccounts;
	}

	public List<BinAccountTypeDto> getBinAccountType() {
		return binAccountType;
	}

	public void setBinAccountType(List<BinAccountTypeDto> binAccountType) {
		this.binAccountType = binAccountType;
	}
}
