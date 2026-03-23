package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.CoreProperties;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface CorePropertiesHelper
		extends PagingAndSortingRepository<CoreProperties, Integer>, CrudRepository<CoreProperties, Integer> {

	public CoreProperties findCorePropertiesByName(String name);

	public List<CoreProperties> findAll();

}
