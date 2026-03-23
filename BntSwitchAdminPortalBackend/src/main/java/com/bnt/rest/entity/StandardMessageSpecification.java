package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Table(name = "standard_message_specification")
public class StandardMessageSpecification extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "message_schema_packager", nullable = false)
	private String messageSchemaPackager;

	@Column(name = "properties", nullable = false)
	private String properties;

	@Column(name = "active", nullable = false)
	private Character active;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "message_standard")
	private LookupValue messageStandard;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "message_protocol")
	private LookupValue messageProtocol;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "transmission_protocol")
	private LookupValue transmissionProtocol;

	public String getMessageSchemaPackager() {
		return messageSchemaPackager;
	}

	public void setMessageSchemaPackager(String messageSchemaPackager) {
		this.messageSchemaPackager = messageSchemaPackager;
	}

	public String getProperties() {
		return properties;
	}

	public void setProperties(String properties) {
		this.properties = properties;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public LookupValue getMessageStandard() {
		return messageStandard;
	}

	public void setMessageStandard(LookupValue messageStandard) {
		this.messageStandard = messageStandard;
	}

	public LookupValue getMessageProtocol() {
		return messageProtocol;
	}

	public void setMessageProtocol(LookupValue messageProtocol) {
		this.messageProtocol = messageProtocol;
	}

	public LookupValue getTransmissionProtocol() {
		return transmissionProtocol;
	}

	public void setTransmissionProtocol(LookupValue transmissionProtocol) {
		this.transmissionProtocol = transmissionProtocol;
	}
}
