package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DataFiles;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DataFilesPersistenceHelper extends CrudRepository<DataFiles, Integer> {

	public DataFiles findDataFilesByFileName(String fileName);
	
	@Query("SELECT d FROM DataFiles d WHERE d.fileName = :fileName AND d.deleted='0' ORDER BY d.createdOn DESC")
	List<DataFiles> findLatestFile(@Param("fileName") String fileName);
}
