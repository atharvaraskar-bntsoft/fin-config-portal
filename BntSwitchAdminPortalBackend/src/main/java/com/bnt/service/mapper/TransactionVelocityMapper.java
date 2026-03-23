package com.bnt.service.mapper;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.common.RippsAdminException;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.VelocityLimitsDto;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.entity.MerchantInstitution;
import com.bnt.rest.entity.TransactionVelocity;
import com.bnt.rest.wrapper.dto.IdAndNameCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.LimitWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TransactionVelocityMapper {

	private static final Logger logger = LogManager.getLogger(TransactionVelocityMapper.class);

	private TransactionVelocityMapper() {

	}

	public static final String MERCHANTINSTITUTION = "MerchantInstitution";
	public static final String MERCHANT = "Merchant";
	public static final String LOCATION = "Location";
	public static final String DEVICE = "Device";

	public static VelocityLimitsDto mapVelocityLimitsToDto(TransactionVelocity velocity) {
		logger.info("inside mapVelocityToDto");
		VelocityLimitsDto velocityLimitsDto = null;
		if (velocity != null) {
			velocityLimitsDto = ObjectMapper.mapToDto(velocity, VelocityLimitsDto.class);
			velocityLimitsDto.setType(setType(velocity.getVelocityEntity().split(":")[0]));
			if (velocity.getMinute() != null) {
				velocityLimitsDto.setMinutesCount(velocity.getMinute().toString());
			}
			setTxnTypeToIdAndNameWrapper(velocityLimitsDto, velocity);
			velocityLimitsDto.setLimitAmount(setLimitAmount(velocity));
			velocityLimitsDto.setLimitCount(setLimitCount(velocity));
		}
		return velocityLimitsDto;
	}

	public static LimitWrapper setLimitAmount(TransactionVelocity velocity) {
		LimitWrapper limitAmount = new LimitWrapper();

		limitAmount.setSingleTransaction(
				(velocity.getSingleAmount() == null) ? null : velocity.getSingleAmount().toString());
		limitAmount.setPerTime((velocity.getMinuteAmount() == null) ? null : velocity.getMinuteAmount().toString());
		limitAmount.setPerDay((velocity.getDayAmount() == null) ? null : velocity.getDayAmount().toString());
		limitAmount.setPerMonth((velocity.getMonthAmount() == null) ? null : velocity.getMonthAmount().toString());

		return limitAmount;
	}

	public static LimitWrapper setLimitCount(TransactionVelocity velocity) {
		LimitWrapper limitAmount = new LimitWrapper();
		limitAmount.setSingleTransaction(null);
		limitAmount.setPerTime((velocity.getMinuteCount() == null) ? null : velocity.getMinuteCount().toString());
		limitAmount.setPerDay((velocity.getDayCount() == null) ? null : velocity.getDayCount().toString());
		limitAmount.setPerMonth((velocity.getMonthCount() == null) ? null : velocity.getMonthCount().toString());
		return limitAmount;
	}

	public static IdAndNameCodeWrapper setType(String type) {

		IdAndNameCodeWrapper wrapperType = new IdAndNameCodeWrapper();
		String lType = type.toUpperCase();
		switch (lType) {
		case "MERCHANTINSTITUTION":
			wrapperType.setId(1);
			wrapperType.setName(MERCHANTINSTITUTION);
			wrapperType.setCode("INSTITUTION_GROUP");
			break;
		case "MERCHANT":
			wrapperType.setId(2);
			wrapperType.setName(MERCHANT);
			wrapperType.setCode("INSTITUTIONS");
			break;
		case "LOCATION":
			wrapperType.setId(3);
			wrapperType.setName(LOCATION);
			wrapperType.setCode("LOCATIONS");
			break;
		case "DEVICE":
			wrapperType.setId(4);
			wrapperType.setName(DEVICE);
			wrapperType.setCode("DEVICES");
			break;
		default:
			break;
		}
		return wrapperType;
	}

	public static void setTxnTypeToIdAndNameWrapper(VelocityLimitsDto velocityLimitsDto, TransactionVelocity velocity) {
		IdAndNameWrapper wrapper = new IdAndNameWrapper();
		wrapper.setName(velocity.getTxnType());
		velocityLimitsDto.setTransactionTypes(wrapper);
	}

	public static String getVelocityEntity(BaseEntity entity, String type) {
		logger.info("inside getVelocityEntity with type: {}", type);
		String velocityType = "";
		String velocityCode = "";
		if (MERCHANTINSTITUTION.equalsIgnoreCase(type)) {
			MerchantInstitution merchantInstitution = (MerchantInstitution) entity;
			velocityCode = merchantInstitution.getCode();
			velocityType = MERCHANTINSTITUTION.toUpperCase();
		} else if (MERCHANT.equalsIgnoreCase(type)) {
			Merchant merchant = (Merchant) entity;
			velocityCode = merchant.getCode();
			velocityType = TransactionVelocityMapper.MERCHANT.toUpperCase();
		} else if (LOCATION.equalsIgnoreCase(type)) {
			Location location = (Location) entity;
			velocityCode = location.getCode();
			velocityType = TransactionVelocityMapper.LOCATION.toUpperCase();
		} else if (TransactionVelocityMapper.DEVICE.equalsIgnoreCase(type)) {
			Device device = (Device) entity;
			velocityCode = device.getCode();
			velocityType = TransactionVelocityMapper.DEVICE.toUpperCase();
		}
		return velocityType + ":" + velocityCode;
	}

	private static boolean validateRegex(String name) {
		String regex = "((?<!\\S)\\d+(?:\\.\\d+)?(?!\\S))|.";
		Pattern p = Pattern.compile(regex);
		if (name == null) {
			return false;
		}
		Matcher m = p.matcher(name);
		return m.matches();
	}

	public static void setOtherDetails(VelocityLimitsDto velocityLimitsDto, TransactionVelocity txnVelocity) {
		logger.info("inside setOtherDetails");
		txnVelocity.setMinute((velocityLimitsDto.getMinutesCount() == null) ? null
				: Integer.parseInt(velocityLimitsDto.getMinutesCount()));

		txnVelocity.setSingleAmount((velocityLimitsDto.getLimitAmount().getSingleTransaction() == null) ? null
				: new BigDecimal(velocityLimitsDto.getLimitAmount().getSingleTransaction()));
		if (velocityLimitsDto.getLimitAmount().getPerTime() == null) {
			txnVelocity.setMinuteAmount(null);
		} else {
			if (validateRegex(velocityLimitsDto.getLimitAmount().getPerTime())) {
				txnVelocity.setMinuteAmount(new BigDecimal(velocityLimitsDto.getLimitAmount().getPerTime()));
			} else {
				throw new RippsAdminException("Time must be postive");
			}
		}

		if (velocityLimitsDto.getLimitAmount().getPerDay() == null) {
			txnVelocity.setDayAmount(null);
		} else {
			if (validateRegex(velocityLimitsDto.getLimitAmount().getPerDay())) {
				txnVelocity.setDayAmount(new BigDecimal(velocityLimitsDto.getLimitAmount().getPerDay()));
			} else {
				throw new RippsAdminException("Day must be postive");
			}
		}

		if (velocityLimitsDto.getLimitAmount().getPerMonth() == null) {
			txnVelocity.setMonthAmount(null);
		} else {
			if (validateRegex(velocityLimitsDto.getLimitAmount().getPerMonth())) {
				txnVelocity.setMonthAmount(new BigDecimal(velocityLimitsDto.getLimitAmount().getPerMonth()));
			} else {
				throw new RippsAdminException("Month must be postive");
			}
		}

		txnVelocity.setMinuteCount((velocityLimitsDto.getLimitCount().getPerTime() == null) ? null
				: Integer.parseInt(velocityLimitsDto.getLimitCount().getPerTime()));
		txnVelocity.setDayCount((velocityLimitsDto.getLimitCount().getPerDay() == null) ? null
				: Integer.parseInt(velocityLimitsDto.getLimitCount().getPerDay()));
		txnVelocity.setMonthCount((velocityLimitsDto.getLimitCount().getPerMonth() == null) ? null
				: Integer.parseInt(velocityLimitsDto.getLimitCount().getPerMonth()));
	}
}
