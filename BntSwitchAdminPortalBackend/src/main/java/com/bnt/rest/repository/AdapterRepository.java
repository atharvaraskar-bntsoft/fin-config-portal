package com.bnt.rest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.bnt.rest.dto.JsonDataCompListDto;
import com.bnt.rest.dto.CustomAdapterListDto;
import com.bnt.rest.entity.Adapter;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface AdapterRepository {

	public Adapter findAdapterById(Integer id);

	public Adapter save(Adapter adapter);

	public List<Adapter> getDraftAdapterList();

	public Adapter findAdapterByName(String name);

	public Page<Adapter> getPagableAdapterList(Pageable pageable);

	public void deleteById(Integer id);

	public void deleteByEntity(Adapter adapter);

	Page<Adapter> getPagableAdapterListByType(String type, Pageable pageable);

//	List<JsonDataCompListDto> getCompTypeListForAdapter();
//	
//	List<NameVersionListDto> getTypeJsonDataFromAdapter();

	public List<Object[]> getDetailListByCompType(String compType, Pageable pageable);

	public List<Object[]> getJsonDataByType(JsonDataCompListDto jsonDataCompListDto, Pageable pageable);

	List<Adapter> getL3ListForProcessorAdapter();

	boolean validateName(String name);

	Adapter findAdapterByNormalisedName(String name);

	public List<Object[]> getCustomListByType(String adapterType, Pageable pageable);

	public long getCount(String adapterType);

}
