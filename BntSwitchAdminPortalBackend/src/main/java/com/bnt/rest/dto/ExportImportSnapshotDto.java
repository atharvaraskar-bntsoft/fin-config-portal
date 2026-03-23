package com.bnt.rest.dto;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

//@ExcludeExportMarker
public class ExportImportSnapshotDto extends BaseDto {

	private static final long serialVersionUID = 1L;

	private String name;

	private String comment;

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private String data;

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	private List<ExportSnapshotDetailDto> snapshotExportedDetail;

	public List<ExportSnapshotDetailDto> getSnapshotExportedDetail() {
		return snapshotExportedDetail;
	}

	public void setSnapshotExportedDetail(List<ExportSnapshotDetailDto> snapshotExportedDetail) {
		this.snapshotExportedDetail = snapshotExportedDetail;
	}
}
