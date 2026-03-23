package com.bnt.rest.wrapper.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class KeycloakTokenBody {

	@JsonProperty("client_id")
	private String clientId;

	@JsonProperty("scope")
	private String scope;

	@JsonProperty("grant_type")
	private String grantType;

	@JsonProperty("refresh_token")
	private String refreshToken;

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getGrantType() {
		return grantType;
	}

	public void setGrantType(String grantType) {
		this.grantType = grantType;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	@Override
	public String toString() {
		return "KeycloakTokenBody [client_id=" + clientId + ", scope=" + scope + ", grant_type=" + grantType
				+ ", refresh_token=" + refreshToken + "]";
	}
}
