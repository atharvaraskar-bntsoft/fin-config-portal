package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import com.bnt.rest.dto.ELFunctionDto;
import com.bnt.rest.wrapper.dto.IdAndCodeWrapperString;
import com.bnt.rest.wrapper.dto.adapter.FieldSchemeImfMapperUiWrapper;
import com.bnt.rest.wrapper.dto.adapter.TransformSchemeMapperUIDto;
import com.bnt.rest.wrapper.dto.adapter.postsaction.ActionDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterToolKitTransformService {

	public List<IdAndCodeWrapperString> getRuleList(Integer templateId, Integer formatId);

	public Map<String, String> getDataMap();

	public List<FieldSchemeImfMapperUiWrapper> getFieldSchemeImfMapperUiWrapper(Integer messageStandard);

	List<ELFunctionDto> getElFunctionList();

	List<String> getFieldExcludedList(String templateName);

	List<TransformSchemeMapperUIDto> getTransformSchemeMapperList(Integer messageStandard);

	List<ActionDto> adapterPostActionsMethodList();

	List<ActionDto> adapterPreActionsMethodList();

	List<ActionDto> adapterL3PostActionsMethodList();

	List<ActionDto> adapterPostActionsMethodL3List();

	Map<String, Object> getAdapterDataMap();

	List<ActionDto> adapterL3StepMethodList();

	List<ActionDto> adapterInBuiltValidationsList();

	List<ActionDto> adapterL1StepsValidationList();

	List<ActionDto> cartPreActionsMethodList();

}
