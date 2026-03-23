package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "snapshot_import_detail")
public class SnapshotImportDetail extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "file_name")
	private String fileName;

	@Column(name = "comment")
	private String comment;

	@Column(name = "data_to_import")
	private String dataToImport;

	@Column(name = "imported_data_report")
	private String importedDataReport;

	@Column(name = "status")
	private String status;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getDataToImport() {
		return dataToImport;
	}

	public void setDataToImport(String dataToImport) {
		this.dataToImport = dataToImport;
	}

	public String getImportedDataReport() {
		return importedDataReport;
	}

	public void setImportedDataReport(String importedDataReport) {
		this.importedDataReport = importedDataReport;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
