package com.bnt.dashboard;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.common.collect.Lists;
import com.bnt.common.util.CollectionUtil;
import com.bnt.monitoring.charts.Linear;
import com.bnt.monitoring.charts.LinearDate;
import com.bnt.rest.dto.DashBoardDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class DashboardStats {

	private static final Logger logger = LogManager.getLogger(DashboardStats.class);
	private static final String LINE = "line";
	private static final String DONUT = "donut";

	private static final String APPROVE = "APPROVE";

	private static final Function<DashBoardDto, Boolean> isVACP = entity -> !(CollectionUtil
			.isCollectionEmptyOrNull(entity.getAuthorizedDestinations()))
			&& entity.getAuthorizedDestinations().contains("VACP");
	private static final Function<DashBoardDto, Boolean> isMaster = entity -> !(CollectionUtil
			.isCollectionEmptyOrNull(entity.getAuthorizedDestinations()))
			&& entity.getAuthorizedDestinations().contains("Master");

	private static final Function<DashBoardDto, Boolean> isBaseI = entity -> !(CollectionUtil
			.isCollectionEmptyOrNull(entity.getAuthorizedDestinations()))
			&& entity.getAuthorizedDestinations().contains("BaseI");

	private static final Function<DashBoardDto, Boolean> isEuroNet = entity -> !(CollectionUtil
			.isCollectionEmptyOrNull(entity.getAuthorizedDestinations()))
			&& entity.getAuthorizedDestinations().contains("EuroNet");

	private static final Function<DashBoardDto, Boolean> isOracle = entity -> !(CollectionUtil
			.isCollectionEmptyOrNull(entity.getAuthorizedDestinations()))
			&& entity.getAuthorizedDestinations().contains("Oracle");
	private static final Function<DashBoardDto, Boolean> isApproved = entity -> (entity.getProcessingStatus() != null)
			&& entity.getProcessingStatus().toUpperCase().contains(APPROVE);

	private static final Function<DashBoardDto, Boolean> failed = entity -> !((entity.getProcessingStatus() != null)
			&& entity.getProcessingStatus().toUpperCase().contains(APPROVE));

	public static final Function<DashBoardDto, Boolean> isNull = Objects::nonNull;

	@SuppressWarnings("unchecked")
	public enum Trnsactions {

		VACP(new CountRepositoryData(Lists.newArrayList(isVACP))),

		MASTER(new CountRepositoryData(Lists.newArrayList(isMaster))),

		BASEI(new CountRepositoryData(Lists.newArrayList(isBaseI))),

		ORACLE(new CountRepositoryData(Lists.newArrayList(isOracle))),
		EURONET(new CountRepositoryData(Lists.newArrayList(isEuroNet))),

		APPROVED(new CountRepositoryData(Lists.newArrayList(isApproved))),

		FAILED(new CountRepositoryData(Lists.newArrayList(failed))),

		TOTAL(new CountRepositoryData(Lists.newArrayList(isNull))),

		MERCHANT(new MerchantRepositoryData(Lists.newArrayList(isNull))),

		MERCHANT_APPROVED(new MerchantRepositoryData(Lists.newArrayList(isNull, isApproved))),
		MERCHANT_DECLINED(new MerchantRepositoryData(Lists.newArrayList(isNull, failed))),

		ADAPTER(new AdapterRepositoryData(Lists.newArrayList(isNull))),

		ADAPTER_APPROVED(new AdapterRepositoryData(Lists.newArrayList(isNull, isApproved))),

		ADAPTER_DECLINED(new AdapterRepositoryData(Lists.newArrayList(isNull, failed))),

		ROUTE(new ProviderRepositoryData(Lists.newArrayList(isNull))),

		ROUTE_APPROVED(new ProviderRepositoryData(Lists.newArrayList(isNull, isApproved))),

		ROUTE_DECLINED(new ProviderRepositoryData(Lists.newArrayList(isNull, failed))),

		TXN_TYPE(new TxnTypeRepositoryData(Lists.newArrayList(isNull))),

		TXN_TYPE_APPROVED(new TxnTypeRepositoryData(Lists.newArrayList(isNull, isApproved))),

		TXN_TYPE_DECLINED(new TxnTypeRepositoryData(Lists.newArrayList(isNull, failed))),

		VACP_APPROVED(new CountRepositoryData(Lists.newArrayList(isVACP, isApproved))),

		VACP_DECLINED(new CountRepositoryData(Lists.newArrayList(isVACP, failed))),

		MASTER_APPROVED(new CountRepositoryData(Lists.newArrayList(isMaster, isApproved))),

		MASTER_DECLINED(new CountRepositoryData(Lists.newArrayList(isMaster, failed))),

		BASEI_APPROVED(new CountRepositoryData(Lists.newArrayList(isBaseI, isApproved))),

		BASEI_DECLINED(new CountRepositoryData(Lists.newArrayList(isBaseI, failed))),

		ORACLE_APPROVED(new CountRepositoryData(Lists.newArrayList(isOracle, isApproved))),

		ORACLE_DECLINED(new CountRepositoryData(Lists.newArrayList(isOracle, failed))),

		EURONET_APPROVED(new CountRepositoryData(Lists.newArrayList(isEuroNet, isApproved))),

		EURONET_DECLINED(new CountRepositoryData(Lists.newArrayList(isEuroNet, failed)));

		private final RepositoryData data;

		private Trnsactions(RepositoryData data) {
			this.data = data;
		}

		public RepositoryData getRepository() {
			return data;
		}
	}

	public static void add(DashBoardDto txnLogEntity) {

		try {
			Lists.newArrayList(Trnsactions.values()).forEach(transactions -> {

				if (txnLogEntity != null && transactions != null && transactions.getRepository() != null) {
					transactions.getRepository().add(txnLogEntity);

				}
			});
		} catch (Exception e) {
			logger.error(e);
		}
	}

	public static void cleanup() {
		Lists.newArrayList(Trnsactions.values()).forEach(transactions -> transactions.getRepository().cleanup());
	}

	public static Content<Linear> getLinearContent(List<Trnsactions> transactions, ChartsConfig chartsConfig) {
		List<Linear> coordinates = Lists.newArrayList();
		for (Trnsactions txn : transactions) {
			txn.getRepository().addLinearCoordinates(txn.name(), coordinates, chartsConfig);
		}
		return new Content<>(coordinates, LINE);
	}

	public static Content<LinearDate> getLinearDateContent(List<Trnsactions> transactions, ChartsConfig chartsConfig) {
		List<LinearDate> coordinates = Lists.newArrayList();
		long currentTime = System.currentTimeMillis();
		for (Trnsactions txn : transactions) {
//            txn.getRepository().addLinearDateCoordinates(txn.name(), coordinates, chartsConfig);
			txn.getRepository().addLinearDateCoordinates2(txn.name(), coordinates, chartsConfig, currentTime);
		}
		return new Content<>(coordinates, LINE);
	}

	public static Content<KeyPair> buildContent(List<Trnsactions> transactions, ChartsConfig chartsConfig) {
		List<KeyPair> coordinates = Lists.newArrayList();
		transactions
				.forEach(txns -> txns.getRepository().addKeyPairCoordinates(txns.name(), coordinates, chartsConfig));
		List<KeyPair> coordinatesCopy = new ArrayList<>(
				coordinates.stream().sorted(Comparator.comparing(KeyPair::getText)).toList());
		return new Content<>(coordinatesCopy, DONUT);
	}
}
