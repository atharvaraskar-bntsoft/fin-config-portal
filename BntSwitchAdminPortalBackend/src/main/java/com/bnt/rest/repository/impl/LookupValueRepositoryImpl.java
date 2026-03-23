package com.bnt.rest.repository.impl;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.jpa.repository.LookupValuePersistenceHelper;
import com.bnt.rest.repository.LookupValueRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class LookupValueRepositoryImpl implements LookupValueRepository {

	private static final Logger LOGGER = LogManager.getLogger(LookupValueRepositoryImpl.class);

	@Autowired
	private LookupValuePersistenceHelper lookupValuePersistenceHelper;

	@Override
	public List<LookupValue> getLookUpValueByType(String lookupName) {
		LOGGER.info("inside getLookUpValueByType -->lookupName: {}", lookupName);
		return lookupValuePersistenceHelper.getLookUpValueByType(lookupName);

	}

	@Override
	public Integer getLookUpValueId(String lookupValue) {
		return lookupValuePersistenceHelper.findLookupValueByValue(lookupValue).getId();
	}

	@Override
	public LookupValue getLookUpValue(String lookupValue) {
		return lookupValuePersistenceHelper.findLookupValueByValue(lookupValue);
	}

	/**
	 * @Override public ResponseWrapper findAllRecords(Map<String, Object>
	 *           requestParamMap) { Pageable pageable =
	 *           JPAUtils.getPageableObject(requestParamMap); String[] filters =
	 *           (String[]) requestParamMap.get(ParameterConstant.FILTERS);
	 *           Page<LookupValue> lookupValuePage = null; if (null == filters) {
	 *           lookupValuePage = lookupValuePersistenceHelper.findAll(pageable);
	 *           }else {
	 * 
	 *           }
	 * 
	 *           long count = lookupValuePersistenceHelper.count(); ResponseWrapper
	 *           pageJPAData = JPAUtils.getResponseWrapperByPage(lookupValuePage,
	 *           count); List<LookupValueDto> listDTO =
	 *           ObjectMapper.mapListObjects(lookupValuePage.getContent(),
	 *           LookupValueDto.class); pageJPAData.setContent(listDTO); return
	 *           pageJPAData; }
	 * 
	 * @Override public LookupValue getLookupValueById(int id) { return
	 *           lookupValuePersistenceHelper.getLookupValueById(id); }
	 */

	@Override
	public Iterable<LookupValue> getLookUpValueAll() {
		return lookupValuePersistenceHelper.findAll();
	}
}
