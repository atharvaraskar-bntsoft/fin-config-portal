package com.bnt.main;

import java.util.ArrayList;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class ObjectMapper {

	private static final Logger LOG = LogManager.getLogger(ObjectMapper.class);

	private static DozerBeanMapper mapper;

	@SuppressWarnings("unused")
	private ObjectMapper() {
	}

	@Autowired
	public ObjectMapper(DozerBeanMapper beanMapper) {
		ObjectMapper.mapper = beanMapper;
	}

	public static <T> T map(Object source, Class<T> destinationClass) {
		return mapper.map(source, destinationClass);
	}

	public static <T> T mapToEntity(BaseDto source, Class<T> destination) {
		T entity = (T) map(source, destination);
		LOG.info("Entity Mapped => {}", destination);
		return entity;
	}

	public static <T> T mapToDto(BaseEntity source, Class<T> destination) {
		return map(source, destination);
	}

	public static <T> T mapToDto(Object source, Class<T> destination) {
		return map(source, destination);
	}

	public static <T, S> List<T> mapListObjects(List<S> objects, Class<T> newObjectClass) {
		final List<T> newObjects = new ArrayList<>();
		for (S s : objects) {
			newObjects.add(mapper.map(s, newObjectClass));
		}
		return newObjects;
	}

	public static <T, S> List<T> mapListObjectToListDto(List<S> objects, Class<T> newObjectClass) {
		final List<T> newObjects = new ArrayList<>();
		for (S s : objects) {
			newObjects.add(mapper.map(s, newObjectClass));
		}
		return newObjects;
	}
}
