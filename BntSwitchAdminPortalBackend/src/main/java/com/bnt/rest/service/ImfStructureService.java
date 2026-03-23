package com.bnt.rest.service;

import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.rest.dto.IdNameVersionWrapper;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.dto.ImfTemplateDto;
import com.bnt.rest.entity.ImfStructure;
import com.bnt.rest.entity.ImfTemplate;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface ImfStructureService {

	public ResponseWrapper findPagedImfStructure(Map<String, Object> requestParamMap) throws RippsAdminRestException;

	public ImfStructure findImfStructureById(int id);

	public ImfStructureDto findImfStructureDtoById(int id);

	public Integer addImfStructure(ImfStructureDto imfStructureDto, String requestToken);

	public Map<String, Object> updateImfStructure(ImfStructureDto imfStructureDto, String requestToken, Integer id);

	public void deleteById(Integer id, String requestToken);

	public Integer getMaxVersion();

	public ImfStructureDto findMaxVersionImfStructure();

	public ImfTemplate getImfTemplate(Integer id);

	public ImfTemplateDto getImfTemplateDto(Integer id);

	public Integer draftImf(ImfStructureDto imfStructureDto, String requestToken);

	public Integer versionItImf(ImfStructureDto imfStructureDto, String requestToken);

	public List<IdNameVersionWrapper> getImfVersionList();

	public String getRunTimeImfStructure(@Valid String imfJson);

	public List<ImfStructureDto> findAllImf();
}
