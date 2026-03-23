package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ModeOfEntryDto extends BaseDto {

	private Boolean magneticStripeRead;

	private Boolean keyedCardNotPresent;

	private Boolean emvChip;

	public Boolean getEmvChip() {
		return emvChip;
	}

	public void setEmvChip(Boolean emvChip) {
		this.emvChip = emvChip;
	}

	public Boolean getMagneticStripeRead() {
		return this.magneticStripeRead;
	}

	public void setMagneticStripeRead(Boolean magneticStripeRead) {
		this.magneticStripeRead = magneticStripeRead;
	}

	public Boolean getKeyedCardNotPresent() {
		return this.keyedCardNotPresent;
	}

	public void setKeyedCardNotPresent(Boolean keyedCardNotPresent) {
		this.keyedCardNotPresent = keyedCardNotPresent;
	}
}
