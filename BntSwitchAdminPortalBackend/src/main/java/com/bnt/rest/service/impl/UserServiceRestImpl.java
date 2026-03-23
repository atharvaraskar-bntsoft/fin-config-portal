package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.dto.SystemUserRoleDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.Role;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.entity.SystemUserRole;
import com.bnt.rest.jpa.repository.SystemUserRolePersistenceHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.repository.UserRepository;
import com.bnt.rest.service.UserServiceRest;
import com.bnt.rest.wrapper.dto.SystemUserRoleWrapper;
import com.bnt.service.mapper.ListMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class UserServiceRestImpl implements UserServiceRest {

	private static final Logger logger = LogManager.getLogger(UserServiceRestImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserPersistenceHelper userPersistenceRepository;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private SystemUserRolePersistenceHelper systemUserRolePersistenceHelper;

	@Value("${switch.admin.role}")
	private String adminRole;

	@Autowired
	HttpServletRequest request;

	@Override
	public ResponseWrapper findAllUsers(Map<String, Object> requestParamMap) {

		return this.userRepository.findAllUsers(requestParamMap);

	}

	@Override
	public SystemUserDto findCurrentUser(String token) throws Exception {
		String email = request.getHeader("kcemail");
		SystemUser user = userRepository.findSystemUserByEmail(email);
		if (user == null) {
			return null;
		}
		return ObjectMapper.mapToDto(user, SystemUserDto.class);
	}

	@Override
	@Transactional
	public int saveUser(SystemUserDto systemUserDto, Character locked) {
		setUserDefaultValue(systemUserDto);
		Integer roleId = systemUserDto.getRoleId();
		systemUserDto.setRoleId(null);
		SystemUser systemUser = ObjectMapper.mapToEntity(systemUserDto, SystemUser.class);
		Role role = new Role();
		SystemUserRole systemUserRole = new SystemUserRole();
		role.setId(roleId);
		systemUser.setLocked(locked);
		systemUser.setDeleted('0');
		setSystemUserRole(systemUserRole, systemUser, systemUserDto, role);
		adduser(systemUser);
		logger.info("Use saved {}", systemUser);
		logger.info("Mail send ");
		return systemUser.getId();
	}

	private SystemUser adduser(SystemUser systemuser) {
		return userRepository.saveUser(systemuser);
	}

	@Override
	public void isUserExist(SystemUserDto user) {
		SystemUser systemuser = userRepository.findSystemUserByEmail(user.getEmail());
		if (RippsUtility.isNotNull(systemuser) && systemuser.getDeleted() == '1') {
			throw new RippsAdminRestException("User Already Exists In Inactive State, Please Use Other Details",
					HttpStatus.OK);
		} else if (RippsUtility.isNotNull(systemuser)) {
			throw new RippsAdminRestException("User Already Exists, Please Use Other Details", HttpStatus.OK);
		}
	}

	@Override
	public SystemUser isUserExistByUserNameOrEmail(String userName, String email) {
		SystemUser systemuser = userPersistenceRepository.findSystemUserByUserIdOrEmail(userName, email);
		if (systemuser != null) {
			return systemuser;
		}
		return null;
	}

	@Override
	public SystemUser findSystemUserById(int id) {
		return this.userRepository.findOne(id);
	}

	@Override
	public int updateUser(SystemUserDto systemUserDto, SystemUser currentUser, String requestToken) {

		if (systemUserDto.getFirstName() == null) {
			currentUser.setLocked(RippsUtility.convertBooleanToCharUser(systemUserDto.getActive()));
			currentUser.setCreatedBy(authSessionService.getCreatedBy());
			currentUser.setUpdatedOn(RippsUtility.getCurrentTimeStamp());
			return userRepository.saveUser(currentUser).getId();
		} else {

			List<String> ignoreCopyAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS_CREATE);
			/** if (updateSysUserRole(systemUserDto, currentUser)) { */
			try {
				ReflectionUtil.copy(currentUser, systemUserDto, ignoreCopyAuditField);
			} catch (Exception e) {
				throw new RippsAdminRestException("Exception while copying request data to original data",
						HttpStatus.BAD_REQUEST);
			}

			if (systemUserDto.getEmail() == null) {
				currentUser.setLocked(RippsUtility.convertBooleanToCharUser(systemUserDto.getActive()));
			} else {
				currentUser.setLocked(RippsUtility.convertBooleanToCharUser(systemUserDto.getLocked()));
			}
			currentUser.setLoginName(systemUserDto.getEmail());
			return userRepository.saveUser(currentUser).getId();

			/**
			 * } return 0;
			 */
		}

	}

	@Override
	public void deleteById(SystemUser currentUser) {
		currentUser.setDeleted('1');
		userRepository.saveUser(currentUser);
	}

	private void setSystemUserRole(SystemUserRole systemUserRole, SystemUser systemUser, SystemUserDto userVo,
			Role systemRole) {
		systemUserRole.setRoleID(systemRole);
		systemUserRole.setCreatedBy((int) userVo.getCreatedBy());
		systemUserRole.setCreatedOn(new Timestamp(new Date().getTime()));
		systemUserRole.setSystemUserID(systemUser);
	}

	private void setUserDefaultValue(SystemUserDto user) {
		user.setCreatedBy(1);
		user.setPassword("default");
		user.setLockedReason("NEW_USER");
		user.setCreatedOn(new Timestamp(new Date().getTime()));
		user.setLoginName(user.getEmail());
		user.setPasswordLastUpdatedOn(new Timestamp(new Date().getTime()));
	}

	@Override
	public Map<String, Object> getFilterData() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", ListMapper.getStatus());
		return map;
	}

	@Override
	public SystemUserRoleWrapper getUserRoleList(String token) {
		SystemUserDto systemUserDto = null;
		try {
			systemUserDto = findCurrentUser(token);
			return getSystemUserRoleDto(systemUserDto.getId());
		} catch (Exception e) {
			logger.error(e);
		}
		return null;

	}

	private SystemUserRoleWrapper getSystemUserRoleDto(int id) {
		SystemUserRoleWrapper systemUserRoleWrapper = new SystemUserRoleWrapper();
		List<SystemUserRole> list = systemUserRolePersistenceHelper.findBySystemUserIDId(id);
		List<SystemUserRoleDto> listSystemUserRoleDto = null;
		if (list != null) {
			listSystemUserRoleDto = ObjectMapper.mapListObjectToListDto(list, SystemUserRoleDto.class);
		} else {
			listSystemUserRoleDto = new ArrayList<>();
		}
		systemUserRoleWrapper.setList(listSystemUserRoleDto);
		isAdminEnabled(systemUserRoleWrapper);
		return systemUserRoleWrapper;

	}

	private SystemUserRoleWrapper isAdminEnabled(SystemUserRoleWrapper systemUserRoleWrapper) {
		systemUserRoleWrapper.setAdminRole(adminRole);
		for (SystemUserRoleDto role : systemUserRoleWrapper.getList()) {
			if (role.getRoleID().getName().equals(systemUserRoleWrapper.getAdminRole())) {
				systemUserRoleWrapper.setIsAdminEnabled(true);
				break;
			}
		}
		return systemUserRoleWrapper;
	}
}
