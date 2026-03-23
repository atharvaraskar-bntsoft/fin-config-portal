package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.bnt.common.util.CollectionUtil;
import com.bnt.rest.dto.DeviceDto;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.DeviceType;
import com.bnt.rest.service.impl.ListService.ConfigScheduleStatus;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ListMapper {

	private ListMapper() {
	}

	public static List<DeviceDto> mapResponse(List<Object> deviceList) {
		List<DeviceDto> deviceDtoList = new ArrayList<>();
		for (Object eachEntity : deviceList) {
			Object[] device = (Object[]) eachEntity;

			DeviceDto deviceDto = new DeviceDto();
			deviceDto.setId((Integer) device[0]);
			deviceDto.setCode((String) device[1]);

			Character status = (Character) device[2];
			deviceDto.setLocked(status);
			deviceDtoList.add(deviceDto);
		}
		return deviceDtoList;
	}

	public static List<String> getDeviceCodeListByDeviceType(DeviceType deviceType) {
		List<String> deviceListStr = null;
		List<Device> deviceList = null;
		if (deviceType != null) {
			deviceList = deviceType.getDeviceList();

			if (!(CollectionUtil.isCollectionEmptyOrNull(deviceList))) {
				deviceListStr = deviceList.stream().map(Device::getCode).toList();
			}
		}
		return deviceListStr;
	}

	public static List<DtoWrapper> getProcessingStatusList() {
		List<DtoWrapper> dtoWrapperList = new LinkedList<>();
		DtoWrapper dtoWrapper = null;
		dtoWrapper = new DtoWrapper();
		dtoWrapper.setId("2");
		dtoWrapper.setName("Approved");
		dtoWrapperList.add(dtoWrapper);

//		dtoWrapper = new DtoWrapper();
//		dtoWrapper.setId("1");
//		dtoWrapper.setName("In Progress");
//		dtoWrapperList.add(dtoWrapper);
		dtoWrapper = new DtoWrapper();
		dtoWrapper.setId("0");
		dtoWrapper.setName("Failed");
		dtoWrapperList.add(dtoWrapper);
		return dtoWrapperList;
	}

	public static List<IdAndNameStringWrapper> getOperatorList() {
		List<IdAndNameStringWrapper> withGreater = new ArrayList<>();
		withGreater.add(extractIdAndNameStringWrapper("equals", "Equals"));
		withGreater.add(extractIdAndNameStringWrapper("greater", "greater"));
		withGreater.add(extractIdAndNameStringWrapper("notequals", "Notequals"));
		withGreater.add(extractIdAndNameStringWrapper("less", "Less"));
		withGreater.add(extractIdAndNameStringWrapper("startswith", "Startswith"));
		return withGreater;
	}

	private static IdAndNameStringWrapper extractIdAndNameStringWrapper(String id, String name) {
		IdAndNameStringWrapper gender = new IdAndNameStringWrapper();
		gender.setId(id);
		gender.setName(name);
		return gender;
	}

	public static List<IdAndNameStringWrapper> getKeyList() {
		List<IdAndNameStringWrapper> uiDisplayFieldList = new ArrayList<>();
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("messageType", "Transaction Type"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("cardType", "Card Type"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("transactionAmount", "Txn Amount"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("merchantCategoryCode", "merchant CategoryCode"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("posEntryMode", "POS Entry"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("merchantId", "Merchant Code"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("tokenType", "Token Type"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("cardPrefix", "BIN Range"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("accountType", "Account Type"));
		uiDisplayFieldList.add(extractIdAndNameStringWrapper("cctiId", "CCTI-ID"));
		return uiDisplayFieldList;
	}

	public static List<DtoWrapper> getScheduleStatusList() {

		List<DtoWrapper> dtoWrapperList = new ArrayList<>();
		DtoWrapper dtoWrapper = null;
		dtoWrapper = new DtoWrapper();
		dtoWrapper.setId(ConfigScheduleStatus.SCHEDULED.name());
		dtoWrapper.setName(ConfigScheduleStatus.SCHEDULED.name());
		dtoWrapperList.add(dtoWrapper);
		dtoWrapper = new DtoWrapper();
		dtoWrapper.setId(ConfigScheduleStatus.DEPLOYED.name());
		dtoWrapper.setName(ConfigScheduleStatus.DEPLOYED.name());
		dtoWrapperList.add(dtoWrapper);
		dtoWrapper = new DtoWrapper();
		dtoWrapper.setId(ConfigScheduleStatus.PREDEPLOYED.name());
		dtoWrapper.setName(ConfigScheduleStatus.PREDEPLOYED.name());
		dtoWrapperList.add(dtoWrapper);
		return dtoWrapperList;
	}

	public static List<IdAndNameStringWrapper> getStatus() {
		List<IdAndNameStringWrapper> listWrapper = new ArrayList<>();
		listWrapper.add(extractIdAndNameStringWrapper("1", "Active"));
		listWrapper.add(extractIdAndNameStringWrapper("2", "Inactive"));
		return listWrapper;
	}
}
