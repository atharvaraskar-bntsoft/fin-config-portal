package com.bnt.rest.repository;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterDataEnrichmentRepository {

	public <T> List<String> getentityFieldList(Class<T> entity);
}
