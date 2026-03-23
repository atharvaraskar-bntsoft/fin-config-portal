package com.bnt.rest.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.adapter.AdapterToolKit;
import com.bnt.bswitch.message.packager.Kek;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.EncryptionKeysDto;
import com.bnt.rest.dto.MEKDto;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.entity.EncryptionKeys;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.DEKPersistenceHelper;
import com.bnt.rest.jpa.repository.UserPersistenceHelper;
import com.bnt.rest.service.MEKService;
import com.bnt.service.mapper.MEKMapper;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class MEKServiceImpl implements MEKService {

	private static final Logger logger = LogManager.getLogger(MEKServiceImpl.class.getName());

	@Value("${mek.file.location}")
	private String mekDataFilePath;

	@Value("${switch.adapter.extended.class}")
	private String extendedClassPath;

	private Kek kekInstance;

	@Autowired
	private AuthSessionService authSessionService;

	@Autowired
	private UserPersistenceHelper userPersistenceHelper;

	@Autowired
	private DEKPersistenceHelper dEKPersistenceHelper;

	@Autowired
	private HttpServletRequest request;

	@PostConstruct
	public void initPath() {
		Class<?> classType = JPAUtils.getClassTypeByQualifiedName(extendedClassPath);
		AdapterToolKit toolkit;
		try {
			toolkit = (AdapterToolKit) classType.getConstructor().newInstance();
			kekInstance = toolkit.createKek();
		} catch (Exception e) {
			logger.error(e);
		}
	}

	@Transactional
	@Override
	public Integer addMek(MEKDto dto, String requestToken) {
		logger.info("addMek");
		int executeFlag = 0;

//		Optional<SystemUser> optional = userPersistenceHelper.findById(authSessionService.getCreatedBy());
//		SystemUser user = null;
//		if(optional.isPresent())
//			user = optional.get();
//		SystemUserDto userDto = ObjectMapper.mapToDto(user, SystemUserDto.class);

		SystemUserDto userDto = new SystemUserDto();
		String email = request.getHeader("kcemail");
		userDto.setUserId(email);
		EncryptionKeysDto encDto = null;
		if (!StringUtil.isNotNullOrBlank(dto.getClearText())) {
			throw new RippsAdminException("Key can't be blank");
		}
		if (MEKMapper.validateInputText(dto.getClearText())) {
			if (!MEKMapper.addCustodianDetail(dto.getClearText(), userDto)) {
				logger.info("Add Custodian return false");
				throw new RippsAdminException("Key already submitted");
			} else {
				executeFlag = 1;
			}
			if (StringUtil.isNotNullOrBlank(MEKMapper.getCustodianDetail()[0])
					&& StringUtil.isNotNullOrBlank(MEKMapper.getCustodianDetail()[1])) {
				try {
					encDto = MEKMapper.generateKey(getKek(kekInstance), mekDataFilePath);
					EncryptionKeys encDek = ObjectMapper.mapToEntity(encDto, EncryptionKeys.class);
					encDek.setCreatedBy(authSessionService.getCreatedBy());
					encDek.setCreatedOn(RippsUtility.getCurrentTimeStamp());
					dEKPersistenceHelper.save(encDek);
					executeFlag = 2;
				} finally {
					MEKMapper.resetCustodianDetail();
					logger.info("Custodian reset successfully");
				}
			}
		}
		return executeFlag;
	}

	@Override
	public MEKDto findAllMEK(String requestToken, Map<String, Object> requestParamMap) {
		MEKDto dto = new MEKDto();

//		Optional<SystemUser> optional = userPersistenceHelper.findById(authSessionService.getCreatedBy());
//		SystemUser user = null;
//		if(optional.isPresent())
//			user = optional.get();
//		SystemUserDto userDto = ObjectMapper.mapToDto(user, SystemUserDto.class);

		SystemUserDto userDto = new SystemUserDto();
		String email = request.getHeader("kcemail");
		userDto.setUserId(email);
		Page<EncryptionKeys> encryptionKeysPage = null;
		requestParamMap.put(ParameterConstant.SORT_COLUMN, "createdBy");
		requestParamMap.put(ParameterConstant.SORT_ORDER, ParameterConstant.DESC);
		requestParamMap.put(ParameterConstant.PAGE_SIZE, "1");
		requestParamMap.put(ParameterConstant.PAGE_NO, "1");
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		encryptionKeysPage = dEKPersistenceHelper.findAll(pageable);
		List<EncryptionKeys> list = encryptionKeysPage.getContent();
		EncryptionKeys keys = null;
		if (!list.isEmpty()) {
			keys = list.get(list.size() - 1);
		}
		if (MEKMapper.validateCustodianEntries(userDto)) {
			dto.setCustodianTextExist(false);
		} else {
			dto.setCustodianTextExist(true);
		}
		if (MEKMapper.validateOtherCustodianEntry(userDto)) {
			dto.setOtherCustodianTextExist(true);
			dto.setUser((MEKMapper.getCustodianDetail()[0].split("~")[1]));
		} else {
			dto.setOtherCustodianTextExist(false);
			if (keys == null) {
				dto.setLastUpdatedTime(null);
			} else {
				dto.setLastUpdatedTime(keys.getCreatedOn());
			}
		}
		return dto;
	}

	private String getKek(Kek kek) {
		String kekData = "";
		if (kek != null) {
			kekData = kek.get();
		}
		if (!StringUtil.isNotNullOrBlank(kekData)) {
			throw new RippsAdminException("Invalid Key");
		}
		return kekData;
	}
}
