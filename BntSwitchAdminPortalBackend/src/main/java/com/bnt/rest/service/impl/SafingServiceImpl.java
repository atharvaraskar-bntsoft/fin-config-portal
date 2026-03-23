package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bnt.bswitch.shared.lib.msg.ProcessingStatus;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.SafingDto;
import com.bnt.rest.entity.Safing;
import com.bnt.rest.repository.SafingRepository;
import com.bnt.rest.service.ProcessorAdapterService;
import com.bnt.rest.service.SafingService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class SafingServiceImpl implements SafingService {

	private static final String EXCEPTION_ONLY_MSG = "Action allowed for record with status=Exception Only";

	private static final String ID_NOT_AVAILABLE = "Id not available";

	private static final String QUEUE_MOVEMENT_FAILED = "Queue movement failed";

	private static final Logger logger = LogManager.getLogger(SafingServiceImpl.class);

	@Value("${monitoring.helth.jmx.url}")
	private String monitoringHealthJmxUrl;

	@Autowired
	private SafingRepository safingRepository;

	@Autowired
	private ProcessorAdapterService processorAdapterService;

	@Override
	public ResponseWrapper getPagableExceptionQueueList(Map<String, Object> requestParamMap) {
		logger.info("inside getPagableExceptionQueueList");
		List<SafingDto> safingDtoList = null;
		long count = 0l;
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Safing> safingList = null;
		if (filters == null) {
			safingList = safingRepository.getPagableExceptionList(pageable);
		} else {
			safingList = safingRepository.findFilterData(pageable, filters, ProcessingStatus.EXCEPTION.name());
		}
		if (safingList != null && !safingList.getContent().isEmpty()) {
			safingDtoList = ObjectMapper.mapListObjectToListDto(safingList.getContent(), SafingDto.class);
			count = safingList.getTotalElements();
		} else {
			safingDtoList = new ArrayList<>();
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(safingList, count);
		pageJPAData.setContent(safingDtoList);
		return pageJPAData;
	}

	@Override
	public ResponseWrapper getPagableSafQueueList(Map<String, Object> requestParamMap) {
		logger.info("inside getPagableSafQueueList");
		List<SafingDto> safingDtoList = null;
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Safing> safingList = null;
		if (filters == null) {
			safingList = safingRepository.getPagableSafingList(pageable);
		} else {
			safingList = safingRepository.findFilterData(pageable, filters, "SAF");
		}
		if (!safingList.isEmpty() && !safingList.getContent().isEmpty()) {
			safingDtoList = ObjectMapper.mapListObjectToListDto(safingList.getContent(), SafingDto.class);
		} else {
			safingDtoList = new ArrayList<>();
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(safingList, safingList.getTotalElements());
		pageJPAData.setContent(safingDtoList);
		return pageJPAData;
	}

	@Override
	public boolean deleteExceptionById(String id, String requestToken) {
		logger.info("inside deleteExceptionById");
		boolean flag = false;
		Safing safing = safingRepository.findById(id);
		if (safing == null) {
			throw new RippsAdminException(ID_NOT_AVAILABLE);
		}
		if (!ProcessingStatus.EXCEPTION.name().equalsIgnoreCase(safing.getStatus())) {
			throw new RippsAdminException(EXCEPTION_ONLY_MSG);
		}
		safing.setDeleted('1');
		Safing savedSafing = safingRepository.save(safing);
		flag = true;
		if (savedSafing == null) {
			throw new RippsAdminException("Id deletion failed");
		}
		return flag;
	}

	@Override
	public String moveExceptionToSafById(String id, String requestToken) {
		logger.info("inside moveExceptionToSafById");
		Safing safing = safingRepository.findById(id);
		if (safing == null) {
			throw new RippsAdminException(ID_NOT_AVAILABLE);
		}
		if (!ProcessingStatus.EXCEPTION.name().equalsIgnoreCase(safing.getStatus())) {
			throw new RippsAdminException(EXCEPTION_ONLY_MSG);
		}
		Object result = null;
		try {
			result = null;
		} catch (RippsAdminException e) {
			throw new RippsAdminException(QUEUE_MOVEMENT_FAILED);
		}
		if (result != null && !result.equals(false)) {
			return id;
		} else {
			throw new RippsAdminException(QUEUE_MOVEMENT_FAILED);
		}
	}

	@Override
	public ResponseWrapper getPagableByStatus(String status, Map<String, Object> requestParamMap) {
		logger.info("inside getPagableByStatus");
		List<SafingDto> safingDtoList = null;
		long count = 0l;
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<Safing> safingList = safingRepository.getPagableByStatus(status, pageable);
		if (safingList != null && !safingList.getContent().isEmpty()) {
			safingDtoList = ObjectMapper.mapListObjectToListDto(safingList.getContent(), SafingDto.class);
			count = safingList.getTotalElements();
		} else {
			safingDtoList = new ArrayList<>();
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(safingList, count);
		pageJPAData.setContent(safingDtoList);
		return pageJPAData;
	}

	@Override
	public List<String> getSafFilterList() {
		logger.info("inside getStatus");
		ArrayList<String> dataList = new ArrayList<>();
		ProcessingStatus[] reversalStatusArray = ProcessingStatus.values();
		String name = "";
		for (ProcessingStatus reversalStatus : reversalStatusArray) {
			name = reversalStatus.name();
			if (!ProcessingStatus.EXCEPTION.name().equalsIgnoreCase(name)) {
				dataList.add(name);
			}
		}

		return dataList;
	}

	@Override
	public List<IdAndNameStringWrapper> getSafStatusFilterList() {
		logger.info("inside getSafStatusFilterList");
		ArrayList<IdAndNameStringWrapper> dataList = new ArrayList<>();
		IdAndNameStringWrapper idAndNameStringWrapper = null;
		ProcessingStatus[] reversalStatusArray = ProcessingStatus.values();
		String name = "";
		for (ProcessingStatus reversalStatus : reversalStatusArray) {
			name = reversalStatus.name();
			if (!ProcessingStatus.EXCEPTION.name().equalsIgnoreCase(name)) {
				idAndNameStringWrapper = new IdAndNameStringWrapper();
				idAndNameStringWrapper.setId(name);
				idAndNameStringWrapper.setName(StringUtil.capitalizeWord(name));
				dataList.add(idAndNameStringWrapper);
			}
		}
		return dataList;
	}

	@Override
	public boolean deleteRecords(List<String> ids, String requestToken) {
		logger.info("inside deleteSAF&ExceptionById");
		boolean flag = false;
		List<Safing> safingList = (List<Safing>) safingRepository.findAllById(ids);
		if (safingList != null) {
			if (ids.size() != safingList.size()) {
				throw new RippsAdminException("Some Id's are missing");
			}
			List<Safing> newSafingList = new ArrayList<>();
			for (Safing safing : safingList) {
				safing.setDeleted('1');
				newSafingList.add(safing);
			}
			List<Safing> savedSafing = null;
			try {
				savedSafing = (List<Safing>) safingRepository.saveAll(newSafingList);
				flag = true;
			} catch (Exception e) {
				logger.error(ExceptionLog.printStackTraceToString(e));
			}
			if (savedSafing == null) {
				throw new RippsAdminException("Id deletion failed");
			}
		} else {
			throw new RippsAdminException("ID not available");
		}
		return flag;

	}

	@Override
	public List<String> moveExceptionToSaf(List<String> ids, String requestToken) {
		logger.info("inside moveExceptionToSaf");
		List<Safing> safingList = (List<Safing>) safingRepository.findAllById(ids);
		if (ids.size() == safingList.size()) {
			return moveExceptionToSaf1(ids, safingList);
		} else {
			throw new RippsAdminException("Some ID's are missing");
		}
	}

	private List<String> moveExceptionToSaf1(List<String> ids, List<Safing> safingList) {
		for (Safing safing : safingList) {
			if (safing == null) {
				throw new RippsAdminException(ID_NOT_AVAILABLE);
			}
			if (!ProcessingStatus.EXCEPTION.name().equalsIgnoreCase(safing.getStatus())) {
				throw new RippsAdminException(EXCEPTION_ONLY_MSG);
			}
		}

		Object result = null;
		try {
			result = null;
		} catch (RippsAdminException e) {
			throw new RippsAdminException(QUEUE_MOVEMENT_FAILED);
		}
		if (result != null && !result.equals(false)) {
			return ids;
		} else {
			throw new RippsAdminException(QUEUE_MOVEMENT_FAILED);
		}
	}

	@Override
	public List<IdAndNameStringWrapper> getSafProcessorFilterList() {
		return processorAdapterService.getProAdpIdNameListIsSAFEnabled();
	}

}
