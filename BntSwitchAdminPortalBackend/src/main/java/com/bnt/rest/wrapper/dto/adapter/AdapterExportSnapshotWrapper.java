package com.bnt.rest.wrapper.dto.adapter;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.bnt.rest.dto.ImfStructureDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterExportSnapshotWrapper extends AdapterUiResponseWrapper {

	private ImfStructureDto imfStructure;

	@JsonIgnoreProperties({ "imf" })
	private ImfStructureDto imfId;

	public ImfStructureDto getImfStructure() {
		return imfStructure;
	}

	public void setImfStructure(ImfStructureDto imfStructure) {
		this.imfStructure = imfStructure;
	}

	@Override
	public ImfStructureDto getImfId() {
		return imfId;
	}

	@Override
	public void setImfId(ImfStructureDto imfId) {
		this.imfId = imfId;
	}

}
