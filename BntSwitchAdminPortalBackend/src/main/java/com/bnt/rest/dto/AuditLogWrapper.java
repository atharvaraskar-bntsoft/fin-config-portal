package com.bnt.rest.dto;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AuditLogWrapper {

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	int id;

	Date logIn;

	Date logOut;

	Map<String, Object> loginResult;

	int accessPoints;

	List<Map<String, String>> description;

	Map<String, Object> user;

	public Date getLogIn() {
		return logIn;
	}

	public void setLogIn(Date logIn) {
		this.logIn = logIn;
	}

	public Date getLogOut() {
		return logOut;
	}

	public void setLogOut(Date logOut) {
		this.logOut = logOut;
	}

	public int getAccessPoints() {
		return accessPoints;
	}

	public void setAccessPoints(int accessPoints) {
		this.accessPoints = accessPoints;
	}

	public List<Map<String, String>> getDescription() {
		return description;
	}

	public Map<String, Object> getLoginResult() {
		return loginResult;
	}

	public void setLoginResult(Map<String, Object> loginResult) {
		this.loginResult = loginResult;
	}

	public Map<String, Object> getUser() {
		return user;
	}

	public void setUser(Map<String, Object> user) {
		this.user = user;
	}

	public void setDescription(List<Map<String, String>> description) {
		this.description = description;
	}
}
