package com.bnt.rest.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/
/*
 * All entities need to extend this class It provides id generation and audit
 * attributes for all entities It is declared abstract so it cannot be
 * instantiated on its own The @MappedSuperclass annotation implies that there
 * is no corresponding table for this class. However, all the attributes
 * declared in this class are part of the table that corresponds to the
 * inherited entity
 */

@MappedSuperclass
@Audited
public abstract class BaseTimeEntity extends AuditTimeEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
