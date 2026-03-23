package com.bnt.rest.repository.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.CorePropertiesDetails;
import com.bnt.rest.jpa.repository.CorePropertiesDetailsHelper;
import com.bnt.rest.repository.CorePropertiesDetailsRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class CorePropertiesDetailsRepositoryImpl implements CorePropertiesDetailsRepository {

	@Autowired
	private CorePropertiesDetailsHelper corePropertiesDetailsHelper;

	private static final Logger LOGGER = LogManager.getLogger(CorePropertiesDetailsRepositoryImpl.class);

	@Override
	public Integer getMaxVersionForCoreProperties(Integer corePropertiesId) {
		return corePropertiesDetailsHelper.getMaxVersion(corePropertiesId);
	}

	@Override
	public CorePropertiesDetails save(CorePropertiesDetails corePropertiesDetails) {
		try {
			return corePropertiesDetailsHelper.save(corePropertiesDetails);
		} catch (Exception e) {
			LOGGER.error("Issue in saving CoreProperties--> {}", ExceptionLog.printStackTraceToString(e));
			return null;
		}
	}

	@Override
	public CorePropertiesDetails findById(int id) {
		return corePropertiesDetailsHelper.findById(id);
	}

	@Override
	public CorePropertiesDetails getCorePropertiesDetailsForMaxVersion(Integer corePropertiesId) {
		return corePropertiesDetailsHelper.getMaxVersionCorePropertiesDetails(corePropertiesId);
	}

	@Override
	public CorePropertiesDetails getCorePropertiesDetailsForVersion(Integer corePropertiesId, Integer version) {
		return corePropertiesDetailsHelper.getCorePropertiesDetailsForVersion(corePropertiesId, version);
	}

	@Override
	public List<CorePropertiesDetails> getPublishCoreProperties() {
		return corePropertiesDetailsHelper.getPublishCoreProperties();
	}

	@Override
	public void deleteById(Integer id) {
		corePropertiesDetailsHelper.deleteById(id);
	}
}
