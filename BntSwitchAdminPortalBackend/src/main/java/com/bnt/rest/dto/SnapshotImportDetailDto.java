package com.bnt.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.bnt.common.util.JsonObjectUtil;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SnapshotImportDetailDto extends BaseDto {

	private String fileName;

	private String comment;

	@JsonIgnore
	private String dataToImport;

	@JsonProperty("dataToImport")
	private Object dataToImportUi;

	@JsonIgnore
	private String importedDataReport;

	@JsonProperty("importedDataReport")
	private Object importedDataReportUi;

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
		this.dataToImportUi = JsonObjectUtil.getObjectFromJsonString(dataToImport);
		this.dataToImport = dataToImport;
	}

	public String getImportedDataReport() {
		return importedDataReport;
	}

	public void setImportedDataReport(String importedDataReport) {
		this.importedDataReportUi = JsonObjectUtil.getObjectFromJsonString(importedDataReport);
		this.importedDataReport = importedDataReport;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Object getDataToImportUi() {
		return dataToImportUi;
	}

	public void setDataToImportUi(Object dataToImportUi) {
		this.dataToImportUi = dataToImportUi;
	}

	public Object getImportedDataReportUi() {
		return importedDataReportUi;
	}

	public void setImportedDataReportUi(Object importedDataReportUi) {
		this.importedDataReportUi = importedDataReportUi;
	}
}
