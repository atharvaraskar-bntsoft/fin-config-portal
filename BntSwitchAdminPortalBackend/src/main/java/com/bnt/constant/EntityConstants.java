package com.bnt.constant;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class EntityConstants {

	private EntityConstants() {

	}

	public static final String ADAPTER = "adapter";

	public static final String ADAPTER_CONFIGURATION = "adapterconfiguration";

	public static final String IMF_STRUCTURE = "imfstructure";

	public static final String TAGS = "tags";

	public static final String RULE = "rule";

	public static final String RULE_CONFIGURATION = "ruleconfiguration";

	public static final String ROUTING = "routing";

	public static final String DEPLOYMENT = "deployment";

	public static final String DEPLOYMENT_COMPONENT = "deploymentcomponent";

	public static final String ROUTING_VERSION = "routingversion";

	public static final String SETTING = "setting";

	public static final String PROCESSOR_ADAPTER = "processoradapter";

	public static final String UI_TXN_LABEL = "txnlabel";

	public static final String DEPLOYMENT_WORKFLOW = "deploymentworkflow";

	public static Set<String> getAuditFilterList() {

		return new HashSet<>(
				Arrays.asList(DEPLOYMENT_WORKFLOW, UI_TXN_LABEL, ADAPTER, ADAPTER_CONFIGURATION, IMF_STRUCTURE, TAGS,
						RULE, RULE_CONFIGURATION, ROUTING, ROUTING_VERSION, DEPLOYMENT, SETTING, PROCESSOR_ADAPTER));
	}
}
