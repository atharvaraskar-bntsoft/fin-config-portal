package com.bnt.rest.repository.impl;

import jakarta.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.entity.Tags;
import com.bnt.rest.jpa.repository.TagsPersistenceHelper;
import com.bnt.rest.repository.TagsRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class TagsRepositoryImpl implements TagsRepository {

	private static final Logger lOGGER = LogManager.getLogger(TagsRepositoryImpl.class);

	@Autowired
	private TagsPersistenceHelper tagsPersistenceHelper;

	@Autowired
	private EntityManager entityManager;

	@Override
	public Tags findTagsById(Integer id) {
		// Auto-generated method stub
		return tagsPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Tags save(Tags tags) {
		// Auto-generated method stub
		try {
			return tagsPersistenceHelper.save(tags);
		} catch (Exception e) {
			// Auto-generated catch block

			lOGGER.error("Issue in persisting tags-->");
			lOGGER.error(ExceptionLog.printStackTraceToString(e));
			return null;
		}
	}

	@Override
	public Page<Tags> getPagableList(Pageable pageable) {
		// Auto-generated method stub
		return tagsPersistenceHelper.findAll(pageable);
	}

	@Override
	public void deleteById(Integer id) {
		// Auto-generated method stub
		tagsPersistenceHelper.deleteById(id);
	}

	@Override
	public boolean validateName(String name) {
		return JPACriteriaUtils.validateName(entityManager, Tags.class, name, "name");
	}

}
