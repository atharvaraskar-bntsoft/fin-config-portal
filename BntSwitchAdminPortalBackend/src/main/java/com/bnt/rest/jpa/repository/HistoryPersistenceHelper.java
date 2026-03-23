package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Deployment;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface HistoryPersistenceHelper
		extends PagingAndSortingRepository<Deployment, Integer>, CrudRepository<Deployment, Integer> {

}
