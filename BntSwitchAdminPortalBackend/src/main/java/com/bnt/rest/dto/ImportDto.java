package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ImportDto extends BaseDto {

	private String fileId;

	private String instituteCount;

	private String merchantCount;

	private String locationCount;

	private String deviceCount;

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String getInstituteCount() {
		return instituteCount;
	}

	public void setInstituteCount(String instituteCount) {
		this.instituteCount = instituteCount;
	}

	public String getMerchantCount() {
		return merchantCount;
	}

	public void setMerchantCount(String merchantCount) {
		this.merchantCount = merchantCount;
	}

	public String getLocationCount() {
		return locationCount;
	}

	public void setLocationCount(String locationCount) {
		this.locationCount = locationCount;
	}

	public String getDeviceCount() {
		return deviceCount;
	}

	public void setDeviceCount(String deviceCount) {
		this.deviceCount = deviceCount;
	}
}
