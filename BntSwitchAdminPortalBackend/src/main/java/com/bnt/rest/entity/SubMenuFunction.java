package com.bnt.rest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import org.hibernate.envers.Audited;

import com.bnt.common.util.annotations.ExcludeExportMarker;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Entity
@Audited
@Table(name = "sub_menu_function")
@ExcludeExportMarker
public class SubMenuFunction extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "menu_function", nullable = false)
	private Integer menuFunction;

	@Column(name = "url", nullable = false)
	private String url;

	@Column(name = "mapping_url", nullable = false)
	private String mappingUrl;

	@Column(name = "entity")
	private String entity;

	@Column(name = "active", nullable = false)
	private Character active;

	public String getEntity() {
		return entity;
	}

	public void setEntity(String entity) {
		this.entity = entity;
	}

	public Character getActive() {
		return active;
	}

	public void setActive(Character active) {
		this.active = active;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getMenuFunction() {
		return menuFunction;
	}

	public void setMenuFunction(Integer menuFunction) {
		this.menuFunction = menuFunction;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMappingUrl() {
		return mappingUrl;
	}

	public void setMappingUrl(String mappingUrl) {
		this.mappingUrl = mappingUrl;
	}

	@Override
	public String toString() {
		return "SubMenuFunction [name=" + name + ", menuFunction=" + menuFunction + ", url=" + url + ", mappingUrl="
				+ mappingUrl + ", active=" + active + "]";
	}
}
