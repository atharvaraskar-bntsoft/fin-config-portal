package com.bnt.dashboard;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class Content<T> {

	private final String type;

	private List<T> coordinates;

	public String xCoordinateType = null;

	public String yCoordinateType = null;;

	public void setCoordinates(List<T> coordinates) {
		this.coordinates = coordinates;
	}

	public Content(final List<T> coordinates, final String type) {
		this.coordinates = coordinates;
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public List<T> getCoordinates() {
		return coordinates;
	}

}
