package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SystemBeanConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SystemBeanConfigurationPersistenceHelper extends
		PagingAndSortingRepository<SystemBeanConfiguration, Integer>, CrudRepository<SystemBeanConfiguration, Integer> {

	@Query("select sysBean from SystemBeanConfiguration sysBean where sysBean.componentType=?1 "
			+ "and sysBean.version=(select max(bean.version) from SystemBeanConfiguration bean where bean.componentType=?1)")
	List<SystemBeanConfiguration> findBeanByComponentTypeByMaxVersion(String componentType);

	@Query("select sysBean from SystemBeanConfiguration sysBean where sysBean.componentType=?1 and sysBean.version=?2")
	List<SystemBeanConfiguration> findBeanByComponentTypeByVersion(String componentType, Integer version);

	@Query("""
	        select sysBean
	        from SystemBeanConfiguration sysBean
	        where sysBean.componentType = ?1
	          and sysBean.version = (
	              select max(bean.version)
	              from SystemBeanConfiguration bean
	              where bean.componentType = ?1
	                and bean.fileType = sysBean.fileType
	          )
	    """)
	    List<SystemBeanConfiguration>
	    findLatestBeanByComponentTypePerFileType(String componentType);
	
}
