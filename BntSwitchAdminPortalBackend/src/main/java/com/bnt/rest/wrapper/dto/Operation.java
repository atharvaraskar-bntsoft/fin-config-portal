package com.bnt.rest.wrapper.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Operation {

	private boolean create;

	private boolean modify;

	private boolean view;

	private boolean delete;

	private boolean check;

	public Operation(boolean create, boolean modify, boolean view, boolean delete, boolean check) {
		super();
		this.create = create;
		this.modify = modify;
		this.view = view;
		this.delete = delete;
		this.check = check;
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

	public boolean isView() {
		return view;
	}

	public void setView(boolean view) {
		this.view = view;
	}

	public boolean isDelete() {
		return delete;
	}

	public void setDelete(boolean delete) {
		this.delete = delete;
	}

	public boolean isCheck() {
		return check;
	}

	public void setCheck(boolean check) {
		this.check = check;
	}

	@Override
	public String toString() {
		return "Operation [create=" + create + ", modify=" + modify + ", view=" + view + ", delete=" + delete
				+ ", check=" + check + "]";
	}
}
