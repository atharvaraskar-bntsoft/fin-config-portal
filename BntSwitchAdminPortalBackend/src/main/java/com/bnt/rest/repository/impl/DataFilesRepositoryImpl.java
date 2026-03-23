package com.bnt.rest.repository.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.DataFiles;
import com.bnt.rest.jpa.repository.DataFilesPersistenceHelper;
import com.bnt.rest.repository.DataFilesRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class DataFilesRepositoryImpl implements DataFilesRepository {

	private static final Logger LOGGER = LogManager.getLogger(DataFilesRepositoryImpl.class);

	@Autowired
	private DataFilesPersistenceHelper dataFilesPersistenceHelper;

	@Override
	public DataFiles save(DataFiles entityDataFiles) {
		try {
			return dataFilesPersistenceHelper.save(entityDataFiles);
		} catch (Exception e) {
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
		}
		return null;
	}

	@Override
	public DataFiles getDataFilesById(Integer id) {
		return dataFilesPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public DataFiles getDataFilesByFileName(String fileName) {
		return dataFilesPersistenceHelper.findDataFilesByFileName(fileName);
	}

	@Override
	public Iterable<DataFiles> getDataFilesByIds(List<Integer> ids) {
		return dataFilesPersistenceHelper.findAllById(ids);
	}
}
