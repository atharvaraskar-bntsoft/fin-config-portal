package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.CustomBeanConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface CustomBeanConfigurationPersistenceHelper extends
		PagingAndSortingRepository<CustomBeanConfiguration, Integer>, CrudRepository<CustomBeanConfiguration, Integer> {

	@Query("select bean from CustomBeanConfiguration bean where componentType=?1 and componentId=?2")
	List<CustomBeanConfiguration> findBeanByComponentTypeByComponentId(String componentType, Integer componentId);

	@Query("delete from CustomBeanConfiguration bean where bean.componentType=?1 and bean.componentId=?2")
	@Modifying
	void deleteBeansByComponentTypeByComponentId(String componentType, Integer componentId);
}
