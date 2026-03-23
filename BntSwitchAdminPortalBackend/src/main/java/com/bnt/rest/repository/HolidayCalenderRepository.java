package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.HolidayCalender;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface HolidayCalenderRepository {

	Page<HolidayCalender> findFilterData(Pageable pageable, String[] filters);

}
