package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class KeyDiffWrapper {

	private String columnName;

	private String oldValue;

	private String newValue;

	public KeyDiffWrapper(String key, String leftValue, String rightValue) {
		this.columnName = key;
		this.oldValue = leftValue;
		this.newValue = rightValue;

	}

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

	@Override
	public String toString() {
		return "UpdatedValueObj [columnName=" + columnName + ", oldValue=" + oldValue + ", newValue=" + newValue + "]";
	}
}
