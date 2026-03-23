package com.bnt.rest.dto;

import java.sql.Timestamp;

import com.bnt.rest.wrapper.dto.IdAndNameWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AuditLogDto {

	public class UserWrapper {

		private Integer id;

		private String name;

		private IdAndNameWrapper role;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public IdAndNameWrapper getRole() {
			return role;
		}

		public void setRole(IdAndNameWrapper role) {
			this.role = role;
		}
	}

	public class AuditEntityWrapper {

		private String text;

		private IdAndNameWrapper type;

		public IdAndNameWrapper getType() {
			return type;
		}

		public void setType(IdAndNameWrapper type) {
			this.type = type;
		}

		public String getText() {
			return text;
		}

		public void setText(String text) {
			this.text = text;
		}
	}

	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public AuditEntityWrapper getObject() {
		return object;
	}

	public void setObject(AuditEntityWrapper object) {
		this.object = object;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public UserWrapper getUser() {
		return user;
	}

	public void setUser(UserWrapper user) {
		this.user = user;
	}

	private Timestamp date;

	private AuditEntityWrapper object;
	private String action;
	private String description;
	private UserWrapper user;

	private String difference;

	public String getDifference() {
		return difference;
	}

	public void setDifference(String difference) {
		this.difference = difference;
	}
}
