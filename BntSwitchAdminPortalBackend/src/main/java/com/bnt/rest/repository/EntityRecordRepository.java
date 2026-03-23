package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.EntityRecord;

/**************************
 * @author vaibhav.shejol *
 **************************/

@SuppressWarnings("deprecation")
public interface EntityRecordRepository {
	Page<EntityRecord> getFilterData(Pageable pageable, String[] filters);
}
