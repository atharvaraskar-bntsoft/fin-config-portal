package com.bnt.dashboard;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DashBoardData<T> {

	private final String blockType;
	private final String title;
	private final String actionLink;
	private final String actionTitle;
	private final Content<?> content;

	public DashBoardData(String blockType, String title, String actionLink, String actionTitle, Content<?> content) {
		this.blockType = blockType;
		this.title = title;
		this.actionLink = actionLink;
		this.actionTitle = actionTitle;
		this.content = content;
	}

	public String getBlockType() {
		return blockType;
	}

	public String getTitle() {
		return title;
	}

	public String getActionLink() {
		return actionLink;
	}

	public String getActionTitle() {
		return actionTitle;
	}

	public Content<?> getContent() {
		return content;
	}

}
