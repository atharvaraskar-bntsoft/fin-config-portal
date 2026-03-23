package com.bnt.rest.wrapper.dto;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TxnRepairFieldMappingConfig {
	private static final Logger logger = LogManager.getLogger(TxnRepairFieldMappingConfig.class);

	protected Map<String, RepairFieldsAttributes> repairFields;

	public TxnRepairFieldMappingConfig() {
		// do nothing
	}

	public Map<String, RepairFieldsAttributes> getRepairFields() {
		return repairFields;
	}

	public void setRepairFields(Map<String, RepairFieldsAttributes> errorCodeConfig) {
		this.repairFields = errorCodeConfig;
	}
}
