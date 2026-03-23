package com.bnt.rest.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.LookupType;
import com.bnt.rest.repository.LookupTypeRepository;
import com.bnt.rest.service.LookupTypeService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class LookupTypeServiceImpl implements LookupTypeService {

	@Autowired
	private LookupTypeRepository repository;

	public ResponseWrapper findAllRecords(Map<String, Object> requestParamMap) {
		return repository.findAllRecords(requestParamMap);
	}

	@Override
	public LookupType getLookupTypeById(int id) {
		return repository.getLookupTypeById(id);
	}

	@Override
	public LookupType getLookupTypeByName(String name) {
		return repository.getLookupTypeByName(name);
	}
}