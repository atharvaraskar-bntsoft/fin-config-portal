package com.bnt.repo.mapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.csv.CSVRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.ApacheCSVUtil;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.FileUtil;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.JsonPathUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.Constants;
import com.bnt.rest.wrapper.dto.KeyValueWrapper;
import com.bnt.rest.wrapper.dto.TxnLogMatrix;
import com.bnt.rest.wrapper.dto.TxnLogMatrixWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
@PropertySource("classpath:application.properties")
public class TxnLogMatrixJsonMapper {

	private static final Logger logger = LogManager.getLogger(TxnLogMatrixJsonMapper.class);

	private static final String MESSAGE_COLLECTION = "message_collection";
	private static final String MESSAGE_EXCHANGE = "message_exchange";
	public static final String SERVICE_TYPE_ENUM = "service_type";

	private static String approveDestinations;
	private static String dccFilesPrefix;
	private static String defaultRequestMatrixFilesName;
	private static String defaultResponseMatrixFilesName;
	private static String reqResponseMappingPath;

	public TxnLogMatrixJsonMapper(
			@Value("${matrix.approved.destinations}") String approvedDestinations,
			@Value("${matrix.dcc.fileprefix}") String dccFilePrefix,
			@Value("${matrix.request.default.filename}") String defaultRequestMatrixFileName,
			@Value("${matrix.response.default.filename}") String defaultResponseMatrixFileName,
			@Value("${mapping.file.dir}") String filePath) {

		approveDestinations = approvedDestinations;
		dccFilesPrefix = dccFilePrefix;
		defaultRequestMatrixFilesName = defaultRequestMatrixFileName;
		defaultResponseMatrixFilesName = defaultResponseMatrixFileName;
		reqResponseMappingPath = filePath;
	}

	public static TxnLogMatrix mapMessageContextToTxnMatrix(TxnLogMatrix txnLogMatrix, String messageContextJson) {

		logger.debug("json for mapping  is {}", messageContextJson);

		// A single map that holds a unique key as Generic name for request as well as
		// response
		JSONObject messageContext = null;
		String fileUri = null;
		try {
			messageContext = JsonObjectUtil.getJson(messageContextJson);
			String posTransactionType = JsonObjectUtil.getStringValue(messageContext, "transaction_type");
			txnLogMatrix.setPosTransactionType(posTransactionType);
		} catch (Exception e) {
			logger.error("Error in serializaing JSON to TxnLogContext: {}", e.getMessage());
			throw new RippsAdminException("Error in serializaing JSON to TxnLogContext" + e.getMessage());
		}
		JSONArray messageCollection = messageContext.getJSONArray(MESSAGE_COLLECTION);
		boolean isLegTwo = false;
		if (messageCollection.length() > 2) {
			isLegTwo = true;
		}
		String adapterId = JsonObjectUtil
				.getStringValue(messageCollection.getJSONObject(0).getJSONObject(MESSAGE_EXCHANGE), "adapter_id");
		String fileName = getMatrixFileName(txnLogMatrix.getDestinations(), adapterId,
				txnLogMatrix.getPosTransactionType(), txnLogMatrix.getMappingType());
		fileUri = getFileUri(reqResponseMappingPath, fileName, txnLogMatrix.getMappingType());
		Map<String, Object> flattenMap = null;
		flattenMap = JsonPathUtil.getFlatMap(messageContextJson, false);
		logger.info("flatten  marix map: {}", flattenMap);
		// Logic to match the fieldName of CSV with level 1 and level 3
		try {
			getTxnMatrix(txnLogMatrix, fileUri, flattenMap, isLegTwo);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new RippsAdminException(e.getMessage());
		}
		return txnLogMatrix;
	}

	private static String getFileUri(String reqestResponseMappingPath, String fileName, String mappingType) {
		String fileUri = FileUtil.getAbsolutePath(reqestResponseMappingPath, fileName);
		try {
			FileUtil.getFileReaderFromResource(fileUri);
		} catch (Exception e) {
			fileName = getDefaultFileName(mappingType);
			fileUri = FileUtil.getAbsolutePath(reqestResponseMappingPath, fileName);
		}
		return fileUri;
	}

	public static TxnLogMatrix getTxnMatrix(TxnLogMatrix txnLogMatrix, String path, Map<String, Object> flattenMap,
			boolean isLegTwoExists) {
		// Logic to match the fieldName of CSV with level 1 and level 3
		try {

			Map<String, TxnLogMatrixWrapper> txnMatrixMap = new LinkedHashMap<>();
			Iterable<CSVRecord> records = ApacheCSVUtil.readCSVFile(path, false);
			CSVRecord csvRecord = null;
			if (records != null) {
				Iterator<CSVRecord> recordIterator = records.iterator();
				for (int i = 0; recordIterator.hasNext(); i++) {
					csvRecord = recordIterator.next();
					List<String> content = ApacheCSVUtil.convertCSVRecordToList(csvRecord, 0);
					if (i == 0) {
						addHeaderLabel(txnLogMatrix, content);
					} else if (i == 1) {
						addTableHeader(txnMatrixMap, content);
					} else {
						if (isLegTwoExists) {
							replaceData(content);
						}
						processRow(txnMatrixMap, txnLogMatrix, content, flattenMap);
					}
				}
				List<TxnLogMatrixWrapper> responseMatrixList = new ArrayList<>(txnMatrixMap.values());
				txnLogMatrix.setLogsList(responseMatrixList);
			}
		} catch (Exception e) {
			logger.error("error in getting CSV Record by id {}", e.getMessage());
			throw new RippsAdminException("error in getting CSV Record by id" + e.getMessage());
		}
		return txnLogMatrix;
	}

	private static void replaceData(List<String> content) {

		for (int i = 0; i < content.size(); i++) {
			String str = content.get(i);
			if (str.contains("[1]")) {
				str = str.replace("[1]", "[2]");
				content.set(i, str);
			}
		}
	}

	private static Map<String, TxnLogMatrixWrapper> processRow(Map<String, TxnLogMatrixWrapper> txnMatrixMap,
			TxnLogMatrix txnLogMatrix, List<String> content, Map<String, Object> flattenMap) {

		TxnLogMatrixWrapper txnMatrixWrapper = null;
		// A single map that holds a unique key as Generic name for request as well as
		// response
		String packagerRequestFieldName = null;
		String level1FieldName;
		String level1FieldValue = null;
		String level3FieldValue = null;
		String processorContextResponseFieldName = null;
		String level3FieldName = null;
		String genericFieldName = null;

		genericFieldName = content.get(0);

		if (StringUtil.isEmptyOrNull(genericFieldName)) {
			return new HashMap<>();
		}

		// Search L1 and L3 in corresponding flat map
		if (!(StringUtil.isEmptyOrNull(content.get(2))) && txnLogMatrix.getRequestFlag().booleanValue()) {
			level1FieldName = content.get(2);
			if (!(StringUtil.isEmptyOrNull(content.get(1)))) {
				packagerRequestFieldName = content.get(1);
			}
			level1FieldValue = flattenMap.get(level1FieldName) != null ? flattenMap.get(level1FieldName).toString()
					: "";
		}
		if (!(StringUtil.isEmptyOrNull(content.get(4))) && txnLogMatrix.getResponseFlag().booleanValue()) {
			level3FieldName = content.get(4);
			level3FieldValue = flattenMap.get(level3FieldName) != null ? flattenMap.get(level3FieldName).toString()
					: "";
			if (!(StringUtil.isEmptyOrNull(content.get(3)))) {
				processorContextResponseFieldName = content.get(3);
			}
		}

		// Do not add rows in the matrix where value at level 1 and level 3 is blank
		if (level1FieldValue != null && level1FieldValue.isBlank() && level3FieldValue != null
				&& level3FieldValue.isBlank()) {
			return txnMatrixMap;
		}
		txnMatrixWrapper = processRow1(txnMatrixMap, txnLogMatrix, packagerRequestFieldName, level1FieldValue,
				level3FieldValue, processorContextResponseFieldName, genericFieldName);
		txnMatrixMap.put(genericFieldName, txnMatrixWrapper);
		return txnMatrixMap;
	}

	private static TxnLogMatrixWrapper processRow1(Map<String, TxnLogMatrixWrapper> txnMatrixMap,
			TxnLogMatrix txnLogMatrix, String packagerRequestFieldName, String level1FieldValue,
			String level3FieldValue, String processorContextResponseFieldName, String genericFieldName) {
		TxnLogMatrixWrapper txnMatrixWrapper;
		txnMatrixWrapper = TxnLogMatrixWrapper.getInstance(txnMatrixMap, genericFieldName,
				txnLogMatrix.getTransactionId());
		if (packagerRequestFieldName != null) {
			txnMatrixWrapper.setRequest(new KeyValueWrapper(packagerRequestFieldName, level1FieldValue));
		}
		if (processorContextResponseFieldName != null) {
			txnMatrixWrapper.setResponse(new KeyValueWrapper(processorContextResponseFieldName, level3FieldValue));
		}
		return txnMatrixWrapper;
	}

	private static void addHeaderLabel(TxnLogMatrix txnMatrix, List<String> header) {

		if (txnMatrix.getHeaderLabel() == null) {
			txnMatrix.setHeaderLabel(header.get(0));
		}
		if (!(StringUtil.isEmptyOrNull(header.get(1)))) {
			String bitmap = header.get(1);
			if ((txnMatrix.getRequestFlag() == null || txnMatrix.getResponseFlag() == null)) {
				String requestBits = bitmap.substring(1, 3);
				String responseBits = bitmap.substring(3, 5);
				Boolean requestFlag = !requestBits.equals("00");
				Boolean responseFlag = !responseBits.equals("00");
				txnMatrix.setRequestFlag(requestFlag);
				txnMatrix.setResponseFlag(responseFlag);
			}
		} else {
			txnMatrix.setRequestFlag(true);
			txnMatrix.setResponseFlag(true);
		}
	}

	private static Map<String, TxnLogMatrixWrapper> addTableHeader(Map<String, TxnLogMatrixWrapper> txnMatrixMap,
			List<String> content) {
		if (txnMatrixMap.isEmpty()) { // Add header only once
			// Add header row in the Map
			TxnLogMatrixWrapper firstRow = new TxnLogMatrixWrapper(content.get(0));
			firstRow.setRequest(new KeyValueWrapper(content.get(1), "Field Value"));
			firstRow.setResponse(new KeyValueWrapper(content.get(3), "Field Value"));
			txnMatrixMap.put(content.get(0), firstRow);
		}
		return txnMatrixMap;
	}

	private static String getMatrixFileName(String destinations, String adapterId, String txnType, String mappingType) {
		String fileName = "";
		try {
			if (StringUtil.isEmptyOrNull(destinations) && txnType.equals(Constants.DCC_PENDING_TXN)) {
				// processor only
				return dccFilesPrefix + "-" + mappingType + ".csv";
			}
			String processorName = getApprovedDestination(destinations);
			if (StringUtil.isEmptyOrNull(processorName)) {
				fileName = getDefaultFileName(mappingType);
			} else {
				fileName = adapterId + "-" + processorName + "-" + mappingType + ".csv";
			}
		} catch (Exception e) {
			logger.error("File does not exist");
			throw new RippsAdminException("File does not exist ");
		}
		return fileName;
	}

	private static String getDefaultFileName(String mappingType) {
		String fileName;
		if (Constants.REQUEST_MAPPING_TYPE_MATRIX.equals(mappingType)) {
			fileName = defaultRequestMatrixFilesName;
		} else {
			fileName = defaultResponseMatrixFilesName;
		}
		return fileName;
	}

	private static String getApprovedDestination(String destinations) {
		String approvedDestination = null;
		if (!(StringUtil.isEmptyOrNull(destinations))) {
			List<String> destinationList = new ArrayList<>(Arrays.asList(destinations.split(",")));
			List<String> matrixDestinationList = Arrays.asList(approveDestinations.split(","));
			destinationList.retainAll(matrixDestinationList);
			// Code changes to get the authorize destination only. It must
			// ensure that routes list must be sorted while transferring to
			// Network
			if (!(CollectionUtil.isCollectionEmptyOrNull(destinationList))) {
				approvedDestination = destinationList.get(destinationList.size() - 1);
			}
		}
		return approvedDestination;
	}
}
