package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.Routing;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface RoutingPersistenceHelper extends JpaRepository<Routing, Integer> {

	public Routing findRoutingById(int id);

	public Routing findRoutingByName(String name);

	public List<Routing> findRoutingByRoutetype(String name);

}
