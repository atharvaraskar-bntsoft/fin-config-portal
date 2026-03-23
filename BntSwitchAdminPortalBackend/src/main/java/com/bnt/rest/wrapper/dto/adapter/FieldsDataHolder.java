package com.bnt.rest.wrapper.dto.adapter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.bnt.rest.wrapper.dto.Operator;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FieldsDataHolder {

	@JsonAlias({ "fieldName" })
	private String name;

	private String type;

	private String alias;

	private String nestedName;

	private String useCase;

	private String datatype;

	private List<String> data;

	List<FieldsDataHolder> attributes;

	private List<Operator> operator;

	private String fieldsType;

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

	public List<FieldsDataHolder> getAttributes() {
		return attributes;
	}

	public void setAttributes(List<FieldsDataHolder> attributes) {
		this.attributes = attributes;
	}

	public String getUseCase() {
		return useCase;
	}

	public void setUseCase(String useCase) {
		this.useCase = useCase;
	}

	public List<String> getData() {
		return data;
	}

	public void setData(List<String> data) {
		this.data = data;
	}

	public String getDatatype() {
		return datatype;
	}

	public void setDatatype(String datatype) {
		this.datatype = datatype;
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

	public List<Operator> getOperator() {
		return operator;
	}

	public void setOperator(List<Operator> operator) {
		this.operator = operator;
	}

	@Override
	public String toString() {
		return "FieldsDataHolder [name=" + name + ", type=" + type + ", alias=" + alias + ", nestedName=" + nestedName
				+ ", useCase=" + useCase + ", datatype=" + datatype + ", data=" + data + ", attributes=" + attributes
				+ ", operator=" + operator + "]";
	}

	public String getFieldsType() {
		return fieldsType;
	}

	public void setFieldsType(String fieldsType) {
		this.fieldsType = fieldsType;
	}

}
