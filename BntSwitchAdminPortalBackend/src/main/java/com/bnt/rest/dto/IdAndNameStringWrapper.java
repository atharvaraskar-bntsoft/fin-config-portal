package com.bnt.rest.dto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IdAndNameStringWrapper {

	private String id;

	private String name;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public IdAndNameStringWrapper(String id) {
		this.id = id;
	}

	public IdAndNameStringWrapper() {
		// Auto-generated constructor stub
	}

	public IdAndNameStringWrapper(String id, String name) {
		this.id = id;
		this.name = name;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		IdAndNameStringWrapper other = (IdAndNameStringWrapper) obj;
		if (!(name.equals(other.name)))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		return this.getName().length();
	}

	public String toString() {
		return this.name;
	}
}
