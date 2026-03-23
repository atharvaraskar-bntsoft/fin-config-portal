package com.bnt.rest.service;

import com.bnt.rest.wrapper.dto.adapter.AdapterUiResponseWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterToolKitNetworkService {

	public AdapterUiResponseWrapper getMessageSpecification(Integer messageStandard, String adapterType);

	AdapterUiResponseWrapper enrichListValue(AdapterUiResponseWrapper adapterUiResponseWrapper);

}
