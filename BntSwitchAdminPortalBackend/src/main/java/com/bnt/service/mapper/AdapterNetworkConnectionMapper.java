package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.NetworkUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.ConnectionStrategy;
import com.bnt.rest.wrapper.dto.adapter.NetworkConnection;
import com.bnt.rest.wrapper.dto.adapter.NetworkConnectionManagment;
import com.bnt.rest.wrapper.dto.adapter.NetworkDataCenter;
import com.bnt.rest.wrapper.dto.adapter.NetworkGroupConnection;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper;
import com.bnt.rest.wrapper.dto.adapter.NetworkPropertiesResponseWrapper.PropertiesWrapper;
import com.bnt.rest.wrapper.dto.adapter.StationGroupStrategy;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterNetworkConnectionMapper {

	private AdapterNetworkConnectionMapper() {
	}

	private static final String INVALID_CONNECTION_STRATEGY = "Invalid connection Strategy";

	private static final String STRING_CONST = "String";

	public static final String TCP_MODE_PROPERTIES = "tcp.mode";

	public static final String ALTERNATE_CONNECTION_PROPERTIES = "adapter.communication.rely.using.alternate.connection";

	public static final String CLIENT_CONNECTION_PROPERTIES = "tcp.communication.outtbound.connect.host.port";

	public static final String SERVER_CONNECTION_PROPERTIES = "tcp.communication.inbound.connect.port";

	public static final String CONNECTION_STRATEGY_PROPERTIES = "tcp.communication.connection.finder.strategy";

	public static final String CUSTUM_STRATEGY_PROPERTIES = "strategy.implementation.class.name";

	public static final String CONNECTION_GROUP_PROPERTIES = "server.connections.station.groups";

	public static final String INTRA_GROUP_STRATEGY = "processor.group.strategy.intera.group.strategy";

	public static final String GROUP_STRATEGY_PROPERTIES = "processor.group.strategy.inter.group.strategy";

	public static final String DC_PROPERTIES = "tcp.connections.dc.sites";

	public static final String LB_STATEGY_PROPERTIES = "processor.group.strategy.lb.group.strategy";

	public static final String DC_STRATEGY_PROPERTIES = "processor.group.strategy.intra.site.strategy";

	public static final String SERVER = "server";

	public static final String CLIENT = "client";

	public static final String MESSAGE = "message";

	public static final String NETWORK = "network";

	private static final Logger logger = LogManager.getLogger(AdapterNetworkConnectionMapper.class);

	public static NetworkConnectionManagment processConnections(AdapterUiResponseWrapper adapterUiResponseWrapper,
			NetworkPropertiesResponseWrapper networkProperties) {
		String messageStandard = adapterUiResponseWrapper.getMasterData().getAdapterDto()
				.getStandardMessageSpecification().getMessageStandard().getValue();
		if (messageStandard.contains(AdapterWrapperDtoMapper.ADAPTR_TYPE_ISO)
				&& !messageStandard.contains(AdapterWrapperDtoMapper.ADAPTR_TYPE_JSON)
				&& !messageStandard.contains(AdapterWrapperDtoMapper.ADAPTR_TYPE_SOAP)) {
			logger.info("inside processConnections for ISO Type adapter");
			if (networkProperties != null) {
				return getConnectionDetail(adapterUiResponseWrapper, networkProperties);
			} else {
				return null;
			}

		} else {
			logger.info("inside processConnections->done nothing as it is not ISO type");
			return null;
		}
	}

	public static boolean processConnectionsToProperties(AdapterUiResponseWrapper adapterUiResponseWrapper) {
		logger.info("inside processConnectionsToProperties");
		String messageStandard = HTMLInjectionUtil.validateHTMLInjection(adapterUiResponseWrapper.getMasterData()
				.getAdapterDto().getStandardMessageSpecification().getMessageStandard().getValue());
		String adapterType = HTMLInjectionUtil
				.validateHTMLInjection(adapterUiResponseWrapper.getMasterData().getAdapterDto().getType());
		if (!AdapterWrapperDtoMapper.ADAPTR_TYPE_ISO
				.equalsIgnoreCase(AdapterWrapperDtoMapper.getAdapterTypeByTemplateName(messageStandard))) {
			logger.info("inside processConnections: adapter is not ISO type, Hence returning");
			return true;
		}
		if (!"1".equalsIgnoreCase(adapterUiResponseWrapper.getNetworkData().getPersistRequired())) {
			return true;
		}

		String tcpMode = HTMLInjectionUtil.validateHTMLInjection(
				getTcpMode(adapterUiResponseWrapper.getNetworkData().getProperties().getNetwork()));
		if (!StringUtil.isNotNullOrBlank(tcpMode)) {
			throw new RippsAdminException("TCP Mode is mandatory");
		}
		NetworkConnectionManagment networkConnectionManagment = adapterUiResponseWrapper.getNetworkData()
				.getConnectionManagement();
		if (networkConnectionManagment == null || networkConnectionManagment.getConnections() == null
				|| networkConnectionManagment.getConnections().isEmpty()) {
			throw new RippsAdminException("Connection details are mandatory");
		}
		if (messageStandard.contains(AdapterWrapperDtoMapper.ADAPTR_TYPE_ISO)
				&& !messageStandard.contains(AdapterWrapperDtoMapper.ADAPTR_TYPE_JSON)
				&& !messageStandard.contains(AdapterWrapperDtoMapper.ADAPTR_TYPE_SOAP)) {
			logger.info("inside processConnectionsToProperties for ISO Type adapter");
			List<PropertiesWrapper> messageNcm = new ArrayList<>();
			List<PropertiesWrapper> networkNcm = new ArrayList<>();
			getConvertedProperties(networkConnectionManagment, tcpMode, adapterType, networkNcm, messageNcm);
			if (!networkNcm.isEmpty()) {
				adapterUiResponseWrapper.getNetworkData().getProperties().getNetwork().addAll(networkNcm);
			}
			if (!messageNcm.isEmpty()) {
				adapterUiResponseWrapper.getNetworkData().getProperties().getMessage().addAll(networkNcm);
			}

		} else {
			logger.info("inside processConnections->done nothing as it is not ISO type");
		}
		return false;
	}

	public static String getTcpMode(List<PropertiesWrapper> properties) {
		if (properties != null && !properties.isEmpty()) {
			for (PropertiesWrapper each : properties) {
				if (TCP_MODE_PROPERTIES.equalsIgnoreCase(each.getField())) {
					if (SERVER.equalsIgnoreCase((String) each.getValue())
							|| CLIENT.equalsIgnoreCase((String) each.getValue())) {
						return (String) each.getValue();
					} else {
						throw new RippsAdminException("Invalid TCP Mode");
					}
				}
			}
		}
		return null;
	}

	public static void getConvertedProperties(NetworkConnectionManagment networkConnectionManagment, String tcpMode,
			String adapterType, List<PropertiesWrapper> network, List<PropertiesWrapper> message) {
		PropertiesWrapper connectionDetailsProperties = getNetworkConnectionString(
				networkConnectionManagment.getConnections(), tcpMode);
		network.add(connectionDetailsProperties);
		if (AdapterWrapperDtoMapper.ADAPTR_TYPE_L3.equalsIgnoreCase(adapterType)) {
			ConnectionStrategy cs = networkConnectionManagment.getStrategyConnections();
			if (cs != null) {
				getConnectionStrategyPropeties(cs, tcpMode, adapterType, network, message);
			} else {
				throw new RippsAdminException(INVALID_CONNECTION_STRATEGY);
			}
		}
		if (CLIENT.equalsIgnoreCase(tcpMode) && AdapterWrapperDtoMapper.ADAPTR_TYPE_L1.equalsIgnoreCase(adapterType)) {
			PropertiesWrapper alternateConnectionProperties = getAlternateConnectionProperty(
					networkConnectionManagment.getAlternateConnection(), tcpMode, adapterType);
			network.add(alternateConnectionProperties);
		}
	}

	public static void getConnectionStrategyPropeties(ConnectionStrategy cs, String tcpMode, String adapterType,
			List<PropertiesWrapper> network, List<PropertiesWrapper> message) {
		logger.info("inside getConnectionStrategyPropeties:{} : {}", tcpMode, adapterType);
		PropertiesWrapper connectionStrategyProperty = getConnectionStrategyProperty(cs.getStrategyConnections());
		network.add(connectionStrategyProperty);
		if ("STATION_GROUPS".equalsIgnoreCase(cs.getStrategyConnections())) {
			List<PropertiesWrapper> stationGroupStrategyPropertiesList = getStationGroupStrategyPropertiesList(
					cs.getStationGroupStrategy());
			network.addAll(stationGroupStrategyPropertiesList);
			if ("Y".equalsIgnoreCase(cs.getStationGroupStrategy().getInMessage())) {
				message.addAll(stationGroupStrategyPropertiesList);
			}
		} else if ("CUSTOM".equalsIgnoreCase(cs.getStrategyConnections())) {
			PropertiesWrapper custumStrategyProperties = getCustumStrategyProperties(cs.getCustumStrategy());
			network.add(custumStrategyProperties);
		}
		logger.info("completed getConnectionStrategyPropeties");
	}

	public static NetworkPropertiesResponseWrapper filterNetworPropertiesList(
			AdapterUiResponseWrapper adapterUiResponseWrapper, Map<String, Object> dataMap,
			NetworkPropertiesResponseWrapper networkPropertiesResponseWrapper) {
		logger.info("inside filterNetworProperties");
		String adapterType = adapterUiResponseWrapper.getMasterData().getAdapterDto().getType();
		List<PropertiesWrapper> message = networkPropertiesResponseWrapper.getMessage();
		List<PropertiesWrapper> network = networkPropertiesResponseWrapper.getNetwork();
		List<PropertiesWrapper> messageFiltered = new ArrayList<>();
		List<PropertiesWrapper> networkFiltered = new ArrayList<>();

		getPropertyDataMap(message, MESSAGE, messageFiltered, adapterType, dataMap);
		getPropertyDataMap(network, NETWORK, networkFiltered, adapterType, dataMap);

		networkPropertiesResponseWrapper.setNetwork(networkFiltered);
		networkPropertiesResponseWrapper.setMessage(messageFiltered);
		logger.info("completed filterNetworProperties");
		return networkPropertiesResponseWrapper;
	}

	public static void getPropertyDataMap(List<PropertiesWrapper> data, String type, List<PropertiesWrapper> resultData,
			String adapterType, Map<String, Object> dataPropertiesMap) {
		logger.info("inside getPropertyDataMap for type : {} :{}", type, adapterType);
		if (data != null && !data.isEmpty()) {
			List<String> conectionPropertiesList = Arrays.asList(TCP_MODE_PROPERTIES, CONNECTION_STRATEGY_PROPERTIES,
					ALTERNATE_CONNECTION_PROPERTIES, CONNECTION_GROUP_PROPERTIES, CUSTUM_STRATEGY_PROPERTIES,
					DC_PROPERTIES, DC_STRATEGY_PROPERTIES, GROUP_STRATEGY_PROPERTIES, LB_STATEGY_PROPERTIES,
					SERVER_CONNECTION_PROPERTIES, CLIENT_CONNECTION_PROPERTIES, INTRA_GROUP_STRATEGY);

			data.stream().forEach(each -> {
				if (conectionPropertiesList.contains(each.getField())) {
					if (NETWORK.equalsIgnoreCase(type) && TCP_MODE_PROPERTIES.equalsIgnoreCase(each.getField())) {
						resultData.add(each);
					}
					dataPropertiesMap.put(type + "~" + each.getField(), each.getValue());
				} else {
					resultData.add(each);
				}
			});
		}
		logger.info("completed getPropertyDataMap");
	}

	public static NetworkConnectionManagment getConnectionDetail(AdapterUiResponseWrapper adapterUiResponseWrapper,
			NetworkPropertiesResponseWrapper networkProperties) {
		logger.info("inside getConnectionDetail");
		Map<String, Object> dataMap = new HashMap<>();
		filterNetworPropertiesList(adapterUiResponseWrapper, dataMap, networkProperties);
		if (dataMap.size() > 0) {
			return getNetworkConnectionManagment(adapterUiResponseWrapper, dataMap);
		}
		return null;
	}

	public static NetworkConnectionManagment getNetworkConnectionManagment(
			AdapterUiResponseWrapper adapterUiResponseWrapper, Map<String, Object> dataMap) {
		logger.info("inside getNetworkConnectionManagment");
		String adapterType = adapterUiResponseWrapper.getMasterData().getAdapterDto().getType();
		String tcpMode = (String) dataMap.get(NETWORK + "~" + TCP_MODE_PROPERTIES);
		if (!StringUtil.isNotNullOrBlank(tcpMode)) {
			logger.info("TCP Mode not found hence returing from here");
		}
		NetworkConnectionManagment ncm = new NetworkConnectionManagment();
		List<NetworkConnection> networkConnectionList = getNetworkConnectionList(dataMap, tcpMode);
		ConnectionStrategy cs = getConnectionStrategy(dataMap, tcpMode, adapterType);
		ncm.setConnections(networkConnectionList);
		ncm.setStrategyConnections(cs);
		if (CLIENT.equalsIgnoreCase(tcpMode) && AdapterWrapperDtoMapper.ADAPTR_TYPE_L1.equalsIgnoreCase(adapterType)) {
			ncm.setAlternateConnection(getAlternateConnectionData(dataMap, tcpMode, adapterType));
		}
		return ncm;
	}

	public static List<NetworkConnection> getNetworkConnectionList(Map<String, Object> dataMap, String tcpMode) {
		logger.info("inside getNetworkConnectionList");
		List<NetworkConnection> networkConnectionList = new ArrayList<>();
		String conectionListData = null;
		if (SERVER.equalsIgnoreCase(tcpMode)) {
			conectionListData = (String) dataMap.get(NETWORK + "~" + SERVER_CONNECTION_PROPERTIES);
			if (StringUtil.isNotNullOrBlank(conectionListData)) {
				String[] networkData = conectionListData.split(",", -1);
				for (String conectionData : networkData) {
					networkConnectionList.add(getNetworkConnectionServerList(conectionData));
				}
			}
		} else if (CLIENT.equalsIgnoreCase(tcpMode)) {
			conectionListData = (String) dataMap.get(NETWORK + "~" + CLIENT_CONNECTION_PROPERTIES);
			if (StringUtil.isNotNullOrBlank(conectionListData)) {
				String[] networkData = conectionListData.split(",", -1);
				for (String conectionData : networkData) {
					networkConnectionList.add(getNetworkConnectionCLientList(conectionData));
				}
			}
		}
		return networkConnectionList;
	}

	public static NetworkConnection getNetworkConnectionServerList(String conectionData) {
		NetworkConnection networkConnection = new NetworkConnection();
		String[] networkData = conectionData.split(":", 2);
		networkConnection.setConnection(networkData[0]);

		String[] networkData2 = networkData[1].split("#", -1);
		networkConnection.setPort(networkData2[0]);
		networkConnection.setLabel((networkData2[1]));
		networkConnection.setTimeOut((networkData2[2]));

		return networkConnection;
	}

	public static NetworkConnection getNetworkConnectionCLientList(String conectionData) {
		NetworkConnection networkConnection = new NetworkConnection();
		String[] networkData = conectionData.split(":", 2);
		networkConnection.setConnection(networkData[0]);

		String[] networkData2 = networkData[1].split("#", -1);
		networkConnection.setIp(networkData2[0]);
		networkConnection.setPort(networkData2[1]);
		networkConnection.setLabel((networkData2[2]));
		networkConnection.setTimeOut((networkData2[3]));

		return networkConnection;
	}

	public static String getNetworkConnectionClientString(NetworkConnection networkConnection) {
		if (StringUtil.isEmptyOrNull(networkConnection.getConnection())) {
			throw new RippsAdminException("Invalid Connection Name");
		}
		if (StringUtil.isEmptyOrNull(NetworkUtil.resolveIp(networkConnection.getIp()))) {
			throw new RippsAdminException("Invalid IP:" + networkConnection.getIp());
		}
		if (StringUtil.isEmptyOrNull(NetworkUtil.resolvePort(networkConnection.getPort()))) {
			throw new RippsAdminException("Invalid port:" + networkConnection.getPort());
		}
		return HTMLInjectionUtil.validateHTMLInjection(networkConnection.getConnection() + ":"
				+ networkConnection.getIp() + "#" + networkConnection.getPort() + "#"
				+ (StringUtil.isNotNullOrBlank(networkConnection.getLabel()) ? networkConnection.getLabel() : "") + "#"
				+ (StringUtil.isNotNullOrBlank(networkConnection.getTimeOut()) ? networkConnection.getTimeOut() : ""));
	}

	public static String getNetworkConnectionServerString(NetworkConnection networkConnection) {
		if (StringUtil.isEmptyOrNull(networkConnection.getConnection())) {
			throw new RippsAdminException("Invalid Connection Name");
		}
		if (StringUtil.isEmptyOrNull(NetworkUtil.resolvePort(networkConnection.getPort()))) {
			throw new RippsAdminException("Invalid port:" + networkConnection.getPort());
		}
		return HTMLInjectionUtil.validateHTMLInjection(networkConnection.getConnection() + ":"
				+ networkConnection.getPort() + "#"
				+ (StringUtil.isNotNullOrBlank(networkConnection.getLabel()) ? networkConnection.getLabel() : "") + "#"
				+ (StringUtil.isNotNullOrBlank(networkConnection.getTimeOut()) ? networkConnection.getTimeOut() : ""));
	}

	public static PropertiesWrapper getNetworkConnectionString(List<NetworkConnection> networkConnectionList,
			String tcpMode) {
		logger.info("inside getNetworkConnectionList");
		PropertiesWrapper propertiesWrapper = null;
		if (networkConnectionList != null && !networkConnectionList.isEmpty()) {
			String singleConectionString = null;
			StringBuilder conectionString = new StringBuilder();
			for (NetworkConnection networkConnection : networkConnectionList) {
				if (SERVER.equalsIgnoreCase(tcpMode)) {
					singleConectionString = getNetworkConnectionServerString(networkConnection);
				} else if (CLIENT.equalsIgnoreCase(tcpMode)) {
					singleConectionString = getNetworkConnectionClientString(networkConnection);
				}
				if (conectionString.length() > 1) {
					conectionString.append(",");
				}
				conectionString.append(singleConectionString);
			}
			propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(conectionString.toString());
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);

			if (SERVER.equalsIgnoreCase(tcpMode)) {
				propertiesWrapper.setField(SERVER_CONNECTION_PROPERTIES);
				propertiesWrapper.setLabel("Server connection details");
			} else if (CLIENT.equalsIgnoreCase(tcpMode)) {
				propertiesWrapper.setField(CLIENT_CONNECTION_PROPERTIES);
				propertiesWrapper.setLabel("Client connection details");
			}
		} else {
			throw new RippsAdminException("Invalid connection");
		}
		return propertiesWrapper;
	}

	public static ConnectionStrategy getConnectionStrategy(Map<String, Object> dataMap, String tcpMode,
			String adapterType) {
		String connectionStrategy = (String) dataMap.get(NETWORK + "~" + CONNECTION_STRATEGY_PROPERTIES);
		ConnectionStrategy cs = new ConnectionStrategy();
		cs.setStrategyConnections(connectionStrategy);
		if ("STATION_GROUPS".equalsIgnoreCase(cs.getStrategyConnections())) {
			StationGroupStrategy sgs = getStationGroupStrategy(dataMap, tcpMode, adapterType);
			cs.setStationGroupStrategy(sgs);
		} else if ("CUSTOM".equalsIgnoreCase(cs.getStrategyConnections())) {
			String customStrategy = (String) dataMap.get(NETWORK + "~" + CUSTUM_STRATEGY_PROPERTIES);
			cs.setCustumStrategy(customStrategy);
		}
		return cs;
	}

	public static PropertiesWrapper getConnectionStrategyProperty(String connectionStrategy) {
		logger.info("inside getConnectionStrategyProperty");
		PropertiesWrapper propertiesWrapper = null;
		if (StringUtil.isNotNullOrBlank(connectionStrategy)) {
			propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(connectionStrategy);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(CONNECTION_STRATEGY_PROPERTIES);
			propertiesWrapper.setLabel("TCP Connection Strategy");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
		} else {
			logger.info(INVALID_CONNECTION_STRATEGY);
			throw new RippsAdminException(INVALID_CONNECTION_STRATEGY);
		}
		logger.info("completed getConnectionStrategyProperty");
		return propertiesWrapper;
	}

	public static String getAlternateConnectionData(Map<String, Object> dataMap, String tcpMode, String adapterType) {
		String alternateConnectionData = "N";
		if (CLIENT.equalsIgnoreCase(tcpMode) && AdapterWrapperDtoMapper.ADAPTR_TYPE_L1.equalsIgnoreCase(adapterType)) {
			Object data = dataMap.get(NETWORK + "~" + ALTERNATE_CONNECTION_PROPERTIES);
			if (data instanceof Boolean) {
				return ((boolean) dataMap.get(NETWORK + "~" + ALTERNATE_CONNECTION_PROPERTIES)) ? "Y" : "N";
			}
		}
		return alternateConnectionData;
	}

	public static PropertiesWrapper getAlternateConnectionProperty(String alterNateConnection, String tcpMode,
			String adapterType) {
		logger.info("inside getAlternateConnectionProperty");
		if (CLIENT.equalsIgnoreCase(tcpMode) && AdapterWrapperDtoMapper.ADAPTR_TYPE_L1.equalsIgnoreCase(adapterType)) {
			if (StringUtil.isNotNullOrBlank(alterNateConnection)) {
				PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
				propertiesWrapper.setValue(
						("Y".equalsIgnoreCase(alterNateConnection) || "1".equalsIgnoreCase(alterNateConnection)));
				propertiesWrapper.setMandatory(true);
				propertiesWrapper.setField(ALTERNATE_CONNECTION_PROPERTIES);
				propertiesWrapper.setLabel("Alternate connection");
				propertiesWrapper.setHidden(false);
				propertiesWrapper.setDatatype(STRING_CONST);
				logger.info("completed getAlternateConnectionProperty");
				return propertiesWrapper;
			} else {
				logger.info(INVALID_CONNECTION_STRATEGY);
				throw new RippsAdminException(INVALID_CONNECTION_STRATEGY);
			}
		} else {
			logger.info("alternateConnectionProperty not applicable other than tcpMode Client & L1 adapter");
		}
		return null;
	}

	public static PropertiesWrapper getCustumStrategyProperties(String data) {
		if (StringUtil.isNotNullOrBlank(data)) {
			PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(data);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(CUSTUM_STRATEGY_PROPERTIES);
			propertiesWrapper.setLabel("Custum Strategy");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
			return propertiesWrapper;
		} else {
			logger.info("Invalid Custum Strategy");
			throw new RippsAdminException("Invalid Custum Strategy");
		}
	}

	public static String getStrategyGroups(Map<String, Object> dataMap) {
		return (String) dataMap.get(NETWORK + "~" + GROUP_STRATEGY_PROPERTIES);
	}

	public static String getStrategyIntraGroups(Map<String, Object> dataMap) {
		return (String) dataMap.get(NETWORK + "~" + INTRA_GROUP_STRATEGY);
	}

	public static String getStrategyLB(Map<String, Object> dataMap) {
		return (String) dataMap.get(NETWORK + "~" + LB_STATEGY_PROPERTIES);
	}

	public static String getStrategyDC(Map<String, Object> dataMap) {
		return (String) dataMap.get(NETWORK + "~" + DC_STRATEGY_PROPERTIES);
	}

	public static PropertiesWrapper getStrategyGroupsProperties(String data) {
		if (StringUtil.isNotNullOrBlank(data)) {
			PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(data);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(GROUP_STRATEGY_PROPERTIES);
			propertiesWrapper.setLabel("Group Strategy");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
			return propertiesWrapper;
		} else {
			logger.info("Invalid Group Strategy");
			throw new RippsAdminException("Invalid Group Strategy");
		}
	}

	public static PropertiesWrapper getStrategyIntraGroupsProperties(String data) {
		if (StringUtil.isNotNullOrBlank(data)) {
			PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(data);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(INTRA_GROUP_STRATEGY);
			propertiesWrapper.setLabel("Intra-Group Strategy");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
			return propertiesWrapper;
		} else {
			logger.info("Invalid Intra-Group Strategy");
			throw new RippsAdminException("Invalid Intra-Group Strategy");
		}
	}

	public static PropertiesWrapper getStrategyLBProperties(String data) {
		if (StringUtil.isNotNullOrBlank(data)) {
			PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(data);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(LB_STATEGY_PROPERTIES);
			propertiesWrapper.setLabel("Load-Balacer Strategy");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
			return propertiesWrapper;
		} else {
			logger.info("Invalid Load-Balacer Strategy");
			throw new RippsAdminException("Invalid Load-Balacer Strategy");
		}
	}

	public static PropertiesWrapper getStrategyDCProperties(String data) {
		if (StringUtil.isNotNullOrBlank(data)) {
			PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(data);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(DC_STRATEGY_PROPERTIES);
			propertiesWrapper.setLabel("Data-Center Strategy");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
			return propertiesWrapper;
		} else {
			logger.info("Invalid Data-Center Strategy");
			throw new RippsAdminException("Invalid Data-Center Strategy");
		}
	}

	public static StationGroupStrategy getStationGroupStrategy(Map<String, Object> dataMap, String tcpMode,
			String adapterType) {
		logger.info("getStationGroupStrategy:{}:{}", tcpMode, adapterType);
		StationGroupStrategy stationGroupStrategy = new StationGroupStrategy();
		List<String> loadBalanceList = new ArrayList<>();
		stationGroupStrategy.setDataCenters(getNetworkDataCenterList(dataMap, loadBalanceList));
		stationGroupStrategy.setGroupConnections(getNetworkGroupConnectionList(dataMap, loadBalanceList));

		if (null != dataMap.get(MESSAGE + "~" + CONNECTION_GROUP_PROPERTIES)) {
			stationGroupStrategy.setInMessage("Y");
		}
		stationGroupStrategy.setStrategyLoadBalancers(getStrategyLB(dataMap));
		stationGroupStrategy.setStrategyGroups(getStrategyGroups(dataMap));
		stationGroupStrategy.setStrategyIntraGroups(getStrategyIntraGroups(dataMap));
		stationGroupStrategy.setStrategyDataCenter(getStrategyDC(dataMap));
		return stationGroupStrategy;
	}

	public static List<PropertiesWrapper> getStationGroupStrategyPropertiesList(
			StationGroupStrategy stationGroupStrategy) {
		PropertiesWrapper networkGroupConnectionProperties = getNetworkGroupConnectionProperties(
				stationGroupStrategy.getGroupConnections());
		PropertiesWrapper networkDataCenterProperties = getNetworkDataCenterProperties(
				stationGroupStrategy.getDataCenters());
		PropertiesWrapper strategyGroupsProperties = getStrategyGroupsProperties(
				stationGroupStrategy.getStrategyGroups());
		PropertiesWrapper strategyIntraGroupsProperties = getStrategyIntraGroupsProperties(
				stationGroupStrategy.getStrategyIntraGroups());
		PropertiesWrapper strategyLBProperties = getStrategyLBProperties(
				stationGroupStrategy.getStrategyLoadBalancers());
		PropertiesWrapper strategyDCProperties = getStrategyDCProperties(stationGroupStrategy.getStrategyDataCenter());

		List<PropertiesWrapper> stationGroupStrategyPropertiesList = new ArrayList<>();
		stationGroupStrategyPropertiesList.add(networkGroupConnectionProperties);
		stationGroupStrategyPropertiesList.add(strategyGroupsProperties);
		stationGroupStrategyPropertiesList.add(strategyIntraGroupsProperties);
		stationGroupStrategyPropertiesList.add(networkDataCenterProperties);
		stationGroupStrategyPropertiesList.add(strategyLBProperties);
		stationGroupStrategyPropertiesList.add(strategyDCProperties);
		return stationGroupStrategyPropertiesList;
	}

	public static List<NetworkDataCenter> getNetworkDataCenterList(Map<String, Object> dataMap,
			List<String> loadBalanceList) {
		List<NetworkDataCenter> networkDataCenterList = null;
		String dataCenterProperties = (String) dataMap.get(NETWORK + "~" + DC_PROPERTIES);
		if (StringUtil.isNotNullOrBlank(dataCenterProperties)) {
			networkDataCenterList = new ArrayList<>();
			String[] networkDCDataArray = dataCenterProperties.split(",", -1);
			for (String dcData : networkDCDataArray) {
				networkDataCenterList.add(getNetworkDataCenter(dcData, loadBalanceList));
			}
		}
		return networkDataCenterList;
	}

	public static NetworkDataCenter getNetworkDataCenter(String dcData, List<String> loadBalanceList) {
		NetworkDataCenter networkDataCenter = null;
		if (StringUtil.isNotNullOrBlank(dcData)) {
			networkDataCenter = new NetworkDataCenter();
			String[] dcDataArray = dcData.split(":", -1);
			networkDataCenter.setDataCenter(dcDataArray[0]);

			String[] dcDataArray2 = dcDataArray[1].split("#", -1);
			networkDataCenter.setLoadBalancer(dcDataArray2[0]);
			if (StringUtil.isNotNullOrBlank(networkDataCenter.getLoadBalancer())) {
				loadBalanceList.add(networkDataCenter.getLoadBalancer());
			}
			networkDataCenter.setGroup(Arrays.asList(Arrays.copyOfRange(dcDataArray2, 1, dcDataArray2.length)));
		}
		return networkDataCenter;
	}

	public static PropertiesWrapper getNetworkDataCenterProperties(List<NetworkDataCenter> dataCenters) {
		StringBuilder conectionString = new StringBuilder();
		for (NetworkDataCenter each : dataCenters) {
			if (conectionString.length() > 1) {
				conectionString.append(",");
			}
			conectionString.append(each.getDataCenter() + ":"
					+ (StringUtil.isNotNullOrBlank(each.getLoadBalancer()) ? each.getLoadBalancer() : "") + "#"
					+ each.getGroup().stream().collect(Collectors.joining("#")));
		}
		String dataCenterProperties = conectionString.toString();
		if (StringUtil.isNotNullOrBlank(dataCenterProperties)) {
			PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(dataCenterProperties);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(DC_PROPERTIES);
			propertiesWrapper.setLabel("Data Centers");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
			return propertiesWrapper;
		} else {
			logger.info("Invalid Data Center");
			throw new RippsAdminException("Invalid Data Center");
		}
	}

	public static List<NetworkGroupConnection> getNetworkGroupConnectionList(Map<String, Object> dataMap,
			List<String> loadBalanceList) {
		List<NetworkGroupConnection> groupConnections = null;
		String dataNetworkGroupConnectionProperties = (String) dataMap.get(NETWORK + "~" + CONNECTION_GROUP_PROPERTIES);
		if (StringUtil.isNotNullOrBlank(dataNetworkGroupConnectionProperties)) {
			groupConnections = new ArrayList<>();
			String[] networkDCDataArray = dataNetworkGroupConnectionProperties.split(",", -1);
			for (String dcData : networkDCDataArray) {
				groupConnections.add(getNetworkGroupConnection(dcData, loadBalanceList));
			}
		}
		return groupConnections;
	}

	public static NetworkGroupConnection getNetworkGroupConnection(String networkGroupConnectionString,
			List<String> loadBalanceList) {
		NetworkGroupConnection networkGroupConnection = null;
		if (StringUtil.isNotNullOrBlank(networkGroupConnectionString)) {
			networkGroupConnection = new NetworkGroupConnection();
			String[] groupDataArray = networkGroupConnectionString.split(":", -1);
			networkGroupConnection.setGroup(groupDataArray[0]);

			String[] groupDataArray2 = groupDataArray[1].split("#", -1);
			networkGroupConnection.setConnections(Arrays.asList(groupDataArray2));

			if (loadBalanceList.contains(networkGroupConnection.getGroup())) {
				networkGroupConnection.setIsLBGroup("Y");
			}
		}
		return networkGroupConnection;
	}

	public static PropertiesWrapper getNetworkGroupConnectionProperties(List<NetworkGroupConnection> groupConnections) {
		StringBuilder conectionString = new StringBuilder();
		for (NetworkGroupConnection each : groupConnections) {
			if (conectionString.length() > 1) {
				conectionString.append(",");
			}
			conectionString
					.append(each.getGroup() + ":" + each.getConnections().stream().collect(Collectors.joining("#")));
		}
		String groupConnectionsProperties = conectionString.toString();
		if (StringUtil.isNotNullOrBlank(groupConnectionsProperties)) {
			PropertiesWrapper propertiesWrapper = new PropertiesWrapper();
			propertiesWrapper.setValue(groupConnectionsProperties);
			propertiesWrapper.setMandatory(true);
			propertiesWrapper.setField(CONNECTION_GROUP_PROPERTIES);
			propertiesWrapper.setLabel("Connection Group");
			propertiesWrapper.setHidden(false);
			propertiesWrapper.setDatatype(STRING_CONST);
			return propertiesWrapper;
		} else {
			logger.info(INVALID_CONNECTION_STRATEGY);
			throw new RippsAdminException("Invalid connection group");
		}
	}
}
