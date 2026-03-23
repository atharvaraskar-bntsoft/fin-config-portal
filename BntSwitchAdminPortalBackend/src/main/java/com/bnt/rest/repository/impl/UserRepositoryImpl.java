package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.entity.QSystemUser;
import com.bnt.rest.entity.QSystemUserRole;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.repository.UserRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class UserRepositoryImpl implements UserRepository {

	@Autowired
	private UserPersistenceHelper userPersistenceRepository;

	@PersistenceContext
	public EntityManager entityManager;

	@SuppressWarnings("unused")
	private EntityType<?> entityType;

	@PostConstruct
	public void setParam() {
		entityType = JPAUtils.getEntityType(entityManager, SystemUser.class);
	}

	@Override
	@Transactional
	public ResponseWrapper findAllUsers(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		String searchObj = (String) requestParamMap.get(ParameterConstant.SEARCH);
		Page<SystemUser> userPage = null;
		if (null == filters && null == searchObj) {
			userPage = userPersistenceRepository.findUserByDeleted('0', pageable);
		} else {
			userPage = getFilterData(pageable, filters, searchObj);
		}

		List<SystemUserDto> list = new ArrayList<>();
		for (SystemUser systemUser : userPage.getContent()) {
			SystemUserDto dto = ObjectMapper.mapToDto(systemUser, SystemUserDto.class);
			dto.setLocked(RippsUtility.convertCharToBooleanUser(systemUser.getLocked()));
			list.add(dto);
		}
		long count = countWithDeleted('0');
		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(userPage, count);
		pageJPAData.setContent(list);
		return pageJPAData;
	}

	private long countWithDeleted(Character deleted) {
		QSystemUser qSystemUser = QSystemUser.systemUser;
		Predicate deletePredicate = qSystemUser.deleted.eq(deleted);
		return userPersistenceRepository.count(deletePredicate);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Page<SystemUser> getFilterData(Pageable pageable, String[] filters, String searchObj) {
		BooleanExpression firstNamePredicate = null;
		BooleanExpression lastNamePredicate = null;
		BooleanExpression compoundPredicate = null;
		BooleanExpression middleNamePredicate = null;
		BooleanExpression namePre = null;
		Predicate mobileNumberPredicate = null;
		Predicate emailPredicate = null;
		QSystemUser qSystemUser = QSystemUser.systemUser;
		QSystemUserRole qSystemUserRole = QSystemUserRole.systemUserRole;
		Predicate lockedPredicate = null;
		Predicate rolePredicate = null;
		Predicate namePredicate = null;

		compoundPredicate = getFilterData1(searchObj, compoundPredicate, qSystemUser);
		if (null != filters) {
			for (String each : filters) {
				String param = each.split(":")[0];
				String value = each.split(":")[1];
				if (param.equals("status")) {
					lockedPredicate = getFilterData2(qSystemUser, value);
				}
				if (param.equals("role")) {
					rolePredicate = qSystemUserRole.roleID.id.eq(Integer.parseInt(value));
				}
			}
		}
		Predicate deletePredicate = qSystemUser.deleted.eq('0');
		Page<SystemUser> userPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		if (rolePredicate == null) {
			jpaQuery.from(qSystemUser).where(compoundPredicate, lockedPredicate, rolePredicate, deletePredicate)
					.limit(pageable.getPageSize()).offset(pageable.getOffset());
		} else {
			/**
			 * jpaQuery.from(qSystemUser).innerJoin(qSystemUser.roleId, qSystemUserRole)
			 * .where(compoundPredicate, lockedPredicate, rolePredicate, deletePredicate)
			 * .limit(pageable.getPageSize()).offset(pageable.getOffset());
			 */

		}
		List<SystemUser> usersList = jpaQuery.fetch();
		return (Page<SystemUser>) JPAUtils.getPageObjectFromList(pageable, usersList, jpaQuery.fetchCount());
	}

	private Predicate getFilterData2(QSystemUser qSystemUser, String value) {
		Predicate lockedPredicate;
		if (value.equals("1")) {
			lockedPredicate = qSystemUser.locked.eq('0');
		} else {
			lockedPredicate = qSystemUser.locked.eq('1');
		}
		return lockedPredicate;
	}

	private BooleanExpression getFilterData1(String searchObj, BooleanExpression compoundPredicate,
			QSystemUser qSystemUser) {
		BooleanExpression firstNamePredicate;
		Predicate emailPredicate;
		if (null != searchObj) {
			String fields[] = searchObj.split(":");
			if (fields[0].equals("searchText")) {
				String keyWords = fields[1].trim();
				firstNamePredicate = (qSystemUser.firstName.toLowerCase().concat(" ")
						.concat(qSystemUser.lastName.toLowerCase())).like('%' + (keyWords) + '%');

				emailPredicate = qSystemUser.email.contains(fields[1]);
				compoundPredicate = firstNamePredicate.or(emailPredicate);

			}

		}
		return compoundPredicate;
	}

	@Override
	public SystemUser saveUser(SystemUser systemUser) {
		return userPersistenceRepository.save(systemUser);
	}

	@Override
	public SystemUser findSystemUserByEmail(String email) {
		return userPersistenceRepository.findSystemUserByEmail(email);
	}

	@Override
	public Page<SystemUser> findSystemUserByRoleId(String roleId, Pageable pageable) {

		return null;
	}

	@Override
	public Page<SystemUser> findAll(Pageable pageable) {

		return userPersistenceRepository.findAll(pageable);
	}

	@Override
	public SystemUser findOne(int id) {
		return userPersistenceRepository.findById(id).orElse(null);
	}

	@Override
	public String getName(int id) {

		return userPersistenceRepository.getName(id);
	}
}
