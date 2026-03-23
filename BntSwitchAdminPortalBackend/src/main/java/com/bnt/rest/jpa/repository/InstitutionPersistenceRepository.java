package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.MerchantInstitution;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface InstitutionPersistenceRepository extends CrudRepository<MerchantInstitution, Integer> {

	/**
	 * @Query("select mid.address1,mid.city,con.countryName,cs.stateName from
	 * MerchantInstitution mi, MerchantInstitutionDetail mid,Country
	 * con,CountryState cs where (mi.institutionDetail=mid.id and mid.country=con.id
	 * and mid.countryState=cs.id) and (mid.address1 LIKE:searchTerm or " +
	 * "con.countryName LIKE:searchTerm or cs.stateName LIKE:searchTerm or mid.city
	 * LIKE:searchTerm)") public List<Object> getAddressList(@Param("searchTerm")
	 * String searchTerm);
	 */

}
