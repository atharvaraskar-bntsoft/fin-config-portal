package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bnt.rest.entity.ExtEtlJobNewDetail;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExtEtlJobNewDetailPersistenceHelper extends CrudRepository<ExtEtlJobNewDetail, Integer> {

	@Query(value = "SELECT max(version) FROM ExtEtlJobNewDetail")
	public Integer max();

	@Query("SELECT Max(m.version) + 1 AS nextcode FROM ExtEtlJobNewDetail m where m.extEtlJobId.id = ?1")
	public Integer findMax(Integer extEtlJobId);
}
