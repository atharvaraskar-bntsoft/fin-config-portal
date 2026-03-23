package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Merchant;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface MerchantRepository {

	Merchant findOne(int id);

	Page<Merchant> findFilterData(Pageable pageable, String[] filters);

	long countWithDeleted(char c);

	String getMerchantCodeById(Integer id);

}
