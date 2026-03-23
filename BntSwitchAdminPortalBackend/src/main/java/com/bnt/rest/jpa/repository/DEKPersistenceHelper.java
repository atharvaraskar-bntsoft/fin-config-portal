package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.EncryptionKeys;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface DEKPersistenceHelper extends CrudRepository<EncryptionKeys, Integer> {

	Page<EncryptionKeys> findAll(Pageable pageable);
}
