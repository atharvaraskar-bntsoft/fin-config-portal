package com.bnt.rest.repository.impl;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.util.ReflectionUtil;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.SettingDto;
import com.bnt.rest.entity.Setting;
import com.bnt.rest.jpa.repository.SettingPersistenceHelper;
import com.bnt.rest.repository.SettingRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class SettingRepositoryImpl implements SettingRepository {

	@Autowired
	private SettingPersistenceHelper settingRepository;

	@Override
	@Transactional(readOnly = true)
	public List<SettingDto> findAllSetting() {
		List<Setting> settingList = this.settingRepository.findAll();
		return ObjectMapper.mapListObjects(settingList, SettingDto.class);
	}

	@Override
	@Transactional
	public SettingDto findSettingById(int id) {

		Setting setting = this.settingRepository.findById(id).orElse(null);
		return ObjectMapper.mapToDto(setting, SettingDto.class);
	}

	@Override
	@Transactional
	public boolean updateSetting(int id, SettingDto settingDto) throws RippsAdminRestException {
		Setting setting = this.settingRepository.findById(id).orElse(null);
		if (setting != null) {
			List<String> ignoreCopyAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS_CREATE);
			try {
				ReflectionUtil.copy(setting, settingDto, ignoreCopyAuditField);
				this.settingRepository.save(setting);
			} catch (Exception e) {

				throw new RippsAdminRestException("Exception while copying request data to original data",
						HttpStatus.BAD_REQUEST);
			}
			return true;
		}
		return false;
	}
}
