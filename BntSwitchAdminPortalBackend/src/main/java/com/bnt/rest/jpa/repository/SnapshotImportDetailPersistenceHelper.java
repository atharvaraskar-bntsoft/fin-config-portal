package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SnapshotImportDetail;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SnapshotImportDetailPersistenceHelper extends
		PagingAndSortingRepository<SnapshotImportDetail, Integer>, CrudRepository<SnapshotImportDetail, Integer> {

}
