package com.bnt.repo.mapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.bnt.bswitch.shared.lib.entities.StringUtil;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.constant.TxnUiConstants;
import com.bnt.rest.dto.TxnLogResponseWrapper;
import com.bnt.rest.dto.TxnLogResponseWrapper.TxnInfoWrapper;
import com.bnt.rest.entity.TxnLogEntity;
import com.bnt.rest.entity.component.TxnLogConfigurationDto;
import com.bnt.rest.wrapper.dto.KeyValueGenericWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnLogMainPageJsonMapper {

	private static final Logger logger = LogManager.getLogger(TxnLogMainPageJsonMapper.class);

	private TxnLogMainPageJsonMapper() {
	}

	/**
	 * Map the DB entity to UI Response
	 */
	public static TxnLogResponseWrapper mapTxnLogsToResponse(TxnLogEntity entity, TxnLogResponseWrapper txnResponse,
			TxnLogConfigurationDto txnConfig) {
		String serializedTxnDataInfo = entity.getTransactionData();
		JSONObject jsonObject = null;
		try {
			serializedTxnDataInfo = GsonUtil.toPrettyFormat(serializedTxnDataInfo);
			jsonObject = JsonObjectUtil.getJson(serializedTxnDataInfo);
		} catch (Exception e) {
			logger.error("Error in serializaing JSON to TxnLogContext {}", e.getMessage());
			logger.error("Corrupted json is {}", serializedTxnDataInfo);
		}
		TxnLogResponseWrapper txnLogResponse = null;
		try {
			if (jsonObject != null) {
				txnLogResponse = TxnLogMainPageJsonMapper.setJsonData(jsonObject, txnConfig, txnResponse);
			}
		} catch (Exception e) {
			logger.error("Error in mapping static data of JSON to UI Response  {}", e.getMessage());
			throw new RippsAdminException("Error in mapping static data of JSON to UI Response " + e.getMessage());
		}
		return txnLogResponse;
	}

	private static TxnLogResponseWrapper setJsonData(JSONObject messageContext, TxnLogConfigurationDto txnConfig,
			TxnLogResponseWrapper txnResponse) {
		List<TxnLogResponseWrapper.TxnInfoWrapper> infoList = new ArrayList<>();
		setMasterData(messageContext, txnConfig, txnResponse, infoList);
		txnResponse.setInfoParams(infoList);
		setServicesData(messageContext, txnConfig, txnResponse, infoList);
		TxnLogMapper.setRouteInfo(txnResponse);
		TxnLogMapper.setAmountInfo(txnResponse);
		return txnResponse;
	}

	private static String convertDateToString(String date) {
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat format2 = new SimpleDateFormat("MMM dd, yyyy HH:mm:ss");
		Date date1 = null;
		try {
			date1 = format1.parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return format2.format(date1);
	}

	private static void setServicesData(JSONObject messageContext, TxnLogConfigurationDto txnConfig,
			TxnLogResponseWrapper txnResponse, List<TxnInfoWrapper> infoList) {
		String serviceTypeEnum = null;
		try {
			JSONArray messageCollection = messageContext.getJSONArray(txnConfig.getMsgCollection());

			for (int i = 0; i < messageCollection.length(); i++) {
				JSONObject eachMessageCollection = messageCollection.getJSONObject(i);
				JSONObject messageExchange = (JSONObject) JsonObjectUtil.getObjectValue(eachMessageCollection,
						txnConfig.getMsgExchange());
				JSONObject requestObject = (JSONObject) JsonObjectUtil.getObjectValue(messageExchange,
						txnConfig.getMsgRequest());
				JSONObject responseObject = (JSONObject) JsonObjectUtil.getObjectValue(messageExchange,
						txnConfig.getMsgResponse());

				serviceTypeEnum = JsonObjectUtil.getStringValue(messageExchange, txnConfig.getMsgServiceTypeEnum());

				String localDateTime = requestObject.getString("local_date_time");
				if (localDateTime == "" || localDateTime == null) {
					txnResponse.setLocalDateTime("");
				} else {
					txnResponse.setLocalDateTime(convertDateToString(localDateTime));
				}
				if (responseObject == null) {
					logger.error("Getting response null for id : {} and Service: {}", txnResponse.getTxnId(),
							serviceTypeEnum);
				}
				if (serviceTypeEnum.equals(TxnUiConstants.AUTH_SERVICE)) {
					TxnLogJsonMapper.setApprovedAmount(txnConfig, txnResponse, responseObject);
					setAuthServicedataOnListPage(txnConfig, txnResponse, requestObject, responseObject, infoList);
				}
				if (serviceTypeEnum.equals(TxnUiConstants.GATEWAY_SERVICE)) {
					setGatewayServicesDataOnListPage(txnConfig, txnResponse, requestObject, responseObject, infoList);
					TxnLogJsonMapper.setRequestedAmount(txnConfig, txnResponse, requestObject);
					txnResponse.setSafprocessed(
							JsonObjectUtil.getBooleanValue(messageExchange, txnConfig.getIsSafProcessed()));
				} else {
					setRouteId(txnConfig, txnResponse, messageExchange);
				}
			}
		} catch (Exception e) {
			logger.error("Error in setting Json Data  data for list view");
		}
	}

	private static void setAuthServicedataOnListPage(TxnLogConfigurationDto txnConfig,
			TxnLogResponseWrapper txnResponse, JSONObject requestObject, JSONObject responseObject,
			List<TxnInfoWrapper> infoList) {
		// llogger.info("inside setAuthServicedataOnListPage() {} , infoList
		// {}",responseObject, infoList);
		txnResponse.setAcqInstitutionDestination(
				JsonObjectUtil.getStringValue(requestObject, txnConfig.getAcqInstitution()));
	}

	private static TxnLogResponseWrapper.TxnInfoWrapper setGatewayServicesDataOnListPage(
			TxnLogConfigurationDto txnConfig, TxnLogResponseWrapper txnResponse, JSONObject requestObject,
			JSONObject responseObject, List<TxnInfoWrapper> infoList) {

//		JSONObject txnTypeIndicator = JsonObjectUtil.getJSONObject(requestObject,
//				txnConfig.getTransactionTypeIndicator());

//		if (txnTypeIndicator != null && null != JsonObjectUtil.getStringValue(txnTypeIndicator, txnConfig.getType())) {
//			txnResponse.setTxnType(JsonObjectUtil.getStringValue(txnTypeIndicator, txnConfig.getType()));
//		}

		txnResponse.setRrn(JsonObjectUtil.getStringValue(requestObject, txnConfig.getRrn()));

		txnResponse
				.setAcqInstitutionSource(JsonObjectUtil.getStringValue(requestObject, txnConfig.getAcqInstitution()));
		txnResponse.setMessageTypeIndicator(TxnLogMapper.getMessageTypeIndicator(requestObject, txnConfig));
		TxnLogResponseWrapper.TxnInfoWrapper info = txnResponse.new TxnInfoWrapper();
		Map<String, Object> keyValueMap = new HashMap<>();
		keyValueMap.put(TxnUiConstants.LABEL_RESPONSE_CODE,
				JsonObjectUtil.getStringValue(responseObject, txnConfig.getResponseCode()));

		List<KeyValueGenericWrapper> params = KeyValueGenericWrapper.getKeyValueWrapperList(keyValueMap);
		info.setName("GATEWAY_SERVICES_DATA");
		info.setParams(params);
		infoList.add(info);
		return info;
	}

	private static void setRouteId(TxnLogConfigurationDto txnConfig, TxnLogResponseWrapper txnResponse,
			JSONObject messageExchange) {
		String routeId;
		routeId = JsonObjectUtil.getStringValueWithNullValueCheck(messageExchange, txnConfig.getMsgRoute());
		if (!(StringUtil.isEmptyOrNull(routeId))) {

			txnResponse.getDestinationCodes().add(routeId);
		}
	}

	private static void setMasterData(JSONObject messageContext, TxnLogConfigurationDto txnConfig,
			TxnLogResponseWrapper txnResponse, List<TxnInfoWrapper> infoList) {
		TxnLogResponseWrapper.TxnInfoWrapper info = txnResponse.new TxnInfoWrapper();

		Map<String, Object> keyValueMap = new HashMap<>();
		keyValueMap.put(TxnUiConstants.LABEL_PAYMENT_METHOD,
				JsonObjectUtil.getStringValue(messageContext, txnConfig.getPosPaymentMethod()));
		List<KeyValueGenericWrapper> params = KeyValueGenericWrapper.getKeyValueWrapperList(keyValueMap);
		info.setName("MASTER_DATA");
		info.setParams(params);
		infoList.add(info);
	}
}
