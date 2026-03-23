package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bnt.rest.dto.SettingDto;
import com.bnt.rest.entity.BaseEntity;
import com.bnt.rest.repository.SettingRepository;
import com.bnt.rest.service.SettingService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class SettingServiceImpl implements SettingService {

	@Autowired
	private SettingRepository settingRepository;

	public void updateAuditFields(BaseEntity actualEntity, BaseEntity updatedEntity) {

		updatedEntity.setUpdatedOn(new Timestamp(System.currentTimeMillis()));
		updatedEntity.setUpdatedBy(actualEntity.getId());

	}

	@Override
	public List<SettingDto> findAllSetting() {
		// Auto-generated method stub
		return settingRepository.findAllSetting();
	}

	@Override
	public SettingDto findSettingById(int id) {
		// Auto-generated method stub
		return settingRepository.findSettingById(id);
	}

	@Override
	public boolean updateSetting(int id, SettingDto settingDto) {
		// Auto-generated method stub
		return settingRepository.updateSetting(id, settingDto);
	}

}