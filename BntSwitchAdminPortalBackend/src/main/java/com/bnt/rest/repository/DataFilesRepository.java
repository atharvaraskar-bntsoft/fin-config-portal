package com.bnt.rest.repository;

import java.util.List;

import com.bnt.rest.entity.DataFiles;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DataFilesRepository {

	public DataFiles save(DataFiles entityDataFiles);

	public DataFiles getDataFilesById(Integer id);

	public DataFiles getDataFilesByFileName(String fileName);

	Iterable<DataFiles> getDataFilesByIds(List<Integer> ids);

}
