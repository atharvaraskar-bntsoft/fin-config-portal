package com.bnt.rest.repository;

import java.util.List;
import com.bnt.rest.entity.CorePropertiesDetails;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CorePropertiesDetailsRepository {

	public Integer getMaxVersionForCoreProperties(Integer corePropertiesId);

	public CorePropertiesDetails save(CorePropertiesDetails coreProperties);

	public CorePropertiesDetails findById(int id);

	public CorePropertiesDetails getCorePropertiesDetailsForVersion(Integer corePropertiesId, Integer version);

	public CorePropertiesDetails getCorePropertiesDetailsForMaxVersion(Integer corePropertiesId);

	public List<CorePropertiesDetails> getPublishCoreProperties();

	void deleteById(Integer id);

}
