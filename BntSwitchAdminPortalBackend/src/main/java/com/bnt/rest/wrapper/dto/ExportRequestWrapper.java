package com.bnt.rest.wrapper.dto;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.bnt.common.util.CollectionUtil;
import com.bnt.common.util.StringUtil;
import com.bnt.enums.EntityGroupEnum;

/**************************
 * @author vaibhav.shejol *
 **************************/

@JsonDeserialize(converter = ExportRequestWrapperPostProcessor.class)
public class ExportRequestWrapper {

	public String groupType;

	public void postProcess() {

		if (this.groupType.equals(EntityGroupEnum.ALL.name())) {
			entities = EntityGroupEnum.getAllValues();
		} else if (!(StringUtil.isEmptyOrNull(this.groupType)) && (CollectionUtil.isCollectionEmptyOrNull(entities))) {

			entities = EntityGroupEnum.getValueList(this.groupType);

		} else if ((StringUtil.isEmptyOrNull(this.groupType)) && !(CollectionUtil.isCollectionEmptyOrNull(entities))
				&& entities.size() == 1) {
			groupType = EntityGroupEnum.findByValue(entities.get(0));
		}
	}

	public List<String> getEntities() {

		return entities;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	public void setEntities(List<String> entities) {
		this.entities = entities;
	}

	private List<String> entities = new LinkedList<>();

	private String comment;

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public static ExportRequestWrapper getInstance(String groupType, String className) {
		ExportRequestWrapper obj = new ExportRequestWrapper();
		List<String> entityList = new ArrayList<>();

		entityList.add(className);
		if (StringUtil.isEmptyOrNull(groupType)) {
			groupType = EntityGroupEnum.findByValue(className);
		}
		obj.setGroupType(groupType);
		obj.setEntities(entityList);
		return obj;
	}
}
