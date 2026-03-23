package com.bnt.ruleengine.sample;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.common.collect.Lists;
import com.bnt.core.orchestation.rule.ConditionalDecisionRule;
import com.bnt.bswitch.query.parser.And;
import com.bnt.bswitch.query.parser.Equal;
import com.bnt.bswitch.query.parser.GreaterThan;
import com.bnt.bswitch.query.parser.GreaterThanEqual;
import com.bnt.bswitch.query.parser.In;
import com.bnt.bswitch.query.parser.LessThan;
import com.bnt.bswitch.query.parser.LessThanEqual;
import com.bnt.bswitch.query.parser.Like;
import com.bnt.bswitch.query.parser.Not;
import com.bnt.bswitch.query.parser.Or;
import com.bnt.bswitch.query.parser.RegEx;
import com.bnt.bswitch.query.parser.StartsWith;
import com.bnt.ruleengine.Nodes;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RuleTransformSample {

	private static final String NOT_EQUAL = "NotEqual";

	private static final String IN = "In";

	private static final Logger logger = LogManager.getLogger(RuleTransformSample.class);

	private static final String EQUAL = "Equal";
	private static final String LIKE = "Like";
	private static final String GREATER_THAN = "GreaterThan";
	private static final String STARTS_WITH2 = "starts_with";
	private static final String GREATER_THAN_EQUAL = "GreaterThanEqual";
	private static final String LESS_THAN = "LessThan";
	private static final String LESS_THAN_EQUAL = "LessThanEqual";
	private static final String REG_EX = "RegEx";
	private static final String STARTS_WITH = "StartsWith";
	private static final String APPEND_SLASH = "\",\"";
	private static final String BALANCE_INQUIRY = "BALANCE_INQUIRY";
	private static final String TRANSACTION_TYPE = "transactionType";

	public static ConditionalDecisionRule startGeneration(List<Nodes> listNodes) {
		List<Object> listObjects = new ArrayList<>();
		int counter = 0;
		for (int i = 0; i < listNodes.size(); i++) {
			Nodes node = listNodes.get(i);
			if (listNodes.size() > 1 && i == 0) {
				getRelationConstruct(node.getRelation(), true, listNodes.size(), listObjects, counter);
			}
			if (node.isGroup()) {
				getNodesCollection(node.getNodes(), listObjects, counter);
			} else {
				getSingleNode(node, listObjects, counter);
			}
		}
		return processStart(listObjects);
	}

	/**
	 * Iterate List object check if relational operator YES: check if LIST YES:
	 * check size NO:? NO:?
	 */
	private static ConditionalDecisionRule processStart(List<Object> list) {
		int firstListIndex = -1;
		firstListIndex = processStart1(list, firstListIndex);
		ConditionalDecisionRule rule = null;
		rule = processStart2(list, firstListIndex);
		if (rule != null)
			return rule;
		int nextStepIndex = processStartStep2(list, firstListIndex);
		if (nextStepIndex - 1 > 0) {
			list.removeIf(element -> element instanceof String && ((String) element).equalsIgnoreCase("DONE"));
			processComplexList(list);
		}
		list.removeIf(element -> element instanceof String && ((String) element).equalsIgnoreCase("DONE"));
		if (list.size() == 1 && list.get(0) instanceof TransformWrapper tw) {
			ConditionalDecisionRule cdRule = null;
			if (tw.getType().equalsIgnoreCase("AND")) {
				cdRule = new ConditionalDecisionRule((And) tw.getObject());
			} else if (tw.getType().equalsIgnoreCase("OR")) {
				cdRule = new ConditionalDecisionRule((Or) tw.getObject());
			} else if (tw.getType().equalsIgnoreCase(EQUAL)) {
				cdRule = new ConditionalDecisionRule((Equal) tw.getObject());
			}
			return cdRule;
		}
		return null;
	}

	private static ConditionalDecisionRule processStart2(List<Object> list, int firstListIndex) {
		ConditionalDecisionRule rule = null;
		if (firstListIndex == -1) {
			Object obj = getOperatorPlusCondition(list.get(0));
			if (obj instanceof LessThan lessThan) {
				rule = new ConditionalDecisionRule(lessThan);
			} else if (obj instanceof Equal equal) {
				rule = new ConditionalDecisionRule(equal);
			} else if (obj instanceof LessThanEqual lessThanEqual) {
				rule = new ConditionalDecisionRule(lessThanEqual);
			} else if (obj instanceof In inObj) {
				rule = new ConditionalDecisionRule(inObj);
			} else if (obj instanceof GreaterThanEqual greaterThanEqual) {
				rule = new ConditionalDecisionRule(greaterThanEqual);
			} else if (obj instanceof StartsWith startsWith) {
				rule = new ConditionalDecisionRule(startsWith);
			} else if (obj instanceof GreaterThan greaterThan) {
				rule = new ConditionalDecisionRule(greaterThan);
			} else if (obj instanceof RegEx regEx) {
				rule = new ConditionalDecisionRule(regEx);
			} else if (obj instanceof Like like) {
				rule = new ConditionalDecisionRule(like);
			} else if (obj instanceof Not notObj) {
				rule = new ConditionalDecisionRule(notObj);
			}
		}
		return rule;
	}

	private static int processStart1(List<Object> list, int firstListIndex) {
		for (int i = list.size() - 1; i >= 0; i--) {
			Object obj = list.get(i);
			if (obj instanceof String strObj && strObj.startsWith("LIST")) {
				String[] strObjArray = strObj.split(":");
				processStartStep1(list, strObjArray[1], i, "LIST");
				firstListIndex = i;
				break;
			}
		}
		return firstListIndex;
	}

	private static void processComplexList(List<Object> list) {
		int nextListIndex = -1;
		nextListIndex = processStart1(list, nextListIndex);
		int nextStepIndex = processStartStep2(list, nextListIndex);
		if (nextStepIndex - 1 > 0) {
			list.removeIf(element -> element instanceof String && ((String) element).equalsIgnoreCase("DONE"));
			processComplexList(list);
		}
	}

	private static int processStartStep2(List<Object> list, int firstListIndex) {
		if (firstListIndex != -1) {
			Object obj1 = list.get(firstListIndex);
			TransformWrapper tw = null;
			if (obj1 instanceof TransformWrapper tt) {
				Object obj2 = list.get(firstListIndex - 1);
				if (isRelational(obj2)) {
					String str = (String) obj2;
					if (str.equalsIgnoreCase("AND")) {
						And andObj = new And(Lists.newArrayList((List) tt.getObject()));
						tw = new TransformWrapper("AND", andObj);
					} else if (str.equalsIgnoreCase("OR")) {
						Or andObj = new Or(Lists.newArrayList((List) tt.getObject()));
						tw = new TransformWrapper("OR", andObj);
					}
				}
			}
			if (tw != null) {
				list.set(firstListIndex - 1, tw);
				list.set(firstListIndex, "DONE");
				return firstListIndex - 1;
			}
		}
		return -1;
	}

	private static void processStartStep1(List<Object> completeList, String sizeList, int index, String typeBundle) {
		List<Object> listObj = new ArrayList<>();
		StringBuilder sb = null;
		sb = processStartStep2(completeList, sizeList, index, listObj, sb);
		if (sb != null) {
			TransformWrapper wrapper = new TransformWrapper(typeBundle, listObj);
			completeList.set(index, wrapper);
			String[] strArr = sb.toString().split(",");
			for (String s : strArr) {
				completeList.set(Integer.parseInt(s), "DONE");
			}
		}
	}

	private static StringBuilder processStartStep2(List<Object> completeList, String sizeList, int index,
			List<Object> listObj, StringBuilder sb) {
		for (int i = index + 1; i <= index + Integer.parseInt(sizeList); i++) {
			Object obj = completeList.get(i);
			if (isRelational(obj)) {// IF relational
				//
			} else if (obj instanceof TransformWrapper) {// IF relational
				listObj.add(getWrapperContent(obj));
				if (sb != null) {
					sb.append("," + i);
				} else {
					sb = new StringBuilder();
					sb.append(i);
				}
			} else {// IF not relational
				listObj.add(getOperatorPlusCondition(obj));
				if (sb != null) {
					sb.append("," + i);
				} else {
					sb = new StringBuilder();
					sb.append(i);
				}
			}
		}
		return sb;
	}

	private static Object getWrapperContent(Object obj) {
		TransformWrapper tw = (TransformWrapper) obj;
		return tw.getObject();
	}

	@SuppressWarnings("unchecked")
	private static Object getOperatorPlusCondition(Object listFromMap) {
		Object obj = null;
		if (listFromMap instanceof List) {
			List<Object> listObj = (List<Object>) listFromMap;
			String operator = (String) listObj.get(0);
			Nodes node = (Nodes) listObj.get(1);
			obj = getOperatorPlusCondition2(obj, operator, node);
		}
		return obj;
	}

	private static Object getOperatorPlusCondition2(Object obj, String operator, Nodes node) {

		obj = notEqual(obj, operator, node);

		obj = equals(obj, operator, node);

		obj = lessThan(obj, operator, node);

		obj = lessThanEqual(obj, operator, node);

		obj = in(obj, operator, node);

		obj = greaterThanEqual(obj, operator, node);

		obj = startWith(obj, operator, node);

		obj = greaterThan(obj, operator, node);

		obj = like(obj, operator, node);

		obj = regex(obj, operator, node);

		return obj;
	}

	private static Object notEqual(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(NOT_EQUAL) || operator.equalsIgnoreCase("!=")) {
			obj = new Not(new Equal(node.getKey(), node.getValue()));
		}
		return obj;
	}

	private static Object equals(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(EQUAL) || operator.equalsIgnoreCase("==")) {
			obj = new Equal(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static Object lessThan(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(LESS_THAN) || operator.equalsIgnoreCase("<")) {
			obj = new LessThan(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static Object lessThanEqual(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(LESS_THAN_EQUAL)) {
			obj = new LessThanEqual(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static Object in(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(IN)) {
			obj = new In(node.getKey(), node.getValue() != null ? node.getValue().split(",") : new Object[] {});
		}
		return obj;
	}

	private static Object greaterThanEqual(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(GREATER_THAN_EQUAL)) {
			obj = new GreaterThanEqual(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static Object startWith(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(STARTS_WITH) || operator.equalsIgnoreCase("str[startsWith]")
				|| operator.equalsIgnoreCase(STARTS_WITH2) || operator.equalsIgnoreCase("str[starts_with]")) {
			obj = new StartsWith(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static Object greaterThan(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(GREATER_THAN) || operator.equalsIgnoreCase(">")) {
			obj = new GreaterThan(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static Object like(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(LIKE)) {
			obj = new Like(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static Object regex(Object obj, String operator, Nodes node) {
		if (operator.equalsIgnoreCase(REG_EX) || "pattern".equalsIgnoreCase(operator)) {
			obj = new RegEx(node.getKey(), node.getValue());
		}
		return obj;
	}

	private static boolean isRelational(Object obj) {
		if (obj instanceof String) {
			String str = (String) obj;
			if (str.equalsIgnoreCase("AND") || str.equalsIgnoreCase("OR")) {
				return true;
			}
		}
		return false;
	}

	private static String getRelationConstruct(String relation, boolean sizemorethanzero, int listSize,
			List<Object> listObjects, int counter) {
		logger.info("inside getOperatorConstruct() and counter is {}", counter);

		if (relation.equalsIgnoreCase("AND")) {
			listObjects.add("AND");
		} else if (relation.equalsIgnoreCase("OR")) {
			listObjects.add("OR");
		}
		if (sizemorethanzero) {
			listObjects.add("LIST:" + listSize);
		}
		return "buffer";
	}

	private static void getSingleNode(Nodes node, List<Object> listObjects, int counter) {
		getOperatorConstruct(node, listObjects, counter);
	}

	/**
	 * GreaterThanEqual | StartsWith | Like | GreaterThan | LessThan | LessThanEqual
	 * | RegEx | Equal | NotEqual
	 */
	private static String getOperatorConstruct(Nodes node, List<Object> listObjects, int counter) {

		logger.info("inside getOperatorConstruct() and counter is {}", counter);

		String operator = node.getOperator();
		if (operator.equalsIgnoreCase("==") || operator.equalsIgnoreCase("equal")) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(EQUAL);
			listObj.add(node);
			listObjects.add(listObj);
			return "new Equal(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase("!=") || operator.equalsIgnoreCase("notequal")) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(NOT_EQUAL);
			listObj.add(node);
			listObjects.add(listObj);
			return "new NotEqual(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(REG_EX) || "pattern".equalsIgnoreCase(operator)) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(REG_EX);
			listObj.add(node);
			listObjects.add(listObj);
			return "new Equal(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(LIKE)) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(LIKE);
			listObj.add(node);
			listObjects.add(listObj);
			return "new Like(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(LESS_THAN) || operator.equalsIgnoreCase("<")) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(LESS_THAN);
			listObj.add(node);
			listObjects.add(listObj);
			return "new LessThan(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(STARTS_WITH) || operator.equalsIgnoreCase("str[startsWith]")
				|| operator.equalsIgnoreCase(STARTS_WITH2) || operator.equalsIgnoreCase("str[starts_with]")) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(STARTS_WITH);
			listObj.add(node);
			listObjects.add(listObj);
			return "new StartsWith(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(GREATER_THAN) || operator.equalsIgnoreCase(">")) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(GREATER_THAN);
			listObj.add(node);
			listObjects.add(listObj);
			return "new GreaterThan(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(GREATER_THAN_EQUAL) || operator.equalsIgnoreCase(">")) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(GREATER_THAN_EQUAL);
			listObj.add(node);
			listObjects.add(listObj);
			return "new GreaterThanEqual(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(LESS_THAN_EQUAL) || operator.equalsIgnoreCase(">")) {
			List<Object> listObj = new ArrayList<>();
			listObj.add(LESS_THAN_EQUAL);
			listObj.add(node);
			listObjects.add(listObj);
			return "new LessThanEqual(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		} else if (operator.equalsIgnoreCase(IN)) {
			List<Object> listObj = new ArrayList<>();
			listObj.add("in");
			listObj.add(node);
			listObjects.add(listObj);
			return "new In(\"" + node.getKey() + APPEND_SLASH + node.getValue() + "\")";
		}
		return null;
	}

	private static void getNodesCollection(List<Nodes> listNodes, List<Object> listObjects, int counter) {
		for (int j = 0; j < listNodes.size(); j++) {
			Nodes node = listNodes.get(j);
			if (listNodes.size() > 1 && j == 0) {
				getRelationConstruct(node.getRelation(), true, listNodes.size(), listObjects, counter);
			}
			if (node.isGroup()) {
				getNodesCollection(node.getNodes(), listObjects, counter);
			} else {
				getSingleNode(node, listObjects, counter);
			}
		}
	}
}
