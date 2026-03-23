package com.bnt.main;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import com.bnt.common.PrePostUpdateMarker;
import com.bnt.common.util.RippsUtility;
import com.bnt.rest.entity.AuditEntity;
import com.bnt.rest.entity.AuditTimeEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

//Audit Entity Specific Listener invoke on save and update
public class AuditListener {

	@PrePersist
	public void setCreatedOn(PrePostUpdateMarker object) {

		if (object instanceof AuditEntity auditEntity) {
			if (auditEntity.getCreatedBy() == null) {
				RippsUtility.setCreated(auditEntity, 1);
			}
			auditEntity.setUpdatedOn(RippsUtility.getCurrentTime());

		} else if (object instanceof AuditTimeEntity auditEntity) {
			auditEntity.setCreatedOn(RippsUtility.getCurrentTime());
			auditEntity.setUpdatedOn(RippsUtility.getCurrentTime());
		}
	}

	@PreUpdate
	public void setUpdatedOn(PrePostUpdateMarker object) {

		if (object instanceof AuditEntity auditEntity) {
			if (auditEntity.getCreatedBy() == null) {
				RippsUtility.setCreated(auditEntity, 1);
			}
			RippsUtility.setUpdated(auditEntity, 1);
		} else if (object instanceof AuditTimeEntity auditEntity) {
			auditEntity.setUpdatedOn(RippsUtility.getCurrentTime());
		}
	}
}
