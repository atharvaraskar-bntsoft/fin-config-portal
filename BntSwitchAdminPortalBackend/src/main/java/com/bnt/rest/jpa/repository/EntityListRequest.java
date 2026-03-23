package com.bnt.rest.jpa.repository;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import com.bnt.common.util.StringUtil;
import com.bnt.enums.EntityGroupEnum;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class EntityListRequest {

	public String entityGroupName;

	public List<String> getEntities() {
		return entities;
	}

	public void setEntities(List<String> entities) {
		this.entities = entities;
	}

	private List<String> entities = new LinkedList<>();

	/**
	 * public List<String> getEntityNameList() { return entities; }
	 */

	public void setEntityNameList(List<String> entityNameList) {
		this.entities = entityNameList;
	}

	public String getEntityGroupName() {
		return entityGroupName;
	}

	public void setEntityGroupName(String entityGroupName) {
		this.entityGroupName = entityGroupName;
	}

	public EntityListRequest() {

		if (!(StringUtil.isEmptyOrNull(this.entityGroupName))) {

			entities = Arrays.asList(EntityGroupEnum.valueOf(this.entityGroupName).getValueArray());

		}
	}

	private String comment;

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}
