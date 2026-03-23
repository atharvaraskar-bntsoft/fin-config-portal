package com.bnt.common.util;

import org.hibernate.envers.query.AuditEntity;
import org.hibernate.envers.query.order.AuditOrder;

import com.bnt.constant.ParameterConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JpaAuditHelper {

	private JpaAuditHelper() {
	}

	public static AuditOrder getAuditOrder(String order) {

		if (order.equals(ParameterConstant.ASC)) {
			return AuditEntity.revisionNumber().asc();
		} else {
			return AuditEntity.revisionNumber().desc();
		}
	}
}
