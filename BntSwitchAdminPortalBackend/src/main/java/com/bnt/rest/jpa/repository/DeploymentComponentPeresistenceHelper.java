package com.bnt.rest.jpa.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.DeploymentComponent;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DeploymentComponentPeresistenceHelper extends CrudRepository<DeploymentComponent, Integer> {

	List<DeploymentComponent> findAll();

	@Query("Select dc from DeploymentComponent dc where dc.deployment.status in  ('Deployed','Scheduled')")
	List<DeploymentComponent> findOnlyScheduledAndDeployedComponents();

	@Query("Select distinct dc.componentId,dc.name,dc.componentType,dc.version from DeploymentComponent dc where dc.deployment.status in  ('Deployed','Scheduled')")
	public Set<Object[]> getDistinctScheduledAndDeployedComponents();

	@Query("select dc.componentType from DeploymentComponent dc where dc.componentType='Router' and dc.componentId in ?1 ")
	public List<String> getComponentTypeListByIdList(List<Integer> componentIdList);

	@Query(value = "Select distinct dc.componentId,dc.name,dc.componentType,dc.version from DeploymentComponent dc "
			+ "inner join( "
			+ "select componentType,name, max(createdOn) createdOn from DeploymentComponent intab where dc.deployment.status in  ('Deployed','Scheduled')  group by componentType,name "
			+ ") tm on dc.componentType=tm.componentType " + "and dc.name=tm.name " + " and dc.createdOn=tm.createdOn "
			+ "where dc.deployment.status in  ('Deployed','Scheduled')", nativeQuery = true)
	public Set<Object[]> getComponentListForDeploymentWorkFlowJSON();

	@Query("Select c.deployment.id from DeploymentComponent c where c.componentId = ?1  and c.componentType ='EX' ")
	public String findDeployedIdByComponentTypeAndComponentId(int versionDetailId);

}
