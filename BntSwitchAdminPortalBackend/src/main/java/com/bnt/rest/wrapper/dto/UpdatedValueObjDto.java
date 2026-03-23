package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class UpdatedValueObjDto {

	private String columnName;

	private String oldValue;

	private String newValue;

	private String dataType;

	private String oldId;

	private String newId;

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getOldValue() {
		return oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

	public String getNewValue() {
		return newValue;
	}

	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getOldId() {
		return oldId;
	}

	public void setOldId(String oldId) {
		this.oldId = oldId;
	}

	public String getNewId() {
		return newId;
	}

	public void setNewId(String newId) {
		this.newId = newId;
	}

	@Override
	public String toString() {
		return "UpdatedValueObj [columnName=" + columnName + ", oldValue=" + oldValue + ", newValue=" + newValue
				+ ", dataType=" + dataType + ", oldId=" + oldId + ", newId=" + newId + "]";
	}
}
