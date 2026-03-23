package com.bnt.ruleengine.sample.adp;

import java.util.List;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MappingExtract extends MappingCopyAsIs {

	private String blocName;

	private boolean multiBloc;

	private String blocPackagerField;

	private List<FunctionUI> listFunction;

	private boolean rawDestination;

	private boolean collapse;

	public String getBlockName() {
		return blocName;
	}

	public void setBlockName(String blockName) {
		this.blocName = blockName;
	}

	public boolean isMultiBlock() {
		return multiBloc;
	}

	public void setMultiBlock(boolean multiBlock) {
		this.multiBloc = multiBlock;
	}

	public List<FunctionUI> getListFunction() {
		return listFunction;
	}

	public void setListFunction(List<FunctionUI> listFunction) {
		this.listFunction = listFunction;
	}

	public String getBlocPackagerField() {
		return blocPackagerField;
	}

	public void setBlocPackagerField(String blocPackagerField) {
		this.blocPackagerField = blocPackagerField;
	}

	public String getBlocName() {
		return blocName;
	}

	public void setBlocName(String blocName) {
		this.blocName = blocName;
	}

	public boolean isMultiBloc() {
		return multiBloc;
	}

	public void setMultiBloc(boolean multiBloc) {
		this.multiBloc = multiBloc;
	}

	public boolean isRawDestination() {
		return rawDestination;
	}

	public void setRawDestination(boolean rawDestination) {
		this.rawDestination = rawDestination;
	}

	public boolean isCollapse() {
		return collapse;
	}

	public void setCollapse(boolean collapse) {
		this.collapse = collapse;
	}
}
