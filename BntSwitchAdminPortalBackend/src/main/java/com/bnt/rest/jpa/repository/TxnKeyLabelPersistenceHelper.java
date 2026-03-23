package com.bnt.rest.jpa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.bnt.rest.entity.TxnLabel;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TxnKeyLabelPersistenceHelper extends CrudRepository<TxnLabel, Integer> {

	TxnLabel getTxnKeyLabelById(int id);

	Page<TxnLabel> findTxnLabelByLocale(Pageable pageable, String locale);

}
