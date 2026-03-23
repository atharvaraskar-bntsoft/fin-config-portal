package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "menu_function")
public class MenuFunction extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "name", nullable = false)
	private String name;

//	 @OneToMany(mappedBy = "menuFunction", fetch = FetchType.LAZY, cascade = CascadeType.ALL) 
//	 private List<SubMenuFunction> subMenuList;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
