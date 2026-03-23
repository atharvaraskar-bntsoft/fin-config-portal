package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Version;

import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "entity_export")
@ExcludeExportMarker
public class EntityExport extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "group_type")
	private String groupType;

	@Column(name = "comment")
	private String comment;

	@Column(name = "data", nullable = false)
	private String data;

	@Version
	@Column(name = "version", nullable = false)
	// @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long version;

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public String getGroupType() {
		return groupType;
	}

	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}
}
