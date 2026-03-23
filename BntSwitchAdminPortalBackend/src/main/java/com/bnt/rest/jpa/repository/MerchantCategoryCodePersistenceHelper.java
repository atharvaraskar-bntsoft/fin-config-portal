package com.bnt.rest.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.MerchantCategoryCode;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface MerchantCategoryCodePersistenceHelper extends CrudRepository<MerchantCategoryCode, Integer> {

	public MerchantCategoryCode findMerchantCategoryCodeByCode(String code);

}