package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransactionMerchantRequestDto {

	List<Integer> merchant;

	Integer merchantInstitution;

	public List<Integer> getMerchant() {
		return merchant;
	}

	public void setMerchant(List<Integer> merchant) {
		this.merchant = merchant;
	}

	public Integer getMerchantInstitution() {
		return merchantInstitution;
	}

	public void setMerchantInstitution(Integer merchantInstitution) {
		this.merchantInstitution = merchantInstitution;
	}
}
