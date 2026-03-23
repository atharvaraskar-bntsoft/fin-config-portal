package com.bnt.rest.dto;

import java.math.BigDecimal;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MerchantBillingDto extends BaseDto {

	private Integer merchantId;

	private Integer merchantInstituteId;

	private String merchantName;

	private String merchantCode;

	private BigDecimal totalNonRefundAmount;

	private BigDecimal totalNonRefundBillableAmount;

	private Integer transactionNonRefundCount;

	private BigDecimal totalRefundAmount;

	private BigDecimal totalRefundBillableAmount;

	private BigDecimal totalNonRefundInterchangeAmount;

	private BigDecimal totalRefundInterchangeAmount;

	private String billingType;

	public String getBillingType() {
		return billingType;
	}

	public void setBillingType(String billingType) {
		this.billingType = billingType;
	}

	private Integer transactionRefundCount;

	private String excludedTxnType;

	private String excludedTxnStatus;

	private String includedTxnType;

	private String includedTxnStatus;

	private int countTxn;

	private int totalNonRefundTxnCount;

	private int totalRefundTxnCount;

	public BigDecimal getTotalNonRefundInterchangeAmount() {
		return totalNonRefundInterchangeAmount;
	}

	public void setTotalNonRefundInterchangeAmount(BigDecimal totalNonRefundInterchangeAmount) {
		this.totalNonRefundInterchangeAmount = totalNonRefundInterchangeAmount;
	}

	public BigDecimal getTotalRefundInterchangeAmount() {
		return totalRefundInterchangeAmount;
	}

	public void setTotalRefundInterchangeAmount(BigDecimal totalRefundInterchangeAmount) {
		this.totalRefundInterchangeAmount = totalRefundInterchangeAmount;
	}

	public void setBillingAmountNonRefundTxn(BigDecimal billingAmountNonRefundTxn) {
		this.billingAmountNonRefundTxn = billingAmountNonRefundTxn;
	}

	private BigDecimal billingAmountNonRefundTxn;
	private BigDecimal billingAmountRefundTxn;

	public BigDecimal getBillingAmountRefundTxn() {
		return billingAmountRefundTxn;
	}

	public void setBillingAmountRefundTxn(BigDecimal billingAmountRefundTxn) {
		this.billingAmountRefundTxn = billingAmountRefundTxn;
	}

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public Double getFlat() {
		return flat;
	}

	public void setFlat(Double flat) {
		this.flat = flat;
	}

	public BigDecimal getBillingAmountNonRefundTxn() {
		return billingAmountNonRefundTxn;
	}

	private Double rate;

	private Double flat;

	public String getMerchantCode() {
		return merchantCode;
	}

	public void setMerchantCode(String merchantCode) {
		this.merchantCode = merchantCode;
	}

	public String getExcludedTxnType() {
		return excludedTxnType;
	}

	public void setExcludedTxnType(String excludedTxnType) {
		this.excludedTxnType = excludedTxnType;
	}

	public String getExcludedTxnStatus() {
		return excludedTxnStatus;
	}

	public void setExcludedTxnStatus(String excludedTxnStatus) {
		this.excludedTxnStatus = excludedTxnStatus;
	}

	public String getIncludedTxnType() {
		return includedTxnType;
	}

	public void setIncludedTxnType(String includedTxnType) {
		this.includedTxnType = includedTxnType;
	}

	public String getIncludedTxnStatus() {
		return includedTxnStatus;
	}

	public void setIncludedTxnStatus(String includedTxnStatus) {
		this.includedTxnStatus = includedTxnStatus;
	}

	public Integer getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Integer merchantId) {
		this.merchantId = merchantId;
	}

	public Integer getMerchantInstituteId() {
		return merchantInstituteId;
	}

	public void setMerchantInstituteId(Integer merchantInstituteId) {
		this.merchantInstituteId = merchantInstituteId;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public BigDecimal getTotalNonRefundAmount() {
		return totalNonRefundAmount;
	}

	public void setTotalNonRefundAmount(BigDecimal totalNonRefundAmount) {
		this.totalNonRefundAmount = totalNonRefundAmount;
	}

	public BigDecimal getTotalNonRefundBillableAmount() {
		return totalNonRefundBillableAmount;
	}

	public void setTotalNonRefundBillableAmount(BigDecimal totalNonRefundBillableAmount) {
		this.totalNonRefundBillableAmount = totalNonRefundBillableAmount;
	}

	public Integer getTransactionNonRefundCount() {
		return transactionNonRefundCount;
	}

	public void setTransactionNonRefundCount(Integer transactionNonRefundCount) {
		this.transactionNonRefundCount = transactionNonRefundCount;
	}

	public BigDecimal getTotalRefundAmount() {
		return totalRefundAmount;
	}

	public void setTotalRefundAmount(BigDecimal totalRefundAmount) {
		this.totalRefundAmount = totalRefundAmount;
	}

	public BigDecimal getTotalRefundBillableAmount() {
		return totalRefundBillableAmount;
	}

	public void setTotalRefundBillableAmount(BigDecimal totalRefundBillableAmount) {
		this.totalRefundBillableAmount = totalRefundBillableAmount;
	}

	public Integer getTransactionRefundCount() {
		return transactionRefundCount;
	}

	public void setTransactionRefundCount(Integer transactionRefundCount) {
		this.transactionRefundCount = transactionRefundCount;
	}

	public int getCountTxn() {
		return countTxn;
	}

	public void setCountTxn(int countTxn) {
		this.countTxn = countTxn;
	}

	public int getTotalNonRefundTxnCount() {
		return totalNonRefundTxnCount;
	}

	public void setTotalNonRefundTxnCount(int totalNonRefundTxnCount) {
		this.totalNonRefundTxnCount = totalNonRefundTxnCount;
	}

	public int getTotalRefundTxnCount() {
		return totalRefundTxnCount;
	}

	public void setTotalRefundTxnCount(int totalRefundTxnCount) {
		this.totalRefundTxnCount = totalRefundTxnCount;
	}
}
