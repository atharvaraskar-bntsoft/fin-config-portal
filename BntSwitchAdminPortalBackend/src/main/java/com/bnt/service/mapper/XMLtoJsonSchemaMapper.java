package com.bnt.service.mapper;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import javax.xml.XMLConstants;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.XmlObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class XMLtoJsonSchemaMapper {

	private static final Logger logger = LogManager.getLogger(XMLtoJsonSchemaMapper.class);

	private XMLtoJsonSchemaMapper() {

	}

	private static final String MASTER_ELEMENT_NAME = "isopackager";
	private static final String DESIRE_NODE = "isofield";
	private static final String DESIRE_NODE_WITH_LIST = "isofieldpackager";
	private static final String TEMPLATE = "template";
	private static final String FIELD = "field";
	private static final String TEXT = "#text";
	private static final String COMMENT = "#comment";

	public static JSONObject getJsonFromXml(String xmlMessage) {
		JSONObject jsonObject = null;
		String finalXml = null;
		Document xmlDocument = null;
		InputStream inputStream = new ByteArrayInputStream(xmlMessage.getBytes(StandardCharsets.UTF_8));

		try {
			xmlDocument = XmlObjectUtil.getXmlDocumentFromInputStream(inputStream);
			if (xmlDocument == null) {
				throw new RippsAdminException("Issue in ISO packager Parsing");
			}
			finalXml = xmlToString(xmlFormatter(xmlDocument, MASTER_ELEMENT_NAME));
		} catch (Exception e1) {
			logger.error("Packger xml parshing --> {}", e1.getMessage());
		}
		if (finalXml == null) {
			throw new RippsAdminException("finalXml is NULL");
		}
		try {
			Reader targetReader = new StringReader(finalXml);
			jsonObject = JsonObjectUtil.getXmlToJson(targetReader, true);
			jsonObject = sortJsonObjectById(jsonObject);
			targetReader.close();
		} catch (IOException e) {
			logger.error(e);
		}
		return jsonObject;
	}

	public static String xmlToString(Document doc) {

		String finalXml = null;
		try {
			TransformerFactory factory = TransformerFactory.newInstance();
			factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, "");
			factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_STYLESHEET, "");
			factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);

			Transformer transformer = factory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			StreamResult result = new StreamResult(new StringWriter());
			Source source = new DOMSource(doc);
			transformer.transform(source, result);
			finalXml = result.getWriter().toString();

			logger.info("XML to string conversion with required datad has been completed successfully");
		} catch (TransformerFactoryConfigurationError | TransformerException e) {
			logger.error(e);
		}
		return finalXml;
	}

	public static Document xmlFormatter(Document xmlDocument, String parentNode) {

		NodeList nList = xmlDocument.getElementsByTagName(MASTER_ELEMENT_NAME);

		logger.info("--> {} parentNode {}", nList.getLength(), parentNode);
		for (int i = 0; i < nList.getLength(); i++) {
			Node nNode = nList.item(i);
			logger.info("1. Name--> {}", nNode.getNodeName());
			NodeList cList = nNode.getChildNodes();
			logger.info("1. cList--> {}", cList.getLength());

			if (!(nNode.getNodeName().equals(TEXT) || nNode.getNodeName().equals(COMMENT))
					&& nNode.getNodeType() == Node.ELEMENT_NODE) {
				getXMLNodes(nNode, xmlDocument, nNode);
			}
			xmlDocument.renameNode(nNode, null, TEMPLATE);
			xmlToString(xmlDocument);
		}
		return xmlDocument;
	}

	public static void getXMLNodes(Node node, Document xmlDocument, Node masterNode) {
		if (!(node.getNodeName().equals(TEXT) || node.getNodeName().equals(COMMENT))) {
			List<Node> newSiblingList = new ArrayList<>();
			NodeList nodeList = node.getChildNodes();
			for (int i = 0; i < nodeList.getLength(); i++) {
				getXMLNodes1(node, xmlDocument, masterNode, newSiblingList, nodeList, i);
			}
			Node parentNode = node.getParentNode();
			if (!MASTER_ELEMENT_NAME.equalsIgnoreCase(node.getNodeName()) && !newSiblingList.isEmpty()) {
				parentNode.removeChild(node);
				for (Node newNode : newSiblingList) {
					masterNode.appendChild(newNode);
					xmlDocument.renameNode(newNode, null, FIELD);
				}
			}
		}
	}

	private static void getXMLNodes1(Node node, Document xmlDocument, Node masterNode, List<Node> newSiblingList,
			NodeList nodeList, int i) {
		Node currentNode = nodeList.item(i);
		if (!(currentNode.getNodeName().equalsIgnoreCase(TEXT)
				|| currentNode.getNodeName().equalsIgnoreCase(COMMENT))) {
			if (currentNode.getNodeType() == Node.ELEMENT_NODE
					&& DESIRE_NODE.equalsIgnoreCase(currentNode.getNodeName())) {
				Node noodeWithId = nodeIdProcessing(currentNode, node);
				newSiblingList.add(noodeWithId);
				xmlDocument.renameNode(noodeWithId, null, FIELD);
			} else if ((!currentNode.getNodeName().equals(TEXT))
					&& DESIRE_NODE_WITH_LIST.equalsIgnoreCase(currentNode.getNodeName())) {
				Node currentNodeWithparentId = nodeIdProcessing(currentNode, node);
				getXMLNodes(currentNodeWithparentId, xmlDocument, masterNode);
			}
		}
	}

	public static Node nodeIdProcessing(Node node, Node parentNode) {
		Node processedNode = null;
		Node pNode = parentNode;
		if (!MASTER_ELEMENT_NAME.equalsIgnoreCase(pNode.getNodeName())) {

			Element el = (Element) node;
			Element pel = (Element) pNode;

			String cId = el.getAttribute("id");
			String pId = pel.getAttribute("id");

			String newId = pId + "." + cId;
			el.setAttribute("id", newId);
			pNode.replaceChild(el, node);
			processedNode = el;
		} else {
			processedNode = node;
		}
		return processedNode;
	}

	private static JSONObject sortJsonObjectById(JSONObject jSONObject) {
		JSONArray jarry = (JSONArray) (((JSONObject) jSONObject.get(TEMPLATE)).get(FIELD));
		List<Integer> idNumericList = new ArrayList<>();
		List<String> idStringWithoutDot = new ArrayList<>();
		List<String> idListWithDot = new ArrayList<>();
		Map<String, JSONObject> mapIdJSONObject = new HashMap<>();
		Map<String, List<String>> mapDotParentChildId = new HashMap<>();

		sortJsonObjectById1(jarry, idNumericList, idStringWithoutDot, idListWithDot, mapIdJSONObject,
				mapDotParentChildId);

		Collections.sort(idNumericList);
		Collections.sort(idStringWithoutDot);
		Queue<String> queue = new LinkedList<>();
		sortJsonObjectById2(idNumericList, idStringWithoutDot, mapDotParentChildId, queue);

		JSONArray updatedJarry = new JSONArray();
		while (queue.peek() != null) {
			JSONObject orderedJson = mapIdJSONObject.get(queue.remove());
			if (orderedJson != null) {
				updatedJarry.put(orderedJson);
			}
		}
		logger.info(jarry.length());
		logger.info(updatedJarry.length());
		JSONObject updatedJson = (((JSONObject) jSONObject.get(TEMPLATE)).put(FIELD, updatedJarry));
		updatedJson = jSONObject.put(TEMPLATE, updatedJson);
		return updatedJson;
	}

	private static void sortJsonObjectById2(List<Integer> idNumericList, List<String> idStringWithoutDot,
			Map<String, List<String>> mapDotParentChildId, Queue<String> queue) {
		List<String> childIdList;
		for (Integer idNum : idNumericList) {
			queue.add("" + idNum);
			childIdList = mapDotParentChildId.get("" + idNum);
			if (childIdList != null && !childIdList.isEmpty()) {
				queue.addAll(getChildQueue(mapDotParentChildId, "" + idNum));
			}
		}
		for (String idNum : idStringWithoutDot) {
			queue.add(idNum);
			childIdList = mapDotParentChildId.get(idNum);
			if (childIdList != null && !childIdList.isEmpty()) {
				queue.addAll(getChildQueue(mapDotParentChildId, idNum));
			}
		}
	}

	private static void sortJsonObjectById1(JSONArray jarry, List<Integer> idNumericList,
			List<String> idStringWithoutDot, List<String> idListWithDot, Map<String, JSONObject> mapIdJSONObject,
			Map<String, List<String>> mapDotParentChildId) {
		Integer idnumeric;
		for (int i = 0; i < jarry.length(); i++) {
			String id = ((String) ((JSONObject) jarry.get(i)).get("id"));
			mapIdJSONObject.put(id, (JSONObject) jarry.get(i));
			if (!id.contains(".")) {
				try {
					idnumeric = Integer.parseInt(id);
					idNumericList.add(idnumeric);
				} catch (Exception e) {
					idStringWithoutDot.add(id);
				}
			} else {
				idListWithDot.add(id);
				arrangeIdWithDot(id, mapDotParentChildId, idNumericList, idStringWithoutDot);
			}
		}
	}

	public static Queue<String> getChildQueue(Map<String, List<String>> mapDotParentChildId, String parentId) {
		List<Integer> idNumericList = new ArrayList<>();
		List<String> idStringWithoutDot = new ArrayList<>();

		Integer idnumeric = null;

		List<String> arrangchildIdList = mapDotParentChildId.get(parentId);
		for (int i = 0; i < arrangchildIdList.size(); i++) {
			String id = arrangchildIdList.get(i);
			id = id.replace(parentId + ".", "");

			if (!id.contains(".")) {
				try {
					idnumeric = Integer.parseInt(id);
					idNumericList.add(idnumeric);
				} catch (Exception e) {
					idStringWithoutDot.add(id);
				}
			}
		}
		Collections.sort(idNumericList);
		Collections.sort(idStringWithoutDot);

		Queue<String> queue = new LinkedList<>();
		List<String> childIdList = null;
		String actualId = "";

		for (Integer idNum : idNumericList) {
			actualId = parentId + "." + idNum;
			queue.add(actualId);
			childIdList = mapDotParentChildId.get(actualId);
			if (childIdList != null && !childIdList.isEmpty()) {
				queue.addAll(getChildQueue(mapDotParentChildId, actualId));
			}
		}

		for (String idNum : idStringWithoutDot) {
			actualId = parentId + "." + idNum;
			queue.add(actualId);
			childIdList = mapDotParentChildId.get(actualId);
			if (childIdList != null && !childIdList.isEmpty()) {
				queue.addAll(getChildQueue(mapDotParentChildId, actualId));
			}
		}
		return queue;
	}

	public static void arrangeIdWithDot(String id, Map<String, List<String>> mapDotParentChildId,
			List<Integer> idNumericList, List<String> idStringWithoutDot) {
		/** Integer idnumeric = null; */
		List<String> childIdList = null;

		String parentId = id.substring(0, id.lastIndexOf("."));
		if (!"".equalsIgnoreCase(parentId)) {
			childIdList = mapDotParentChildId.get(parentId);
			if (childIdList == null) {
				childIdList = new ArrayList<>();
			}
			if (!childIdList.contains(id)) {
				childIdList.add(id);
				mapDotParentChildId.put(parentId, childIdList);
			}
			arrangeIdWithDot1(mapDotParentChildId, idNumericList, idStringWithoutDot, parentId);
		}
	}

	private static void arrangeIdWithDot1(Map<String, List<String>> mapDotParentChildId, List<Integer> idNumericList,
			List<String> idStringWithoutDot, String parentId) {
		Integer idnumeric;
		if (!parentId.contains(".")) {
			try {
				idnumeric = Integer.parseInt(parentId);
				if (!idNumericList.contains(idnumeric)) {
					idNumericList.add(idnumeric);
				}
			} catch (Exception e) {
				if (!idStringWithoutDot.contains(parentId)) {
					idStringWithoutDot.add(parentId);
				}
			}
		} else {
			arrangeIdWithDot(parentId, mapDotParentChildId, idNumericList, idStringWithoutDot);
		}
	}
}
