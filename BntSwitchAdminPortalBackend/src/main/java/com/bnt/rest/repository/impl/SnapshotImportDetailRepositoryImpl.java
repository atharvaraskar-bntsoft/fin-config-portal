package com.bnt.rest.repository.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.SnapshotImportDetail;
import com.bnt.rest.jpa.repository.SnapshotImportDetailPersistenceHelper;
import com.bnt.rest.repository.SnapshotImportDetailRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class SnapshotImportDetailRepositoryImpl implements SnapshotImportDetailRepository {

	private static final Logger LOGGER = LogManager.getLogger(SnapshotImportDetailRepositoryImpl.class);

	@Autowired
	private SnapshotImportDetailPersistenceHelper snapshotImportDetailPersistenceHelper;

	@Override
	public SnapshotImportDetail findSnapshotImportDetailById(Integer id) {
		return snapshotImportDetailPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public SnapshotImportDetail save(SnapshotImportDetail entity) {
		try {
			return snapshotImportDetailPersistenceHelper.save(entity);
		} catch (Exception e) {
			LOGGER.error("Issue in saving SnapshotImportDetail-->");
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			return null;
		}
	}

	@Override
	public Page<SnapshotImportDetail> findAll(Pageable pageable) {
		// Auto-generated method stub
		return snapshotImportDetailPersistenceHelper.findAll(pageable);
	}
}
