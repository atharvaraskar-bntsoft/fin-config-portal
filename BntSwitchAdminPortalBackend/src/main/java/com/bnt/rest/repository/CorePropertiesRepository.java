package com.bnt.rest.repository;

import com.bnt.rest.entity.CoreProperties;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CorePropertiesRepository {

	public CoreProperties findCorePropertiesById(Integer id);

	public CoreProperties save(CoreProperties coreProperties);

	public CoreProperties findCorePropertiesByName(String name);

	boolean validateName(String name);

	void deleteById(Integer id);

}
