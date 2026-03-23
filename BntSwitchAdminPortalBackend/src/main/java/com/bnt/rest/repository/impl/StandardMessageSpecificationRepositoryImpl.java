package com.bnt.rest.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.StandardMessageSpecification;
import com.bnt.rest.jpa.repository.StandardMessageSpecificationPersistenceHelper;
import com.bnt.rest.repository.StandardMessageSpecificationRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class StandardMessageSpecificationRepositoryImpl implements StandardMessageSpecificationRepository {

	@Autowired
	private StandardMessageSpecificationPersistenceHelper standardMessageSpecificationPersistenceHelper;

	@Override
	public StandardMessageSpecification getMessageSpecification(Integer messageStandard) {
		return standardMessageSpecificationPersistenceHelper.getMessageSpecification(messageStandard);
	}

	@Override
	public List<StandardMessageSpecification> getAllRecord() {
		return (List<StandardMessageSpecification>) standardMessageSpecificationPersistenceHelper.findAll();
	}

	@Override
	public List<LookupValue> getAllMessageStandard() {
		return standardMessageSpecificationPersistenceHelper.findAllMessageStandardActive();
	}

	@Override
	public List<LookupValue> getAllMessageProtocol() {
		return standardMessageSpecificationPersistenceHelper.findAllMessageProtocol();
	}

	@Override
	public StandardMessageSpecification getStandardMessageSpecificationbyId(Integer id) {
		return standardMessageSpecificationPersistenceHelper.findById(id).orElse(null);
	}
}
