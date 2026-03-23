package com.bnt.service.mapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.wnameless.json.unflattener.JsonUnflattener;
import com.bnt.bswitch.message.packager.Attribute;
import com.bnt.bswitch.message.packager.Field;
import com.bnt.bswitch.message.packager.Fields;
import com.bnt.bswitch.message.packager.BNTPackager;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.wrapper.dto.ImfFields;
import com.bnt.rest.wrapper.dto.adapter.FieldsDataHolder;
import com.bnt.rest.wrapper.dto.adapter.FieldsDataHolderImf;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterToolKitImfMapper {

	private static final Logger logger = LogManager.getLogger(AdapterToolKitImfMapper.class);

	public static final String TYPE_FIELDS = "fields";

	public static final String TYPE_FIELD = "field";

	private static final String TYPE_STRING = "String";

	private AdapterToolKitImfMapper() {

	}

	public static void parseImfJson(String json) {

		BNTPackager packager = JsonObjectUtil.getGenericObjectFromJsonString(json, BNTPackager.class);

		if (packager == null) {
			logger.error("Exception in parsing IMF Json ");
			throw new RippsAdminException("Exception in parsing IMF Json");
		} else {
			logger.info("IMF Json has been parsed {}", packager);
		}
	}

	public static BNTPackager getImfPackager(String json) {

		BNTPackager packager = JsonObjectUtil.getGenericObjectFromJsonString(json, BNTPackager.class);

		if (packager == null) {
			logger.error("Exception in parsing IMF Json {}", json);
		} else {
			logger.info("IMF Json has been parsed {}", packager);
		}
		return packager;
	}

	public static List<String> getFieldNameList(String json) {

		BNTPackager packager = getImfPackager(json);
		Iterator<Attribute> iterator = null;
		Attribute attribute = null;
		List<String> fieldNameList = new LinkedList<>();
		if (packager != null) {
			iterator = packager.getAttributes().listIterator();

			while (iterator.hasNext()) {

				attribute = iterator.next();

				fieldNameList.addAll(attribute.getFieldNames());
			}
		}
		return fieldNameList;
	}

	public static String mapTemplateJsonToRunTimeJson(String imfJson) {
		List<String> fieldList = getFieldNameList(imfJson);

		String joinedString = "{"
				+ fieldList.stream().map(item -> "\"" + "message." + item + "\"").collect(Collectors.joining(":\" \","))
				+ ":\"\"}";
		return JsonUnflattener.unflatten(joinedString);
	}

	public static List<String> getFieldNameListHideFalse(String json) {

		logger.info("Inside getFieldNameListHideFalse");
		BNTPackager packager = getImfPackager(json);
		Iterator<Attribute> iterator = null;
		Attribute attribute = null;
		List<String> fieldNameList = new LinkedList<>();
		if (packager != null) {
			iterator = packager.getAttributes().listIterator();

			while (iterator.hasNext()) {
				attribute = iterator.next();
				if (attribute instanceof Field field && !field.getIsHide().booleanValue()) {
					fieldNameList.addAll(attribute.getFieldNames());
				}
				if (attribute instanceof Fields) {
					fieldNameList.addAll(fieldsNameList(attribute, ""));
				}
			}
		}
		logger.info("Size:{}", fieldNameList.size());
		return fieldNameList;
	}

	public static List<String> fieldsNameList(Attribute attribute, String parentFieldsName) {
//		logger.info("inside fieldsNameList for parent: {}", parentFieldsName);
		List<String> fieldNameList = new LinkedList<>();

		if (attribute instanceof Field field && field.getIsHide().booleanValue()) {
			if ("".equalsIgnoreCase(parentFieldsName)) {
				fieldNameList.add(field.getFieldName());
			} else {
				fieldNameList.add(parentFieldsName + "." + field.getFieldName());
			}
		}
		if (attribute instanceof Fields fields) {
			List<Attribute> abttributeChildList = fields.getAttributes();
			fieldsNameList1(parentFieldsName, fieldNameList, fields, abttributeChildList);

		}
//		logger.info("Retuned for parent:{}", parentFieldsName);
//		logger.info("List size:{}", fieldNameList.size());
		return fieldNameList;
	}

	private static void fieldsNameList1(String parentFieldsName, List<String> fieldNameList, Fields fields,
			List<Attribute> abttributeChildList) {
		if (abttributeChildList != null) {
			List<String> resultAbttributeNameList = null;
			for (Attribute atrb : abttributeChildList) {
				if ("".equalsIgnoreCase(parentFieldsName)) {
					resultAbttributeNameList = fieldsNameList(atrb, fields.getName());
				} else {
					resultAbttributeNameList = fieldsNameList(atrb, parentFieldsName + "." + fields.getName());
				}

				fieldNameList.addAll(resultAbttributeNameList);
			}
		}
	}

	public static List<ImfFields> getFieldsList(String imfjson) {
		List<ImfFields> listIMFFields = new ArrayList<>();
		BNTPackager packager = getImfPackager(imfjson);
		Iterator<Attribute> iterator = null;
		Attribute attribute = null;
		if (packager != null) {
			iterator = packager.getAttributes().listIterator();
			while (iterator.hasNext()) {
				attribute = iterator.next();
				if (attribute instanceof Field field) {
					listIMFFields.add(new ImfFields(field.getFieldName(), field.getAlias(),
							field.getFieldType().toString(), field.getIsHide()));
				} else if (attribute instanceof Fields) {
					listIMFFields.addAll(fieldsImfsList(attribute, ""));
				}
			}
		}
		return listIMFFields;
	}

	private static List<ImfFields> fieldsImfsList(Attribute attribute, String parentFieldsName) {
		List<ImfFields> listIMFFields = new ArrayList<>();
		if (attribute instanceof Field field) {
			fieldsImfsList1(parentFieldsName, listIMFFields, field);
		}
		if (attribute instanceof Fields fields) {
			fieldsImfsList2(parentFieldsName, listIMFFields, fields);
		}
		return listIMFFields;
	}

	private static void fieldsImfsList1(String parentFieldsName, List<ImfFields> listIMFFields, Field field) {
		if ("".equalsIgnoreCase(parentFieldsName)) {
			listIMFFields.add(new ImfFields(field.getFieldName(), field.getAlias(), field.getFieldType().toString(),
					field.getIsHide()));
		} else {
			listIMFFields.add(new ImfFields(parentFieldsName + "." + field.getFieldName(), field.getAlias(),
					field.getFieldType().toString(), field.getIsHide()));
		}
	}

	private static void fieldsImfsList2(String parentFieldsName, List<ImfFields> listIMFFields, Fields fields) {
		if ("".equalsIgnoreCase(parentFieldsName)) {
			listIMFFields.add(new ImfFields(fields.getName(), null, TYPE_FIELDS, false));
		} else {
			listIMFFields.add(new ImfFields(parentFieldsName + "." + fields.getName(), null, TYPE_FIELDS, false));
		}
		List<Attribute> abttributeChildList = fields.getAttributes();
		if (abttributeChildList != null) {
			List<ImfFields> resultAbttributeNameList = null;
			for (Attribute atrb : abttributeChildList) {
				if ("".equalsIgnoreCase(parentFieldsName)) {
					resultAbttributeNameList = fieldsImfsList(atrb, fields.getName());
				} else {
					resultAbttributeNameList = fieldsImfsList(atrb, parentFieldsName + "." + fields.getName());
				}

				listIMFFields.addAll(resultAbttributeNameList);
			}
		}
	}

	public static String camelCaseConversion(String nameToCenvert) {
		String alliasName = "";
		String convertedName = "";
		alliasName = nameToCenvert.toLowerCase();
		alliasName = alliasName.replace("_", " ");

		convertedName = alliasName.replaceFirst("" + alliasName.charAt(0), (alliasName.charAt(0) + "").toUpperCase());
		return convertedName;
	}

	public static List<FieldsDataHolder> getImfAttribute(String imf) {
		FieldsDataHolder obj = JsonObjectUtil.getObjectFromString(imf, FieldsDataHolder.class);
		List<FieldsDataHolder> objList = obj.getAttributes();
		objList = setIMFNestedName(objList, "");
		return objList;
	}

	public static List<FieldsDataHolder> getImfAttributeByHideFalse(String imf) {
		FieldsDataHolderImf obj = JsonObjectUtil.getObjectFromString(imf, FieldsDataHolderImf.class);
		List<FieldsDataHolder> objList = setIMFHideFalseToFieldsDataHolder(obj.getAttributes());
		objList = setIMFNestedName(objList, "");
		return objList;
	}

	public static List<FieldsDataHolder> getImfAttributeByHideFalseExtract(String imf) {
		FieldsDataHolderImf obj = JsonObjectUtil.getObjectFromString(imf, FieldsDataHolderImf.class);
		List<FieldsDataHolder> objList = setIMFHideFalseToFieldsDataHolder(obj.getAttributes());
		objList = setIMFNestedNameExtract(objList, "");
		return objList;
	}

	public static FieldsDataHolder setFieldsDataHolderAttribute(FieldsDataHolder parentFieldsDataHolder,
			FieldsDataHolder childFieldsDataHolder) {
		List<FieldsDataHolder> listObject = parentFieldsDataHolder.getAttributes();
		listObject.add(childFieldsDataHolder);
		parentFieldsDataHolder.setAttributes(listObject);
		return parentFieldsDataHolder;
	}

	public static List<FieldsDataHolder> setIMFNestedNameExtract(List<FieldsDataHolder> objList,
			String parentFieldsName) {
		List<FieldsDataHolder> fieldList = new LinkedList<>();
		List<FieldsDataHolder> childFieldList = null;
		String alliasName = "";
		for (FieldsDataHolder atrb : objList) {
			if ("".equalsIgnoreCase(parentFieldsName)) {
				atrb.setAlias(atrb.getName());
				atrb.setNestedName(atrb.getName());
			} else {
				atrb.setAlias(parentFieldsName + "." + atrb.getName());
				atrb.setNestedName(parentFieldsName + "." + atrb.getName());
			}

			try {
//				if (atrb.getAlias() == null || "NULL".equalsIgnoreCase(atrb.getAlias())
//						|| "".equalsIgnoreCase(atrb.getAlias())) {
				alliasName = atrb.getName();
				alliasName = alliasName.substring(alliasName.lastIndexOf(".") + 1, alliasName.length());
				alliasName = AdapterToolKitImfMapper.camelCaseConversion(alliasName);
				atrb.setNestedName(alliasName);
//				}
			} catch (Exception e) {
				logger.error("issue in ->{}", atrb);
				logger.error(e.getCause());
				atrb.setAlias("");
			}
			childFieldList = atrb.getAttributes();
			if (childFieldList != null) {
				Boolean isList = checkMethodIfList(atrb);
				childFieldList = getNestedName(childFieldList, atrb.getAlias(), isList);
			}
			atrb.setAttributes(childFieldList);
			fieldList.add(atrb);
		}
		return fieldList;
	}

	public static List<FieldsDataHolder> setIMFNestedName(List<FieldsDataHolder> objList, String parentFieldsName) {
		List<FieldsDataHolder> fieldList = new LinkedList<>();
		List<FieldsDataHolder> childFieldList = null;
		String alliasName = "";
		for (FieldsDataHolder atrb : objList) {
			if ("".equalsIgnoreCase(parentFieldsName)) {
				atrb.setNestedName(atrb.getName());
			} else {
				atrb.setNestedName(parentFieldsName + "." + atrb.getName());
			}
			try {
				if (atrb.getAlias() == null || "NULL".equalsIgnoreCase(atrb.getAlias())
						|| "".equalsIgnoreCase(atrb.getAlias())) {
					alliasName = atrb.getName();
					alliasName = alliasName.substring(alliasName.lastIndexOf(".") + 1, alliasName.length());
					alliasName = AdapterToolKitImfMapper.camelCaseConversion(alliasName);
					atrb.setAlias(alliasName);
				}
			} catch (Exception e) {
				logger.error("issue in ->{}", atrb);
				logger.error(e.getCause());
				atrb.setAlias("");
			}
			childFieldList = atrb.getAttributes();
			if (childFieldList != null) {
				for (FieldsDataHolder attribute : childFieldList) {
					if (atrb.getFieldsType() != null && atrb.getFieldsType().equalsIgnoreCase("LIST")) {
						attribute.setNestedName(atrb.getName() + "." + "#" + "." + attribute.getName());
						try {
							if (atrb.getAlias() == null || "NULL".equalsIgnoreCase(atrb.getAlias())
									|| "".equalsIgnoreCase(atrb.getAlias())) {
								alliasName = atrb.getName();
								alliasName = alliasName.substring(alliasName.lastIndexOf(".") + 1, alliasName.length());
								alliasName = AdapterToolKitImfMapper.camelCaseConversion(alliasName);
								atrb.setAlias(alliasName);
							}
						} catch (Exception e) {
							logger.error("issue in ->{}", atrb);
							logger.error(e.getCause());
							atrb.setAlias("");
						}
					} else {
						childFieldList = setIMFNestedName(childFieldList, atrb.getNestedName());
					}
				}
			}
			atrb.setAttributes(childFieldList);
			fieldList.add(atrb);
		}
		return fieldList;
	}

	private static Boolean checkMethodIfList(FieldsDataHolder atrb) {
		Boolean isList = false;
		if (atrb.getFieldsType().equalsIgnoreCase("List")) {
			isList = true;
		}
		return isList;
	}

	private static List<FieldsDataHolder> getNestedName(List<FieldsDataHolder> childFieldList, String parentName,
			Boolean isList) {
		String alliasName;
		List<FieldsDataHolder> childFieldList2 = null;
		for (FieldsDataHolder attribute : childFieldList) {
			if (Boolean.TRUE.equals(isList)) {
				attribute.setAlias(parentName + "." + "#" + "." + attribute.getName());
				attribute.setNestedName(parentName + "." + "#" + "." + attribute.getName());
			} else {
				attribute.setAlias(parentName + "." + attribute.getName());
				attribute.setNestedName(parentName + "." + attribute.getName());
			}
			try {
				if (attribute.getAlias() == null || "NULL".equalsIgnoreCase(attribute.getAlias())
						|| "".equalsIgnoreCase(attribute.getAlias())) {
					alliasName = attribute.getName();
					alliasName = alliasName.substring(alliasName.lastIndexOf(".") + 1, alliasName.length());
					alliasName = AdapterToolKitImfMapper.camelCaseConversion(alliasName);
					attribute.setAlias(alliasName);
				}
			} catch (Exception e) {
				logger.error("issue in ->{}", attribute);
				logger.error(e.getCause());
				attribute.setAlias("");
			}
			childFieldList2 = attribute.getAttributes();
			if (childFieldList2 != null) {
				getNestedName(childFieldList2, attribute.getNestedName(), isList);
			}
		}
		return childFieldList;
	}

	public static List<FieldsDataHolder> setIMFHideFalseToFieldsDataHolder(List<FieldsDataHolderImf> objList) {
		List<FieldsDataHolder> fieldList = null;
		List<FieldsDataHolder> childfieldList = null;
		FieldsDataHolder fieldsDataHolder = null;
		if (objList != null) {
			fieldList = new LinkedList<>();
			for (FieldsDataHolderImf fieldsDataHolderImf : objList) {
				if (fieldsDataHolderImf.getIsHide()) {
					continue;
				}
				fieldsDataHolder = new FieldsDataHolder();
				fieldsDataHolder.setName(fieldsDataHolderImf.getName());
				fieldsDataHolder.setType(fieldsDataHolderImf.getType());
				fieldsDataHolder.setAlias(fieldsDataHolderImf.getAlias());
				String operator = fieldsDataHolderImf.getDatatype();
				if (!StringUtil.isNotNullOrBlank(operator)) {
					operator = TYPE_STRING;
				}
				fieldsDataHolder.setDatatype(operator);
				fieldsDataHolder.setUseCase("3");
				if (fieldsDataHolderImf.getAttributes() != null) {
					childfieldList = setIMFHideFalseToFieldsDataHolder(fieldsDataHolderImf.getAttributes());
				} else {
					childfieldList = null;
				}
				fieldsDataHolder.setAttributes(childfieldList);
				fieldsDataHolder.setFieldsType(fieldsDataHolderImf.getFieldsType());
				fieldList.add(fieldsDataHolder);
			}
		}
		return fieldList;
	}
}
