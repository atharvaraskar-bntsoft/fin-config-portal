package com.bnt.rest.service.impl;

import java.io.Serializable;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.jpa.repository.GenericRepository;
import com.bnt.rest.service.GenericService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class GenericServiceImpl implements GenericService {

	@Autowired
	GenericRepository<BaseEntity, Serializable> genericRepo;

	private static final Logger LOGGER = LogManager.getLogger(GenericServiceImpl.class);

	@Transactional
	@Override
	public void saveList(List<?> entityDataList) {
		Iterable<? extends BaseEntity> iterable;
		iterable = (Iterable<? extends BaseEntity>) entityDataList;
		try {

			genericRepo.saveAll(iterable);
			LOGGER.debug("list has been saved using Generic operation");
		} catch (Exception e) {
			LOGGER.error("Issue in saving list using generic operation");
			LOGGER.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException(e.getMessage());
		}
	}
}
