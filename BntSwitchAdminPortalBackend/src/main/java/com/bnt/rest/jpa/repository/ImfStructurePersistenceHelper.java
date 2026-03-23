package com.bnt.rest.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.ImfStructure;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface ImfStructurePersistenceHelper
		extends PagingAndSortingRepository<ImfStructure, Integer>, CrudRepository<ImfStructure, Integer> {

	@Query("select max(imf.version) from ImfStructure imf")
	public Integer findMaxVersion();

	// @Query("select imf.id , imf.name, imf.version , imf.imf from ImfStructure imf
	// where imf.version = ?1 ")
	@Query("select imf from ImfStructure imf where imf.version = ?1 ")
	public ImfStructure findMaxVersionImfStructure(Integer version);

	@Query("select version, id , name from ImfStructure imf  where imf.version > 0 ")
	public List<Object> findImfVersionList();
	
	 Optional<ImfStructure> findByVersion(Integer version);
	 
	 boolean existsByName(String name);
	 
	 boolean existsByVersion(Integer version);

}
