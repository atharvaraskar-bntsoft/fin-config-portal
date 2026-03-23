package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPAUtils;
import com.bnt.rest.entity.BinTable;
import com.bnt.rest.entity.QBinTable;
import com.bnt.rest.jpa.repository.BinTablePersistenceHelper;
import com.bnt.rest.repository.BinTableRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class BinTableRepositoryImpl implements BinTableRepository {

	private static final Logger logger = LogManager.getLogger(BinTableRepositoryImpl.class);

	@Autowired
	private BinTablePersistenceHelper binTablePersistenceHelper;

	@PersistenceContext
	public EntityManager entityManager;

	@Override
	public BinTable findBinTableById(int id) {
		return binTablePersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Page<BinTable> findPagedBinTable(Pageable pageable) {
		return binTablePersistenceHelper.findAll(pageable);
	}

	@Override
	public List<Object> findIdAndBinOnly() {
		return binTablePersistenceHelper.getIdAndBinOnly();
	}

	@Override
	public Page<BinTable> findBinTableByBinMasterId(Integer binMasterId, Pageable pageable) {
		return binTablePersistenceHelper.findBinTableByBinMasterIdId(binMasterId, pageable);
	}

	@Override
	public List<BinTable> getAllBinTableByBinMasterId(Integer binMasterId) {
		return binTablePersistenceHelper.getAllBinTableByBinMasterId(binMasterId);
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<BinTable> findFilterBinTable(Pageable pageable, String[] filters) {
		logger.info("Inside findFilterBinTable!");
		QBinTable binTable = QBinTable.binTable;
		Predicate binPredicate = null;
		Predicate binMasterIdPredicate = null;
		List<BinTable> binTableList = null;
		if (filters != null) {
			for (String each : filters) {
				if (each.contains(":")) {
					String param = each.split(":")[0];
					String value = each.split(":")[1];
					if ("bin".equalsIgnoreCase(param)) {
						binPredicate = binTable.bin.like(value + '%');
					}
					if ("binmasterid".equalsIgnoreCase(param)) {
						binMasterIdPredicate = binTable.binMasterId.id.eq(Integer.parseInt(value));
					}
				}
			}
		}
		Page<BinTable> binTablePagedList = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(binTable).where(binMasterIdPredicate, binPredicate).limit(pageable.getPageSize())
				.offset(pageable.getOffset());

		binTableList = jpaQuery.fetch();
		binTablePagedList = (Page<BinTable>) JPAUtils.getPageObjectFromList(pageable, binTableList,
				jpaQuery.fetchCount());
		return binTablePagedList;
	}

}
