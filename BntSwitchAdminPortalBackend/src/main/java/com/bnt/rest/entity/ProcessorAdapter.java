package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "processor_adapter")
public class ProcessorAdapter extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "code", nullable = false)
	private String code;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "active", nullable = false)
	private boolean active;

	@Column(name = "is_safe_enabled", nullable = false)
	private boolean isSAFEnabled;

	@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
	@OneToOne(optional = true)
	@JoinColumn(name = "lookupvalue_id")
	private LookupValue lookupvalueId;

	@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
	@OneToOne(optional = true)
	@JoinColumn(name = "adapter_id")
	private Adapter adapterId;

	public boolean getIsSAFEnabled() {
		return isSAFEnabled;
	}

	public void setIsSAFEnabled(boolean isSAFEnabled) {
		this.isSAFEnabled = isSAFEnabled;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return name;
	}

	public LookupValue getLookupvalueId() {
		return lookupvalueId;
	}

	public void setLookupvalueId(LookupValue lookupvalueId) {
		this.lookupvalueId = lookupvalueId;
	}

	public Adapter getAdapterId() {
		return adapterId;
	}

	public void setAdapterId(Adapter adapterId) {
		this.adapterId = adapterId;
	}
}
