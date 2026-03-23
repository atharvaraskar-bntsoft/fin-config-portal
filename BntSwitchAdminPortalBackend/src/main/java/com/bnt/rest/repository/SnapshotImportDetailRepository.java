package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.SnapshotImportDetail;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SnapshotImportDetailRepository {

	SnapshotImportDetail findSnapshotImportDetailById(Integer id);

	SnapshotImportDetail save(SnapshotImportDetail adapter);

	Page<SnapshotImportDetail> findAll(Pageable pageable);

}
