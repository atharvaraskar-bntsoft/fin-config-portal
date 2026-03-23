package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "snapshot_export_detail")
@ExcludeExportMarker
public class ExportSnapshotDetail extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "entity_type")
	private String entityType;

	@Column(name = "entity_id")
	private Integer entityId;

	@Column(name = "entity_version")
	private Long version;

	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "snapshot_export_id", referencedColumnName = "id")
	private ExportSnapshot exportSnapshot;

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public Integer getEntityId() {
		return entityId;
	}

	public void setEntityId(Integer entityId) {
		this.entityId = entityId;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public ExportSnapshot getExportSnapshot() {
		return exportSnapshot;
	}

	public void setExportSnapshot(ExportSnapshot exportSnapshot) {
		this.exportSnapshot = exportSnapshot;
	}
}
