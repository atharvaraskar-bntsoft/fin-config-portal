package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SwitchCluster;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SwitchClusterPersistenceHelper extends CrudRepository<SwitchCluster, Integer> {

	Page<SwitchCluster> findAll(Pageable pageable);

	@Query("select s.id, s.clusterkey from SwitchCluster s")
	public List<Object[]> getIdAndKey();

	@Query("select  s.clusterkey from SwitchCluster s")
	public List<String> getKeyList();

	@Query("select s.id, s.clusterkey from SwitchCluster s where s.active = 1")
	public List<Object[]> getIdAndKeyActive();

}
