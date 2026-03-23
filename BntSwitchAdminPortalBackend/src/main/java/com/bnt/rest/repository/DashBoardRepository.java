package com.bnt.rest.repository;

import java.sql.Timestamp;
import java.util.Iterator;

import com.bnt.rest.dto.DashBoardDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface DashBoardRepository {

	Iterator<DashBoardDto> fetchTxnLogEntity(Timestamp current, Timestamp timestamp);

}
