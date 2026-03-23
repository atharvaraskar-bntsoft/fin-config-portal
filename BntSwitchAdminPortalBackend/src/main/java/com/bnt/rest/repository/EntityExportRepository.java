package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.EntityExport;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface EntityExportRepository {
	Page<EntityExport> getFilterData(Pageable pageable, String[] filters);
}
