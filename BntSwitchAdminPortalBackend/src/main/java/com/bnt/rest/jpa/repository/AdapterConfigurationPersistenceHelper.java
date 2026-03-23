package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.bnt.rest.entity.AdapterConfiguration;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface AdapterConfigurationPersistenceHelper extends
		PagingAndSortingRepository<AdapterConfiguration, Integer>, CrudRepository<AdapterConfiguration, Integer> {

	@Query("select max(version) from AdapterConfiguration where adapter.id=?1 ")
	public Integer getMaxVersionForAdaptor(Integer adapterId);

	@Query("select Configuration from AdapterConfiguration Configuration where adapter.id= ?1 and Configuration.version = ?2 ")
	public AdapterConfiguration getConfigurationForVersion(Integer adapterId, Integer version);

	@Query("select Configuration from AdapterConfiguration Configuration where Configuration.adapter.id=?1 "
			+ "and Configuration.version =( select max(version) from AdapterConfiguration where adapter.id=?1 ) ")
	public AdapterConfiguration getMaxVersionAdapterConfiguration(Integer adapterId);

	@Query("select Configuration from AdapterConfiguration Configuration where adapter.id=?1 order by FIELD (Configuration.version, 0) desc , Configuration.version desc")
	public List<AdapterConfiguration> getConfigListDescVesrionByAdapterId(Integer adapterId);

	public List<AdapterConfiguration> findAll();

	@Query("SELECT ac " + "FROM AdapterConfiguration ac " + "LEFT JOIN Adapter a ON ac.adapter.id= a.id "
			+ "LEFT JOIN DeploymentComponent dc "
			+ " ON dc.name = a.name and dc.version = ac.version and dc.componentType IN ('L1','L3') "
			+ "LEFT JOIN Deployment d ON dc.deployment.id=d.id "
			+ "WHERE ac.version != 0 AND d.status IS NULL OR d.status not in ('Deployed\','Scheduled') ORDER BY ac.version DESC")
	public List<AdapterConfiguration> findAllNotinDeployedComponent();

	@Query("SELECT ac.id,a.name,a.type,ac.version,ac.status,ac.createdBy,ac.createdOn,ac.updatedBy,ac.updatedOn "
			+ "FROM AdapterConfiguration ac " + "LEFT JOIN Adapter a ON ac.adapter.id= a.id "
			+ "LEFT JOIN DeploymentComponent dc "
			+ " ON dc.name = a.name and dc.version = ac.version and dc.componentType IN ('L1','L3')  "
			+ "LEFT JOIN Deployment d ON dc.deployment.id=d.id "
			+ "WHERE ac.version != 0 AND d.status IS NULL OR d.status not in ('Deployed\','Scheduled') ORDER BY ac.version DESC")
	public List<Object[]> findAllNotinDeployedComponentNew();

	@Query("select id, version, status from AdapterConfiguration Configuration where adapter.id=?1 order by FIELD (Configuration.version, 0) desc , Configuration.version desc")
	public List<Object[]> getNewConfigListDescVesrionByAdapterId(Integer adapterId);

	@Query("select configuration from AdapterConfiguration configuration where configuration.version<>0 ")
	public List<AdapterConfiguration> findAllVersionedAdapterConfiguration();
	
	Optional<AdapterConfiguration>
    findByAdapter_IdAndVersion(Long adapterId, Integer version);
	
	Optional<AdapterConfiguration>
	findByAdapter_IdAndVersion(Integer adapterId, Integer version);
}
