package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.AdapterDto;
import com.bnt.rest.dto.IdAndNameStringWrapper;
import com.bnt.rest.dto.LookupValueDto;
import com.bnt.rest.dto.ProcessorAdapterDto;
import com.bnt.rest.entity.Adapter;
import com.bnt.rest.entity.LookupValue;
import com.bnt.rest.entity.ProcessorAdapter;
import com.bnt.rest.jpa.repository.AdapterPersistenceHelper;
import com.bnt.rest.jpa.repository.LookupValuePersistenceHelper;
import com.bnt.rest.jpa.repository.ProcessorAdapterPersistenceHelper;
import com.bnt.rest.repository.ProcessorAdapterRepository;
import com.bnt.rest.service.ProcessorAdapterService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ProcessorAdapterServiceImpl implements ProcessorAdapterService {

	private static final Logger logger = LogManager.getLogger(ProcessorAdapterServiceImpl.class);

	/** The approved destinations. */
	@Value("${matrix.approved.destinations}")
	private String authorizedDestinations;

	@Autowired
	ProcessorAdapterRepository processorAdapterRepository;

	@Autowired
	ProcessorAdapterPersistenceHelper processorAdapterHelper;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private AdapterPersistenceHelper adapterPersistenceHelper;

	@Autowired
	private LookupValuePersistenceHelper lookUpValuePersistancehelper;

	@Override
	public List<IdAndNameStringWrapper> findAll() {
		List<ProcessorAdapter> processorAdapterList = processorAdapterHelper.findByActiveOrderByCodeAsc(true);
		return processorAdapterList.stream().map(value -> new IdAndNameStringWrapper(value.getCode(), value.getName()))
				.toList();

	}

	@Override
	public ResponseWrapper findAllRecords() {
		return processorAdapterRepository.findAllRecords();
	}

	@Override
	public List<IdAndNameStringWrapper> getProAdpList() {
		List<ProcessorAdapter> proadpList = (List<ProcessorAdapter>) processorAdapterHelper.findAll();
		return proadpList.stream().map(value -> new IdAndNameStringWrapper(value.getCode(), value.getName())).toList();
	}

	/**
	 * Get all Processor Adapter id and code.
	 * 
	 * @return Map<Integer,String>
	 */
	@Override
	public Map<String, String> getProcessorAdapterCodeAndName() {
		Map<String, String> map = new HashMap<>();
		List<Object[]> routeMap = processorAdapterHelper.findProcessorAdapterCodeAndName();
		for (Object[] processorAdapter : routeMap) {
			map.put((String) processorAdapter[0], processorAdapter[1].toString());
		}
		return map;
	}

	@Override
	public Map<Integer, String> getAuthorizedSchemeMap() {

		Map<Integer, String> map = new HashMap<>();
		String destinationName = null;
		List<Object[]> routeMap = processorAdapterHelper.findProcessorAdapterCodeAndName();
		for (Object[] processorAdapter : routeMap) {

			destinationName = StringUtil.removeWhiteSpaces(processorAdapter[1].toString());
			if (authorizedDestinations.contains((destinationName))) {
				map.put((Integer) processorAdapter[0], destinationName);
			}
		}
		return map;

	}

	@Override
	public Set<String> getAllAuthorizedDestinationNameFromRoutes(List<String> routeIdList) {

		// Get Authorized Map
		Map<Integer, String> authorizedSchemeMap = getAuthorizedSchemeMap();

		return CollectionUtil.getValueSetForGivenKeys(authorizedSchemeMap, routeIdList);

	}

	@Override
	public String getIdFromCode(String code) {
		return processorAdapterHelper.findCodeByName(code);
	}

	@Override
	public ResponseWrapper findPagedProcessorAdapter(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<ProcessorAdapterDto> processorAdapterDtoList = new ArrayList<>();
		Page<ProcessorAdapter> processorAdapterPage = processorAdapterHelper.findAll(pageable);
		if (!processorAdapterPage.getContent().isEmpty()) {
			ProcessorAdapterDto processorAdapterDto = null;
			for (ProcessorAdapter processorAdapter : processorAdapterPage.getContent()) {
				processorAdapterDto = new ProcessorAdapterDto();
				convertProcessorAdpEntityToDto(processorAdapter, processorAdapterDto);
				processorAdapterDtoList.add(processorAdapterDto);
			}
		} else {
			processorAdapterDtoList = new ArrayList<>();
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(processorAdapterPage,
				processorAdapterPage.getTotalElements());
		pageJPAData.setContent(processorAdapterDtoList);
		return pageJPAData;
	}

	private ProcessorAdapterDto convertProcessorAdpEntityToDto(ProcessorAdapter processorAdapter,
			ProcessorAdapterDto processorAdapterDto) {
		processorAdapterDto.setId(processorAdapter.getId());
		processorAdapterDto.setCode(processorAdapter.getCode());
		processorAdapterDto.setName(processorAdapter.getName());
		processorAdapterDto.setActive(processorAdapter.getActive());
		processorAdapterDto.setDescription(processorAdapter.getDescription());
		processorAdapterDto.setIsSAFEnabled(processorAdapter.getIsSAFEnabled());
		processorAdapterDto.setCreatedBy(processorAdapter.getCreatedBy());
		processorAdapterDto.setCreatedOn(processorAdapter.getCreatedOn());
		processorAdapterDto.setUpdatedBy(processorAdapter.getUpdatedBy());
		processorAdapterDto.setUpdatedOn(processorAdapter.getUpdatedOn());

		if (processorAdapter.getAdapterId() != null) {
			AdapterDto adapterDto = setAdpToDto(processorAdapter.getAdapterId());
			processorAdapterDto.setAdapterId(adapterDto);
		}
		if (processorAdapter.getLookupvalueId() != null) {
			LookupValueDto lookupValueDto = setlookupToDto(processorAdapter.getLookupvalueId());
			processorAdapterDto.setLookupvalueId(lookupValueDto);
		}
		return processorAdapterDto;
	}

	private LookupValueDto setlookupToDto(LookupValue lookupValue) {
		LookupValueDto lookupValueDto = new LookupValueDto();
		lookupValueDto.setLookupType(null);
		lookupValueDto.setDescription(lookupValue.getDescription());
		lookupValueDto.setId(lookupValue.getId());
		lookupValueDto.setModifiable(lookupValue.getModifiable());
		lookupValueDto.setValue(lookupValue.getValue());
		return lookupValueDto;
	}

	private AdapterDto setAdpToDto(Adapter adapter) {
		AdapterDto adapterDto = new AdapterDto();
		adapterDto.setAdapterId(adapter.getAdapterId());
		adapterDto.setActive(adapter.getActive());
		adapterDto.setGuid(adapter.getGuid());
		adapterDto.setId(adapter.getId());
		adapterDto.setName(adapter.getName());
		adapterDto.setStandardMessageSpecification(null);
		adapterDto.setType(adapter.getType());
		adapterDto.setAdapterConfiguration(null);
		return adapterDto;
	}

	@Override
	@Transactional
	public Integer addProcessorAdapter(ProcessorAdapterDto processorAdapterDto, String requestToken) {

		Integer createdId;
		ProcessorAdapter processorAdapterByCode = processorAdapterHelper.findByCode(processorAdapterDto.getCode());
		if (processorAdapterByCode != null) {
			throw new RippsAdminException("Code already exist");
		}
		validateProcessorAdapterName(HTMLInjectionUtil.validateHTMLInjection(processorAdapterDto.getName()));
		try {
			createdId = this.processorAdapterHelper.save(convertUiDtoToEntity(processorAdapterDto)).getId();
		} catch (Exception e) {
			logger.error(e);
			throw new RippsAdminRestException("Service Code Already Exists, Please Use Other Details", HttpStatus.OK);
		}
		return createdId;
	}

	public boolean validateProcessorAdapterName(String name) {
		logger.info("Inside validateProcessorAdapterName()...: {}", name);
		boolean existProcessorAdapter = false;
		if (StringUtil.isNotNullOrBlank(name)) {
			String regex = "^[a-zA-Z0-9_]*$";
			if (StringUtil.validateText(name, regex)) {
				boolean validAdapterName = processorAdapterRepository.validateName(name);
				if (validAdapterName) {
					existProcessorAdapter = true;
				} else {
					throw new RippsAdminException("Processor adapter name already exist");
				}
			} else {
				throw new RippsAdminException("Processor adapter name is invalid");
			}
		}
		return existProcessorAdapter;
	}

	@Override
	public ProcessorAdapterDto findProcessorAdapterById(int id) {
		Optional<ProcessorAdapter> optional = this.processorAdapterHelper.findById(id);

		if (optional.isPresent()) {
			ProcessorAdapter processorAdapter = optional.get();
			return convertEntityToDto(processorAdapter);
		}
		return null;
	}

	@Override
	@Transactional
	public Integer updateProcessorAdapter(int id, ProcessorAdapterDto processorAdapterDto, String requestToken) {

		Optional<ProcessorAdapter> optional = this.processorAdapterHelper.findById(id);

		if (optional.isPresent()) {
			ProcessorAdapter processorAdapter = optional.get();
			processorAdapter.setCode(HTMLInjectionUtil.validateHTMLInjection(processorAdapterDto.getCode()));
			processorAdapter.setName(HTMLInjectionUtil.validateHTMLInjection(processorAdapterDto.getName()));
			processorAdapter
					.setDescription(HTMLInjectionUtil.validateHTMLInjection(processorAdapterDto.getDescription()));
			processorAdapter.setActive(processorAdapterDto.getActive());
			processorAdapter.setIsSAFEnabled(processorAdapterDto.getIsSAFEnabled());
			processorAdapter.setUpdatedBy(authSessionService.getCreatedBy());
			processorAdapter.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
			Adapter adapter = null;
			LookupValue lookupValue = null;
			try {
				adapter = new Adapter();
				convertDtoToEntity(adapter, processorAdapterDto.getAdapterId());
			} catch (Exception e) {
				adapter = null;
			}
			try {
				lookupValue = new LookupValue();
				convertLookupDtoToEntity(lookupValue, processorAdapterDto.getLookupvalueId());
			} catch (Exception e) {
				lookupValue = null;
			}
			processorAdapter.setAdapterId(adapter);
			processorAdapter.setLookupvalueId(lookupValue);
			return this.processorAdapterHelper.save(processorAdapter).getId();

		}
		ProcessorAdapter processorAdapterByCode = processorAdapterHelper.findByCode(processorAdapterDto.getCode());
		if (processorAdapterByCode != null && processorAdapterByCode.getId() != id) {
			throw new RippsAdminException("Code already exist");
		}

		return 0;
	}

	private void convertLookupDtoToEntity(LookupValue lookupValue, LookupValueDto lookupvalueDto) {
		lookupValue.setLookupType(null);
		lookupValue.setDescription(HTMLInjectionUtil.validateHTMLInjection(lookupvalueDto.getDescription()));
		lookupValue.setId(lookupvalueDto.getId());
		lookupValue.setModifiable(lookupvalueDto.getModifiable());
		lookupValue.setValue(HTMLInjectionUtil.validateHTMLInjection(lookupvalueDto.getValue()));
	}

	private void convertDtoToEntity(Adapter adapter, AdapterDto adapterDto) {
		adapter.setAdapterId(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getAdapterId()));
		adapter.setActive(adapterDto.getActive());
		adapter.setGuid(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getGuid()));
		adapter.setId(adapterDto.getId());
		adapter.setName(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getName()));
		adapter.setStandardMessageSpecification(null);
		adapter.setType(HTMLInjectionUtil.validateHTMLInjection(adapterDto.getType()));
		adapter.setAdapterConfiguration(null);
	}

	private ProcessorAdapter convertUiDtoToEntity(ProcessorAdapterDto processorAdapterDto) {
		ProcessorAdapter processorAdapter = new ProcessorAdapter();
		processorAdapter.setCode(HTMLInjectionUtil.validateHTMLInjection(processorAdapterDto.getCode()));
		processorAdapter.setName(HTMLInjectionUtil.validateHTMLInjection(processorAdapterDto.getName()));
		processorAdapter.setDescription(HTMLInjectionUtil.validateHTMLInjection(processorAdapterDto.getDescription()));
		processorAdapter.setActive(processorAdapterDto.getActive());
		processorAdapter.setIsSAFEnabled(processorAdapterDto.getIsSAFEnabled());
		processorAdapter.setCreatedBy(authSessionService.getCreatedBy());
		processorAdapter.setCreatedOn(RippsUtility.getCurrentTimeStamp());

		Adapter adapter = null;
		LookupValue lookupValue = null;
		try {
			adapter = new Adapter();
			convertDtoToEntity(adapter, processorAdapterDto.getAdapterId());
		} catch (Exception e) {
			adapter = null;
		}
		try {
			lookupValue = new LookupValue();
			convertLookupDtoToEntity(lookupValue, processorAdapterDto.getLookupvalueId());
		} catch (Exception e) {
			lookupValue = null;
		}
		processorAdapter.setAdapterId(adapter);
		processorAdapter.setLookupvalueId(lookupValue);
		return processorAdapter;
	}

	private ProcessorAdapterDto convertEntityToDto(ProcessorAdapter processorAdapter) {
		ProcessorAdapterDto processorAdapterDto = new ProcessorAdapterDto();
		processorAdapterDto.setId(processorAdapter.getId());
		processorAdapterDto.setCode(processorAdapter.getCode());
		processorAdapterDto.setName(processorAdapter.getName());
		processorAdapterDto.setActive(processorAdapter.getActive());
		processorAdapterDto.setDescription(processorAdapter.getDescription());
		processorAdapterDto.setIsSAFEnabled(processorAdapter.getIsSAFEnabled());
		processorAdapterDto.setCreatedBy(processorAdapter.getCreatedBy());
		processorAdapterDto.setCreatedOn(processorAdapter.getCreatedOn());
		processorAdapterDto.setUpdatedBy(processorAdapter.getUpdatedBy());
		processorAdapterDto.setUpdatedOn(processorAdapter.getUpdatedOn());

		if (processorAdapter.getAdapterId() != null) {
			Optional<Adapter> optional = adapterPersistenceHelper.findById(processorAdapter.getAdapterId().getId());

			if (optional.isPresent()) {
				Adapter adapter = optional.get();
				AdapterDto adapterDto = new AdapterDto();
				adapterDto.setAdapterId(adapter.getAdapterId());
				adapterDto.setActive(adapter.getActive());
				adapterDto.setGuid(adapter.getGuid());
				adapterDto.setId(adapter.getId());
				adapterDto.setName(adapter.getName());
				adapterDto.setStandardMessageSpecification(null);
				adapterDto.setType(adapter.getType());
				adapterDto.setAdapterConfiguration(null);
				processorAdapterDto.setAdapterId(adapterDto);
			}
		}

		if (processorAdapter.getLookupvalueId() != null) {
			Optional<LookupValue> optional = lookUpValuePersistancehelper
					.findById(processorAdapter.getLookupvalueId().getId());

			if (optional.isPresent()) {
				LookupValue lookupValue = optional.get();
				LookupValueDto lookupValueDto = new LookupValueDto();
				lookupValueDto.setLookupType(null);
				lookupValueDto.setDescription(lookupValue.getDescription());
				lookupValueDto.setId(lookupValue.getId());
				lookupValueDto.setModifiable(lookupValue.getModifiable());
				lookupValueDto.setValue(lookupValue.getValue());
				processorAdapterDto.setLookupvalueId(lookupValueDto);
			}
		}
		return processorAdapterDto;
	}

	@Override
	public List<IdAndNameStringWrapper> getProAdpIdNameList() {
		List<ProcessorAdapter> proadpList = processorAdapterHelper.findByActive(true);
		return proadpList.stream()
				.map(value -> new IdAndNameStringWrapper(Integer.toString(value.getId()), value.getName())).toList();
	}

	public List<IdAndNameStringWrapper> getProAdpIdNameListIsSAFEnabled() {
		List<ProcessorAdapter> proadpList = processorAdapterHelper.findByActiveAndIsSAFEnabled(true, true);
		return proadpList.stream()
				.map(value -> new IdAndNameStringWrapper(Integer.toString(value.getId()), value.getName())).toList();
	}
}
