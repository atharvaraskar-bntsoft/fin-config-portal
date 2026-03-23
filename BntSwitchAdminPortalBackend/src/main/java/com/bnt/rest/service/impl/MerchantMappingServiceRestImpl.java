package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.rest.dto.MerchantCodeMappingDto;
import com.bnt.rest.entity.MerchantCodeMapping;
import com.bnt.rest.repository.MerchantMappingRepository;
import com.bnt.rest.service.MerchantMappingServiceRest;
import com.bnt.rest.service.ProcessorAdapterService;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class MerchantMappingServiceRestImpl implements MerchantMappingServiceRest {

	private static final Logger logger = LogManager.getLogger(MerchantMappingServiceRestImpl.class);

	@Autowired
	private MerchantMappingRepository repository;

	@Autowired
	private ProcessorAdapterService processorService;

	@Value("${mid.mapping.option.list}")
	private String midTidMappingOptionList;

	@Override
	public ResponseWrapper findPagedMerchantMapping(Map<String, Object> requestParamMap) {
		return repository.findMerchantMapping(requestParamMap);
	}

	@Override
	public MerchantCodeMapping findMerchantCodeMappingById(int id) {
		return this.repository.findOne(id);
	}

	@Override
	public void deleteById(Integer id) {
		repository.deleteById(id);
	}

	@Override
	public Integer saveMerchantCodeMapping(MerchantCodeMappingDto mappingDto) {
		return repository.saveMerchantCodeMapping(mappingDto);
	}

	@Override
	public void updateMerchantCodeMapping(MerchantCodeMappingDto mappingDto, MerchantCodeMapping mapping) {
		logger.info("inside updateMerchantCodeMapping");
		if (StringUtil.isNotNullOrBlank(mapping.getDestinationAcquirer())) {
			updateMerchantCodeMapping1(mappingDto, mapping);
		}
		if (StringUtil.isNotNullOrBlank(mapping.getDestinationMerchant())) {
			updateMerchantCodeMapping2(mappingDto, mapping);
		}
		if (StringUtil.isNotNullOrBlank(mapping.getDestinationLocation())) {
			updateMerchantCodeMapping3(mappingDto, mapping);
		}
		if (StringUtil.isNotNullOrBlank(mapping.getDestinationDevice())) {
			updateMerchantCodeMapping4(mappingDto, mapping);
		}
		/**
		 * copyData(mapping, mappingDto); if (mappingDto.getActive()) {
		 * mapping.setActive('1'); } else { mapping.setActive('0'); }
		 * mapping.setProcessorId(processHelper.findById(Integer.parseInt(mappingDto.getProcessorId().getId())).get());
		 * // mapping.setMerchantCode(mappingDto.getMerchantCode()); //
		 * mapping.setProcessorMerchantCode(mapping.getProcessorMerchantCode());
		 * mapping.setCreatedBy(1);
		 * mapping.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
		 * mapping.setUpdatedBy(1);
		 */

		if (mappingDto.getActive()) {
			mapping.setActive('1');
		} else {
			mapping.setActive('0');
		}
		repository.updateMerchantCodeMapping(mapping);
	}

	/**
	 * @param mappingDto
	 * @param mapping
	 */
	private void updateMerchantCodeMapping4(MerchantCodeMappingDto mappingDto, MerchantCodeMapping mapping) {
		if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationDevice())) {
			mapping.setDestinationDevice(mappingDto.getDestinationDevice());
		} else {
			throw new RippsAdminException("Destination Device is mandatory");
		}
	}

	/**
	 * @param mappingDto
	 * @param mapping
	 */
	private void updateMerchantCodeMapping3(MerchantCodeMappingDto mappingDto, MerchantCodeMapping mapping) {
		if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationLocation())) {
			mapping.setDestinationLocation(mappingDto.getDestinationLocation());
		} else {
			throw new RippsAdminException("Destination Location is mandatory");
		}
	}

	/**
	 * @param mappingDto
	 * @param mapping
	 */
	private void updateMerchantCodeMapping2(MerchantCodeMappingDto mappingDto, MerchantCodeMapping mapping) {
		if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationMerchant())) {
			mapping.setDestinationMerchant(mappingDto.getDestinationMerchant());
		} else {
			throw new RippsAdminException("Destination Merchant is mandatory");
		}
	}

	/**
	 * @param mappingDto
	 * @param mapping
	 */
	private void updateMerchantCodeMapping1(MerchantCodeMappingDto mappingDto, MerchantCodeMapping mapping) {
		if (StringUtil.isNotNullOrBlank(mappingDto.getDestinationAcquirer())) {
			mapping.setDestinationAcquirer(mappingDto.getDestinationAcquirer());
		} else {
			throw new RippsAdminException("Destination Acquirer is mandatory");
		}
	}

//    @SuppressWarnings("unused")
//    private void copyData(MerchantCodeMapping mapping, MerchantCodeMappingDto mappingDto) {
//        MerchantCodeMapping newMapping = null;
//
//        try {
//            //
//            newMapping = new MerchantCodeMapping();
//            mappingDto.setCreatedBy(1);
//            mappingDto.setCreatedOn(RippsUtility.getCurrentTimeStamp());
//
//            mapping.setCreatedBy(1);
//            mapping.setCreatedOn(RippsUtility.getCurrentTimeStamp());
//            ReflectionUtil.copy(mapping, mappingDto);
//
//        } catch (Exception e) {
//            //Auto-generated catch block
//            throw new RippsAdminException("Exception while updating entity Data");
//        }
//    }

	@Override
	public void updateStatusMerchantCodeMapping(String active, MerchantCodeMapping mapping) {
		if (active != null && active.equalsIgnoreCase("true")) {
			mapping.setActive('1');
		} else {
			mapping.setActive('0');
		}
		mapping.setUpdatedBy(1);
		mapping.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
		repository.updateMerchantCodeMapping(mapping);
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("processorList", processorService.getProAdpIdNameList());
		map.put("status", ListMapper.getStatus());
		return map;
	}

	@Override
	public List<IdAndCodeWrapperString> getAllConfigureOptions() {
		logger.info("Inside getAllConfigureOptions");
		logger.info("MID_MAPPING_OPTION_LIST: {}", midTidMappingOptionList);
		String[] options = midTidMappingOptionList.split(",");
		List<IdAndCodeWrapperString> list = new ArrayList<>();
		for (String opr : options) {
			IdAndCodeWrapperString idAndCodeWrapperString = new IdAndCodeWrapperString();
			String[] array = opr.split("\\|");
			idAndCodeWrapperString.setId(array[0]);
			idAndCodeWrapperString.setCode(array[1]);
			list.add(idAndCodeWrapperString);
		}
		return list;
	}
}
