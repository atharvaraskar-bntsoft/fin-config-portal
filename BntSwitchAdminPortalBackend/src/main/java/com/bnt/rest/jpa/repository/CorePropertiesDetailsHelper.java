package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.AdapterConfiguration;
import com.bnt.rest.entity.CorePropertiesDetails;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface CorePropertiesDetailsHelper
		extends CrudRepository<CorePropertiesDetails, Integer>, QuerydslPredicateExecutor<CorePropertiesDetails> {

	@Query("select max(version) from CorePropertiesDetails as m where m.coreProperties.id=?1 ")
	public Integer getMaxVersion(Integer corePropertiesId);

	public CorePropertiesDetails findById(int id);

	@Query("select CoreProperties from CorePropertiesDetails CoreProperties where coreProperties.id=?1 "
			+ "and CoreProperties.version =( select max(version) from CorePropertiesDetails where CoreProperties.id=?1 ) ")
	public CorePropertiesDetails getMaxVersionCorePropertiesDetails(Integer corePropertiesId);

	@Query("select CoreProperties from CorePropertiesDetails CoreProperties where coreProperties.id= ?1 and CoreProperties.version = ?2 ")
	public CorePropertiesDetails getCorePropertiesDetailsForVersion(Integer id, Integer version);

	@Query("select cpd from CorePropertiesDetails as cpd where cpd.version != 0 ")
	public List<CorePropertiesDetails> getPublishCoreProperties();

	@Query("select cpd from CorePropertiesDetails cpd where cpd.coreProperties.id= ?1 and cpd.version = ?2 ")
	public CorePropertiesDetails getZoreVersion(Integer coreProperties, Integer version);

}