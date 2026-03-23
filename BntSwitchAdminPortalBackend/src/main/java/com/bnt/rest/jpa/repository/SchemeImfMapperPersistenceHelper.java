package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SchemeImfMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SchemeImfMapperPersistenceHelper
		extends PagingAndSortingRepository<SchemeImfMapper, Integer>, CrudRepository<SchemeImfMapper, Integer> {

	@Query("select schemeImfMapper from SchemeImfMapper schemeImfMapper where messageStandard.id=?1 and fieldId=?2")
	SchemeImfMapper getSchemeImfMapper(Integer messageStandard, String fieldId);

	List<SchemeImfMapper> getSchemeImfMapperByMessageStandardId(Integer messageStandard);
}
