package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "snapshot_export")
@ExcludeExportMarker
public class ExportSnapshot extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "name")
	private String name;

	@Column(name = "comment")
	private String comment;

	@Column(name = "entities_data", nullable = false)
	private String data;

	@OneToMany(mappedBy = "exportSnapshot", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonManagedReference
	@OrderBy("version DESC")
	private List<ExportSnapshotDetail> snapshotExportedDetail;

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

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public List<ExportSnapshotDetail> getSnapshotExportedDetail() {
		return snapshotExportedDetail;
	}

	public void setSnapshotExportedDetail(List<ExportSnapshotDetail> snapshotExportedDetail) {

		this.snapshotExportedDetail = snapshotExportedDetail;
	}
}
