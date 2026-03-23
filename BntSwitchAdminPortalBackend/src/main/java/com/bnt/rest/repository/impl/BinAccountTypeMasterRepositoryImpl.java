package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.BinAccountTypeMaster;
import com.bnt.rest.jpa.repository.BinAccountTypeMasterPersistenceHelper;
import com.bnt.rest.repository.BinAccountTypeMasterRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class BinAccountTypeMasterRepositoryImpl implements BinAccountTypeMasterRepository {

	private static final Logger logger = LogManager.getLogger(BinAccountTypeMasterRepositoryImpl.class);

	@Autowired
	BinAccountTypeMasterPersistenceHelper binAccountTypeMasterPersistenceHelper;

	@Override
	public BinAccountTypeMaster findBinAccountTypeMasterById(int id) {
		return binAccountTypeMasterPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public void deleteById(Integer id) {
		binAccountTypeMasterPersistenceHelper.deleteById(id);
	}

	@Override
	public BinAccountTypeMaster save(BinAccountTypeMaster binAccountTypeMaster) {
		try {
			return binAccountTypeMasterPersistenceHelper.save(binAccountTypeMaster);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		return null;
	}

	@Override
	public Page<BinAccountTypeMaster> findPagedBinAccountTypeMaster(Pageable pageable) {
		return binAccountTypeMasterPersistenceHelper.findAll(pageable);
	}

	@Override
	public List<BinAccountTypeMaster> findAll() {
		return binAccountTypeMasterPersistenceHelper.findAll();
	}

	@Override
	public List<BinAccountTypeMaster> saveList(List<BinAccountTypeMaster> binAccountTypeMasterList) {
		try {
			return binAccountTypeMasterPersistenceHelper.saveAll(binAccountTypeMasterList);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		return new ArrayList<>();
	}
}
