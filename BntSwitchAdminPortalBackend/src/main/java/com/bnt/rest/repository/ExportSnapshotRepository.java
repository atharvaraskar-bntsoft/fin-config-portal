package com.bnt.rest.repository;

import java.util.Map;

import com.bnt.common.ResponseWrapper;
import com.bnt.rest.entity.ExportSnapshot;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ExportSnapshotRepository {

	ResponseWrapper findAll(Map<String, Object> requestParamMap);

	ExportSnapshot findRecordById(Integer id);

}
