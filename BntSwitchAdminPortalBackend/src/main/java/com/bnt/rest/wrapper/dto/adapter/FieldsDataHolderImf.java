package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FieldsDataHolderImf/* extends FieldsDataHolder */ {

	private boolean isHide;

	@JsonAlias({ "fieldName" })
	private String name;

	private String type;

	private String alias;

	private String nestedName;

	private String useCase;

	@JsonAlias({ "fieldType" })
	private String datatype;

	private List<String> data;

	private List<FieldsDataHolderImf> attributes;

	private String fieldsType;

	public boolean getIsHide() {
		return isHide;
	}

	public void setIsHide(boolean isHide) {
		this.isHide = isHide;
	}

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

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getNestedName() {
		return nestedName;
	}

	public void setNestedName(String nestedName) {
		this.nestedName = nestedName;
	}

	public String getUseCase() {
		return useCase;
	}

	public void setUseCase(String useCase) {
		this.useCase = useCase;
	}

	public String getDatatype() {
		return datatype;
	}

	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}

	public List<String> getData() {
		return data;
	}

	public void setData(List<String> data) {
		this.data = data;
	}

	public List<FieldsDataHolderImf> getAttributes() {
		return attributes;
	}

	public void setAttributes(List<FieldsDataHolderImf> attributes) {
		this.attributes = attributes;
	}

	public String getFieldsType() {
		return fieldsType;
	}

	public void setFieldsType(String fieldsType) {
		this.fieldsType = fieldsType;
	}

}
