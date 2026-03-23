package com.bnt.rest.jpa.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface GenericRepository<T extends BaseEntity, ID extends Serializable> extends JpaRepository<T, Integer> {

}