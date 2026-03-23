package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "function_operation")
public class FunctionOperation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "sub_menu_function")
	private SubMenuFunction subMenuFunction;

	@Column(name = "view", nullable = false)
	private boolean view;

	@Column(name = "create", nullable = false)
	private boolean create;

	@Column(name = "modify", nullable = false)
	private boolean modify;

	@Column(name = "check", nullable = false)
	private boolean check;

	@Column(name = "delete", nullable = false)
	private boolean delete;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public SubMenuFunction getSubMenuFunction() {
		return subMenuFunction;
	}

	public void setSubMenuFunction(SubMenuFunction subMenuFunction) {
		this.subMenuFunction = subMenuFunction;
	}

	public boolean isView() {
		return view;
	}

	public void setView(boolean view) {
		this.view = view;
	}

	public boolean isCreate() {
		return create;
	}

	public void setCreate(boolean create) {
		this.create = create;
	}

	public boolean isModify() {
		return modify;
	}

	public void setModify(boolean modify) {
		this.modify = modify;
	}

	public boolean isCheck() {
		return check;
	}

	public void setCheck(boolean check) {
		this.check = check;
	}

	public boolean isDelete() {
		return delete;
	}

	public void setDelete(boolean delete) {
		this.delete = delete;
	}

	@Override
	public String toString() {
		return "FunctionOperation [id=" + id + ", subMenuFunction=" + subMenuFunction + ", view=" + view + ", create="
				+ create + ", modify=" + modify + ", check=" + check + ", delete=" + delete + "]";
	}
}
