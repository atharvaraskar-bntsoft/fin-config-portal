package com.bnt.rest.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "device_type")
public class DeviceType extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "code", nullable = false)
	private String code;

	public Character getDeleted() {
		return deleted;
	}

	public void setDeleted(Character deleted) {
		this.deleted = deleted;
	}

	@Column(name = "deleted", nullable = false)
	private Character deleted;

	@Column(name = "locked", nullable = false)
	private Character locked;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@OneToMany(mappedBy = "type", fetch = FetchType.EAGER)
	private List<Device> deviceList;

	public List<Device> getDeviceList() {
		return deviceList;
	}

	public Character getLocked() {

		return locked;
	}

	public void setLocked(Character locked) {
		this.locked = locked;
	}

	public void setDeviceList(List<Device> deviceList) {
		this.deviceList = deviceList;
	}

	@Override
	public String toString() {
		return code;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DeviceType other = (DeviceType) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		return true;
	}
}
