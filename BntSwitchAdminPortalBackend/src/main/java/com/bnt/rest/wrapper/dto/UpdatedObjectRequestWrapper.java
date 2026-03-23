package com.bnt.rest.wrapper.dto;

import java.util.ArrayList;
import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class UpdatedObjectRequestWrapper {

	List<UpdatedValueObjDto> updatedValueObjList = new ArrayList<>();

	public List<UpdatedValueObjDto> getUpdatedValueObjList() {
		return updatedValueObjList;
	}

	public void setUpdatedValueObjList(List<UpdatedValueObjDto> updatedValueObjList) {
		this.updatedValueObjList = updatedValueObjList;
	}
}
