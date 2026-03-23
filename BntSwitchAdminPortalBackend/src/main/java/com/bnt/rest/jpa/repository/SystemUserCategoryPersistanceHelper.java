package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SystemUserCategory;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SystemUserCategoryPersistanceHelper extends CrudRepository<SystemUserCategory, Integer> {

}
