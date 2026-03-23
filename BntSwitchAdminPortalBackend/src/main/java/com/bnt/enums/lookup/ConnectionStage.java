package com.bnt.enums.lookup;

/**************************
 * @author vaibhav.shejol *
 **************************/

public enum ConnectionStage {
	NETWORK_LOGOFF("Network_Logoff"),
	NETWORK_LOGON("Network_Logon"),
	KEY_EXCHANGE("KEY_EXCHANGE"),
	LOGIN("Login"),
	ECHO("Echo"),
	CUT_OVER("Cut_Over"),
	ECHO_FAILED("ECHO_FAILED"),
	ECHO_SUCCESS("ECHO_SUCCESS");

	private final String sate;

	private ConnectionStage(String sate) {
		this.sate = sate;
	}

	public String getSate() {
		return this.sate;
	}
}
