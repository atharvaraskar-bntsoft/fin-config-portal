package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Location;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface LocationRepository {

	Page<Location> getFilterData(Pageable pageable, String[] filters);

	String getLocationCodeById(Integer id);

}
