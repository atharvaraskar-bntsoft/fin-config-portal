package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.HTMLInjectionUtil;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.AccessDeniedException;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.DtoWrapper;
import com.bnt.rest.dto.RoleDto;
import com.bnt.rest.dto.RoleFunctionDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.RoleFunction;
import com.bnt.rest.entity.SubMenuFunction;
import com.bnt.rest.jpa.repository.RoleFunctionPersistenceHelper;
import com.bnt.rest.jpa.repository.RolePersistenceHelper;
import com.bnt.rest.jpa.repository.SubMenuHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.RoleRepository;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.service.RoleRestService;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class RoleRestServiceImpl implements RoleRestService {

	private static final String CHECKER_IS_ENABLE_FOR_TO_ADD_ROLE = "Checker is enable for to add role";

	private static final Logger log = LogManager.getLogger(RoleRestServiceImpl.class.getName());

	@Autowired
	private RolePersistenceHelper roleRestRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private SubMenuHelper subMenuHelper;

	@Autowired
	private RoleFunctionPersistenceHelper roleFunctionRepository;

	@Autowired
	private ListService instService;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired

	private HttpServletRequest request;

	@Value("${keyclock.role.prefix}")
	private String keyCloakRolePrefix;

	@Value("${role.viewonly.links}")
	private String roleViewonlyLinks;

	@Override
	public ResponseWrapper getRoles(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<Role> userPage = null;

		if (filters == null) {
			userPage = roleRestRepository.findRoleByDeleted('0', pageable);
		} else {
			userPage = roleRepository.getFilterData(pageable, filters);
		}
		List<RoleDto> roleDtoList = ObjectMapper.mapListObjectToListDto(userPage.getContent(), RoleDto.class);

		long count = userPage.getTotalElements();
		ResponseWrapper pageJpaData = JPAUtils.getResponseWrapperByPage(userPage, count);
		pageJpaData.setContent(roleDtoList);
		return pageJpaData;

	}

	@Override
	@Transactional
	public int addRole(RoleDto finalRoleDto) {
		Role role = new Role();
		role.setName(HTMLInjectionUtil.validateHTMLInjection(finalRoleDto.getName()));

		role.setDescription(HTMLInjectionUtil
				.validateHTMLInjection(finalRoleDto.getDescription() == null ? "" : finalRoleDto.getDescription()));
		role.setLocked(RippsUtility.convertBooleanToChar(finalRoleDto.getLocked()));
		role.setDeleted('0');
		role.setCreatedBy(1);
		role.setCreatedOn(new Timestamp(System.currentTimeMillis()));
		role.setRoleFunctions(getRoleFunctionDtoList(role, finalRoleDto.getRoleFunctions()));
		role = roleRestRepository.save(role);
		log.info("Role saved :" + role);
		return role.getId();
	}

	private List<RoleFunction> getRoleFunctionDtoList(Role role, List<RoleFunctionDto> roleFunctionList) {
		List<RoleFunction> roleFunList = new ArrayList<>();
		boolean isCheckerFlag = false;
		for (RoleFunctionDto roleFunctionDto : roleFunctionList) {
			if (roleFunctionDto.isCanCheck()) {
				isCheckerFlag = true;
				log.info(CHECKER_IS_ENABLE_FOR_TO_ADD_ROLE);
			}

			if (roleFunctionDto.isCanCreate() || roleFunctionDto.isCanModify() || roleFunctionDto.isCandelete()) {
				roleFunctionDto.setCanView(true);
				log.info("Add View enable : " + roleFunctionDto);
			}

			RoleFunction roleFunctionEntity = ObjectMapper.mapToEntity(roleFunctionDto, RoleFunction.class);
			if (Optional.ofNullable(roleFunctionDto.getSubMenuFunction().getId()).isPresent()) {
				Optional<SubMenuFunction> smf = subMenuHelper.findById(roleFunctionDto.getSubMenuFunction().getId());
				if (smf.isPresent()) {
					SubMenuFunction subMenuFunction = smf.get();
					roleFunctionEntity.setSubMenuFunction(subMenuFunction);
				}
			}
			roleFunctionEntity.setCreatedBy(1);
			roleFunctionEntity.setCreatedOn(RippsUtility.getCurrentTime());
			roleFunctionEntity.setRole(role);
			roleFunList.add(roleFunctionEntity);
			log.info("dto added in list");
		}

		if (isCheckerFlag) {
			roleFunList.add(addDashboardAndNotificationMenu(role, 44, false));
			log.info("pending approval role added in list");
		}

		roleFunList.add(addDashboardAndNotificationMenu(role, 39, false));
		roleFunList.add(addDashboardAndNotificationMenu(role, 45, false));

		return roleFunList;
	}

	private RoleFunction addDashboardAndNotificationMenu(Role role, int menuId, boolean checkFlag) {
		RoleFunction roleFunction = new RoleFunction();
		roleFunction.setRole(role);
		roleFunction.setCanCheck(checkFlag);
		roleFunction.setCanModify(true);
		roleFunction.setCanCreate(true);
		roleFunction.setCanView(true);
		roleFunction.setCandelete(true);
		SubMenuFunction subMenuFunction = new SubMenuFunction();
		subMenuFunction.setId(menuId);
		roleFunction.setSubMenuFunction(subMenuFunction);
		roleFunction.setCreatedBy(1);
		roleFunction.setCreatedOn(RippsUtility.getCurrentTime());
		log.info("Add default dashboard permission");
		return roleFunction;
	}

	@Override
	public Role findRoleById(int id) {
		Optional<Role> role = roleRestRepository.findById(id);
		return role.isPresent() ? role.get() : null;
	}

	@Override
	@Transactional
	public void updateRole(RoleDto roleDto, Role role, String requestToken) {

		int roleFunctionId = 0;
		RoleFunctionDto roleFunctionDtoPending = null;
		boolean isCheckerFlag = false;
		boolean isAlreadyCheck = false;
		if (roleDto.getName() == null) {
			updateStatus(roleDto, role);
			return;
		} else {
			updateRoleAndPersist(roleDto, role, roleFunctionId, roleFunctionDtoPending, isCheckerFlag, isAlreadyCheck);
		}

	}

	private void updateRoleAndPersist(RoleDto roleDto, Role role, int roleFunctionId,
			RoleFunctionDto roleFunctionDtoPending, boolean isCheckerFlag, boolean isAlreadyCheck) {
		mapRoleFromDto(roleDto, role);
		List<RoleFunction> roleFunctionList = new ArrayList<>();
		Map<Integer, RoleFunction> map = convertInMap(role.getRoleFunctions());
		updateRoleToPersist(roleDto, role, map, roleFunctionList);

		if (!isAlreadyCheck && isCheckerFlag) {
			roleFunctionList.add(addDashboardAndNotificationMenu(role, 44, false));
			log.info("pending approval role added in list");
		}

		if (isAlreadyCheck || isCheckerFlag) {
			log.info("Update pending dto");
			if (roleFunctionId != 0) {
				roleFunctionList.add(getRoleFunction(map.get(roleFunctionId), roleFunctionDtoPending));
				map.remove(roleFunctionId);
			}

		}

		if (!map.isEmpty()) {
			for (RoleFunction roleFunction : map.values()) {
				roleFunction.setCanCheck(false);
				roleFunction.setCanCreate(false);
				roleFunction.setCandelete(false);
				roleFunction.setCanModify(false);
				roleFunction.setCanView(false);
				roleFunctionList.add(roleFunction);
				log.info("Delete role Function :" + roleFunction.getId());
			}
		}
		role.setLocked(RippsUtility.convertBooleanToChar(roleDto.getLocked()));
		role.setRoleFunctions(roleFunctionList);
		roleRestRepository.save(role);
		log.info("Update Role Entity");
	}

	private void updateRoleToPersist(RoleDto roleDto, Role role, Map<Integer, RoleFunction> map,
			List<RoleFunction> roleFunctionList) {
		for (RoleFunctionDto roleFunctionDto : roleDto.getRoleFunctions()) {
			RoleFunction roleFunction = map.get(roleFunctionDto.getId());
			if (roleFunction != null) {
				roleFunctionNotNull(map, roleFunctionList, roleFunctionDto, roleFunction);
			} else {
				roleFunctionNull(role, roleFunctionList, roleFunctionDto);
			}
		}

	}

	private void roleFunctionNull(Role role, List<RoleFunction> roleFunctionList, RoleFunctionDto roleFunctionDto) {
		if (roleFunctionDto.isCanCheck()) {
			log.info(CHECKER_IS_ENABLE_FOR_TO_ADD_ROLE);
		}

		RoleFunction roleFunction1 = setDefaultRoleFunction(role);
		roleFunctionList.add(getRoleFunction(roleFunction1, roleFunctionDto));
		log.info("Added new Role Function : " + roleFunction1);
	}

	private void roleFunctionNotNull(Map<Integer, RoleFunction> map, List<RoleFunction> roleFunctionList,
			RoleFunctionDto roleFunctionDto, RoleFunction roleFunction) {
		/**
		 * int roleFunctionId; RoleFunctionDto roleFunctionDtoPending; boolean
		 * isCheckerFlag; boolean isAlreadyCheck;
		 **/
		if (roleFunction.isCanCheck() && roleFunctionDto.isCanCheck()) {
			/** isAlreadyCheck = true; **/
			log.info("Alrady Checker is enable for to role");
		}
		if (roleFunctionDto.isCanCheck()) {
			/** isCheckerFlag = true; */
			log.info(CHECKER_IS_ENABLE_FOR_TO_ADD_ROLE);
		}
		if (roleFunctionDto.getSubMenuFunction().getId() != 44) {
			map.remove(roleFunctionDto.getId());
			roleFunctionList.add(getRoleFunction(roleFunction, roleFunctionDto));
		} else {
			/**
			 * roleFunctionDtoPending = roleFunctionDto; roleFunctionId =
			 * roleFunctionDto.getId();
			 **/
		}
		log.info("removed from map :" + roleFunctionDto.getId());
	}

	private void updateStatus(RoleDto roleDto, Role role) {
		role.setLocked(RippsUtility.convertBooleanToCharUser(roleDto.getActive()));
		role.setUpdatedBy(authSessionService.getCreatedBy());
		role.setUpdatedOn(RippsUtility.getCurrentTime());
		roleRestRepository.save(role);
		log.info("Update status");
	}

	private RoleFunction setDefaultRoleFunction(Role role) {
		RoleFunction roleFunction1 = new RoleFunction();
		roleFunction1.setCreatedBy(1);
		roleFunction1.setCreatedOn(RippsUtility.getCurrentTime());
		roleFunction1.setRole(role);
		log.info("Add default value for role function");
		return roleFunction1;
	}

	private void mapRoleFromDto(RoleDto roleDto, Role role) {
		role.setName(HTMLInjectionUtil.validateHTMLInjection(roleDto.getName()));
		role.setDescription(HTMLInjectionUtil.validateHTMLInjection(roleDto.getDescription()));
		role.setLocked(RippsUtility.convertBooleanToChar(roleDto.getActive()));
		role.setDeleted('0');
		role.setUpdatedBy(1);
		role.setUpdatedOn(new Timestamp(System.currentTimeMillis()));
		log.info("Set role value from dto");
	}

	@Transactional
	public void deleteRoleFunction(Role role, SubMenuFunction subMenuFunction) {
		roleFunctionRepository.deleteByRoleAndSubMenuFunction(role, subMenuFunction);
	}

	private RoleFunction getRoleFunction(RoleFunction roleFunction, RoleFunctionDto roleFunctionDto) {
		if (roleFunctionDto.isCanCreate() || roleFunctionDto.isCanModify() || roleFunctionDto.isCandelete()) {
			roleFunctionDto.setCanView(true);
			log.info("Add View enable : " + roleFunctionDto);
		}

		RoleFunction roleFunctionEntity = ObjectMapper.mapToEntity(roleFunctionDto, RoleFunction.class);
		if (Optional.ofNullable(roleFunctionDto.getSubMenuFunction().getId()).isPresent()) {
			Optional<SubMenuFunction> smf = subMenuHelper.findById(roleFunctionDto.getSubMenuFunction().getId());
			if (smf.isPresent()) {
				SubMenuFunction subMenuFunction = smf.get();
				roleFunctionEntity.setSubMenuFunction(subMenuFunction);
			}
		}
		roleFunctionEntity.setCreatedBy(roleFunction.getCreatedBy());
		roleFunctionEntity.setCreatedOn(roleFunction.getCreatedOn());
		roleFunctionEntity.setRole(roleFunction.getRole());
		roleFunctionEntity.setUpdatedBy(1);
		roleFunctionEntity.setUpdatedOn(RippsUtility.getCurrentTime());
		log.info("Set Role Function Entity :" + roleFunctionEntity);
		return roleFunctionEntity;
	}

	private Map<Integer, RoleFunction> convertInMap(List<RoleFunction> roleFunctionList) {
		Map<Integer, RoleFunction> map = new HashMap<>();
		for (RoleFunction roleFunction : roleFunctionList) {
			map.put(roleFunction.getId(), roleFunction);
		}
		return map;
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());
		map.put("function", instService.getSubMenuList());

		return map;
	}

	@Override
	public List<Role> getRoleList() throws AccessDeniedException {
		List<Role> roleList = null;
		List<String> keyclockList = RippsUtility.getKeyCloakRole(request, keyCloakRolePrefix);
		if (!keyclockList.isEmpty()) {
			roleList = roleRestRepository.findByRoleName(keyclockList);
		} else {
			throw new AccessDeniedException("Did not find any role", HttpStatus.FORBIDDEN);
		}

		if (roleList.isEmpty()) {
			throw new AccessDeniedException("Unauthorized access", HttpStatus.FORBIDDEN);
		}
		return roleList;
	}

	@Override
	public List<RoleFunction> getRoleFunctionList() throws AccessDeniedException {
		List<Role> roleList = getRoleList();
		List<RoleFunction> roleFunctionList = new ArrayList<>();
		for (Role role : roleList) {
			roleFunctionList.addAll(roleFunctionRepository.findRoleFunctionByRoleId(role.getId()));
		}
		return roleFunctionList;
	}

	@Override
	public List<DtoWrapper> roleViewOnlyAdminPortalLinks() {
		log.info("inside roleViewOnlyAdminPortalLinks");
		List<String> permissionLink = null;
		if (StringUtil.isNotNullOrBlank(roleViewonlyLinks)) {
			permissionLink = Arrays.asList(roleViewonlyLinks.split(","));
		}
		List<SubMenuFunction> subMenuFunctionList = subMenuHelper.findSubMenuFunctionByUrlIn(permissionLink);
		List<DtoWrapper> permissionData = new ArrayList<>();
		if (!subMenuFunctionList.isEmpty()) {
			subMenuFunctionList.forEach(each -> {
				DtoWrapper dtoWrapper = new DtoWrapper();
				dtoWrapper.setId("" + each.getId());
				dtoWrapper.setName(each.getName());
				permissionData.add(dtoWrapper);
			});
		}
		return permissionData;
	}

}