package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Routing;
import com.bnt.rest.entity.RoutingVersion;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface RoutingRepository {

	public Long deleteConfiguredRoutes(RoutingVersion routingVersion);

	Long deleteVersion(Integer id, RoutingVersion routingVersion);

	List<Routing> getFilterData(String[] filters, String routeType);

	public List<RoutingVersion> findAllNotinDeployedComponent();

	public List<Object[]> findAllNotinDeployedComponentNew();

	Page<Routing> getFilterData(String[] filters, String routeType, Pageable pageable);

}
