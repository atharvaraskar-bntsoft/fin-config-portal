package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.StandardMessageSpecification;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface MasterConfigurationPersistenceHelper
		extends PagingAndSortingRepository<StandardMessageSpecification, Integer>,
		CrudRepository<StandardMessageSpecification, Integer> {

}
