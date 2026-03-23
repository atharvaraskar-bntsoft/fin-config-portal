package com.bnt.ruleengine.sample;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.bnt.core.orchestation.Orchestration;
import com.bnt.core.orchestation.WorkFlows;
import com.bnt.core.orchestation.rule.ConditionalDecisionRule;
import com.bnt.core.orchestation.rule.DecisionalRoutingRule;
import com.bnt.core.orchestation.rule.DecisionalWorkFlowRule;
import com.bnt.core.orchestation.rule.SpringElResponseCodeRule;
import com.bnt.core.orchestation.services.DecisionalServiceOperation;
import com.bnt.core.orchestation.services.ParallelServices;
import com.bnt.core.orchestation.services.ResponseCodeEvaluator;
import com.bnt.core.orchestation.services.Service;
import com.bnt.bswitch.query.parser.And;
import com.bnt.bswitch.query.parser.Equal;
import com.bnt.bswitch.query.parser.Like;
import com.bnt.bswitch.query.parser.Not;
import com.bnt.bswitch.query.parser.Or;
import com.bnt.bswitch.query.parser.StartsWith;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class OrchestrationConfigGenerationTest {

	private static final String ACCOUNT_NUMBER = "${message_exchange[GATEWAY_SERVICE].request_message[account_number]}";
	private static final String PAYMENT_METHOD = "${payment_method}";
	private static final String APPROVED = "APPROVED";
	private static final String ADAPTER_ID = "AdapterID";
	private static final String LOYALTY_SERVICE = "LOYALTY_SERVICE";
	private static final String FRAUD_SERVICE = "FRAUD_SERVICE";
	private static final String AUTH_SERVICE = "AUTH_SERVICE";
	private static final String TRANSACTION_TYPE = "Transaction Type";
	private static final String CONDITION_3 = "condition_3";
	private static final String CONDITION_1 = "condition_1";
	private static final String CONDITION_2 = "condition_2";
	private static final String SET_RESPONSE_OF_SERVICE_AUTH_SERVICE = "setResponseOfService('AUTH_SERVICE')";

	private static final String RULE_1 = "rule_1";
	private static final String RULE_2 = "rule_2";
	private static final String RULE_3 = "rule_3";
	private static final String RULE_4 = "rule_4";

	public static void main(String[] args) throws IOException {

		// workflow router AUTH(ISO) card-4 OR AUTH(JSON) card-5

		DecisionalWorkFlowRule workfolw3 = new DecisionalWorkFlowRule(new ConditionalDecisionRule(
				new Or(Lists.newArrayList(new Equal(PAYMENT_METHOD, "CARD"), new Equal(PAYMENT_METHOD, "ECOM")))), "3");

		// AUTH(ISO)->FRAUD (JSON) card-5

		DecisionalWorkFlowRule workfolw1 = new DecisionalWorkFlowRule(
				new ConditionalDecisionRule(
						new And(Lists.newArrayList(new Equal(PAYMENT_METHOD, "CARD"), new Like(ACCOUNT_NUMBER, "5%")))),
				"1");

		// AUTH(JSON)->LOYALITY (ISO) card-4
		DecisionalWorkFlowRule workfolw2 = new DecisionalWorkFlowRule(
				new ConditionalDecisionRule(
						new And(Lists.newArrayList(new Equal(PAYMENT_METHOD, "ECOM"), new Like(ACCOUNT_NUMBER, "5%")))),
				"2");

		// AUTH(JSON)-> parallel{ FRAUD (ISO), LOYALTY (ISO)) card-4
		DecisionalWorkFlowRule workfolw4 = new DecisionalWorkFlowRule(
				new ConditionalDecisionRule(new Like(ACCOUNT_NUMBER, "45%")), "4");

		// AUTH(JSON)-> true{ FRAUD (ISO))}, false{LOYALTY (ISO))} card-4
		DecisionalWorkFlowRule workfolw5 = new DecisionalWorkFlowRule(
				new ConditionalDecisionRule(new Like(ACCOUNT_NUMBER, "55%")), "5");

		Map<String, DecisionalWorkFlowRule> workFlows = Maps.newHashMap();
		workFlows.put("FLOW-1", workfolw1);
		workFlows.put("FLOW-2", workfolw2);
		workFlows.put("FLOW-3", workfolw3);
		workFlows.put("FLOW-4", workfolw4);
		workFlows.put("FLOW-5", workfolw5);

		List<String> workFlowRouter = Lists.newArrayList("FLOW-5", "FLOW-4", "FLOW-1", "FLOW-2", "FLOW-3");

		// destination router

		DecisionalRoutingRule auth_rule_1 = new DecisionalRoutingRule(
				new ConditionalDecisionRule(new And(Lists.newArrayList(new Equal(PAYMENT_METHOD, "CARD"),
						new Or(Lists.newArrayList(new Like(ACCOUNT_NUMBER, "4%"), new Like(ACCOUNT_NUMBER, "5%")))))),
				"1");

		DecisionalRoutingRule auth_rule_2 = new DecisionalRoutingRule(
				new ConditionalDecisionRule(new And(Lists.newArrayList(new Equal(PAYMENT_METHOD, "ECOM"),
						new Or(Lists.newArrayList(new Like(ACCOUNT_NUMBER, "4%"), new Like(ACCOUNT_NUMBER, "5%")))))),
				"2");

		DecisionalRoutingRule fraud_rule = new DecisionalRoutingRule(
				new ConditionalDecisionRule(
						new Or(Lists.newArrayList(new Like(ACCOUNT_NUMBER, "4%"), new Like(ACCOUNT_NUMBER, "5%")))),
				"3");

		DecisionalRoutingRule loyality_rule = new DecisionalRoutingRule(
				new ConditionalDecisionRule(
						new Or(Lists.newArrayList(new Like(ACCOUNT_NUMBER, "4%"), new Like(ACCOUNT_NUMBER, "5%")))),
				"4");

		Map<String, DecisionalRoutingRule> destinationRules = Maps.newHashMap();
		destinationRules.put(RULE_1, auth_rule_1);
		destinationRules.put(RULE_2, auth_rule_2);
		destinationRules.put(RULE_3, fraud_rule);
		destinationRules.put(RULE_4, loyality_rule);

		Map<String, List<String>> destinationRouters = Maps.newHashMap();

		destinationRouters.put(AUTH_SERVICE, Lists.newArrayList(RULE_1, RULE_2));
		destinationRouters.put(FRAUD_SERVICE, Lists.newArrayList(RULE_3));
		destinationRouters.put(LOYALTY_SERVICE, Lists.newArrayList(RULE_4));

		Map<String, ConditionalDecisionRule> servicesConditions = Maps.newHashMap();
		servicesConditions.put(CONDITION_1,
				new ConditionalDecisionRule(new Equal("${message_exchange[AUTH_SERVICE].ipc}", APPROVED)));
		servicesConditions.put(CONDITION_2,
				new ConditionalDecisionRule(new Equal("${message_exchange[FRAUD_SERVICE].ipc}", APPROVED)));
		servicesConditions.put(CONDITION_3,
				new ConditionalDecisionRule(new Not(new Equal("${message_exchange[FRAUD_SERVICE].ipc}", APPROVED))));
		servicesConditions.put("VTS_RULE",
				new ConditionalDecisionRule(new Or(Lists.newArrayList(new Equal(ADAPTER_ID, "adpHttpUms"),
						new Equal(ADAPTER_ID, "isoGicc"), new StartsWith(ADAPTER_ID, "00")))

				));
		servicesConditions.put("ATM_POSTBRIDGE_RULE",
				new ConditionalDecisionRule(new And(Lists.newArrayList(
						new Or(Lists.newArrayList(new Equal(TRANSACTION_TYPE, "Balance Enquiry"),
								new Equal(TRANSACTION_TYPE, "Debit"), new Equal(TRANSACTION_TYPE, "Reversal"))),
						new Equal("MCC", "6011")))

				));
		servicesConditions.put("ATM_POSTBRIDGE_RULE_02", new ConditionalDecisionRule(new And(Lists.newArrayList(
				new Or(Lists.newArrayList(new Equal(TRANSACTION_TYPE, "Balance Enquiry"),
						new And(Lists.newArrayList(new Equal(TRANSACTION_TYPE, "Debit"),
								new Equal("Merchant Code", "000000002"))),
						new Equal(TRANSACTION_TYPE, "Reversal"))),
				new Equal("MCC", "6011")))

		));

		// scenario-1 AUTH(ISO) card-4 OR AUTH(JSON) card-5

		Service auth = new Service(AUTH_SERVICE);
		Orchestration orc1 = new Orchestration(auth,
				new ResponseCodeEvaluator(new SpringElResponseCodeRule(SET_RESPONSE_OF_SERVICE_AUTH_SERVICE)));

		// scenario-2 from ISO adapter -> FRAUD(JSON) -> AUTH(ISO/JSON) -> LOYALTY(ISO)

		Service auth1 = new Service(FRAUD_SERVICE);
		Service fraud = new Service(AUTH_SERVICE);
		auth1.setDependents(Lists.newArrayList(fraud));
		fraud.setDependents(Lists.newArrayList(new Service(LOYALTY_SERVICE)));
		Orchestration orc2 = new Orchestration(auth1,
				new ResponseCodeEvaluator(new SpringElResponseCodeRule(SET_RESPONSE_OF_SERVICE_AUTH_SERVICE)));

		// scenario-3 from JSON adapter -> AUTH(ISO/JSON) -> LOYALITY(ISO) card-4
		Service auth2 = new Service(FRAUD_SERVICE);
		auth2.setDependents(Lists.newArrayList(new Service(AUTH_SERVICE)));
		Orchestration orc3 = new Orchestration(auth2,
				new ResponseCodeEvaluator(new SpringElResponseCodeRule(SET_RESPONSE_OF_SERVICE_AUTH_SERVICE)));

		// scenario-4 from JSON adapter -> FRAUD(JSON) -> parallel{AUTH(ISO/JSON),
		// LOYALITY(ISO)} card-45 card-55

		Service auth3 = new Service(FRAUD_SERVICE);
		auth3.setDependents(Lists.newArrayList(new DecisionalServiceOperation(CONDITION_2,
				new ParallelServices(Lists.newArrayList(new Service(AUTH_SERVICE), new Service(LOYALTY_SERVICE))),
				null)));
		Orchestration orc4 = new Orchestration(auth3,
				new ResponseCodeEvaluator(new SpringElResponseCodeRule(SET_RESPONSE_OF_SERVICE_AUTH_SERVICE)));

		// scenario-4 from JSON adapter -> FRAUD(JSON) -> decision true{AUTH(ISO/JSON)),
		// false(LOYALITY(ISO)} card-45 card-55
		Service auth4 = new Service(FRAUD_SERVICE);
		auth4.setDependents(Lists.newArrayList(
				new DecisionalServiceOperation(CONDITION_2, new Service(AUTH_SERVICE), new Service(LOYALTY_SERVICE))));
		Orchestration orc5 = new Orchestration(auth4,
				new ResponseCodeEvaluator(new SpringElResponseCodeRule(SET_RESPONSE_OF_SERVICE_AUTH_SERVICE)));

		Service s1 = new Service("AUTH");
		s1.setDependents(Lists.newArrayList(
				new DecisionalServiceOperation(CONDITION_2, new Service(AUTH_SERVICE), new Service(LOYALTY_SERVICE))));
		Service s2 = new Service("Fraud");
		Service s3 = new Service("TestService");
		s2.setDependents(Lists.newArrayList(s3));
		ParallelServices p1 = new ParallelServices(Lists.newArrayList(s1, s2));
		Orchestration orc6 = new Orchestration(p1,
				new ResponseCodeEvaluator(new SpringElResponseCodeRule("setIpcConsiderFail('DECLINED')")));
		Map<String, Orchestration> orchestrations = Maps.newHashMap();

		orchestrations.put("6", orc6);
		orchestrations.put("3", orc1);
		orchestrations.put("1", orc2);
		orchestrations.put("2", orc3);
		orchestrations.put("4", orc4);
		orchestrations.put("5", orc5);

		new ObjectMapper().writeValue(new File("workflow.json"), new WorkFlows(workFlows, destinationRules,
				servicesConditions, workFlowRouter, destinationRouters, orchestrations, "1"));

		/**
		 * (new ObjectMapper().readValue(new File("workflow.json"), WorkFlows.class));
		 */
	}
}
