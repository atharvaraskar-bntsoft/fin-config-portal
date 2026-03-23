package com.bnt.rest.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.rest.entity.SchemeImfMapper;
import com.bnt.rest.jpa.repository.SchemeImfMapperPersistenceHelper;
import com.bnt.rest.repository.SchemeImfMapperRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class SchemeImfMapperRepositoryImpl implements SchemeImfMapperRepository {

	@Autowired
	private SchemeImfMapperPersistenceHelper schemeImfMapperPersistenceHelper;

	@Override
	public SchemeImfMapper getSchemeImfMapperBYId(Integer id) {
		return schemeImfMapperPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Page<SchemeImfMapper> getFilterData(Pageable pageable, String[] filters) {
		return schemeImfMapperPersistenceHelper.findAll(pageable);
	}

	@Override
	public SchemeImfMapper getSchemeImfMapper(Integer messageStandard, String fieldId) {
		return schemeImfMapperPersistenceHelper.getSchemeImfMapper(messageStandard, fieldId);
	}

	@Override
	public List<SchemeImfMapper> getSchemeImfMapperByMessageStandardId(Integer messageStandard) {
		return schemeImfMapperPersistenceHelper.getSchemeImfMapperByMessageStandardId(messageStandard);
	}

	@Override
	public Iterable<SchemeImfMapper> getAllSchemeImfMapper() {
		return schemeImfMapperPersistenceHelper.findAll();
	}
}