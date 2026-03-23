package com.bnt.rest.dto;

import java.util.Date;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class NetworkResponseDto {

	private Integer id;

	private String scheme;

	private String requestinitiator;

	private String requesttype;

	private Date requestdatetime;

	private Date responsedatetime;

	private Date createdOn;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getScheme() {
		return scheme;
	}

	public void setScheme(String scheme) {
		this.scheme = scheme;
	}

	public String getRequestinitiator() {
		return requestinitiator;
	}

	public void setRequestinitiator(String requestinitiator) {
		this.requestinitiator = requestinitiator;
	}

	public String getRequesttype() {
		return requesttype;
	}

	public void setRequesttype(String requesttype) {
		this.requesttype = requesttype;
	}

	public Date getRequestdatetime() {
		return requestdatetime;
	}

	public void setRequestdatetime(Date requestdatetime) {
		this.requestdatetime = requestdatetime;
	}

	public Date getResponsedatetime() {
		return responsedatetime;
	}

	public void setResponsedatetime(Date responsedatetime) {
		this.responsedatetime = responsedatetime;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}
}
