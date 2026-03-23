package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bnt.rest.entity.SchemeImfMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface SchemeImfMapperRepository {

	public SchemeImfMapper getSchemeImfMapperBYId(Integer id);

	public Page<SchemeImfMapper> getFilterData(Pageable pageable, String[] filters);

	public SchemeImfMapper getSchemeImfMapper(Integer messageStandard, String fieldId);

	List<SchemeImfMapper> getSchemeImfMapperByMessageStandardId(Integer messageStandard);

	Iterable<SchemeImfMapper> getAllSchemeImfMapper();

}
