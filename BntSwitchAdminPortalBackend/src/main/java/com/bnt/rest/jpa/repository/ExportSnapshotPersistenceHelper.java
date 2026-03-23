package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.ExportSnapshot;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface ExportSnapshotPersistenceHelper
		extends PagingAndSortingRepository<ExportSnapshot, Integer>, CrudRepository<ExportSnapshot, Integer> {

}
