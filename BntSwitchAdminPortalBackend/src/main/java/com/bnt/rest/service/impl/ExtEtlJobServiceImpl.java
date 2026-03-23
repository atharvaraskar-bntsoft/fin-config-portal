package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.Predicate;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.ExtEtlJobDto;
import com.bnt.rest.entity.ExtEtlJob;
import com.bnt.rest.jpa.repository.ExtEtlJobPercistenceHelper;
import com.bnt.rest.service.ExtEtlJobService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ExtEtlJobServiceImpl implements ExtEtlJobService {

	private static Log logger = LogFactory.getLog(ExtEtlJobServiceImpl.class);

	@Autowired
	private ExtEtlJobPercistenceHelper extEtlJobPercistenceHelper;

	@Override
	public ResponseWrapper findAllExtEtlJob(Map<String, Object> requestParamMap) {
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		if (sortColumn != null && sortColumn.equalsIgnoreCase("name")) {
			requestParamMap.put(ParameterConstant.SORT_COLUMN, "code");
		}

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<ExtEtlJob> extEtlJobPage = null;
		if (filters == null) {
			extEtlJobPage = extEtlJobPercistenceHelper.findExtEtlJobByDeleted('0', pageable);
		}
		List<ExtEtlJobDto> list = new ArrayList<>();
		if (null != extEtlJobPage) {
			for (ExtEtlJob extEtlJob : extEtlJobPage.getContent()) {
				ExtEtlJobDto dto = null;
				try {
					dto = ObjectMapper.mapToDto(extEtlJob, ExtEtlJobDto.class);
				} catch (Exception e) {
					logger.error(e.getMessage());

				}
				list.add(dto);
			}
		}

		long count = countWithDeleted('0');
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(extEtlJobPage, count);
		pageJPAData.setContent(list);
		return pageJPAData;
	}

//	private long countWithDeleted(char deleted) {
//		QExtEtlJob mi = QExtEtlJob.extEtlJob;
//		Predicate deletePredicate = mi.deleted.eq(deleted);
//		return extEtlJobPercistenceHelper.count(deletePredicate);
//	}

	private long countWithDeleted(char deleted) {
		return 0;
	}

	@Override
	public ExtEtlJobDto findExtEtlJobById(int id) {
		Optional<ExtEtlJob> optional = extEtlJobPercistenceHelper.findById(id);

		if (optional.isPresent()) {
			ExtEtlJob extEtlJob = optional.get();
			return ObjectMapper.mapToDto(extEtlJob, ExtEtlJobDto.class);
		}
		return null;

	}

	@Override
	public Integer updateJob(ExtEtlJobDto extEtlJobDto, int id, String requestToken) {

		Optional<ExtEtlJob> optional = extEtlJobPercistenceHelper.findById(id);

		if (optional.isPresent()) {
			ExtEtlJob extEtlJob = optional.get();
			try {
				JsonObjectUtil.validateJsonObject(extEtlJobDto.getEtlJson());
				extEtlJob.setEtlJson(extEtlJobDto.getEtlJson());
			} catch (RippsAdminException e) {
				logger.error("JSON validation fail");
				throw new RippsAdminException("Invalid JSON value for IMF");
			} catch (Exception e) {
				throw new RippsAdminException("Exception while updating entity Data");
			}
			return extEtlJobPercistenceHelper.save(extEtlJob).getId();

		} else {
			throw new RippsAdminException("Record Not Found");
		}
	}

}
