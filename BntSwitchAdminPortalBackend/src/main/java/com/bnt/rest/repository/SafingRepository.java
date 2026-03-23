package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Safing;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SafingRepository {

	public Safing save(Safing safing);

	public Iterable<Safing> saveAll(List<Safing> safingEntityList);

	public Page<Safing> getPagableSafingList(Pageable pageable);

	public List<Safing> findAll();

	public Safing findById(String id);

	public Iterable<Safing> findAllById(Iterable<String> ids);

	public Page<Safing> getPagableExceptionList(Pageable pageable);

	public Page<Safing> getPagableByStatus(String status, Pageable pageable);

	public Page<Safing> findFilterData(Pageable pageable, String[] filters, String type);

}
