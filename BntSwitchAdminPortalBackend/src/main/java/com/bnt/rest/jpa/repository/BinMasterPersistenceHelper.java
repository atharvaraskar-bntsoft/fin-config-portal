package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.BinMaster;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface BinMasterPersistenceHelper extends JpaRepository<BinMaster, Integer> {

	public BinMaster findBinMasterByFileName(String fileName);

	@Query("select b.id, b.fileName from BinMaster b")
	public List<Object> getIdAndFileNameOnly();
}
