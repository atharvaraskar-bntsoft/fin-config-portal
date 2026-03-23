package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "rule_operator")
public class RuleOperator {

	@Id
	@Column(name = "id", nullable = false)
	private int id;

	@Column(name = "text_label", nullable = false)
	private String text;

	@Column(name = "text_value", nullable = false)
	private String value;

	public String getText() {
		return text;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
