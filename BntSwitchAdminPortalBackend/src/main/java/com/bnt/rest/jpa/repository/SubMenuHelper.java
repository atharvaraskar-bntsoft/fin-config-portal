package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.SubMenuFunction;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface SubMenuHelper extends CrudRepository<SubMenuFunction, Integer> {

	public SubMenuFunction findSubMenuFunctionByMappingUrl(String mappingUrl);

	@Cacheable("urls")
	@Query("select s.id,s.url,s.mappingUrl from SubMenuFunction s")
	public List<Object[]> findEntityMappingData();

	public List<SubMenuFunction> findSubMenuFunctionByUrlIn(List<String> url);

}
