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

import com.bnt.common.util.StringUtil;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.Merchant;
import com.bnt.rest.repository.AdapterDataEnrichmentRepository;
import com.bnt.rest.service.AdapterDataEnrichmentService;
import com.bnt.rest.service.ImfStructureService;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.wrapper.dto.ImfFields;
import com.bnt.rest.wrapper.dto.adapter.FieldsDataHolder;
import com.bnt.service.mapper.AdapterToolKitImfMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AdapterDataEnrichmentServiceImpl implements AdapterDataEnrichmentService {

	private static final Logger logger = LogManager.getLogger(AdapterDataEnrichmentServiceImpl.class);

	@Value("${message.exchange.fields}")
	private String msgExchangeFields;

	@Value("${message.context.fields}")
	private String msgContextFields;

	@Autowired
	private ImfStructureService imfStructureService;

	@Autowired
	private AdapterDataEnrichmentRepository adapterDataEnrichmentRepository;

	@Autowired
	ListService listService;

	@Override
	public Map<String, List<String>> getEntityMappingList() {
		Map<String, List<String>> entityMappingList = new HashMap<>();

		List<String> listMarchent = adapterDataEnrichmentRepository.getentityFieldList(Merchant.class);
		List<String> listDevice = adapterDataEnrichmentRepository.getentityFieldList(Device.class);

		listMarchent.add("code (where)");
		listDevice.add("code (where)");

		entityMappingList.put("Merchant", listMarchent);
		entityMappingList.put("Device", listDevice);

		return entityMappingList;
	}

	@Override
	public List<String> getImfFieldList() {
		List<String> imfFieldList = null;

		ImfStructureDto imfStructureDto = imfStructureService.findMaxVersionImfStructure();
		String imf = imfStructureDto.getImf();

		imfFieldList = AdapterToolKitImfMapper.getFieldNameListHideFalse(imf);
		logger.info(imfFieldList.size());

		return imfFieldList;
	}

	@Override
	public List<String> getImfByIdFieldList(Integer id) {
		logger.info("inside getImfByIdFieldList with id:{}", id);

		ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(id);
		String imf = imfStructureDto.getImf();

		List<String> imfFieldList = AdapterToolKitImfMapper.getFieldNameList(imf);
		logger.info("imfFieldList.size():{} ", imfFieldList.size());

		return imfFieldList;
	}

	@Override
	public List<String> getImfByIdFieldListWithHideFalse(Integer id) {
		logger.info("inside getImfByIdFieldList with id:{}", id);

		ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(id);
		String imf = imfStructureDto.getImf();

		List<String> imfFieldList = AdapterToolKitImfMapper.getFieldNameListHideFalse(imf);
		logger.info(imfFieldList.size());

		return imfFieldList;
	}

	@Override
	public List<ImfFields> getImfFieldsListByIdHideFalse(Integer id) {
		logger.info("inside getImfFieldObjectByIdHideFalse with id:{}", id);
		ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(id);
		List<ImfFields> listImfFields = AdapterToolKitImfMapper.getFieldsList(imfStructureDto.getImf());
		List<ImfFields> listImfFieldsWithHideOption = new ArrayList<>();
		String alliasName = "";
		if (!listImfFields.isEmpty()) {
			for (ImfFields imfFields : listImfFields) {
				if (!imfFields.isHide()) {

					if (imfFields.getAlias() == null || "NULL".equalsIgnoreCase(imfFields.getAlias())
							|| "".equalsIgnoreCase(imfFields.getAlias())) {
						alliasName = imfFields.getName();
						alliasName = alliasName.substring(alliasName.lastIndexOf(".") + 1, alliasName.length());
						alliasName = AdapterToolKitImfMapper.camelCaseConversion(alliasName);
						imfFields.setAlias(alliasName);
					}
					listImfFieldsWithHideOption.add(imfFields);
				}
			}
		}
		logger.info(listImfFieldsWithHideOption.size());
		return listImfFieldsWithHideOption;
	}

	@Override
	public FieldsDataHolder getMessageContextFieldList() {
		logger.info("inside getMessageContextFieldList()...");
		FieldsDataHolder messageContextFields = getMessageFields(msgContextFields, ",", "Message_Context", "1");
		FieldsDataHolder messageExchangeFields = getMessageFields(msgExchangeFields, ",", "Message_Exchanges", "2");

		FieldsDataHolder imfFieldsDataHolder = new FieldsDataHolder();
		imfFieldsDataHolder.setName("IMF");
		imfFieldsDataHolder.setAlias(AdapterToolKitImfMapper.camelCaseConversion("IMF"));
		imfFieldsDataHolder.setType(AdapterToolKitImfMapper.TYPE_FIELDS);

		ImfStructureDto imfStructureDto = imfStructureService.findMaxVersionImfStructure();
		String imf = imfStructureDto.getImf();
		imfFieldsDataHolder.setAttributes(AdapterToolKitImfMapper.getImfAttribute(imf));
		enrichFieldsDataHolder(imfFieldsDataHolder);

		messageExchangeFields = AdapterToolKitImfMapper.setFieldsDataHolderAttribute(messageExchangeFields,
				imfFieldsDataHolder);
		messageContextFields = AdapterToolKitImfMapper.setFieldsDataHolderAttribute(messageContextFields,
				messageExchangeFields);
		return messageContextFields;
	}

	public FieldsDataHolder getMessageFields(String fieldData, String splitter, String name, String useCase) {
		logger.info("Inside getMessageFields for name :{}", name);
		List<FieldsDataHolder> listFields = new ArrayList<>();
		String[] fieldsArray = fieldData.split(splitter);

		FieldsDataHolder fieldsDataHolderParent = new FieldsDataHolder();
		fieldsDataHolderParent.setName(name);
		fieldsDataHolderParent.setAlias(AdapterToolKitImfMapper.camelCaseConversion(name));
		fieldsDataHolderParent.setType(AdapterToolKitImfMapper.TYPE_FIELDS);
		fieldsDataHolderParent.setNestedName(fieldsDataHolderParent.getName());

		FieldsDataHolder fieldsDataHolder = null;
		for (String field : fieldsArray) {
			String[] fieldsArraychild = field.split("\\|");
			fieldsDataHolder = new FieldsDataHolder();
			fieldsDataHolder.setName(fieldsArraychild[0]);
			fieldsDataHolder.setAlias(fieldsArraychild[1]);
			fieldsDataHolder.setType(AdapterToolKitImfMapper.TYPE_FIELD);
			fieldsDataHolder.setData(listService.getData(fieldsDataHolder.getName()));
			fieldsDataHolder.setUseCase(useCase);
			fieldsDataHolder.setNestedName(fieldsDataHolder.getName());
			fieldsDataHolder.setOperator(listService.getOperatorsList("string"));
			listFields.add(fieldsDataHolder);
		}
		fieldsDataHolderParent.setAttributes(listFields);
		return fieldsDataHolderParent;
	}

	@Override
	public FieldsDataHolder getFromListFieldListByImfVersion(Integer id) {
		logger.info("inside getMessageContextFieldListByImfVersion with id: {}", id);
		FieldsDataHolder fieldsDataHolder = null;
		try {
			fieldsDataHolder = getMessageContextFieldListByImfVersion(id);
		} catch (Exception e) {
			logger.error(e);
			logger.info("getMessageContextFieldListByImfVersion failed now calling default list with max IMF version");
			fieldsDataHolder = getMessageContextFieldList();
		}
		return fieldsDataHolder;
	}

	@Override
	public FieldsDataHolder getFromListFieldListByImfVersionExtract(Integer id) {
		logger.info("inside getMessageContextFieldListByImfVersion with id: {}", id);
		FieldsDataHolder fieldsDataHolder = null;
		try {
			fieldsDataHolder = getMessageContextFieldListByImfVersionExtract(id);
		} catch (Exception e) {
			logger.error(e);
			logger.info("getMessageContextFieldListByImfVersion failed now calling default list with max IMF version");
			fieldsDataHolder = getMessageContextFieldList();
		}
		return fieldsDataHolder;
	}

	@Override
	public FieldsDataHolder getMessageContextFieldListByImfVersion(Integer id) {
		logger.info("inside getMessageContextFieldListByImfVersion with Id: {}", id);
		FieldsDataHolder messageContextFields = getMessageFields(msgContextFields, ",", "Message_Context", "1");
		FieldsDataHolder messageExchangeFields = getMessageFields(msgExchangeFields, ",", "Message_Exchanges", "2");

		FieldsDataHolder imfFieldsDataHolder = new FieldsDataHolder();
		imfFieldsDataHolder.setName("IMF");
		imfFieldsDataHolder.setAlias(AdapterToolKitImfMapper.camelCaseConversion("IMF"));
		imfFieldsDataHolder.setType(AdapterToolKitImfMapper.TYPE_FIELDS);

		ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(id);
		String imf = imfStructureDto.getImf();
		imfFieldsDataHolder.setAttributes(AdapterToolKitImfMapper.getImfAttributeByHideFalse(imf));
		enrichFieldsDataHolder(imfFieldsDataHolder);

		messageExchangeFields = AdapterToolKitImfMapper.setFieldsDataHolderAttribute(messageExchangeFields,
				imfFieldsDataHolder);
		messageContextFields = AdapterToolKitImfMapper.setFieldsDataHolderAttribute(messageContextFields,
				messageExchangeFields);
		return messageContextFields;
	}

	@Override
	public FieldsDataHolder getMessageContextFieldListByImfVersionExtract(Integer id) {
		logger.info("inside getMessageContextFieldListByImfVersion with Id: {}", id);
		FieldsDataHolder messageContextFields = getMessageFields(msgContextFields, ",", "Message_Context", "1");
		FieldsDataHolder messageExchangeFields = getMessageFields(msgExchangeFields, ",", "Message_Exchanges", "2");

		FieldsDataHolder imfFieldsDataHolder = new FieldsDataHolder();
		imfFieldsDataHolder.setName("IMF");
		imfFieldsDataHolder.setAlias(AdapterToolKitImfMapper.camelCaseConversion("IMF"));
		imfFieldsDataHolder.setType(AdapterToolKitImfMapper.TYPE_FIELDS);

		ImfStructureDto imfStructureDto = imfStructureService.findImfStructureDtoById(id);
		String imf = imfStructureDto.getImf();
		imfFieldsDataHolder.setAttributes(AdapterToolKitImfMapper.getImfAttributeByHideFalseExtract(imf));
		enrichFieldsDataHolder(imfFieldsDataHolder);

		messageExchangeFields = AdapterToolKitImfMapper.setFieldsDataHolderAttribute(messageExchangeFields,
				imfFieldsDataHolder);
		messageContextFields = AdapterToolKitImfMapper.setFieldsDataHolderAttribute(messageContextFields,
				messageExchangeFields);
		return messageContextFields;
	}

	private void enrichFieldsDataHolder(FieldsDataHolder fieldsDataHolder) {
//		logger.info("inside enrichFieldsDataHolder with getNestedName: {}", fieldsDataHolder.getNestedName());

		String operator = fieldsDataHolder.getDatatype();
		if (!StringUtil.isNotNullOrBlank(operator)) {
			operator = "String";
		}
		fieldsDataHolder.setOperator(listService.getOperatorsList(operator));
		if (fieldsDataHolder.getAttributes() != null) {
			List<FieldsDataHolder> attributes = new ArrayList<>();
			for (FieldsDataHolder childFieldsDataHolder : fieldsDataHolder.getAttributes()) {
				enrichFieldsDataHolder(childFieldsDataHolder);
				attributes.add(childFieldsDataHolder);
			}
			fieldsDataHolder.setAttributes(attributes);
		}
	}
}
