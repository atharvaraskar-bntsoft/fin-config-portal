package com.bnt.repo.mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.bnt.common.util.JsonObjectUtil;
import com.bnt.constant.TxnUiConstants;
import com.bnt.rest.dto.TxnLogResponseWrapper.OperationWrapper;
import com.bnt.rest.wrapper.dto.KeyValueWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
@PropertySource("classpath:txnLog.properties")
public class TxnLogAtmJsonMapper {

	private static final Logger logger = LogManager.getLogger(TxnLogAtmJsonMapper.class);

	private static String msgResponse;
	private static String txnResponse;
	private static String txnAccountBal;
	private static String txnBalances;
	private static String txnName;
	private static String txnBalance;
	private static String txnAmount;

	@Value("${txn.currency}")
	private static String txnCurrency;

	public TxnLogAtmJsonMapper(
			@Value("${msg.response}") String response,
			@Value("${txn.accountBal}") String accountBalances,
			@Value("${txn.balances}") String balances,
			@Value("${txn.name}") String transactionName,
			@Value("${txn.balance}") String balance,
			@Value("${txn.amount}") String amount,
			@Value("${txn.currency}") String currency,
			@Value("${transaction.response}") String transactionResponse) {

		msgResponse = response;
		txnAccountBal = accountBalances;
		txnBalances = balances;
		txnName = transactionName;
		txnBalance = balance;
		txnAmount = amount;
		txnCurrency = currency;
		txnResponse = transactionResponse;
	}

	public static void setRequestResponseFields(JSONObject modifiedMessageExchange, OperationWrapper operation, int messageIndex) {
		logger.info("inside setRequestResponseFields().. for messageIndex {}", messageIndex);

		Map<String, List<KeyValueWrapper>> responseMap = operation.getResponse();
		List<KeyValueWrapper> firstColoumnResMapList = responseMap.get(TxnUiConstants.LABEL_FIRST_COLUMN);
		List<KeyValueWrapper> secondColoumnResMapList = responseMap.get(TxnUiConstants.LABEL_SECOND_COLUMN);
		JSONObject response = modifiedMessageExchange.getJSONObject(msgResponse);
		JSONObject transactionResponse = JsonObjectUtil.getChildJSONObject(response, txnResponse);
		if (Optional.ofNullable(transactionResponse).isPresent()) {
			accountBalancesData(firstColoumnResMapList, secondColoumnResMapList, transactionResponse);
		}
	}

	private static void accountBalancesData(List<KeyValueWrapper> firstColoumnResMapList, List<KeyValueWrapper> secondColoumnResMapList, JSONObject transactionResponse) {

		JSONArray accountBalances = transactionResponse.getJSONArray(txnAccountBal);

		if (!(JsonObjectUtil.isJsonArrayNullOrEmpty(accountBalances)).booleanValue()) {
			for (int i = 0; i < accountBalances.length(); i++) {

				JSONArray balances = accountBalances.getJSONObject(i).getJSONArray(txnBalances);
				for (int j = 0; j < balances.length(); j++) {

					firstColoumnResMapList.add(new KeyValueWrapper(
							accountBalances.getJSONObject(i).getString(txnName) + " "
									+ balances.getJSONObject(j).getString(txnName) + " " + "Amount",
							balances.getJSONObject(j).getJSONObject(txnBalance).getDouble(txnAmount)));

					secondColoumnResMapList.add(new KeyValueWrapper(
							accountBalances.getJSONObject(i).getString(txnName) + " "
									+ balances.getJSONObject(j).getString(txnName) + " " + "Currency",
							balances.getJSONObject(j).getJSONObject(txnBalance).getString(txnCurrency)));
				}
			}
		}
	}
}
