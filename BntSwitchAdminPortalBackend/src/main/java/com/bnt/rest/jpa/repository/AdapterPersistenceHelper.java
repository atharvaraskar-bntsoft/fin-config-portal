package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.dto.CustomAdapterListDto;
import com.bnt.rest.entity.Adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface AdapterPersistenceHelper
		extends PagingAndSortingRepository<Adapter, Integer>, CrudRepository<Adapter, Integer> {

	@Query("select adapter from Adapter adapter where id in (select config.adapter.id from AdapterConfiguration config where config.version=0)")
	List<Adapter> getDraftAdapterList();

	public Adapter findAdapterByName(String name);

	public Page<Adapter> findAdapterByType(String type, Pageable pageable);

	@Query("select adapter from Adapter adapter where adapter.type = 'L3' and id not in (select processorAdapter.adapterId.id from ProcessorAdapter processorAdapter where processorAdapter.adapterId.id is not null)")
	public List<Adapter> getL3ListForProcessorAdapter();

	@Query(value = "SELECT adapter.id adpId, adapter.name adpName, lookup_value.value template,GROUP_CONCAT(adapter_configuration.id, ':', adapter_configuration.version ORDER BY adapter_configuration.created_on DESC SEPARATOR '|') AS versions FROM adapter JOIN standard_message_specification ON adapter.standard_message_specification = standard_message_specification.id JOIN lookup_value ON  lookup_value.id = standard_message_specification.message_standard JOIN adapter_configuration ON adapter.id = adapter_configuration.adapter_id where adapter.type=? GROUP BY adapter.id Order BY adapter.created_on DESC", nativeQuery = true)
	public Page<CustomAdapterListDto> getAdaptersListViewPage(String type, Pageable pageable);
}
