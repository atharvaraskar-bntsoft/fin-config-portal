package com.bnt.rest.repository.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jline.utils.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.IdNameVersionTypeWrapper;
import com.bnt.rest.entity.Deployment;
import com.bnt.rest.jpa.repository.DeploymentPersistenceHelper;
import com.bnt.rest.repository.DeploymentRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class DeploymentRepoImpl implements DeploymentRepository {

	private static final Logger logger = LogManager.getLogger(DeploymentRepoImpl.class);

	@Autowired
	DeploymentPersistenceHelper jpaHelper;

	@Autowired
	private EntityManager entityManager;

	@Override
	@Transactional
	public ResponseWrapper findAllScheduledRecords(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<Deployment> page = null;

		long totalCount = 0;

		page = jpaHelper.findAllScheduledRecords(pageable);
		if (!page.isEmpty()) {
			totalCount = page.getTotalElements();
		}
		return JPAUtils.getResponseWrapperByPage(page, totalCount);
	}

	@Override
	public Deployment findRecordById(Integer id) {
		Optional<Deployment> optional = jpaHelper.findById(id);

		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public Integer getDeploymentNewRecordCount() {
		return jpaHelper.getDeploymentNewRecordCount();
	}

	@SuppressWarnings("unchecked")
	@Override
	public Set<IdNameVersionTypeWrapper> getComponentListForDeploymentWorkFlowJSON() {
		Log.info("inside getComponentListForDeploymentWorkFlowJSON");
		Set<IdNameVersionTypeWrapper> resultList = new HashSet<>();
		IdNameVersionTypeWrapper idNameVersionTypeWrapper = null;
		try {
			String queryString = "select t.component_Id, t.name, t.component_type, t.version\r\n"
					+ " from deployment_component t \r\n" + " inner join(\r\n"
					+ " select component_type,name, max(created_on) created_on from deployment_component group by component_type,name\r\n"
					+ ") tm on t.component_type=tm.component_type \r\n" + "    and t.name=tm.name \r\n"
					+ "    and t.created_on=tm.created_on \r\n"
					+ " where t.deployment_id in (select id from deployment d where d.status in  ('Deployed','Scheduled'))"
					+ "";
			logger.info("queryString: {}", queryString);

			Query query = entityManager.createNativeQuery(queryString);
			Object result = query.getResultList();
			if (result != null) {
				List<Object[]> allDataArray = (List<Object[]>) result;
				for (Object dataArray : allDataArray) {
					Object[] data = (Object[]) dataArray;
					idNameVersionTypeWrapper = new IdNameVersionTypeWrapper();
					idNameVersionTypeWrapper.setId((Integer) data[0]);
					idNameVersionTypeWrapper.setName((String) data[1]);
					idNameVersionTypeWrapper.setType((String) data[2]);
					idNameVersionTypeWrapper.setVersion(((Short) data[3]).intValue());
					resultList.add(idNameVersionTypeWrapper);
				}
			}
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		return resultList;
	}
}
