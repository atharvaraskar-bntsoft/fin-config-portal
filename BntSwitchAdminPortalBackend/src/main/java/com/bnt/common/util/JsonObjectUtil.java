package com.bnt.common.util;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.json.XML;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.wnameless.json.flattener.FlattenMode;
import com.github.wnameless.json.flattener.JsonFlattener;
import com.google.common.collect.Lists;
import com.bnt.bswitch.message.packager.Attribute;
import com.bnt.bswitch.message.packager.DataType;
import com.bnt.bswitch.message.packager.Field;
import com.bnt.bswitch.message.packager.Fields;
import com.bnt.bswitch.message.packager.BNTPackager;
import com.bnt.bswitch.message.packager.Fields.Type;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.exception.ExceptionLog;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JsonObjectUtil {

	private static final String ERROR_IN_SAVING_JSON_DATA = "Error in saving json data";
	private static final Logger logger = LogManager.getLogger(JsonObjectUtil.class);

	private JsonObjectUtil() {
		throw new IllegalStateException("Utility class");
	}

	public static Boolean isNullOrEmpty(JSONObject jsonObj) {

		Boolean flag = false;
		if (jsonObj == null || jsonObj.isEmpty()) {
			flag = true;
		}
		return flag;
	}

	public static Boolean isJsonArrayNullOrEmpty(JSONArray jsonArray) {

		Boolean flag = false;
		if (jsonArray == null || jsonArray.isEmpty()) {
			flag = true;
		}
		return flag;
	}

	public static Boolean isJsonArrayNotNullAndNotEmpty(JSONArray jsonArray) {
		Boolean flag = false;
		if (jsonArray != null && !jsonArray.isEmpty()) {
			flag = true;
		}
		return flag;
	}

	private static Boolean isKeyExists(JSONObject jsonObj, String key) {

		Boolean flag = false;
		if (jsonObj != null && !org.json.JSONObject.NULL.equals(jsonObj.opt(key)) && jsonObj.has(key)) {
			flag = true;
		}
		return flag;
	}

	private static Boolean isStringKeyExists(JSONObject jsonObj, String key) {

		Boolean flag = false;
		if (isKeyExists(jsonObj, key).booleanValue() && jsonObj.getString(key) != null) {
			flag = true;
		}
		return flag;
	}

	public static Object getObjectValue(JSONObject jsonObj, String key) {

		Object obj = null;
		if (Boolean.TRUE.equals(isKeyExists(jsonObj, key))) {
			obj = jsonObj.get(key);
		}
		return obj;
	}

	public static JSONObject getJSONObject(JSONObject jsonObj, String key) {

		JSONObject obj = null;
		if (Boolean.TRUE.equals(isKeyExists(jsonObj, key))) {
			obj = (JSONObject) jsonObj.get(key);
		}
		return obj;
	}

	public static String getStringValue(JSONObject jsonObj, String key) {

		String str = null;
		if (Boolean.TRUE.equals(isStringKeyExists(jsonObj, key))) {
			str = jsonObj.get(key).toString();
		}
		return str;
	}

	public static void setValue(JSONObject jsonObj, String key, Object value) {

		if (Boolean.TRUE.equals(isKeyExists(jsonObj, key))) {

			jsonObj.put(key, value);
		}

	}

	public static String getStringValueWithNullValueCheck(JSONObject jsonObj, String key) {

		String str = null;
		if (Boolean.TRUE.equals(isStringKeyExists(jsonObj, key))) {
			str = jsonObj.getString(key);
		}
		return str;
	}

	public static JSONObject getChildJSONObject(JSONObject parentObject, String childkey) throws JSONException {
		if (parentObject != null && !(parentObject.isNull(childkey))) {
			return parentObject.getJSONObject(childkey);
		}
		return null;
	}

	public static Boolean getBooleanValue(JSONObject jsonObj, String key) {

		Boolean value = null;
		if (Boolean.TRUE.equals(isKeyExists(jsonObj, key))) {
			value = jsonObj.getBoolean(key);
		}
		return value;
	}

	public static int getIntegerValue(JSONObject jsonObj, String key) {

		int count = 0;
		if (Boolean.TRUE.equals(isKeyExists(jsonObj, key))) {
			count = jsonObj.getInt(key);
		}
		return count;
	}

	public static Double getDoubleValue(JSONObject jsonObj, String key) throws JSONException {

		Double value = null;
		if (Boolean.TRUE.equals(isKeyExists(jsonObj, key))) {
			value = jsonObj.getDouble(key);
		}
		return value;
	}

	public static JSONObject getJson(String data) {
		JSONObject jsonObj = null;
		if (!(StringUtil.isEmptyOrNull(data))) {
			try {
				jsonObj = new JSONObject(data);
			} catch (JSONException e) {
				logger.error("Error in fetching JSON {}", e.getMessage());
				return null;
			}
		}
		return jsonObj;
	}

	public static String deserializeObjectToString(Object object) {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
		String deserializedData;
		try {
			deserializedData = objectMapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			logger.error("Error in derailizing json object", e);
			return null;
		}
		deserializedData = deserializedData.replace("\\{", "{");

		return deserializedData;
	}

	public static JSONObject excludeKeysFromJSON(JSONObject originalJsonObject, Set<String> exclusionKeys) {

		JSONObject modifiedJsonObject = null;

		try {
			String originalJsonString = originalJsonObject.toString();
			String modifiedJsonString = JsonPathUtil.removeFields(originalJsonString, exclusionKeys);
			modifiedJsonObject = JsonObjectUtil.getJson(modifiedJsonString);
		}

		catch (Exception e) {

			logger.error("Error in modifying json object", e);
			return originalJsonObject;
		}
		return modifiedJsonObject;
	}

	public static Integer findIntegerValue(String messageContext, String key) {
		JSONObject messageContextObj = getJson(messageContext);
		if (null == messageContextObj) {
			logger.error("messageContextObj is null for key:{} ", key);
			return null;
		}
		return getIntegerValue(messageContextObj, key);
	}

	public static void saveJson(String jsonData, String dirPath, String fileName) {
		ObjectMapper mapper = new ObjectMapper();
		ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
		File file = null;
		try {

			String path = StringUtil.removeWhiteSpaces(dirPath + File.separator + fileName + ".json");
			file = FileUtil.writeFileInResource(path);

			if (file.createNewFile()) {

				logger.info("json file has been created");
			}
		} catch (Exception e1) {
			logger.error("Error in creating json file on the given path", e1);
			throw new RippsAdminException(ERROR_IN_SAVING_JSON_DATA);
		}

		try {
			writer.writeValue(file, jsonData);
		} catch (Exception e) {
			logger.error(ERROR_IN_SAVING_JSON_DATA, e);
			throw new RippsAdminException(ERROR_IN_SAVING_JSON_DATA);
		}
	}

	public static Map<String, Object> getFlatMapOfJson(String json, Boolean excludeNull, Boolean excludeArray) {
		Map<String, Object> map = null;
		if (Boolean.TRUE.equals(excludeArray)) {
			map = new JsonFlattener(json).withFlattenMode(FlattenMode.KEEP_ARRAYS).flattenAsMap();
		} else {
			map = JsonFlattener.flattenAsMap(json);
		}

		if (Boolean.TRUE.equals(excludeNull)) {
			CollectionUtil.processMapForNotNull(map);
		}
		return map;
	}

	public static JSONObject renameKeysFromJSON(JSONObject originalJsonObject, String parentKeyPath,
			Map<String, String> keyMap) {

		JSONObject modifiedJsonObject = null;

		try {
			String originalJsonString = originalJsonObject.toString();

			String modifiedJsonString = originalJsonString;
			logger.debug("original json :{}", originalJsonString);

			Iterator<Map.Entry<String, String>> iter = keyMap.entrySet().iterator();
			Map.Entry<String, String> entry = null;

			while (iter.hasNext()) {
				entry = iter.next();
				modifiedJsonString = JsonPathUtil.renameKey(originalJsonString, parentKeyPath, entry.getKey(),
						entry.getValue());
			}
			validateJsonObject(modifiedJsonString);
			modifiedJsonObject = JsonObjectUtil.getJson(modifiedJsonString);
		} catch (Exception e) {
			logger.error("Error in modifying json object", e);
			return originalJsonObject;
		}
		return modifiedJsonObject;
	}

	public static void validateJsonObject(String jsonString) {
		try {
			new JSONObject(jsonString);
		} catch (JSONException e) {
			logger.error(" not a valid json");
			throw new RippsAdminException("not a valid json");
		}
	}

	public static JSONObject getXmlToJson(Reader xmlReader, boolean keepStrings) {
		logger.info("inside getXmlToJson with Reader paramater");
		JSONObject jSONObject = null;

		try {
			jSONObject = XML.toJSONObject(xmlReader, keepStrings);
		} catch (JSONException e) {
			logger.error("Xml To JSOn conversion faild {}", e.getMessage());
			throw new RippsAdminException(e.getMessage());
		}

		return jSONObject;
	}

	public static JSONObject getJsonObjectFromString(String jsonString) {
		JSONObject messageContext = null;

		if (jsonString != null) {
			try {
				jsonString = GsonUtil.toPrettyFormat(jsonString);
				messageContext = JsonObjectUtil.getJson(jsonString);
//			logger.info("Given Message Context : {}", jsonString);

			} catch (Exception e) {
				logger.error("Error in serializing JSON {}", e.getMessage());
			}
		}
		return messageContext;
	}

	public static Object getObjectFromJsonString(String jsonString) {
		Object jsonObject = null;
		if (jsonString != null || "".equalsIgnoreCase(jsonString)) {
			jsonObject = JsonObjectUtil.getObjectFromString(jsonString, Object.class);
		}
		return jsonObject;
	}

	public static String getJsonStringFromObject(Object jsonObject) {
		String jsonString = null;
		if (jsonObject != null) {
			jsonString = JsonObjectUtil.deserializeObjectToString(jsonObject);
		}
		return jsonString;
	}

	public static JSONObject getJsonObjectFromObject(Object object) {
		return getJsonObjectFromString(getJsonStringFromObject(object));
	}

	public static <T> T getGenericObjectFromJsonString(String json, Class<T> type) {
		if (StringUtil.isNotNullOrBlank(json)) {
			try {
				return new ObjectMapper().readValue(json, type);
			} catch (Exception e) {
				logger.debug(e);
				logger.error("Exception in parsing JSON{}", ExceptionLog.printStackTraceToString(e));
			}
		}
		return null;
	}

	public static <T> T getObjectFromString(String json, Class<T> type) {
		if (StringUtil.isNotNullOrBlank(json)) {
			try {
				return new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(json,
						type);
			} catch (Exception e) {
				logger.error("Exception in parsing JSON{}", e.getMessage());
				logger.debug(e);
			}
		}
		return null;
	}

	public static <T> T loadJsonFileAsType(String jsonResourceFilePath, Class<T> type) {
		logger.info("inside getDataMap");
		T jsonHash = null;
		File jsonFile;
		try {
			jsonFile = FileUtil.getFileFromClassPathResource(jsonResourceFilePath);
			jsonHash = new com.fasterxml.jackson.databind.ObjectMapper().readValue(jsonFile, type);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		logger.info("completed getMapFromJsonFilePath");
		return jsonHash;
	}

	public static void removeKey(JSONObject jsonObject, String key) {
		if (jsonObject.has(key)) {
			jsonObject.remove(key);
		}
	}

	public static String transformStringToJson(String jsonstring) throws JsonMappingException, JsonProcessingException {
		OutputJson outputObject = new OutputJson();
		ObjectMapper mapper = new ObjectMapper();
		JSONObject jsonObj = new JSONObject(jsonstring);
		Iterator<String> keys = jsonObj.keys();
		String resultString = null;
		List<SubAttributes> att = new ArrayList<>();

		while (keys.hasNext()) {
			List<ExAttribute> exAtt = new ArrayList<>();
			String key = keys.next();
			Object obj = jsonObj.get(key);
			List<MainAttributes> mainAttr = new ArrayList<>();
			MainAttributes mainAttributes = new MainAttributes();

			mainAttributes.setName(key);
			mainAttributes.setType("fields");
			mainAttributes.setFieldsType("SIMPLE");

			if (obj instanceof JSONArray) {
				// If JSON is array
			} else if (obj instanceof JSONObject) {
				JSONObject jobj = objectToJSONObject(obj);
				Iterator<String> key1 = jobj.keys();

				while (key1.hasNext()) {
					String skey = key1.next();
					Object obj1 = jobj.get(skey);

					if (obj1 instanceof JSONObject) {
						Attributes attributes = new Attributes();

						attributes.setType("field");
						attributes.setAlias(skey);
						attributes.setPattern(null);
						attributes.setFieldName(skey);// set Field Name
						attributes.setFieldType("STRING");
						attributes.setIsPersist(true);
						attributes.setIsEditable(true);
						attributes.setIsSensitive(false);
						attributes.setIsHide(false);

						JSONObject jobj1 = objectToJSONObject(obj1);
						Iterator<String> key2 = jobj1.keys();
						List<XmlAttributes> xAttr = new ArrayList<>();
						if (key2.hasNext() != false) {
							while (key2.hasNext()) {
								String tkey = key2.next();
								Object obj2 = jobj1.get(tkey);
								if (obj2 instanceof JSONArray) {
									obj = toList((JSONArray) obj);
								} else if (obj2 instanceof JSONObject) {
									JSONObject jobj2 = objectToJSONObject(obj2);
									handleXmlJSONObject(jobj2, xAttr);
									attributes.setXmlAttributes(xAttr);
									att.add(attributes);
								}
							}
						} else {
							att.add(attributes);
						}
					} else if (obj1 instanceof JSONArray) {
						SubAttributes subAttributes = new SubAttributes();
						subAttributes.setName(skey);
						subAttributes.setType("fields");
						subAttributes.setFieldsType("LIST");
						JSONArray jArr1 = objectToJSONArray(obj1);
						for (int i = 0; i < jArr1.length() - 1; i++) {
							JSONObject ob = jArr1.getJSONObject(i);
							handleExtJSONObject(ob, exAtt);
							subAttributes.setAttributes(exAtt);
							att.add(subAttributes);
							// att.addAll((Collection<? extends Attributes>) subAttributes);
						}
					}
				}

			}

			mainAttributes.setAttributes(att);
			mainAttr.add(mainAttributes);
			outputObject.setAttributes(mainAttr);
			mapper.setSerializationInclusion(Include.NON_NULL);
			resultString = mapper.writeValueAsString(outputObject);
			logger.debug("resultString " + resultString);
		}
		return resultString;// getGenericObjectFromJsonString(jsonstring, OutputJson.class);
	}

	public static JSONObject objectToJSONObject(Object object) {
		Object json = null;
		JSONObject jsonObject = null;
		try {
			json = new JSONTokener(object.toString()).nextValue();
		} catch (JSONException e) {
			e.printStackTrace();
		}
		if (json instanceof JSONObject) {
			jsonObject = (JSONObject) json;
		}
		return jsonObject;
	}

	public static JSONArray objectToJSONArray(Object object) {
		Object json = null;
		JSONArray jsonArray = null;
		try {
			json = new JSONTokener(object.toString()).nextValue();
		} catch (JSONException e) {
			e.printStackTrace();
		}
		if (json instanceof JSONArray) {
			jsonArray = (JSONArray) json;
		}
		return jsonArray;
	}

	public static Map<String, Object> toMap(JSONObject jsonobj) throws JSONException {
		Map<String, Object> map = new HashMap<>();
		Iterator<String> keys = jsonobj.keys();
		while (keys.hasNext()) {
			String key = keys.next();
			Object value = jsonobj.get(key);
			if (value instanceof JSONArray) {
				value = toList((JSONArray) value);
			} else if (value instanceof JSONObject) {
				value = toMap((JSONObject) value);
			}
			map.put(key, value);
		}
		return map;
	}

	public static List<Object> toList(JSONArray array) throws JSONException {
		List<Object> list = new ArrayList<Object>();
		for (int i = 0; i < array.length(); i++) {
			Object value = array.get(i);
			if (value instanceof JSONArray) {
				value = toList((JSONArray) value);
			} else if (value instanceof JSONObject) {
				value = toMap((JSONObject) value);
			}
			list.add(value);
		}
		return list;
	}

	static void handleXmlJSONObject(JSONObject jsonObject, List<XmlAttributes> xAttr) {

		jsonObject.keys().forEachRemaining(key -> {
			Object value = jsonObject.get(key);
			XmlAttributes xmlAttributes = new XmlAttributes();
			xmlAttributes.setType("field");
			xmlAttributes.setAlias(key);
			xmlAttributes.setIsPersist(true);
			xmlAttributes.setIsEditable(true);
			xmlAttributes.setIsSensitive(false);
			xmlAttributes.setIsHide(false);

			xmlAttributes.setPattern(null);
			xmlAttributes.setFieldName(key);// set ID
			xmlAttributes.setFieldType("STRING");
			xAttr.add(xmlAttributes);
		});
	}

	static void handleExtJSONObject(JSONObject jsonObject, List<ExAttribute> exAtt) {

		jsonObject.keys().forEachRemaining(key -> {
			Object value = jsonObject.get(key);

			ExAttribute attribute = new ExAttribute();
			attribute.setType("field");
			attribute.setAlias(key);
			attribute.setIsHide(false);
			attribute.setPattern(null);
			attribute.setFieldName(key);// set address property
			attribute.setFieldType("STRING");
			attribute.setIsPersist(true);
			attribute.setIsEditable(true);
			attribute.setIsSensitive(false);
			exAtt.add(attribute);
		});
	}

	private static Document convertStringToXMLDocument(String xmlString) {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		try {
			factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
		} catch (ParserConfigurationException e1) {
			logger.debug("exception in convertStringToXMLDocument... ", e1.getMessage());
		}
		DocumentBuilder builder = null;
		try {
			builder = factory.newDocumentBuilder();
			return builder.parse(new InputSource(new StringReader(xmlString)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String transformXmlToPackager(String xMLString)
			throws ParserConfigurationException, SAXException, IOException {
		Document document = convertStringToXMLDocument(xMLString);
		Element rootElement = document.getDocumentElement();
		List<Attribute> firstLevelAttributes = new ArrayList<>();
		Set<String> arraySet = new HashSet<>();
		NodeList nodeList = rootElement.getChildNodes();

		for (int i = 0; i < nodeList.getLength(); i++) {
			Node node = nodeList.item(i);
			if (node.getNodeType() == 3)
				continue;
			NodeList arrayListNodes = rootElement.getElementsByTagName(node.getNodeName());
			boolean arrayFlag = (arrayListNodes.getLength() > 1) ? true : false;
			boolean objectFlag = isNodeObject(node);
			boolean attributesFlag = node.hasAttributes();
			if (arrayFlag && arraySet.contains(node.getNodeName())) {
			} else {
				if (arrayFlag)
					arraySet.add(node.getNodeName());
				processNodes(firstLevelAttributes, node, arrayFlag, objectFlag, attributesFlag);
			}
		}
		List<Attribute> rootLevelAttributes = new ArrayList<>();
		Fields rootFields = new Fields(rootElement.getTagName(), firstLevelAttributes, true, Type.SIMPLE);
		rootLevelAttributes.add(rootFields);
		BNTPackager packager = new BNTPackager(rootLevelAttributes);
		String jsonPackager = null;
		try {
			jsonPackager = new ObjectMapper().writeValueAsString(Lists.newArrayList(packager));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonPackager;
	}

	private static Fields processObjectOrArray(Node rootNode, boolean isArray) {
		NodeList nodeList = rootNode.getChildNodes();
		List<Attribute> attributes = new ArrayList<>();
		Set<String> arraySet = new HashSet<>();
		for (int i = 0; i < nodeList.getLength(); i++) {
			Node childNode = nodeList.item(i);
			if (childNode.getNodeType() == 3)
				continue;
			Element elem = (Element) rootNode;
			NodeList arrayListNodes = elem.getElementsByTagName(childNode.getNodeName());
			boolean arrayFlag = (arrayListNodes.getLength() > 1) ? true : false;
			boolean objectFlag = isNodeObject(childNode);
			boolean attributesFlag = childNode.hasAttributes();
			if (arrayFlag && arraySet.contains(childNode.getNodeName())) {
			} else {
				if (arrayFlag) {
					arraySet.add(childNode.getNodeName());
				}
				processNodes(attributes, childNode, arrayFlag, objectFlag, attributesFlag);
			}
		}
		return new Fields(rootNode.getNodeName(), attributes, true, (isArray) ? Type.LIST : Type.SIMPLE);
	}

	private static boolean isNodeObject(Node childNode) {
		NodeList list = childNode.getChildNodes();
		int counter = 0;
		for (int i = 0; list.getLength() > i; i++) {
			Node node = list.item(i);
			if (node.getNodeType() == 3)
				continue;
			counter++;
		}
		return (counter == 0) ? false : true;
	}

	private static void processNodes(List<Attribute> attributes, Node childNode, boolean arrayFlag, boolean objectFlag,
			boolean attributesFlag) {
		if (arrayFlag) {
			attributes.add(processObjectOrArray(childNode, true));
		} else if (objectFlag && !arrayFlag) {
			attributes.add(processObjectOrArray(childNode, false));
		} else {
			if (attributesFlag) {
				attributes.add(processSimpleWithAttribute(childNode));
			} else {
				attributes.add(processSimple(childNode));
			}
		}
	}

	private static Field processSimpleWithAttribute(Node node) {
		Field field = new Field(node.getNodeName(), DataType.STRING, node.getNodeName(), false, false, false, true);
		List<Field> xmlAttribute = new ArrayList<>();
		NamedNodeMap attribute = node.getAttributes();
		for (int j = 0; attribute.getLength() > j; j++) {
			Node node1 = attribute.item(j);
			Field xmlAttributeField = new Field(node1.getNodeName(), DataType.STRING, node1.getNodeName(), false, false,
					false, true);
			xmlAttribute.add(xmlAttributeField);
		}
		field.setXmlAttributes(xmlAttribute);
		return field;
	}

	private static Field processSimple(Node node) {
		return new Field(node.getNodeName(), DataType.STRING, node.getNodeName(), false, false, false, true);
	}
}
