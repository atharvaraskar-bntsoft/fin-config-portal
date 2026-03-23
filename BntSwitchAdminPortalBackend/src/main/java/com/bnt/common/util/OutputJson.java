package com.bnt.common.util;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class OutputJson {

	public List<MainAttributes> attributes;
//	public SubAttributes attribute;

	public List<MainAttributes> getAttributes() {
		return attributes;
	}

	public void setAttributes(List<MainAttributes> attributes) {
		this.attributes = attributes;
	}

//	public SubAttributes getAttribute() {
//		return attribute;
//	}
//
//	public void setAttribute(SubAttributes attribute) {
//		this.attribute = attribute;
//	}
}

class MainAttributes {
	String name;
	String type;
	String fieldsType;
	List<SubAttributes> attributes;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFieldsType() {
		return fieldsType;
	}

	public void setFieldsType(String fieldsType) {
		this.fieldsType = fieldsType;
	}

	public List<SubAttributes> getAttributes() {
		return attributes;
	}

	public void setAttributes(List<SubAttributes> attributes) {
		this.attributes = attributes;
	}
}

class SubAttributes /* extends Attributes */ {
	String name;
	String type;
	String fieldsType;
	List<ExAttribute> attributes;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFieldsType() {
		return fieldsType;
	}

	public void setFieldsType(String fieldsType) {
		this.fieldsType = fieldsType;
	}

	public List<ExAttribute> getAttributes() {
		return attributes;
	}

	public void setAttributes(List<ExAttribute> attributes) {
		this.attributes = attributes;
	}
}

class Attributes extends SubAttributes {
	String type;
	String alias;
	boolean isHide;
	String parent;
	String pattern;
	String fieldName;
	String fieldType;
	boolean isPersist;
	boolean isEditable;
	boolean isSensitive;
	public SubAttributes attribute;

	public boolean getIsEditable() {
		return isEditable;
	}

	public void setIsEditable(boolean isEditable) {
		this.isEditable = isEditable;
	}

	List<XmlAttributes> xmlAttributes;

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public boolean getIsHide() {
		return isHide;
	}

	public void setIsHide(boolean isHide) {
		this.isHide = isHide;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public boolean getIsPersist() {
		return isPersist;
	}

	public void setIsPersist(boolean isPersist) {
		this.isPersist = isPersist;
	}

	public boolean getIsSensitive() {
		return isSensitive;
	}

	public void setIsSensitive(boolean isSensitive) {
		this.isSensitive = isSensitive;
	}

	public List<XmlAttributes> getXmlAttributes() {
		return xmlAttributes;
	}

	public void setXmlAttributes(List<XmlAttributes> xmlAttributes) {
		this.xmlAttributes = xmlAttributes;
	}

	public SubAttributes getAttribute() {
		return attribute;
	}

	public void setAttribute(SubAttributes attribute) {
		this.attribute = attribute;
	}
}

class ExAttribute {
	String type;
	String alias;
	boolean isHide;
	String parent;
	String pattern;
	String fieldName;
	String fieldType;
	boolean isPersist;
	boolean isEditable;
	boolean isSensitive;

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public boolean getIsEditable() {
		return isEditable;
	}

	public void setIsEditable(boolean isEditable) {
		this.isEditable = isEditable;
	}

	public boolean getIsHide() {
		return isHide;
	}

	public void setIsHide(boolean isHide) {
		this.isHide = isHide;
	}

	public boolean getIsPersist() {
		return isPersist;
	}

	public void setIsPersist(boolean isPersist) {
		this.isPersist = isPersist;
	}

	public boolean getIsSensitive() {
		return isSensitive;
	}

	public void setIsSensitive(boolean isSensitive) {
		this.isSensitive = isSensitive;
	}
}

class XmlAttributes {
	String type;
	String alias;
	boolean isHide;
	String parent;
	String pattern;
	String fieldName;
	String fieldType;
	boolean isPersist;
	boolean isEditable;
	boolean isSensitive;

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public boolean getIsEditable() {
		return isEditable;
	}

	public void setIsEditable(boolean isEditable) {
		this.isEditable = isEditable;
	}

	public boolean getIsHide() {
		return isHide;
	}

	public void setIsHide(boolean isHide) {
		this.isHide = isHide;
	}

	public boolean getIsPersist() {
		return isPersist;
	}

	public void setIsPersist(boolean isPersist) {
		this.isPersist = isPersist;
	}

	public boolean getIsSensitive() {
		return isSensitive;
	}

	public void setIsSensitive(boolean isSensitive) {
		this.isSensitive = isSensitive;
	}
}
