package com.bnt.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.Tags;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TagsRepository {

	public Tags findTagsById(Integer id);

	public Tags save(Tags tags);

	public Page<Tags> getPagableList(Pageable pageable);

	public void deleteById(Integer id);

	boolean validateName(String name);

}
