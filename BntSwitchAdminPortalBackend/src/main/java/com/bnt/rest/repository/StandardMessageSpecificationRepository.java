package com.bnt.rest.repository;

import java.util.List;

import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.StandardMessageSpecification;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface StandardMessageSpecificationRepository {

	public StandardMessageSpecification getMessageSpecification(Integer messageStandard);

	public List<StandardMessageSpecification> getAllRecord();

	public List<LookupValue> getAllMessageStandard();

	public List<LookupValue> getAllMessageProtocol();

	public StandardMessageSpecification getStandardMessageSpecificationbyId(Integer id);

}
