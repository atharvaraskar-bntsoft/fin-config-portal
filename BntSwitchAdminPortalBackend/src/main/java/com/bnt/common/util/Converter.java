package com.bnt.common.util;

import java.util.ArrayList;
import java.util.List;

import com.bnt.main.ObjectMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Converter<T> {

	public List<T> listToObjectMapperList(List<Object> from, Class<T> destination) {
		List<T> to = new ArrayList<>();
		from.forEach(item -> to.add(ObjectMapper.map(item, destination)));
		return to;
	}
}
