package com.bnt.rest.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.AcquirerIdConfigDto;
import com.bnt.rest.dto.NameAndCodeWrapper;
import com.bnt.rest.entity.AcquirerIdConfig;
import com.bnt.rest.jpa.repository.AcquirerConfigPersistenceHelper;
import com.bnt.rest.repository.AcquirerConfigRepository;
import com.bnt.rest.service.AcquirerConfigServiceRest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AcquirerConfigServiceRestImpl implements AcquirerConfigServiceRest {

	private static Log logger = LogFactory.getLog(AcquirerConfigServiceRestImpl.class);

	@Autowired
	private AcquirerConfigRepository acquirerConfigRepository;

	@Autowired
	private AcquirerConfigPersistenceHelper helper;

	@Override
	public ResponseWrapper findAllAcquirer(Map<String, Object> requestParamMap) {
		logger.debug("Find all acquirers!");
		return this.acquirerConfigRepository.findAllAcquirer(requestParamMap);
	}

	@Override
	public List<NameAndCodeWrapper> getAcqConfList() {
		List<AcquirerIdConfig> institutionList = helper.findByActiveAndDeleted(true, '0');
		return ObjectMapper.mapListObjects(institutionList, NameAndCodeWrapper.class);
	}

	@Override
	public AcquirerIdConfig findAcquirerIdConfig(int id) {
		return this.acquirerConfigRepository.findOne(id);

	}

	@Override
	public AcquirerIdConfigDto findAcquirerIdConfigDto(int id) {
		AcquirerIdConfig acquirerIdConfigId = this.acquirerConfigRepository.findOne(id);
		return ObjectMapper.mapToDto(acquirerIdConfigId, AcquirerIdConfigDto.class);
	}

}
