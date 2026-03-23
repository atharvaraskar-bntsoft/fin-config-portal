package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.MerchantInstitution;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MerchantInstitutionRepository {

	public Page<MerchantInstitution> getFilterData(Pageable pageable, String[] filters);

	long countWithDeleted(Character deleted);

	MerchantInstitution findOne(int id);

	String getMerchantInstitutionCodeById(Integer id);

}
