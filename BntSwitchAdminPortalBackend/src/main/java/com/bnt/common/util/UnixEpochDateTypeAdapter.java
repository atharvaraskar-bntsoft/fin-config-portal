package com.bnt.common.util;

import java.io.IOException;
import java.sql.Timestamp;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**************************
 * @author vaibhav.shejol *
 **************************/

final class UnixEpochTimestampAdapter extends TypeAdapter<Timestamp> {

	private static final TypeAdapter<Timestamp> unixEpochDateTypeAdapter = new UnixEpochTimestampAdapter();

	private UnixEpochTimestampAdapter() {
	}

	static TypeAdapter<Timestamp> getUnixEpochDateTypeAdapter() {
		return unixEpochDateTypeAdapter;
	}

	@Override
	public Timestamp read(final JsonReader in) throws IOException {
		// this is where the conversion is performed
		return new Timestamp(in.nextLong());
	}

	@Override
	@SuppressWarnings("resource")
	public void write(final JsonWriter out, final Timestamp value) throws IOException {
		// write back if necessary or throw UnsupportedOperationException
		out.value(value.getTime());
	}
}
