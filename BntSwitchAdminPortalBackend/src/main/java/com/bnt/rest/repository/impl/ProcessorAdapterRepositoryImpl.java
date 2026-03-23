package com.bnt.rest.repository.impl;

import java.util.List;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.ProcessorAdapterDto;
import com.bnt.rest.entity.ProcessorAdapter;
import com.bnt.rest.jpa.repository.ProcessorAdapterPersistenceHelper;
import com.bnt.rest.repository.ProcessorAdapterRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class ProcessorAdapterRepositoryImpl implements ProcessorAdapterRepository {

	@Autowired
	private ProcessorAdapterPersistenceHelper persistenceRepository;

	@PersistenceContext
	private EntityManager entityManager;

	private EntityType<?> entityType;

	@PostConstruct
	public void setParam() {
		entityType = JPAUtils.getEntityType(entityManager, ProcessorAdapter.class);
	}

	@Override
	public ResponseWrapper findAllRecords(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);

		Predicate predicate = null;
		Page<ProcessorAdapter> adpPage = null;

		if (filters == null) {
			adpPage = persistenceRepository.findAll(pageable);
		} else {
			predicate = JPAUtils.getPredicate(entityType, filters);
			adpPage = persistenceRepository.findAll(predicate, pageable);
		}
		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setPageNo(adpPage.getNumber() + 1);
		pageJPAData.setTotalRecords(adpPage.getTotalElements());
		pageJPAData.setContent(ObjectMapper.mapListObjects(adpPage.getContent(), ProcessorAdapterDto.class));
		return pageJPAData;
	}

	@Override
	public ResponseWrapper findAllRecords() {

		List<ProcessorAdapter> adpPage = null;

		adpPage = (List<ProcessorAdapter>) persistenceRepository.findAll();

		ResponseWrapper pageJPAData = new ResponseWrapper();

		pageJPAData.setContent(ObjectMapper.mapListObjects(adpPage, ProcessorAdapterDto.class));
		return pageJPAData;
	}

	@Override
	public boolean validateName(String name) {
		return JPACriteriaUtils.validateName(entityManager, ProcessorAdapter.class, name, "name");
	}

}
