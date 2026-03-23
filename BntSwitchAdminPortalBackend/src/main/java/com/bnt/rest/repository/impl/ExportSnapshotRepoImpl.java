package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.constant.ParameterConstant;
import com.bnt.rest.dto.ExportImportSnapshotDto;
import com.bnt.rest.dto.ExportSnapshotDetailDto;
import com.bnt.rest.entity.ExportSnapshot;
import com.bnt.rest.entity.ExportSnapshotDetail;
import com.bnt.rest.jpa.repository.ExportSnapshotPersistenceHelper;
import com.bnt.rest.repository.ExportSnapshotRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class ExportSnapshotRepoImpl implements ExportSnapshotRepository {

	@Autowired
	ExportSnapshotPersistenceHelper jpaHelper;

	@Override
	public ResponseWrapper findAll(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<ExportSnapshot> page = null;
		long totalCount;
		totalCount = jpaHelper.count();
		if (filters == null) {
			page = jpaHelper.findAll(pageable);
		}
		List<ExportImportSnapshotDto> list = new ArrayList<>();

		if (page != null) {
			getExportSnapshotData(list, page.getContent());
		}
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(page, totalCount);
		pageJPAData.setContent(list);
		return pageJPAData;
	}

	private List<ExportImportSnapshotDto> getExportSnapshotData(List<ExportImportSnapshotDto> list,
			List<ExportSnapshot> content) {
		for (ExportSnapshot exportSnapshot : content) {
			ExportImportSnapshotDto exportImportSnapshotDto = new ExportImportSnapshotDto();
			exportImportSnapshotDto.setComment(exportSnapshot.getComment());
			exportImportSnapshotDto.setId(exportSnapshot.getId());
			exportImportSnapshotDto.setName(exportSnapshot.getName());
			ExportSnapshotDetailDto exportSnapshotDetailDto = new ExportSnapshotDetailDto();
			List<ExportSnapshotDetailDto> listExportSnapshotDetailDto = null;
			for (ExportSnapshotDetail exportSnapshotDetail : exportSnapshot.getSnapshotExportedDetail()) {
				listExportSnapshotDetailDto = new ArrayList<>();
				exportSnapshotDetailDto.setEntityType(exportSnapshotDetail.getEntityType());
				if (exportSnapshotDetail.getVersion() != null) {
					long version = exportSnapshotDetail.getVersion();
					int snapshotVersion = (int) version;
					exportSnapshotDetailDto.setVersion(snapshotVersion);
				} else {
					exportSnapshotDetailDto.setVersion(null);
				}
				listExportSnapshotDetailDto.add(exportSnapshotDetailDto);
			}

			exportImportSnapshotDto.setSnapshotExportedDetail(listExportSnapshotDetailDto);
			list.add(exportImportSnapshotDto);
		}
		return list;
	}

	@Override
	public ExportSnapshot findRecordById(Integer id) {
		return jpaHelper.findById(id).orElse(null);
	}
}
