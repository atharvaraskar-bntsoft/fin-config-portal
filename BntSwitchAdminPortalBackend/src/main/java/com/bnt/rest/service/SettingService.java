package com.bnt.rest.service;

import java.util.List;

import com.bnt.rest.dto.SettingDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SettingService {

	public List<SettingDto> findAllSetting();

	public SettingDto findSettingById(int id);

	public boolean updateSetting(int id, SettingDto settingDto);

}
