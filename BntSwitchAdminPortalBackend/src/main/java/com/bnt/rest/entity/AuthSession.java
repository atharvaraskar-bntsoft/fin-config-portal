package com.bnt.rest.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.bnt.common.util.annotations.ExcludeExportMarker;
import com.bnt.common.util.annotations.ExcludeLoggedEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "auth_session")
@ExcludeExportMarker
@ExcludeLoggedEntity
public class AuthSession extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Override
	public Integer getId() {
		return id;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "expiry_time", nullable = false)
	private Timestamp expireTime;

	@Column(name = "start_time", nullable = false)
	private Timestamp startTime;

	@Column(name = "token", nullable = false)
	private String token;

	@Column(name = "invalidated")
	private String invalidated;

	@Column(name = "refresh_token")
	private String refreshToken;

	@Column(name = "refresh_timeout")
	private Timestamp refreshTimeOut;

	public Timestamp getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(Timestamp expireTime) {
		this.expireTime = expireTime;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getInvalidated() {
		return invalidated;
	}

	public void setInvalidated(String invalidated) {
		this.invalidated = invalidated;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public Timestamp getRefreshTimeOut() {
		return refreshTimeOut;
	}

	public void setRefreshTimeOut(Timestamp refreshTimeOut) {
		this.refreshTimeOut = refreshTimeOut;
	}

	@Override
	public String toString() {
		return "AuthSession [expireTime=" + expireTime + ", startTime=" + startTime + ", token=" + token
				+ ", invalidated=" + invalidated + "]";
	}
}
