package com.bnt.rest.wrapper.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Schema
public class TxnLookupResponseWrapper {

	@Schema(description = "total successful transactions")
	Long successCount;

	@Schema(description = "total failed transactions")
	Long declinedCount;

	@Schema(description = "total value of authorized transactions")
	Double totalAuthorizedValue;

	public Long getSuccessCount() {
		return successCount;
	}

	public void setSuccessCount(Long successCount) {
		this.successCount = successCount;
	}

	public Long getDeclinedCount() {
		return declinedCount;
	}

	public void setDeclinedCount(Long declinedCount) {
		this.declinedCount = declinedCount;
	}

	public Double getTotalAuthorizedValue() {
		return totalAuthorizedValue;
	}

	public void setTotalAuthorizedValue(Double totalAuthorizedValue) {
		this.totalAuthorizedValue = totalAuthorizedValue;
	}
}
