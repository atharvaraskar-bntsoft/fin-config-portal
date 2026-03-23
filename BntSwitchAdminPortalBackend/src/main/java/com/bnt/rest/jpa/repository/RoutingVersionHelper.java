package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Routing;
import com.bnt.rest.entity.RoutingVersion;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface RoutingVersionHelper extends CrudRepository<RoutingVersion, Integer> {

	@Query("SELECT Max(m.version) + 1  AS nextcode FROM RoutingVersion m where m.routing.id = ?1")
	public Integer findMax(Integer routeid);

	@Query("SELECT Min(m.version)   AS nextcode FROM RoutingVersion m where m.routing.id = ?1")
	public Integer findMin(Integer routeid);

	@Query("SELECT Max(m.version) + 1  AS nextcode FROM RoutingVersion m where m.routing.name = ?1")
	public Integer findMax(String name);

	public RoutingVersion findRoutingVersionByRoutingAndVersion(Routing routingid, Integer version);

	public List<RoutingVersion> findRoutingVersionByRoutingAndStatus(Routing routingid, boolean status);

	public List<RoutingVersion> findAll();

	@Query("SELECT rv \r" + "FROM RoutingVersion rv \r\n" + "LEFT JOIN Routing r ON rv.routing.id = r.id\r\n"
			+ "LEFT JOIN DeploymentComponent dc \r\n"
			+ "ON (rv.id=dc.componentId and upper(dc.componentType)='ROUTER' ) \r"
			+ "LEFT JOIN Deployment d ON dc.deployment.id=d.id\r"
			+ "WHERE rv.version != 0 AND d.status IS NULL OR d.status not in ('Deployed\','Scheduled') ORDER BY rv.version DESC")
	public List<RoutingVersion> findAllNotinDeployedComponent();

	@Query("SELECT rv.id,r.name,r.ruletype,rv.version,rv.status,rv.createdBy,rv.createdOn,rv.updatedBy,rv.updatedOn\r\n"
			+ "FROM RoutingVersion rv \r\n" + "LEFT JOIN Routing r ON rv.routing.id = r.id\r\n"
			+ "LEFT JOIN DeploymentComponent dc \r\n"
			+ "ON (rv.id=dc.componentId and upper(dc.componentType)='ROUTER' ) \r"
			+ "LEFT JOIN Deployment d ON dc.deployment.id=d.id\r"
			+ "WHERE rv.version != 0 AND d.status IS NULL OR d.status not in ('Deployed\','Scheduled') ORDER BY rv.version DESC")
	public List<Object[]> findAllNotinDeployedComponentNew();
}
