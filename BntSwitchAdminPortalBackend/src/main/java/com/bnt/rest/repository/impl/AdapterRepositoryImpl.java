package com.bnt.rest.repository.impl;

import java.math.BigInteger;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.bnt.common.util.JPACriteriaUtils;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.JsonDataCompListDto;
import com.bnt.rest.entity.Adapter;
import com.bnt.rest.jpa.repository.AdapterPersistenceHelper;
import com.bnt.rest.repository.AdapterRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class AdapterRepositoryImpl implements AdapterRepository {

	private static final Logger LOGGER = LogManager.getLogger(AdapterRepositoryImpl.class);

	@Autowired
	private AdapterPersistenceHelper adapterPersistenceHelper;

	@Autowired
	private EntityManager entityManager;

	@Override
	public Adapter findAdapterById(Integer id) {
		return adapterPersistenceHelper.findById(id).orElse(null);
	}

	@Override
	public Adapter save(Adapter adapter) {
		try {
			return adapterPersistenceHelper.save(adapter);
		} catch (Exception e) {
			LOGGER.error("Issue in saving adapter--> {}", ExceptionLog.printStackTraceToString(e));
			return null;
		}
	}

	public List<Adapter> getDraftAdapterList() {
		return adapterPersistenceHelper.getDraftAdapterList();
	}

	@Override
	public Adapter findAdapterByName(String name) {
		return adapterPersistenceHelper.findAdapterByName(name);
	}

	@Override
	public Page<Adapter> getPagableAdapterList(Pageable pageable) {
		return adapterPersistenceHelper.findAll(pageable);
	}

	@Override
	public void deleteById(Integer id) {
		adapterPersistenceHelper.deleteById(id);
	}

	@Override
	public void deleteByEntity(Adapter adapter) {
		adapterPersistenceHelper.delete(adapter);
	}

	@Override
	public Page<Adapter> getPagableAdapterListByType(String type, Pageable pageable) {
		return adapterPersistenceHelper.findAdapterByType(type, pageable);
	}

	@Override
	public List<Adapter> getL3ListForProcessorAdapter() {
		return adapterPersistenceHelper.getL3ListForProcessorAdapter();
	}

	@Override
	public boolean validateName(String name) {
		return JPACriteriaUtils.validateName(entityManager, Adapter.class, name, "name");
	}

	@Override
	public Adapter findAdapterByNormalisedName(String name) {
		return JPACriteriaUtils.getEntityByName(entityManager, Adapter.class, name, "name");
	}

	@Override
	public List<Object[]> getDetailListByCompType(String compType, Pageable pageable) {
		String queryString;
		if (compType.equals("L1")) {
			queryString = "SELECT adapter.id adpId , adapter.type adpType, adapter.name adpName, lookup_value.value template,\r\n"
					+ "GROUP_CONCAT(adapter_configuration.id, ':', adapter_configuration.version ORDER BY adapter_configuration.created_on DESC\r\n"
					+ "SEPARATOR '|') AS versions\r\n" + "FROM adapter\r\n"
					+ "JOIN standard_message_specification ON adapter.standard_message_specification = standard_message_specification.id\r\n"
					+ "JOIN lookup_value ON lookup_value.id = standard_message_specification.message_standard\r\n"
					+ "JOIN adapter_configuration ON adapter.id = adapter_configuration.adapter_id\r\n"
					+ "where adapter.type=\"L1\" GROUP BY adapter.id\r\n"
					+ " having count(adapter_configuration.version) >1 Order BY adapter.created_on DESC";
		} else if (compType.equals("L3")) {
			queryString = "SELECT adapter.id adpId , adapter.type adpType, adapter.name adpName, lookup_value.value template,\r\n"
					+ "GROUP_CONCAT(adapter_configuration.id, ':', adapter_configuration.version ORDER BY adapter_configuration.created_on DESC\r\n"
					+ "SEPARATOR '|') AS versions\r\n" + "FROM adapter\r\n"
					+ "JOIN standard_message_specification ON adapter.standard_message_specification = standard_message_specification.id\r\n"
					+ "JOIN lookup_value ON lookup_value.id = standard_message_specification.message_standard\r\n"
					+ "JOIN adapter_configuration ON adapter.id = adapter_configuration.adapter_id\r\n"
					+ "where adapter.type=\"L3\" GROUP BY adapter.id\r\n"
					+ " having count(adapter_configuration.version) >1 Order BY adapter.created_on DESC";
		} else {
			queryString = "SELECT imf.id, imf.name, imf.version FROM imf where imf.name like'IMF%' GROUP BY imf.id;";
		}

		Query query = entityManager.createNativeQuery(queryString);
		return query.getResultList();
	}

	@Override
	public List<Object[]> getJsonDataByType(JsonDataCompListDto jsonDataCompListDto, Pageable pageable) {
		String queryString;
		Query query = null;
		if ((jsonDataCompListDto.getType().equals("L1") || jsonDataCompListDto.getType().equals("L3"))
				&& !jsonDataCompListDto.getName().equals(null) && !jsonDataCompListDto.getSubtype().equals(null)
				&& jsonDataCompListDto.getV1() > 0 && jsonDataCompListDto.getV2() > 0) {
			queryString = "SELECT adapter_configuration.id, adapter_configuration.version, adapter_configuration."
					+ fetchSubType(jsonDataCompListDto.getSubtype())
					+ ", system_user.email, system_user.first_name, system_user.last_name FROM adapter_configuration \r\n"
					+ "JOIN system_user ON adapter_configuration.created_by = system_user.id"
					+ " where adapter_id in \r\n" + "(select id from adapter where name like :name' and type like :type"
					+ "and version in (:v1 , :v2)";

			query = entityManager.createNativeQuery(queryString);
			query.setParameter("name", jsonDataCompListDto.getName());
			query.setParameter("type", jsonDataCompListDto.getType());

		} else {
			queryString = "SELECT imf.id, imf.version, imf, system_user.email, \r\n"
					+ "system_user.first_name, system_user.last_name FROM imf \r\n"
					+ "JOIN system_user ON imf.created_by = system_user.id\r\n"
					+ "where imf.name like :type and imf.version in (:v1,:v2)";

			query = entityManager.createNativeQuery(queryString);
			query.setParameter("type", jsonDataCompListDto.getType() + "%");
		}

		query.setParameter("v1", jsonDataCompListDto.getV1());
		query.setParameter("v2", jsonDataCompListDto.getV2());
		return query.getResultList();
	}

	private String fetchSubType(String subtype) {
		switch (subtype) {
		case "packager":
			return "message_schema_packager";
		case "request_mapping":
			return "request_mapping";
		case "properties":
			return "properties";
		case "response_code":
			return "response_code";
		}
		return null;
	}

	@Override
	public List<Object[]> getCustomListByType(String adapterType, Pageable pageable) {
		String queryString;
		if (adapterType.equals("L1")) {
			queryString = "SELECT adapter.id adpId , adapter.name adpName, lookup_value.value template,\r\n"
					+ "GROUP_CONCAT(adapter_configuration.id, ':', adapter_configuration.version ORDER BY adapter_configuration.created_on DESC\r\n"
					+ "SEPARATOR '|') AS versions\r\n" + "FROM adapter\r\n"
					+ "JOIN standard_message_specification ON adapter.standard_message_specification = standard_message_specification.id\r\n"
					+ "JOIN lookup_value ON lookup_value.id = standard_message_specification.message_standard\r\n"
					+ "JOIN adapter_configuration ON adapter.id = adapter_configuration.adapter_id\r\n"
					+ "where adapter.type=\"L1\" GROUP BY adapter.id Order BY adapter.created_on DESC";
		} else {
			queryString = "SELECT adapter.id adpId , adapter.name adpName, lookup_value.value template,\r\n"
					+ "GROUP_CONCAT(adapter_configuration.id, ':', adapter_configuration.version ORDER BY adapter_configuration.created_on DESC\r\n"
					+ "SEPARATOR '|') AS versions\r\n" + "FROM adapter\r\n"
					+ "JOIN standard_message_specification ON adapter.standard_message_specification = standard_message_specification.id\r\n"
					+ "JOIN lookup_value ON lookup_value.id = standard_message_specification.message_standard\r\n"
					+ "JOIN adapter_configuration ON adapter.id = adapter_configuration.adapter_id\r\n"
					+ "where adapter.type=\"L3\" GROUP BY adapter.id Order BY adapter.created_on DESC";
		}

		Query query = entityManager.createNativeQuery(queryString);
		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		query.setFirstResult((pageNumber) * pageSize);
		query.setMaxResults(pageSize);
		return query.getResultList();
	}

	@Override
	public long getCount(String adapterType) {
		String query;
		if (adapterType.equals("L1")) {
			query = "SELECT Count(*) FROM adapter where type = 'L1'";
		} else {
			query = "SELECT Count(*) FROM adapter where type = 'L3'";
		}
		Query queryTotal = entityManager.createNativeQuery(query);
		long result = (long) queryTotal.getSingleResult();
		BigInteger count = BigInteger.valueOf(result);
		// BigInteger count = (BigInteger)queryTotal.getSingleResult();
		return count.longValue();
	}

}
