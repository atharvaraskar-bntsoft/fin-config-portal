package com.bnt.service.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndNameCodeWrapper;
import com.bnt.rest.wrapper.dto.IdAndNameWrapper;
import com.bnt.rest.wrapper.dto.IdAndVersionWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class GenericMapper {

	private GenericMapper() {

	}

	public static List<DtoWrapper> getDtoWrapperListFromObjectArray(List<Object[]> deviceList) {

		List<DtoWrapper> wrapperList = new ArrayList<>();
		for (Object[] device : deviceList) {

			DtoWrapper wrapper = new DtoWrapper();
			wrapper.setId(device[0].toString());
			wrapper.setName(device[1].toString());
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	public static List<IdAndNameWrapper> getIdNameWrapperListFromObjectArray(List<Object[]> deviceList) {

		List<IdAndNameWrapper> wrapperList = new ArrayList<>();
		for (Object[] device : deviceList) {

			IdAndNameWrapper wrapper = new IdAndNameWrapper();
			wrapper.setId((Integer) device[0]);
			wrapper.setName(device[1].toString());
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	public static List<IdAndCodeWrapper> getIdAndCodeWrapperList(List<Object[]> list) {
		List<IdAndCodeWrapper> wrapperList = new ArrayList<>();
		for (Object[] device : list) {

			IdAndCodeWrapper wrapper = new IdAndCodeWrapper();
			wrapper.setId((Integer) device[0]);
			wrapper.setCode(device[1].toString());
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	public static List<IdAndNameCodeWrapper> getIdAndNameCodeWrapperList(List<Object[]> objectList) {
		List<IdAndNameCodeWrapper> wrapperList = new ArrayList<>();
		for (Object[] object : objectList) {

			IdAndNameCodeWrapper wrapper = new IdAndNameCodeWrapper();
			wrapper.setId((Integer) object[0]);
			wrapper.setName(object[1].toString());
			wrapper.setCode(object[2].toString());
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	public static Map<String, String> getMapFromObjectList(List<Object> entityList) {
		Map<String, String> codeNameMap = new HashMap<>();

		for (Object entity : entityList) {

			Object[] eachEntity = (Object[]) entity;

			codeNameMap.put(eachEntity[0].toString(), (String) eachEntity[1]);

		}
		return codeNameMap;
	}

	public static List<IdAndVersionWrapper> getIdAndVersionList(Map<Integer, Integer> map) {

		List<IdAndVersionWrapper> list = new LinkedList<>();

		map.entrySet().stream().forEach(entry -> {
			IdAndVersionWrapper wrapper = new IdAndVersionWrapper(entry.getKey(), entry.getValue());
			list.add(wrapper);
		});
		return list;
	}
}
