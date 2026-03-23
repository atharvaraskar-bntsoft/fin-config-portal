package com.bnt.dashboard;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ChartsConfig {

	private final Integer numberofEntries;
	private boolean zeroFill = false;

	public ChartsConfig(final Integer numberofEntries) {
		this.numberofEntries = numberofEntries;
	}

	public ChartsConfig(final Integer numberofEntries, boolean zeroFill) {
		this.numberofEntries = numberofEntries;
		this.zeroFill = zeroFill;
	}

	public Integer getNumberofEntries() {
		return numberofEntries;
	}

	public boolean isZeroFill() {
		return zeroFill;
	}

	public void setZeroFill(boolean zeroFill) {
		this.zeroFill = zeroFill;
	}

}
