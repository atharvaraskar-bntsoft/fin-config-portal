package com.bnt.rest.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "transaction_velocity")
//@Audited
public class TransactionVelocity extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "velocity_entity", nullable = false)
	private String velocityEntity;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "merchant_institution_id", nullable = false)
	private MerchantInstitution merchantInstitutionId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "merchant_id", nullable = true)
	private Merchant merchantId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "location_id", nullable = true)
	private Location locationId;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "device_id", nullable = true)
	private Device deviceId;

	@Column(name = "transaction_type", nullable = false)
	private String txnType;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "base_currency_id", nullable = false)
	private Currency baseCurrencyId;

	@Column(name = "single_amount", nullable = true)
	private BigDecimal singleAmount;

	@Column(name = "minute", nullable = true)
	private Integer minute;

	@Column(name = "minute_amount", nullable = true)
	private BigDecimal minuteAmount;

	@Column(name = "minute_count", nullable = true)
	private Integer minuteCount;

	@Column(name = "day_amount", nullable = true)
	private BigDecimal dayAmount;

	@Column(name = "day_count", nullable = true)
	private Integer dayCount;

	@Column(name = "month_amount", nullable = true)
	private BigDecimal monthAmount;

	@Column(name = "month_count", nullable = true)
	private Integer monthCount;

	@Column(name = "locked", nullable = false)
	private Character locked;

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	public String getVelocityEntity() {
		return velocityEntity;
	}

	public void setVelocityEntity(String velocityEntity) {
		this.velocityEntity = velocityEntity;
	}

	public MerchantInstitution getMerchantInstitutionId() {
		return merchantInstitutionId;
	}

	public void setMerchantInstitutionId(MerchantInstitution merchantInstitutionId) {
		this.merchantInstitutionId = merchantInstitutionId;
	}

	public Merchant getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(Merchant merchantId) {
		this.merchantId = merchantId;
	}

	public Location getLocationId() {
		return locationId;
	}

	public void setLocationId(Location locationId) {
		this.locationId = locationId;
	}

	public Device getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(Device deviceId) {
		this.deviceId = deviceId;
	}

	public String getTxnType() {
		return txnType;
	}

	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}

	public Currency getBaseCurrencyId() {
		return baseCurrencyId;
	}

	public void setBaseCurrencyId(Currency baseCurrencyId) {
		this.baseCurrencyId = baseCurrencyId;
	}

	public BigDecimal getSingleAmount() {
		return singleAmount;
	}

	public void setSingleAmount(BigDecimal singleAmount) {
		this.singleAmount = singleAmount;
	}

	public Integer getMinute() {
		return minute;
	}

	public void setMinute(Integer minute) {
		this.minute = minute;
	}

	public BigDecimal getMinuteAmount() {
		return minuteAmount;
	}

	public void setMinuteAmount(BigDecimal minuteAmount) {
		this.minuteAmount = minuteAmount;
	}

	public Integer getMinuteCount() {
		return minuteCount;
	}

	public void setMinuteCount(Integer minuteCount) {
		this.minuteCount = minuteCount;
	}

	public BigDecimal getDayAmount() {
		return dayAmount;
	}

	public void setDayAmount(BigDecimal dayAmount) {
		this.dayAmount = dayAmount;
	}

	public Integer getDayCount() {
		return dayCount;
	}

	public void setDayCount(Integer dayCount) {
		this.dayCount = dayCount;
	}

	public BigDecimal getMonthAmount() {
		return monthAmount;
	}

	public void setMonthAmount(BigDecimal monthAmount) {
		this.monthAmount = monthAmount;
	}

	public Integer getMonthCount() {
		return monthCount;
	}

	public void setMonthCount(Integer monthCount) {
		this.monthCount = monthCount;
	}

	public Character getLocked() {
		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}
}
