package com.bnt.rest.repository.impl;

import java.sql.Timestamp;
import java.util.Iterator;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.bnt.common.util.DateUtil;
import com.bnt.rest.dto.DashBoardDto;
import com.bnt.rest.repository.DashBoardRepository;
import com.bnt.rest.service.impl.ListService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class DashBoardRepositoryImpl implements DashBoardRepository {

	private static final Logger LOGGER = LogManager.getLogger(DashBoardRepositoryImpl.class);
	@PersistenceContext
	private EntityManager entityManager;

	@Value("${spring.jpa.properties.hibernate.default_schema}")
	String schemaName;

	@Autowired
	private ListService listService;

	private String sqlQuery;

	@PostConstruct
	private void init() {

		Map<String, String> merchantCodeNameMap = listService.getMerchantCodeAndNameMap();

		LOGGER.debug("merchantCodeNameMap {}", merchantCodeNameMap);
		sqlQuery = "select tl.txn_type,tl.ipc,tl.txn_recv_date_time,tl.merchant_id " + "FROM " + schemaName + "."
				+ "txn_log tl   " + "WHERE  tl.txn_recv_date_time > ? and tl.txn_recv_date_time < ?";
	}

	@SuppressWarnings("unchecked")
	@Override
	public Iterator<DashBoardDto> fetchTxnLogEntity(Timestamp start, Timestamp current) {
		Query nativeQuery = this.entityManager.createNativeQuery(sqlQuery);
		Timestamp t = DateUtil.convertStringToTimestamp("2019-08-07 05:47:00");
		if (start.before(t) && current.after(t)) {

			int size = nativeQuery.setParameter(1, start).setParameter(2, current).getResultList().size();

			LOGGER.info("Size ..{}", size);
		}
		return new DashBoarddDTOIterator(
				nativeQuery.setParameter(1, start).setParameter(2, current).getResultList().iterator());
	}

	private DashBoardDto mapResultToTxnDto(Object[] entity) {

		DashBoardDto txnDto = new DashBoardDto();
		txnDto.setPosTxnType((String) entity[0]);
		txnDto.setProcessingStatus((String) entity[1]);
		if (entity[2] != null) {
			txnDto.setRespTxnDateTime((Timestamp) entity[2]);
		}
		if (entity[3] != null) {
			txnDto.setMerchantCode((String) entity[3]);
			txnDto.setMerchantName(txnDto.getMerchantCode());
		}
		return txnDto;
	}

	class DashBoarddDTOIterator implements Iterator<DashBoardDto> {

		Iterator<Object[]> iterator;

		public DashBoarddDTOIterator(Iterator<Object[]> iterator) {
			this.iterator = iterator;
		}

		@Override
		public boolean hasNext() {
			return iterator.hasNext();
		}

		@Override
		public DashBoardDto next() {
			return mapResultToTxnDto(iterator.next());
		}

		@Override
		public void remove() {
			iterator.remove();
		}
	}
}
