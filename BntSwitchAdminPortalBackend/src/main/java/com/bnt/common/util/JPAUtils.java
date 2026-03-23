package com.bnt.common.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.Table;
import jakarta.persistence.metamodel.Attribute;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.ManagedType;
import jakarta.persistence.metamodel.Metamodel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RevisionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.querydsl.core.types.Predicate;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.annotations.ExcludeExportMarker;
import com.bnt.constant.DBConstants;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.BaseTimeEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JPAUtils {

	private static final Logger logger = LogManager.getLogger(JPAUtils.class);

	private JPAUtils() {
	}

	public static final String POST_UPDATE_EVENT = "PostUpdateEvent";
	private static final String POST_INSERT_EVENT = "PostInsertEvent";
	private static final String PRE_INSERT_EVENT = "PreInsertEvent";
	private static final String PRE_UPDATE_EVENT = "PreUpdateEvent";

	public static Pageable getPageableObject(Map<String, Object> requestParamMap) {
		Sort sort = null;
		String sortColumn = (String) requestParamMap.get(ParameterConstant.SORT_COLUMN);
		String sortOrder = (String) requestParamMap.get(ParameterConstant.SORT_ORDER);
		if (!(sortColumn == null || sortColumn.isEmpty())) {
			if (sortOrder.equalsIgnoreCase(ParameterConstant.ASC)) {
				sort = Sort.by(Sort.Direction.ASC, sortColumn);
			} else if (sortOrder.equalsIgnoreCase(ParameterConstant.DESC)) {
				sort = Sort.by(Sort.Direction.DESC, sortColumn);
			} else {
				sort = Sort.by(new Sort.Order(Direction.DESC, ParameterConstant.ID));
			}
		} else {
			sort = Sort.by(new Sort.Order(Direction.DESC, ParameterConstant.ID));
		}
		String pageNo = (String) requestParamMap.get(ParameterConstant.PAGE_NO);
		if (pageNo == null || pageNo.isEmpty()) {
			pageNo = String.valueOf(DBConstants.PAGE_NUMBER);
		}
		String pageSize = (String) requestParamMap.get(ParameterConstant.PAGE_SIZE);
		if (pageSize == null || pageSize.isEmpty()) {
			pageSize = String.valueOf(DBConstants.MAX_RESULTS);
		}
		return PageRequest.of(Integer.parseInt(pageNo) - 1, Integer.parseInt(pageSize), sort);
	}

	public static String getTableName(Class<?> classType) {
		Table table = classType.getAnnotation(Table.class);
		return (table != null ? table.name() : null);
	}

	public static String getEntityName(Class<?> classType) {
		Entity entity = classType.getAnnotation(Entity.class);
		return entity.name();
	}

	public static String getClassNameFromQualifiedName(String packageName) {
		String className = packageName;
		int firstChar;
		firstChar = className.lastIndexOf('.') + 1;
		if (firstChar > 0) {
			className = className.substring(firstChar);
		}
		return className;
	}

	public static Class<?> getClassTypeByQualifiedName(String qualifiedClassName) {
		try {
			return Class.forName(qualifiedClassName);
		} catch (ClassNotFoundException e) {
			return null;
		}
	}

	public static String getEntityName(Object object) {
		Class<?> classType = object.getClass();
		return classType.getSimpleName();
	}

	public static Class<?> getClassTypeBySimpleName(EntityManager em, String entityName) {
		Metamodel metamodel = em.getMetamodel();
		for (EntityType<?> e : metamodel.getEntities()) {
			Class<?> entityClass = e.getJavaType();
			if (entityName.equals(entityClass.getSimpleName())) {
				return entityClass;
			}
		}
		return null;
	}

	@SuppressWarnings("unused")
	public static Class<?> getClassTypeOfNonManagedEntity(String className) {
		final Package[] packages = Package.getPackages();
		Class<?> classType = null;
		for (final Package p : packages) {
			final String pack = p.getName();
			// improve performance
			// Following if check is to improve performance if package contains
			// a specific substring otherwise can omit if checks
			final String tentative = pack + "." + className;
			try {
				classType = Class.forName(tentative);
			} catch (final ClassNotFoundException e) {
				continue;
			}
			return classType;
		}
		return null;
	}

	@SuppressWarnings("unused")
	private static Class<?> getClassTypeOfNonManagedEntityInSpecificPackage(String className,
			String searchSubstrInPackageName) {
		final Package[] packages = Package.getPackages();
		Class<?> classType = null;
		for (final Package p : packages) {
			final String pack = p.getName();
			// Following if check is to improve performance if package contains
			// a specific substring otherwise can omit if checks
			if (pack.contains(searchSubstrInPackageName)) {
				final String tentative = pack + "." + className;
				try {
					classType = Class.forName(tentative);
					return classType;
				} catch (final ClassNotFoundException e) {
					continue;
				}
			}
		}
		return null;
	}

	private static Class<?> getDtoClassTypeBySimpleEntityName(String entityName) {
		return getClassTypeOfNonManagedEntity(entityName + "Dto");
	}

	public static Class<?> getDtoClassTypeBySimpleEntityName(String entityName, boolean searchSpecificPackage) {
		Class<?> dtoClassType = null;
		if (searchSpecificPackage) {
			dtoClassType = getClassTypeOfNonManagedEntityInSpecificPackage(entityName + "Dto", "dto");
		} else {
			dtoClassType = getDtoClassTypeBySimpleEntityName(entityName);
		}
		return dtoClassType;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Class<?> getFieldType(EntityType entityType, String fieldName) {
		ManagedType managedType = (ManagedType<? extends BaseEntity>) entityType;
		Class<?> attributeType = null;
		Attribute attribute = null;
		if (managedType != null) {
			attribute = managedType.getAttribute(fieldName);
		}
		if (attribute != null) {
			attributeType = attribute.getJavaType();
		}
		return attributeType;
	}

	@SuppressWarnings("rawtypes")
	public static EntityType getEntityType(EntityManager entityManager, Class<? extends BaseEntity> entityClass) {
		return entityManager.getMetamodel().entity(entityClass);
	}

	public static Page<?> getPageObjectFromList(Pageable pageable, List<?> list, long total) {
		int start = (int) pageable.getOffset();
		int end = 0;
		if (!(CollectionUtil.isCollectionEmptyOrNull(list))) {
			end = (start + pageable.getPageSize()) > list.size() ? list.size() : (start + list.size());
		}
		return new PageImpl<>(list.subList(0, end), pageable, total);
	}

	public static Page<?> getGenericPageObjectFromList(Pageable pageable, List<?> list) {
		if (CollectionUtil.isCollectionEmptyOrNull(list)) {
			return null;
		}
		int start = (int) pageable.getOffset();
		int end = (start + pageable.getPageSize()) > list.size() ? list.size() : (start + list.size());
		return new PageImpl<>(list.subList(0, end), pageable, list.size());
	}

	@SuppressWarnings("rawtypes")
	public static Predicate getPredicate(EntityType entityType, String[] filters) {
		return BaseEntityPredicatesBuilder.getPredicate(entityType, filters);
	}

	@SuppressWarnings("rawtypes")
	public static Class<?> getClassTypeByEntityName(Set<EntityType<?>> entities, String entityName) {
		for (EntityType entityType : entities) {
			if (checkAudited(entityType)) {
				String tableName = entityType.getName().toLowerCase();
				if (entityName.equalsIgnoreCase(tableName)) {
					return entityType.getJavaType();
				}
			}
		}
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static boolean checkAudited(EntityType entityType) {
		return entityType.getJavaType() != null && entityType.getJavaType().getAnnotation(Audited.class) != null;
	}

	@SuppressWarnings("rawtypes")
	public static Set<String> getAuditTableSet(Set<EntityType<?>> entities) {
		Set<String> tableSet = new TreeSet<>();
		for (EntityType entityType : entities) {
			if (checkAudited(entityType)) {
				tableSet.add(entityType.getName().toLowerCase());
			}
		}
		return tableSet;
	}

	public static ResponseWrapper getResponseWrapperByPage(Page<?> page, long totalRecords) {
		ResponseWrapper pageJPAData = new ResponseWrapper();
		if (page == null) {
			pageJPAData.setPageNo(1);
			pageJPAData.setTotalRecords(0);
			pageJPAData.setContent(new ArrayList<>());
			pageJPAData.setTotalFilterRecords(0);
		} else {
			pageJPAData.setPageNo(page.getNumber() + 1);
			pageJPAData.setTotalRecords(totalRecords);
			pageJPAData.setContent(page.getContent());
			pageJPAData.setTotalFilterRecords(page.getContent().size());
		}
		return pageJPAData;
	}

	public static ResponseWrapper getResponseWrapperByList(Map<String, Object> requestParamMap, List<?> resultList) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		Page<?> page = JPAUtils.getGenericPageObjectFromList(pageable, resultList);
		return JPAUtils.getResponseWrapperByPage(page, resultList.size());
	}

	public static Page<?> getPageObjectFromList(List<?> list) {
		return new PageImpl<>(list);
	}

	@SuppressWarnings({ "unchecked" })
	public static List<Object[]> getListFromNativeQuery(EntityManager em, Pageable pageable, String sqlString) {
		return em.createNativeQuery(sqlString).setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
				.setMaxResults(pageable.getPageSize()).getResultList();
	}

	private static boolean isJPAManagedEntity(Class<?> classType) {
		return classType.isAnnotationPresent(Table.class);
	}

	private static boolean isBaseEntity(Class<?> classType) {
		return BaseEntity.class.isAssignableFrom(classType);
	}

	public static boolean isJPAManagedBaseEntity(Class<?> classType) {
		return isJPAManagedEntity(classType) && isBaseEntity(classType);
	}

	public static boolean isEventPostInsertOrPostUpdate(String eventType) {
		return (JPAUtils.POST_INSERT_EVENT.equals(eventType) || JPAUtils.POST_UPDATE_EVENT.equals(eventType));
	}

	public static boolean isOperationExportable(Class<?> classType, String eventType, String requestUri) {
		return (JPAUtils.isEventPostInsertOrPostUpdate(eventType)
				&& !(classType.isAnnotationPresent(ExcludeExportMarker.class))
				&& !(RippsUtility.getNonExportableUriList().contains(requestUri)));
	}

	public static boolean isOperationAuditUpdate(Class<?> classType, RevisionType revisionType) {
		return (revisionType.name().equalsIgnoreCase("mod")
				&& !(classType.isAnnotationPresent(ExcludeExportMarker.class)));
	}

	public static boolean isOperationAuditCreate(Class<?> classType, RevisionType revisionType) {
		return (revisionType.name().equalsIgnoreCase("add")
				&& !(classType.isAnnotationPresent(ExcludeExportMarker.class)));
	}

	public static <T> T getEntityFromJsonString(String dtoData, Class<T> entityClass) {
		T entity;
		Object dtoObject;
		Class<?> dtoClassType = JPAUtils.getDtoClassTypeBySimpleEntityName(entityClass.getSimpleName(), true);
		dtoObject = JsonObjectUtil.getGenericObjectFromJsonString(dtoData, dtoClassType);
		entity = ObjectMapper.map(dtoObject, entityClass);
		return entity;
	}

	public static void mapEntityListToDto(ResponseWrapper response, Class<? extends BaseDto> classType) {
		@SuppressWarnings("unchecked")
		List<? extends BaseEntity> resultList = (List<? extends BaseEntity>) response.getContent();
		List<? extends BaseDto> dtoList = ObjectMapper.mapListObjectToListDto(resultList, classType);
		response.setContent(dtoList);
	}

	public static <T> List<String> entityFieldList(EntityManager entityManager, Class<T> entity) {
		List<String> entityAttributeList = new ArrayList<>();
		Metamodel mm = entityManager.getMetamodel();
		Set<Attribute<? super T, ?>> attributeList = mm.entity(entity).getAttributes();
		for (Attribute<? super T, ?> attrobj : attributeList) {
			entityAttributeList.add(attrobj.getName());
		}
		return entityAttributeList;
	}

	@SuppressWarnings({ "unchecked" })
	public static List<Object[]> getListFromNativeQuery(EntityManager entityManager, String sqlString) {
		Query query = entityManager.createNativeQuery(sqlString);
		return query.getResultList();
	}

	public static Object[] getObjectFromNativeQuery(EntityManager entityManager, String sqlString) {
		Query query = entityManager.createNativeQuery(sqlString);
		return (Object[]) query.getSingleResult();
	}

	public static Integer getId(Object currentEntity) {
		Integer entityId = null;
		if (currentEntity instanceof BaseEntity) {
			entityId = ((BaseEntity) currentEntity).getId();
		} else if (currentEntity instanceof BaseTimeEntity) {
			entityId = ((BaseTimeEntity) currentEntity).getId();
		}
		return entityId;
	}

	public static Page<?> getPageFromNativeQuery(EntityManager entityManager, Pageable pageable, String sqlQuery,
			String countQuery, Map<String, Object> setParameters) {
		List<?> list = getListFromNativeQuery(entityManager, pageable, sqlQuery, setParameters);
		long totalFilteredCount = 0;
		if (countQuery == null || "".equalsIgnoreCase(countQuery)) {
			String countQueryNew = "select count(*) from (  " + sqlQuery + ") cquery";
			totalFilteredCount = getCountFromNativeQueryWithSetParam(entityManager, countQueryNew, setParameters);
		} else {
			totalFilteredCount = getCountFromNativeQueryWithSetParam(entityManager, sqlQuery, null);
		}
		return getPageObjectFromList(pageable, list, totalFilteredCount);
	}

	@SuppressWarnings({ "unchecked" })
	private static List<Object[]> getListFromNativeQuery(EntityManager em, Pageable pageable, String sqlString,
			Map<String, Object> setParameters) {
		Query query = em.createNativeQuery(sqlString);
		if (setParameters != null) {
			for (Map.Entry<String, Object> entry : setParameters.entrySet()) {
				query.setParameter(entry.getKey(), entry.getValue());
			}
		}
		if (pageable != null) {
			query = query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
					.setMaxResults(pageable.getPageSize());
		}
		return query.getResultList();
	}

	@SuppressWarnings({ "unchecked" })
	private static long getCountFromNativeQueryWithSetParam(EntityManager em, String sqlString,
			Map<String, Object> setParameters) {
		Query query = em.createNativeQuery(sqlString);
		if (setParameters != null) {
			for (Map.Entry<String, Object> entry : setParameters.entrySet()) {
				query.setParameter(entry.getKey(), entry.getValue());
			}
		}
		return ((Number) query.getSingleResult()).longValue();
	}

	public static Page<?> getPageFromQuery(EntityManager entityManager, Pageable pageable, String sqlQuery,
			String countQuery, Map<String, Object> setParameters) {
		logger.debug("inside getPageFromQuery().. for countQuery {}", countQuery);
		List<?> list = getListFromQuery(entityManager, pageable, sqlQuery, setParameters);
		long totalFilteredCount = 0;
		return getPageObjectFromList(pageable, list, totalFilteredCount);
	}

	@SuppressWarnings({ "unchecked" })
	private static List<Object[]> getListFromQuery(EntityManager em, Pageable pageable, String sqlString,
			Map<String, Object> setParameters) {
		Query query = em.createQuery(sqlString);
		if (setParameters != null) {
			for (Map.Entry<String, Object> entry : setParameters.entrySet()) {
				query.setParameter(entry.getKey(), entry.getValue());
			}
		}
		if (pageable != null) {
			query = query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
					.setMaxResults(pageable.getPageSize());
		}
		return query.getResultList();
	}
}
