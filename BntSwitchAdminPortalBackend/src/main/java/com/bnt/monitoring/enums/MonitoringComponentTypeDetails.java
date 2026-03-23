package com.bnt.monitoring.enums;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MonitoringComponentTypeDetails {

	public enum ComponentTypes {
		L1_TCP_SERVER,
		L1_TCP_CLIENT,
		L1_ISO,
		L1_AMEX,
		L3_TCP_SERVER,
		L3_TCP_CLIENT,
		L3_ISO,
		L1_HTTP_SERVER,
		L1_JSON,
		L3_HTTP_CLIENT,
		L3_JSON,
		CONFIG_LOADER,
		L2_CORE,
		HAZELCAST_SERVER,
		COMMON_API;
	}

	public enum L1ISOComponentType {
		L1_TCP_SERVER("L1TcpServerAllowedEndPoint"),
		L1_TCP_CLIENT("L1TcpClientAllowedEndPoint"),
		L1_ISO("L1TcpServerAllowedEndPoint"),
		L1_AMEX("L1AmexAllowedEndPoint");

		private String s1;

		private L1ISOComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L3ISOComponentType {
		L3_TCP_SERVER("L3TcpServerAllowedEndPoint"),
		L3_TCP_CLIENT("L3TcpClientAllowedEndPoint"),
		L3_ISO("L3TcpClientAllowedEndPoint");

		private String s1;

		private L3ISOComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L1JSONComponentType {
		L1_HTTP_SERVER("L1HttpServerAllowedEndPoint"),
		L1_JSON(("L1HttpServerAllowedEndPoint"));

		private String s1;

		private L1JSONComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L3JSONComponentType {
		L3_HTTP_CLIENT("L3HttpClientAllowedEndPoint"),
		L3_JSON("L3HttpClientAllowedEndPoint");

		private String s1;

		private L3JSONComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum ConfigLoaderComponentType {
		CONFIG_LOADER("ConfigLoaderAllowedEndPoint");

		private String s1;

		private ConfigLoaderComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum CommonApiComponentType {
		COMMON_API("CommonApiAllowedEndPoint");

		private String s1;

		private CommonApiComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L2CoreComponentType {
		L2_CORE("L2CoreAllowedEndPoint");

		private String s1;

		private L2CoreComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum HZServerComponentType {
		HAZELCAST_SERVER("HzServerAllowedEndPoint");

		private String s1;

		private HZServerComponentType(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L1TcpServerAllowedEndPoint {
		CONN_COUNT("CONN_COUNT"),
		CONNECTED_CLNT("CONNECTED_CLNT"),
		NET_REQ("NET_REQ"),
		CONN_ID("CONN_ID"),
		EXE_NET_REQ("EXE_NET_REQ"),
		CONN_DETAIL("CONN_DETAIL"),
		CONN_DETAILS("CONN_DETAILS"),
		TOOGLE_MANTNS("TOOGLE_MANTNS"),
		NET_ID("NET_ID"),
		NET_STATUS("NET_STATUS"),
		IS_SAFE_TO_KILL("IS_SAFE_TO_KILL"),
		INFLIGHT_TXN_COUNT("INFLIGHT_TXN_COUNT"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L1TcpServerAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L1TcpClientAllowedEndPoint {
		CONN_COUNT("CONN_COUNT"),
		CONNECTED_CLNT("CONNECTED_CLNT"),
		NET_REQ("NET_REQ"),
		CONN_ID("CONN_ID"),
		EXE_NET_REQ("EXE_NET_REQ"),
		CONN_DETAIL("CONN_DETAIL"),
		CONN_DETAILS("CONN_DETAILS"),
		TOOGLE_MANTNS("TOOGLE_MANTNS"),
		NET_ID("NET_ID"),
		NET_STATUS("NET_STATUS"),
		IS_SAFE_TO_KILL("IS_SAFE_TO_KILL"),
		INFLIGHT_TXN_COUNT("INFLIGHT_TXN_COUNT"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L1TcpClientAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L1AmexAllowedEndPoint {
		CONN_COUNT("CONN_COUNT"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L1AmexAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L3TcpServerAllowedEndPoint {
		CONN_COUNT("CONN_COUNT"),
		NET_REQ("NET_REQ"),
		CONN_ID("CONN_ID"),
		CONN_DETAIL("CONN_DETAIL"),
		CONN_DETAILS("CONN_DETAILS"),
		TOOGLE_MANTNS("TOOGLE_MANTNS"),
		EXE_NET_REQ("EXE_NET_REQ"),
		SEND_REQ("SEND_REQ"),
		NET_ID("NET_ID"),
		NET_STATUS("NET_STATUS"),
		IS_SAFE_TO_KILL("IS_SAFE_TO_KILL"),
		INFLIGHT_TXN_COUNT("INFLIGHT_TXN_COUNT"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L3TcpServerAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L3TcpClientAllowedEndPoint {
		CONN_COUNT("CONN_COUNT"),
		CONNECTED_CLNT("CONNECTED_CLNT"),
		NET_REQ("NET_REQ"),
		CONN_ID("CONN_ID"),
		EXE_NET_REQ("EXE_NET_REQ"),
		CONN_DETAIL("CONN_DETAIL"),
		CONN_DETAILS("CONN_DETAILS"),
		TOOGLE_MANTNS("TOOGLE_MANTNS"),
		NET_ID("NET_ID"),
		NET_STATUS("NET_STATUS"),
		IS_SAFE_TO_KILL("IS_SAFE_TO_KILL"),
		INFLIGHT_TXN_COUNT("INFLIGHT_TXN_COUNT"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L3TcpClientAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L1HttpServerAllowedEndPoint {
		CONN_COUNT("CONN_COUNT"),
		NET_ID("NET_ID"),
		IS_SAFE_TO_KILL("IS_SAFE_TO_KILL"),
		INFLIGHT_TXN_COUNT("INFLIGHT_TXN_COUNT"),
		CONG_PROPS("CONG_PROPS"),
		STOP_CONSUMERS("STOP_CONSUMERS"),
		START_CONSUMERS("START_CONSUMERS"),
		LATENCY_DETAILS("LATENCY_DETAILS"),
		CLS_LATENCY_DETAILS("CLS_LATENCY_DETAILS"),
		UPDATE_CONF_PROP("UPDATE_CONF_PROP"),
		SYS_SHUTDOWN_PROCESSED("SYS_SHUTDOWN_PROCESSED"),
//		EXE_NET_REQ("EXE_NET_REQ"),
//		CONN_DETAIL("CONN_DETAIL"),
//		CONN_DETAILS("CONN_DETAILS"),
//		TOOGLE_MANTNS("TOOGLE_MANTNS"),
//		NET_STATUS("NET_STATUS"),
//		CONNECTED_CLNT("CONNECTED_CLNT"),
//		NET_REQ("NET_REQ"),
//		CONN_ID("CONN_ID"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L1HttpServerAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L3HttpClientAllowedEndPoint {
		CONN_COUNT("CONN_COUNT"),
		CONNECTED_CLNT("CONNECTED_CLNT"),
		NET_REQ("NET_REQ"),
		CONN_ID("CONN_ID"),
		EXE_NET_REQ("EXE_NET_REQ"),
		CONN_DETAIL("CONN_DETAIL"),
		CONN_DETAILS("CONN_DETAILS"),
		TOOGLE_MANTNS("TOOGLE_MANTNS"),
		NET_ID("NET_ID"),
		NET_STATUS("NET_STATUS"),
		IS_SAFE_TO_KILL("IS_SAFE_TO_KILL"),
		INFLIGHT_TXN_COUNT("INFLIGHT_TXN_COUNT"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L3HttpClientAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum ConfigLoaderAllowedEndPoint {
		PROPS("PROPS"),
		PROPS_KEY_VALUE("PROPS_KEY_VALUE"),
		DECRYPT_DATA("DECRYPT_DATA"),
		ENCRYPT_DATA("ENCRYPT_DATA"),
		KILL_SAFELY("KILL_SAFELY"),
		READINESS("READINESS"),
		SECRET_MGR_LIST_SECRETS("SECRET_MGR_LIST_SECRETS"),
		SECRET_MGR_REF_VAL("SECRET_MGR_REF_VAL"),
		SECRET_MGR_WITH_NAME("SECRET_MGR_WITH_NAME"),
		SCHEDULE_SECRET_MGR_REF_VAL("SCHEDULE_SECRET_MGR_REF_VAL"),
		SCHEDULE_SECRET_MGR_REF_VAL_NAME("SCHEDULE_SECRET_MGR_REF_VAL_NAME"),
		SCHEDULE_SECRET_MGR_STATUS_WITH_NAME("SCHEDULE_SECRET_MGR_STATUS_WITH_NAME"),
		SCHEDULE_SECRET_MGR_NAME_DURATION("SCHEDULE_SECRET_MGR_NAME_DURATION"),
		SCHEDULE_SECRET_MGR_STATUS("SCHEDULE_SECRET_MGR_STATUS"),
		UNSCHEDULE_SECRET_MGR_REF_VAL("UNSCHEDULE_SECRET_MGR_REF_VAL"),
		UNSCHEDULE_SECRET_MGR_REF_VAL_NAME("UNSCHEDULE_SECRET_MGR_REF_VAL_NAME"),
		SERVICE_HTTP("SERVICE_HTTP"),
		HEALTH("HEALTH"),
		SHIPPABLE_STATUS("SHIPPABLE_STATUS"),
		MAPPING_LATENCY("MAPPING_LATENCY"),
		CLEAR_MAPPING_LATENCY("CLEAR_MAPPING_LATENCY"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private ConfigLoaderAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum CommonApiAllowedEndPoint {
		PROPS("PROPS"),
		PROPS_KEY_VALUE("PROPS_KEY_VALUE"),
		DECRYPT_DATA("DECRYPT_DATA"),
		ENCRYPT_DATA("ENCRYPT_DATA"),
		KILL_SAFELY("KILL_SAFELY"),
		READINESS("READINESS"),
		SECRET_MGR_LIST_SECRETS("SECRET_MGR_LIST_SECRETS"),
		SECRET_MGR_REF_VAL("SECRET_MGR_REF_VAL"),
		SECRET_MGR_WITH_NAME("SECRET_MGR_WITH_NAME"),
		SCHEDULE_SECRET_MGR_REF_VAL("SCHEDULE_SECRET_MGR_REF_VAL"),
		SCHEDULE_SECRET_MGR_REF_VAL_NAME("SCHEDULE_SECRET_MGR_REF_VAL_NAME"),
		SCHEDULE_SECRET_MGR_STATUS_WITH_NAME("SCHEDULE_SECRET_MGR_STATUS_WITH_NAME"),
		SCHEDULE_SECRET_MGR_NAME_DURATION("SCHEDULE_SECRET_MGR_NAME_DURATION"),
		SCHEDULE_SECRET_MGR_STATUS("SCHEDULE_SECRET_MGR_STATUS"),
		UNSCHEDULE_SECRET_MGR_REF_VAL("UNSCHEDULE_SECRET_MGR_REF_VAL"),
		UNSCHEDULE_SECRET_MGR_REF_VAL_NAME("UNSCHEDULE_SECRET_MGR_REF_VAL_NAME"),
		SERVICE_HTTP("SERVICE_HTTP"),
		HEALTH("HEALTH"),
		SHIPPABLE_STATUS("SHIPPABLE_STATUS"),
		MAPPING_LATENCY("MAPPING_LATENCY"),
		CLEAR_MAPPING_LATENCY("CLEAR_MAPPING_LATENCY"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		SYS_SHUTDOWN_PROCESSED("SYS_SHUTDOWN_PROCESSED"),
		STOP_CONSUMERS("STOP_CONSUMERS"),
		START_CONSUMERS("START_CONSUMERS"),
		NET_ID("NET_ID"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private CommonApiAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum HzServerAllowedEndPoint {
		HZ_MONITORING_DATA("HZ_MONITORING_DATA"),
		COMPONENT_PROFILE_MAPPING("COMPONENT_PROFILE_MAPPING"),
		HZ_PER_STATS("HZ_PER_STATS"),
		HZ_NEW_INST("HZ_NEW_INST"),
		HZ_SHUTDOWN_INST("HZ_SHUTDOWN_INST"),
		HZ_SAF_STATUS_MV_QUE("HZ_SAF_STATUS_MV_QUE"),
		HZ_SAF_BULK_STAUS_TO_QUE("HZ_SAF_BULK_STAUS_TO_QUE"),
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private HzServerAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}

	public enum L2CoreAllowedEndPoint {
		LOGGERS_DETAIL("LOGGERS_DETAIL"),
		LOGGERS_GET_LEVEL("LOGGERS_GET_LEVEL"),
		IS_SAFE_TO_KILL("IS_SAFE_TO_KILL"),
		LOGGERS_POST_LEVEL("LOGGERS_POST_LEVEL");

		private String s1;

		private L2CoreAllowedEndPoint(String s1) {
			this.s1 = s1;
		}

		public String getS1() {
			return s1;
		}

		public void setS1(String s1) {
			this.s1 = s1;
		}
	}
}
