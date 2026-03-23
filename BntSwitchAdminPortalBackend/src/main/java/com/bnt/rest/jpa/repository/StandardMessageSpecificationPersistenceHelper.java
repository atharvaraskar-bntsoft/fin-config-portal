package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.StandardMessageSpecification;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface StandardMessageSpecificationPersistenceHelper
		extends CrudRepository<StandardMessageSpecification, Integer> {

	@Query("select mSpecification from StandardMessageSpecification mSpecification where messageStandard.id=?1 ")
	StandardMessageSpecification getMessageSpecification(Integer messageStandard);

	@Query("select messageStandard from StandardMessageSpecification")
	List<LookupValue> findAllMessageStandard();

	@Query("select messageProtocol from StandardMessageSpecification")
	List<LookupValue> findAllMessageProtocol();

	@Query("select sm.messageStandard from StandardMessageSpecification sm  where sm.active='1'")
	List<LookupValue> findAllMessageStandardActive();

}
