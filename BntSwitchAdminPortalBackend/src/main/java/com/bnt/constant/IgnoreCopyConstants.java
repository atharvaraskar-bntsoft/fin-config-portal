package com.bnt.constant;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class IgnoreCopyConstants {

	private IgnoreCopyConstants() {

	}

	private static final String CREATED_BY = "createdBy";

	private static final String UPDATED_BY = "updatedBy";

	private static final String UPDATED_ON = "updatedOn";

	private static final String CREATED_ON = "createdOn";

	public static final String[] IGNORE_COPY_AUDITFIELDS_CREATE = { CREATED_ON, CREATED_BY };

	public static final String[] IGNORE_COPY_AUDITFIELDS_UPDATE = { UPDATED_ON, UPDATED_BY };

	public static final String[] IGNORE_COPY_AUDITFIELDS = { CREATED_ON, CREATED_BY, UPDATED_ON, UPDATED_BY };

	public static final String[] IGNORE_NONE = {};

}
