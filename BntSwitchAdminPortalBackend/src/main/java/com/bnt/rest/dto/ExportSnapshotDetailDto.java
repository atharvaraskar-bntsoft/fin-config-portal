package com.bnt.rest.dto;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.bnt.rest.wrapper.dto.IdAndVersionWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ExportSnapshotDetailDto extends BaseDto {

	private String entityType;

	private Integer parentEntityId;

	public Integer getParentEntityId() {
		return parentEntityId;
	}

	public void setParentEntityId(Integer parentEntityId) {
		this.parentEntityId = parentEntityId;
	}

	private Integer entityId;

	private String entityName;

	public ExportSnapshotDetailDto() {

	}

	public ExportSnapshotDetailDto(String entityType, String entityTypeName) {
		this.entityName = entityTypeName;
		this.entityType = entityType;
	}

	public String getEntityName() {
		return entityName;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((entityName == null) ? 0 : entityName.hashCode());
		result = prime * result + ((entityType == null) ? 0 : entityType.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;

		if (obj != null && getClass() != obj.getClass())
			return false;
		ExportSnapshotDetailDto other = (ExportSnapshotDetailDto) obj;
		if (entityName == null) {
			if (other != null && other.entityName != null)
				return false;
		} else if (other != null && !entityName.equals(other.entityName))
			return false;
		if (entityType == null) {
			if (other != null && other.entityType != null)
				return false;
		} else if (other != null && !entityType.equals(other.entityType))
			return false;
		return true;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

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

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public ExportImportSnapshotDto getExportSnapshot() {
		return exportSnapshot;
	}

	public void setExportSnapshot(ExportImportSnapshotDto exportSnapshot) {
		this.exportSnapshot = exportSnapshot;
	}

	private Integer version;

	private Set<IdAndVersionWrapper> idVersionListToExport = new HashSet<>();

	public Set<IdAndVersionWrapper> getIdVersionListToExport() {
		return idVersionListToExport;
	}

	public void setIdVersionListToExport(Set<IdAndVersionWrapper> idVersionListToExport) {
		this.idVersionListToExport = idVersionListToExport;
	}

	@JsonIgnore
	private ExportImportSnapshotDto exportSnapshot;
}
