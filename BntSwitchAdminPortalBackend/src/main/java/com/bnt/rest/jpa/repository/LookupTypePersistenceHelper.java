package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.LookupType;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface LookupTypePersistenceHelper
		extends PagingAndSortingRepository<LookupType, Integer>, CrudRepository<LookupType, Integer> {

	LookupType getLookupTypeById(int id);

	LookupType getLookupTypeByName(String name);

}
