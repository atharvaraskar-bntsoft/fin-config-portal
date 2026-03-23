package com.bnt.common.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.bnt.bswitch.transformer.processor.FieldTransformation;
import com.bnt.bswitch.transformer.processor.transaction.AdapterRequestMapping;
import com.bnt.bswitch.transformer.processor.transaction.AdapterTransaction;
import com.bnt.bswitch.transformer.processor.transaction.TransactionFieldsMapping;
import com.bnt.bswitch.transformer.processor.transaction.TransactionSet;
import com.bnt.ruleengine.sample.adp.AdapterReqResMapping;
import com.bnt.ruleengine.sample.adp.MappingCopyAsIs;
import com.bnt.ruleengine.sample.adp.MappingExtract;
import com.bnt.ruleengine.sample.adp.MappingLoop;
import com.bnt.ruleengine.sample.adp.MappingUtiltiy;
import com.bnt.ruleengine.sample.adp.TransactionMappingUi;
import com.bnt.ruleengine.sample.adp.UIJsonUtility;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ParamMapUtil {

	public static void main(String[] args) {
		String uiMapping = null;
		getRequestMappingFromUiMapping(uiMapping);
	}

	public static AdapterTransaction getRequestMappingFromUiMapping(String mapping) {

		AdapterReqResMapping uiMapping = JsonObjectUtil.getGenericObjectFromJsonString(mapping,
				AdapterReqResMapping.class);
		List<MappingLoop> list = new ArrayList<>();
		if (uiMapping.getListCopyAsIsMapping() != null) {
			for (MappingCopyAsIs map : uiMapping.getListCopyAsIsMapping()) {
				if (map.getParentField() != null && !map.getParentField().isEmpty()) {
					MappingLoop loop = new MappingLoop();
					loop.setParentField("${" + map.getParentField() + "}");
					loop.setCondition(map.getCondition());
					loop.setEcho(map.isEcho());
					loop.setImfField(map.getImfField());
					loop.setIpc(map.getIpc());
					// loop.setListFunction(null);
					loop.setListValidationFunction(map.getListValidationFunction());
					loop.setStatus(map.getStatus());
					loop.setType(map.getType());
					loop.setPackagerField("${" + map.getPackagerField() + "}");
					list.add(loop);
				}
			}
			uiMapping.getListCopyAsIsMapping().removeIf(map -> map.getParentField() != null);
		}

		if (uiMapping.getListExtractMapping() != null) {
			for (MappingExtract map : uiMapping.getListExtractMapping()) {
				if (map.getParentField() != null && !map.getParentField().isEmpty()) {
					MappingLoop loop = new MappingLoop();
					loop.setParentField("${" + map.getParentField() + "}");
					loop.setCondition(map.getCondition());
					loop.setEcho(map.isEcho());
					loop.setImfField(map.getImfField());
					loop.setIpc(map.getIpc());
					loop.setListFunction(map.getListFunction());
					loop.setListValidationFunction(map.getListValidationFunction());
					loop.setStatus(map.getStatus());
					loop.setType(map.getType());
					loop.setPackagerField("${" + map.getPackagerField() + "}");
					list.add(loop);
				}
			}
			uiMapping.getListExtractMapping().removeIf(map -> map.getParentField() != null);
		}

		List<FieldTransformation> listAllMappingFields = new ArrayList<>();
		Collection<? extends FieldTransformation> listArraySupport = MappingUtiltiy.fetchLoopList(list);
		Collection<? extends FieldTransformation> listCopyAsIs = MappingUtiltiy
				.fetchCopyAsIsFieldList(uiMapping.getListCopyAsIsMapping(), null);
		Collection<? extends FieldTransformation> listExtract = MappingUtiltiy
				.fetchExtractFieldListExtract(uiMapping.getListExtractMapping());
		Collection<? extends FieldTransformation> listJoin = MappingUtiltiy
				.fetchJoinFieldListExtract(uiMapping.getListJoinMapping());
		Collection<? extends FieldTransformation> listConstant = MappingUtiltiy
				.fetchConstantFieldListExtract(uiMapping.getListConstantMappingField());
		listAllMappingFields.addAll(listCopyAsIs);
		listAllMappingFields.addAll(listExtract);
		listAllMappingFields.addAll(listJoin);
		listAllMappingFields.addAll(listArraySupport);
		listAllMappingFields.addAll(listConstant);
		TransactionFieldsMapping adapterRequestMapping = new AdapterRequestMapping(listAllMappingFields, null);
		AdapterTransaction adpTransaction = new AdapterTransaction(null, null,
				(TransactionFieldsMapping) adapterRequestMapping, null, null, null);
		return adpTransaction;
	}

	private static String generateRequestMapping(TransactionSet transactionSet) {
		String requestJson = null;
		try {
			requestJson = new ObjectMapper().writeValueAsString(transactionSet);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return requestJson;
	}
}
