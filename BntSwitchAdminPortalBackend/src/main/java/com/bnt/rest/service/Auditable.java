package com.bnt.rest.service;

import com.bnt.rest.entity.BaseEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface Auditable {

	BaseEntity getAudit();

	void setBaseEntity(BaseEntity audit);
}
