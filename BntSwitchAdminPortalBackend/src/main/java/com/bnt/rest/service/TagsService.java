package com.bnt.rest.service;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.dto.TagsDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface TagsService {

	public TagsDto findTagsById(Integer id);

	public Integer create(TagsDto tags, String requestToken);

	public Integer update(TagsDto tags, Integer id, String requestToken);

	public ResponseWrapper getPagableList(Map<String, Object> requestParamMap);

	public void deleteById(Integer id);

}
