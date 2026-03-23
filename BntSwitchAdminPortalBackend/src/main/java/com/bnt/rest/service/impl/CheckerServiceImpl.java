package com.bnt.rest.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import jakarta.persistence.EntityManager;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.bswitch.shared.lib.entities.StringUtil;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.GsonUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.JsonObjectUtil;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.constant.Constants;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.BaseDto;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.entity.Checker;
import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.RoleFunction;
import com.bnt.rest.entity.SubMenuFunction;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.CheckerPersistenceHelper;
import com.bnt.rest.jpa.repository.GenericDAOJPA;
import com.bnt.rest.jpa.repository.RoleFunctionPersistenceHelper;
import com.bnt.rest.jpa.repository.SubMenuHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.service.CheckerService;
import com.bnt.rest.service.RoleRestService;
import com.bnt.rest.wrapper.dto.CheckerDto;
import com.bnt.rest.wrapper.dto.PermissionDto;
import com.bnt.service.mapper.CheckerMakerMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class CheckerServiceImpl implements CheckerService {

	private static Logger logger = LogManager.getLogger(CheckerServiceImpl.class);

	@Autowired
	private CheckerPersistenceHelper chekerHelper;

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private SubMenuHelper subMenuJpaHelper;

	@Autowired
	private UserPersistenceHelper userPersistenceHelper;

	@Autowired
	private RoleFunctionPersistenceHelper roleFunctionRepo;

	@Autowired
	private RoleRestService roleService;

	@Autowired
	private CheckerDelegatorServiceImpl checkerDelegator;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Object updateChecker(String entityName, String entityId, String requestJsontoUpdate, String status) {
		Integer id = Integer.parseInt(entityId);
		Class<? extends BaseEntity> entityClassType = (Class<? extends BaseEntity>) JPAUtils
				.getClassTypeBySimpleName(entityManager, entityName);

		Class<? extends BaseDto> dtoClassType = (Class<? extends BaseDto>) JPAUtils
				.getDtoClassTypeBySimpleEntityName(entityName, false);

		GenericDAOJPA genericDaoObject = GenericDAOJPA.getInstance(entityManager, entityClassType);
		Object savedEntity = genericDaoObject.get(id);

		Object savedDto = ObjectMapper.mapToDto(savedEntity, dtoClassType);

		String savedJsonString = GsonUtil.getJsonObjectFromType(savedDto, false).toString();

		/*
		 * IF there will be difference in DTO & Entity type then we need to first
		 * convert to entity and then convert it to corresponding DTO and then String to
		 * pass to getDifference()
		 */

		String updatedData = GsonUtil.getDifference(savedJsonString, requestJsontoUpdate);

		Checker checker = CheckerMakerMapper.mapToChecker(entityName, id, requestJsontoUpdate, updatedData, status);
		chekerHelper.save(checker);
		logger.info("Checker data has been persist!");
		return JsonObjectUtil.getGenericObjectFromJsonString(savedJsonString, dtoClassType);

	}

	@Override
	@Transactional
	public String approveChecker(CheckerDto checkerDto) {

		try {

			Checker checker = chekerHelper.findById(checkerDto.getId()).orElse(null);
			if (null == checker) {
				throw new RippsAdminException("Invalid request with id: " + checkerDto.getId());
			}
			if (Constants.APPROVED.equalsIgnoreCase(checkerDto.getStatus())
					&& Constants.PENDING.equalsIgnoreCase(checker.getStatus())) {

				if (checker.getJson() != null) {

					checkerDto.setJson(checker.getJson());

					boolean isOperationPerformed = checkerDelegator.delegate(checkerDto);
					if (isOperationPerformed) {
						checker.setStatus(Constants.APPROVED);
					} else {
						throw new RippsAdminException("Error in approving data");
					}
				}
			} else {
				checker.setStatus(Constants.DECLINED);
			}
			chekerHelper.save(checker);
			return "RECORD " + checker.getStatus();
		} catch (Exception e) {
			logger.error("Error in updating entity corresponsing to  checker record : {}", e.getMessage());
		}
		return null;

	}

	@Override
	public int addChecker(String entityName, String requestJsontoUpdate) {

		Checker checker = CheckerMakerMapper.mapToChecker(entityName, requestJsontoUpdate, Constants.PENDING);

		Boolean isPutOperation = CheckerMakerMapper.setEntityIdIfPUT(checker);

		if (isPutOperation.booleanValue()) {
			updateChecker(entityName, checker.getEntityId().toString(), requestJsontoUpdate, checker.getStatus());
		} else {
			chekerHelper.save(checker);
		}
		logger.info("Checker data has been persist checker {}", checker);
		return 1;

	}

	@Override
	public ResponseWrapper getCheckerList(Map<String, Object> requestParamMap, String token)
			throws AccessDeniedException {
		Page<Checker> chekerPage = getCheckerApprovedPage(requestParamMap);

		if (null != chekerPage) {
			long count = chekerPage.getTotalElements();
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(chekerPage, count);
			pageJPAData.setContent(convertEntityToDto(chekerPage.getContent()));
			return pageJPAData;
		}
		return null;
	}

	private Set<String> verifyPermissions() throws AccessDeniedException {

		List<RoleFunction> roleFunctionList = roleService.getRoleFunctionList();

		return getEntitySet(roleFunctionList);

	}

	private Set<String> getEntitySet(List<RoleFunction> roleFunctionList) {
		Set<String> entityList = new HashSet<>();
		for (RoleFunction roleFunction : roleFunctionList) {
			if (roleFunction.isCanCheck()
					&& !(StringUtil.isEmptyOrNull(roleFunction.getSubMenuFunction().getEntity()))) {
				entityList.add(roleFunction.getSubMenuFunction().getEntity());
			}

		}
		return entityList;
	}

	private List<CheckerDto> convertEntityToDto(List<Checker> checkerList) {
		List<CheckerDto> checkerDtoList = new ArrayList<>();
		for (Checker checker : checkerList) {
			CheckerDto checkerDto = ObjectMapper.mapToDto(checker, CheckerDto.class);
			Optional<SystemUser> optSysUser = userPersistenceHelper.findById(checker.getCreatedBy());
			if (optSysUser.isPresent()) {
				SystemUser systemUser = optSysUser.get();
				checkerDto.setCreatedBy(systemUser.getFirstName() + " " + systemUser.getLastName());

				if (RippsUtility.isNotNull(checker.getUpdatedBy())) {
					SystemUser systemUserUpd = userPersistenceHelper.findById(checker.getUpdatedBy()).orElse(null);
					if (!checker.getCreatedBy().equals(checker.getUpdatedBy()) && null != systemUserUpd) {
						checkerDto.setUpdatedBy(systemUserUpd.getFirstName() + " " + systemUserUpd.getLastName());
					} else {
						checkerDto.setUpdatedBy(systemUser.getFirstName() + " " + systemUser.getLastName());
					}
				}
				checkerDtoList.add(checkerDto);

			}
		}
		logger.info("checker entity list convert into dto list");
		return checkerDtoList;
	}

	@Override
	@Transactional
	public boolean updateChecker(CheckerDto checkerDto) {

		boolean flag = false;

		Checker checkerEntity = chekerHelper.findById(checkerDto.getId()).orElse(null);
		if (null == checkerEntity) {
			throw new RippsAdminException("Invalid request with id: " + checkerDto.getId());
		}
		try {
			ReflectionUtil.copy(checkerEntity, checkerDto, false);
			chekerHelper.save(checkerEntity);
			flag = true;

		} catch (Exception e) {
			logger.error("Exception in saving entity");
			return flag;
		}
		return flag;
	}

	@Override
	public String getCheckerEnabledEntity(String token, int subMenuFunctionId) throws AccessDeniedException {
		SubMenuFunction subMenuFunction = subMenuJpaHelper.findById(subMenuFunctionId).orElse(null);
		if (subMenuFunction == null) {
			throw new RippsAdminException("Contact Admin!");
		}
		String entityType = subMenuFunction.getEntity();
		if (null == entityType)
			return null;

		boolean isEntityChecked = isEntityChecked(subMenuFunction, entityType);

		if (!isEntityChecked) {
			return entityType;
		}
		return null;

	}

	private boolean isEntityChecked(SubMenuFunction subMenuFunction, String entityType) throws AccessDeniedException {

		logger.info("inside isEntityChecked() for entityType : {}", entityType);
		List<Role> roleList = roleService.getRoleList();

		RoleFunction roleFunction = null;
		for (Role role : roleList) {

			roleFunction = roleFunctionRepo.findByRoleAndSubMenuFunction(role, subMenuFunction);

			if (roleFunction != null && roleFunction.isCanCheck()) {
				return true;
			}
		}
		return false;
	}

	public ResponseWrapper getCount(Map<String, Object> requestParamMap, String token) throws AccessDeniedException {
		Page<Checker> checkerPage = getCheckerApprovedPage(requestParamMap);
		if (null != checkerPage) {
			long count = checkerPage.getTotalElements();
			logger.info("Total count :{}", count);
			ResponseWrapper pageJPAData = new ResponseWrapper();
			pageJPAData.setTotalRecords(count);
			return pageJPAData;
		}
		return null;
	}

	private Page<Checker> getCheckerApprovedPage(Map<String, Object> requestParamMap) throws AccessDeniedException {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Checker> chekerPage = null;

		Set<String> entitySet = verifyPermissions();

		if (!RippsUtility.isNotNull(filters)) {
			chekerPage = chekerHelper.findByStatusAndEntityTypeIn("PENDING", new ArrayList<>(entitySet), pageable);
		}
		return chekerPage;
	}

	private Page<Checker> getCheckerNotificationPage(Map<String, Object> requestParamMap) throws AccessDeniedException {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Checker> chekerPage = null;

		Set<String> entitySet = verifyPermissions();

		if (!RippsUtility.isNotNull(filters)) {
			chekerPage = chekerHelper.findByEntityTypeIn(new ArrayList<>(entitySet), pageable);
		}
		return chekerPage;
	}

	public ResponseWrapper findCurrentUserPermission() throws AccessDeniedException {
		List<String> menuList = new ArrayList<>();
		Map<String, PermissionDto> map = new HashMap<>();

		List<Role> roleList = roleService.getRoleList();
		for (Role role : roleList) {
			List<RoleFunction> roleFunctionList = roleFunctionRepo.findRoleFunctionByRoleId(role.getId());
			addIntoMap(roleFunctionList, map, menuList);
		}

		List<Checker> checkerList = chekerHelper.findByStatusAndEntityTypeIn("PENDING", menuList);
		long count = checkerList.size();
		logger.info("Total count :{}", count);
		ResponseWrapper pageJPAData = new ResponseWrapper();
		pageJPAData.setTotalRecords(count);
		return pageJPAData;
	}

	private void addIntoMap(List<RoleFunction> roleFunctionList, Map<String, PermissionDto> map,
			List<String> menuList) {
		for (RoleFunction roleFunction : roleFunctionList) {
			PermissionDto permissionDto = map.get(roleFunction.getSubMenuFunction().getUrl());
			if (permissionDto == null) {
				permissionDto = new PermissionDto();
			}
			if (roleFunction.isCanCheck()) {
				menuList.add(roleFunction.getSubMenuFunction().getName());
			}
			permissionDto.setId(roleFunction.getSubMenuFunction().getUrl());
			map.put(roleFunction.getSubMenuFunction().getUrl(), permissionDto);
		}
	}

	@Override
	public ResponseWrapper getNotification(Map<String, Object> requestParamMap, String token)
			throws AccessDeniedException {
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Checker> notificationPage = null;
		if (filters == null) {
			notificationPage = getCheckerNotificationPage(requestParamMap);
		}
		long count = 0;
		if (null != notificationPage) {
			count = notificationPage.getContent().size();
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(notificationPage, count);
			pageJPAData.setContent(convertEntityToDto(notificationPage.getContent()));
			return pageJPAData;
		}

		return null;

	}
}
