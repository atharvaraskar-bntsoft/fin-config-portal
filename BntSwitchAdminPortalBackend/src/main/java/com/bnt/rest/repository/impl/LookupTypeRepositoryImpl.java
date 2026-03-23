package com.bnt.rest.repository.impl;

import java.util.List;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.constant.ParameterConstant;
import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.dto.LookupTypeDto;
import com.bnt.rest.entity.LookupType;
import com.bnt.rest.jpa.repository.LookupTypePersistenceHelper;
import com.bnt.rest.repository.LookupTypeRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public class LookupTypeRepositoryImpl implements LookupTypeRepository {

	@Autowired
	private LookupTypePersistenceHelper helper;

	@Autowired
	@Qualifier("readEntityManager")
	private EntityManager entityManager;

	@SuppressWarnings("unused")
	private EntityType<?> entityType;

	@PostConstruct
	public void setParam() {
		entityType = JPAUtils.getEntityType(entityManager, LookupType.class);
	}

	@SuppressWarnings("deprecation")
	@Override
	public ResponseWrapper findAllRecords(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<LookupType> lookupTypePage = null;
		if (null == filters) {
			lookupTypePage = helper.findAll(pageable);
			long count = helper.count();
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(lookupTypePage, count);
			List<LookupTypeDto> listDTO = ReflectionUtil.mapListObjectToListDto(lookupTypePage.getContent(),
					LookupTypeDto.class);
			pageJPAData.setContent(listDTO);
			return pageJPAData;
		}
		return null;
	}

	@Override
	public LookupType getLookupTypeById(int id) {
		return helper.getLookupTypeById(id);
	}

	@Override
	public LookupType getLookupTypeByName(String name) {
		return helper.getLookupTypeByName(name);
	}
}
