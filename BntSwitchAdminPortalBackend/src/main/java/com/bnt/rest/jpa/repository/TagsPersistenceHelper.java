package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Tags;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface TagsPersistenceHelper
		extends PagingAndSortingRepository<Tags, Integer>, CrudRepository<Tags, Integer> {

}
