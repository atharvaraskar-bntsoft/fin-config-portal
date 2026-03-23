package com.bnt.rest.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.TagsDto;
import com.bnt.rest.repository.TagsRepository;
import com.bnt.rest.service.TagsService;
import com.bnt.service.mapper.TagsMapper;
import com.bnt.rest.entity.Tags;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class TagsServiceImpl implements TagsService {

	private static Log logger = LogFactory.getLog(TagsServiceImpl.class);

	@Autowired
	private TagsRepository tagsRepository;

	@Override
	public TagsDto findTagsById(Integer id) {
		logger.info("inside findTagsById with id:" + id);
		TagsDto tagsDto = null;
		Tags tags = tagsRepository.findTagsById(id);
		if (tags != null) {
			tagsDto = ObjectMapper.mapToDto(tags, TagsDto.class);
		}
		return tagsDto;
	}

	@Override
	public Integer create(TagsDto tagsDto, String requestToken) {
		logger.info("inside create");
		List<String> ignoreCopyAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS);
		TagsMapper.validateDto(tagsDto);

		boolean validName = tagsRepository.validateName(tagsDto.getName());
		if (!validName) {
			throw new RippsAdminException("Name already exist");
		}

		Tags tags = new Tags();
		try {
			ReflectionUtil.copy(tags, tagsDto, ignoreCopyAuditField);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		tags.setId(null);
		tags.setActive('1');
		tags.setDeleted('0');
		Tags savesTags = tagsRepository.save(tags);
		Integer savedId = null;
		if (savesTags != null) {
			savedId = savesTags.getId();
			logger.info("Tag Saved successfully");
		} else {
			throw new RippsAdminException("Failed in saving Tags");
		}
		return savedId;
	}

	@Override
	public Integer update(TagsDto tagsDto, Integer id, String requestToken) {
		logger.info("inside update");
		TagsMapper.validateDto(tagsDto);
		Tags tags = tagsRepository.findTagsById(id);
		if (tags == null) {
			throw new RippsAdminException("Tags not available for update");
		}

		tags.setServiceType(tagsDto.getServiceType());
		tags.setTag(tagsDto.getTag());
		tags.setCondition(tagsDto.getCondition());
		tags.setActive(tagsDto.getActive());
		tags.setExchangeType(tagsDto.getExchangeType());

		Tags savesTags = tagsRepository.save(tags);
		Integer savedId = null;
		if (savesTags != null) {
			savedId = savesTags.getId();
			logger.info("Tag updated successfully");
		} else {
			throw new RippsAdminException("Failed in updating Tags");
		}
		return savedId;
	}

	@Override
	public ResponseWrapper getPagableList(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<TagsDto> listUI;
		Page<Tags> pageListConfig = tagsRepository.getPagableList(pageable);
		if (pageListConfig != null && pageListConfig.getSize() > 0) {
			List<Tags> tagEntityList = pageListConfig.getContent();
			listUI = ObjectMapper.mapListObjectToListDto(tagEntityList, TagsDto.class);
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(pageListConfig,
					pageListConfig.getTotalElements());
			pageJPAData.setContent(listUI);
			return pageJPAData;
		}
		return null;

	}

	@Override
	public void deleteById(Integer id) {
		Tags tags = tagsRepository.findTagsById(id);
		tags.setDeleted('1');
		Tags savesTags = tagsRepository.save(tags);
		if (savesTags != null) {
			logger.info("Tag deleted successfully");
		} else {
			throw new RippsAdminException("Tags deletion failed");
		}
	}

}
