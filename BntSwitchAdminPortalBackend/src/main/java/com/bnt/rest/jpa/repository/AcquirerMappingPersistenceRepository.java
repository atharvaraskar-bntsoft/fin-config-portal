package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.AcquirerMapping;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface AcquirerMappingPersistenceRepository extends CrudRepository<AcquirerMapping, Integer> {

	Page<AcquirerMapping> findAcquirerMappingByDeleted(char c, Pageable pageable);

	AcquirerMapping getAcquirerMappingById(int id);

	AcquirerMapping findAcquirerMappingByLocationIdAndMerchantIdAndDeviceIdAndAcquirerIdConfigId(Integer locationId,
			Integer merchantId, Integer deviceId, Integer acquirerIdConfigId);

}
