package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.LookupValue;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface LookupValuePersistenceHelper extends CrudRepository<LookupValue, Integer> {

	@Query("select lookupValue from LookupValue lookupValue where active ='1' and lookupType.id in (select id from LookupType where name = ?1 )")
	List<LookupValue> getLookUpValueByType(String lookupName);

	@Query("select lookupValue.value from LookupValue lookupValue where lookupType.id in (select id from LookupType where name = ?1 ) and active='1'")
	List<String> getValueListByType(String lookupName);

	@Query("select lookupValue.id, lookupValue.value from LookupValue lookupValue where lookupType.id in (select id from LookupType where name = ?1 ) and active='1'")
	List<Object[]> getValueObjectListByType(String lookupName);

	LookupValue findLookupValueByValue(String value);

	/** List<LookupValue> findLookupValueByLookupTypeId(int lookupTypeid); */

	List<LookupValue> findLookupValueByLookupTypeId(int lookupTypeid, Pageable pageable);

}
