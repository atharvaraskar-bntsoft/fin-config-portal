package com.bnt.common.util;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.KeyValueObjectWrapper;
import com.bnt.service.mapper.SmartFilterQueryMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class SmartFilterQueryUtils {

	private static final Logger logger = LogManager.getLogger(SmartFilterQueryUtils.class);

	private static final String LIKE_SQL_OPERATOR = "like";
	private static final String EQUAL_SQL_OPERATOR = "=";

	private static String getSerchQuery(String mainQuery, Map<String, Object> queryParameters, String[] filterData) {
		if (filterData != null && filterData.length > 0) {
			if (queryParameters == null) {
				queryParameters = new LinkedHashMap<>();
			}
			String tablePrefix = "tabSample";
			String whereCondition = getWhereFilter(queryParameters, filterData, tablePrefix);
			if (StringUtil.isNotNullOrBlank(whereCondition) && StringUtil.isNotNullOrBlank(mainQuery)) {
				StringBuilder queryBuilderFilter = new StringBuilder();
				queryBuilderFilter
						.append(" select * from (" + mainQuery + ") " + tablePrefix + " where " + whereCondition);
				return queryBuilderFilter.toString();
			} else {
				return mainQuery;
			}
		} else {
			return mainQuery;
		}
	}

	private static String getWhereFilter(Map<String, Object> queryParameters, String[] filterData, String tablePrefix) {
		if (filterData != null && filterData.length > 0) {
			StringBuilder queryCondition = new StringBuilder();
			getWhereFilter1(queryParameters, filterData, tablePrefix, queryCondition);
			return queryCondition.toString();
		}
		return null;
	}

	private static void getWhereFilter1(Map<String, Object> queryParameters, String[] filterData, String tablePrefix,
			StringBuilder queryCondition) {
		String condition;
		for (String eachFilterParam : filterData) {
			if (eachFilterParam.contains(":")) {
				condition = getEachParam(eachFilterParam, ":", queryParameters, LIKE_SQL_OPERATOR, tablePrefix);
				if (StringUtil.isNotNullOrBlank(condition)) {
					if (queryCondition.length() > 1) {
						queryCondition.append(" and ");
					}
					queryCondition.append(condition);
				}
			}
		}
	}

	private static String getEachParam(String paramData, String splitString, Map<String, Object> queryParameters,
			String operator, String tablePrefix) {
		StringBuilder queryBuilderEachFilter = new StringBuilder();
		String param = paramData.split(splitString)[0];
		String value = paramData.split(splitString)[1];
		if (StringUtil.isNotNullOrBlank(param) && StringUtil.isNotNullOrBlank(value)
				&& StringUtil.isNotNullOrBlank(operator)) {
			if (StringUtil.isNotNullOrBlank(tablePrefix)) {
				queryBuilderEachFilter.append(tablePrefix + "." + param + " ");
			} else {
				queryBuilderEachFilter.append(param + " ");
			}
			if (LIKE_SQL_OPERATOR.equalsIgnoreCase(operator)) {
				queryBuilderEachFilter.append(LIKE_SQL_OPERATOR + " :" + param);
				queryParameters.put(param, "%" + value + "%");
			} else {
				queryBuilderEachFilter.append(EQUAL_SQL_OPERATOR + " :" + param);
				queryParameters.put(param, value);
			}
		}
		return queryBuilderEachFilter.toString();
	}

	@SuppressWarnings("unchecked")
	private static Page<?> getFilterRecordFromNativeQuery(EntityManager entityManager, Pageable pageable,
			String mainSqlQuery, String countMainQuery, Map<String, Object> setQueryParameters, String[] filters,
			String filterSqlQuery) {
		logger.info("skipping filter due to filter error: going for normal query for countMainQuery {}",
				countMainQuery);
		String countFilterQuery = null;
		Page<Object[]> data = null;
		Map<String, Object> queryParameters = null;
		String querySqlFilter = null;
		boolean exceuteMainQuery = false;
		if (filters != null && filters.length > 0) {
			if (StringUtil.isNotNullOrBlank(filterSqlQuery)) {
				querySqlFilter = filterSqlQuery;
			} else {
				queryParameters = new LinkedHashMap<>();
				if (!setQueryParameters.isEmpty()) {
					queryParameters.putAll(setQueryParameters);
				}
				querySqlFilter = SmartFilterQueryUtils.getSerchQuery(mainSqlQuery, queryParameters, filters);
			}
			try {
				data = (Page<Object[]>) JPAUtils.getPageFromNativeQuery(entityManager, pageable, querySqlFilter,
						countFilterQuery, queryParameters);
			} catch (Exception ex) {
				logger.error("Exception in getPagedAddressList {} : ", ExceptionLog.printStackTraceToString(ex));
				logger.info("skipping filter due to filter error: going for normal query");
				exceuteMainQuery = true;
			}
		} else {
			exceuteMainQuery = true;
		}
		if (exceuteMainQuery) {
			logger.info("Query:{} ", mainSqlQuery);
			return getMainRecordFromNativeQuery(entityManager, mainSqlQuery, setQueryParameters, pageable);
		}
		return data;
	}

	public static Page<?> getFilteredDataUsingMainQuery(EntityManager entityManager, String mainSqlQuery,
			Map<String, Object> queryParameters, Pageable pageable, String[] filters) {
		if (queryParameters == null) {
			queryParameters = new LinkedHashMap<>();
		}
		if (filters != null && filters.length > 0) {
			/**
			 * return getFilterRecordFromNativeQuery(entityManager, pageable, mainSqlQuery,
			 * null, queryParameters, filters, null, null);
			 */
			return getFilterRecordFromNativeQuery(entityManager, pageable, mainSqlQuery, null, queryParameters, filters,
					null);
		} else {
			return getMainRecordFromNativeQuery(entityManager, mainSqlQuery, queryParameters, pageable);
		}
	}

	@SuppressWarnings("unchecked")
	private static Page<?> getMainRecordFromNativeQuery(EntityManager entityManager, String mainSqlQuery,
			Map<String, Object> queryParameters, Pageable pageable) {
		logger.info("Query:{} ", mainSqlQuery);
		try {
			return JPAUtils.getPageFromNativeQuery(entityManager, pageable, mainSqlQuery, null, queryParameters);
		} catch (Exception ex2) {
			logger.error("Exception in getPagedAddressList {} : ", ExceptionLog.printStackTraceToString(ex2));
			return null;
		}
	}

	private static List<KeyValueObjectWrapper> converResult(Page<?> pagedData, List<KeyValueObjectWrapper> dataOutPut) {
		if (dataOutPut == null) {
			dataOutPut = new ArrayList<>();
		}
		List<KeyValueObjectWrapper> dataList = new ArrayList<>();
		if (pagedData != null && pagedData.hasContent()) {
			pagedData.getContent().stream().forEach(each -> {
				KeyValueObjectWrapper keyValueObjectWrapper = null;
				if (each instanceof Object[] data) {
					keyValueObjectWrapper = new KeyValueObjectWrapper();
					keyValueObjectWrapper.setKey(data[0]);
					if (data.length == 1) {
						keyValueObjectWrapper.setValue(data[0]);
					} else {
						keyValueObjectWrapper.setValue(data[1]);
					}
				} else {
					keyValueObjectWrapper = new KeyValueObjectWrapper();
					keyValueObjectWrapper.setKey(each);
					keyValueObjectWrapper.setValue(each);
				}
				dataList.add(keyValueObjectWrapper);
			});
		}
		dataOutPut.addAll(dataList);
		return dataOutPut;
	}

	public static ResponseWrapper getFilteredDataResponseUsingMainQuery(EntityManager entityManager,
			String mainSqlQuery, Map<String, Object> queryParameters, Pageable pageable, String[] filters) {
		logger.info("inside getFilteredDataResponseUsingMainQuery");
		Page<?> pagedData = SmartFilterQueryUtils.getFilteredDataUsingMainQuery(entityManager, mainSqlQuery,
				queryParameters, pageable, filters);
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(pagedData,
				pagedData == null ? 0 : pagedData.getTotalElements());
		List<KeyValueObjectWrapper> dataList = new ArrayList<>();
		converResult(pagedData, dataList);
		pageJPAData.setContent(dataList);
		return pageJPAData;
	}

	public static ResponseWrapper getFilteredDataUsingJsonQuery(EntityManager entityManager,
			Map<String, Object> queryParameters, Pageable pageable, String[] filters, String queryKey) {
		return SmartFilterQueryUtils.getFilteredDataResponseUsingMainQuery(entityManager,
				SmartFilterQueryMapper.getQueryByKey(queryKey), queryParameters, pageable, filters);
	}
}
