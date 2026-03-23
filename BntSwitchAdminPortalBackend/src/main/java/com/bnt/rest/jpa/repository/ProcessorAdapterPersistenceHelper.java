package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.ProcessorAdapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface ProcessorAdapterPersistenceHelper extends PagingAndSortingRepository<ProcessorAdapter, Integer>,
		CrudRepository<ProcessorAdapter, Integer>, QuerydslPredicateExecutor<ProcessorAdapter> {

	public ProcessorAdapter findByCode(String code);

	public List<ProcessorAdapter> findByActiveOrderByCodeAsc(boolean active);

	@Query("select p.code, p.name FROM ProcessorAdapter p")
	public List<Object[]> findProcessorAdapterCodeAndName();

	@Query("select p.code from ProcessorAdapter p where p.name = :name ")
	public String findCodeByName(@Param("name") String name);

	@Query("select p.id, p.name FROM ProcessorAdapter p")
	public List<Object[]> findProcessorAdapterIdAndName();

	public List<ProcessorAdapter> findByActive(boolean active);

	public List<ProcessorAdapter> findByActiveAndIsSAFEnabled(boolean active, boolean isSafEnabled);
}
