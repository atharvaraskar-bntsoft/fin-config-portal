package com.bnt.monitoring.charts;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**************************
 * @author vaibhav.shejol *
 **************************/

@JsonInclude(Include.NON_NULL)
public class Values {

	private final String text;
	private final String value;
	private final Coordinates coordinates;

	public Values(final String value, final String text, final Coordinates coordinates) {
		this.text = text;
		this.value = value;
		this.coordinates = coordinates;
	}

	public String getText() {
		return text;
	}

	public String getValue() {
		return value;
	}

	public Coordinates getCoordinates() {
		return coordinates;
	}
}
