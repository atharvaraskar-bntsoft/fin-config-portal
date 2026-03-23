package com.bnt.ruleengine.sample.adp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.bnt.bswitch.transformer.processor.FieldTransformation;
import com.bnt.bswitch.transformer.processor.transaction.ConditionalResponse;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MultiResponseUtility {

	public static ConditionalResponse fetchConditionalResponse(AdapterReqResMapping responseMapping,
			Map<String, Object> mapObject) {
		List<FieldTransformation> listAllMappingFields = new ArrayList<>();
		// Add all constant fields
		listAllMappingFields.addAll(
				MappingUtiltiy.fetchConstantFieldList(responseMapping.getListConstantMappingField(), mapObject));
		// Add all copy as is fields
		listAllMappingFields
				.addAll(MappingUtiltiy.fetchCopyAsIsFieldList(responseMapping.getListCopyAsIsMapping(), mapObject));
		// Add all extract fields
		listAllMappingFields
				.addAll(MappingUtiltiy.fetchExtractFieldList(responseMapping.getListExtractMapping(), mapObject));
		// Add all Join fields(L3 Only)
		listAllMappingFields.addAll(MappingUtiltiy.fetchJoinFieldList(responseMapping.getListJoinMapping(), mapObject));
		// Add all Mapper fields
		listAllMappingFields
				.addAll(MappingUtiltiy.fetchMapperFieldList(responseMapping.getListMapperMapping(), mapObject));
		// Add all Script fields
		listAllMappingFields.addAll(MappingUtiltiy.fetchScriptFieldList(responseMapping.getListScriptMapping()));
		// Add all ArraySupport fields
		listAllMappingFields.addAll(MappingUtiltiy.fetchLoopList(responseMapping.getListLoopMapping()));
		return null;// new ConditionalResponse(listAllMappingFields,
					// responseMapping.getResponseCondition(),
					// responseMapping.getResponsePackagerName());
	}
}
