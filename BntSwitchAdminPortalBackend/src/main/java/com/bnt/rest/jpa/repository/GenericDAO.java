package com.bnt.rest.jpa.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityManager;

import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface GenericDAO<T, PK extends Serializable> {

	Class<T> getEntityClass();

	T get(final PK id);

	List<T> findAll();

	void setEntityManager(EntityManager entityManager);

}
