package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.rest.wrapper.dto.ImfFields;
import com.bnt.rest.wrapper.dto.adapter.FieldsDataHolder;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterDataEnrichmentService {

	public Map<String, List<String>> getEntityMappingList();

	public List<String> getImfFieldList();

	public List<String> getImfByIdFieldList(Integer id);

	List<String> getImfByIdFieldListWithHideFalse(Integer id);

	public List<ImfFields> getImfFieldsListByIdHideFalse(Integer id);

	FieldsDataHolder getMessageContextFieldList();

	FieldsDataHolder getMessageContextFieldListByImfVersion(Integer id);

	FieldsDataHolder getFromListFieldListByImfVersion(Integer id);

	FieldsDataHolder getFromListFieldListByImfVersionExtract(Integer id);

	FieldsDataHolder getMessageContextFieldListByImfVersionExtract(Integer id);

}
