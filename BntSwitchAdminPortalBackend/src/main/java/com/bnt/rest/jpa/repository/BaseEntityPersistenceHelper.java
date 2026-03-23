package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;

import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface BaseEntityPersistenceHelper extends CrudRepository<BaseEntity, Long> {

}
