package com.bnt.rest.repository.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.constant.ParameterConstant;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.TxnLabelDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.TxnLabel;
import com.bnt.rest.jpa.repository.TxnKeyLabelPersistenceHelper;
import com.bnt.rest.repository.TxnKeyLabelRepository;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.service.mapper.TxnLogMapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class TxnKeyLabelRepositoryImpl implements TxnKeyLabelRepository {

	private static final String ERROR_IN_SAVING_TXN_KEY_LABEL = "Error in saving TxnKeyLabel";

	private static final Logger logger = LogManager.getLogger(TxnKeyLabelRepositoryImpl.class);

	@Autowired
	private TxnKeyLabelPersistenceHelper helper;

	@Autowired
	private AuthSessionService authSessionService;

	private String locale = "en_EN1";

	@Override
	public ResponseWrapper findAllRecords(Map<String, Object> requestParamMap) {
		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		String[] filters = (String[]) requestParamMap.get(ParameterConstant.FILTERS);
		Page<TxnLabel> txnLabelPage = null;
		if (null == filters) {
			txnLabelPage = helper.findTxnLabelByLocale(pageable, locale);
		}

		if (null != txnLabelPage) {
			long count = helper.count();
			ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByPage(txnLabelPage, count);
			List<TxnLabelDto> listDTO = ObjectMapper.mapListObjects(txnLabelPage.getContent(), TxnLabelDto.class);
			pageJPAData.setContent(listDTO);
			return pageJPAData;
		}

		return null;

	}

	@Override
	public TxnLabelDto getTxnKeyLabelById(int id) {
		TxnLabel txnLabel = helper.getTxnKeyLabelById(id);
		return mapTxnKeyLabelToDto(txnLabel);
	}

	@Override
	public TxnLabelDto addTxnKeyLabel(TxnLabelDto txnLabelDto, String requestToken) {
		try {

			TxnLabel txnLabel = new TxnLabel();
			TxnLabelDto dto = null;
			txnLabel.setActive(txnLabelDto.getActive());
			txnLabel.setLabel(txnLabelDto.getLabel());
			txnLabel.setTxnKey(txnLabelDto.getTxnKey());
			txnLabel.setPreSeeded('0');
			txnLabel.setLocale(locale);
			txnLabel.setCreatedBy(authSessionService.getCreatedBy());
			txnLabel.setCreatedOn(RippsUtility.getCurrentTime());
			TxnLabel newTxnLabel = helper.save(txnLabel);
			getTxnKeyMap(true);
			dto = mapTxnKeyLabelToDto(newTxnLabel);
			return dto;
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException(ERROR_IN_SAVING_TXN_KEY_LABEL);
		}
	}

	@Override
	public TxnLabelDto updateTxnKeyLabel(int id, TxnLabelDto txnLabelDto, String requestToken) {

		TxnLabel txnLabel = helper.getTxnKeyLabelById(id);
		if (txnLabel == null) {
			throw new RippsAdminException("TxnKeyLabel not found");
		}
		mapTxnKeyLabelDtoToEntity(txnLabel, txnLabelDto);
		TxnLabel newTxnLabel = null;
		TxnLabelDto dto = null;
		try {
			newTxnLabel = helper.save(txnLabel);
			getTxnKeyMap(true);
			dto = mapTxnKeyLabelToDto(newTxnLabel);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException(ERROR_IN_SAVING_TXN_KEY_LABEL);
		}
		return dto;
	}

	private TxnLabel mapTxnKeyLabelDtoToEntity(TxnLabel txnLabel, TxnLabelDto txnLabelDto) {
		if (txnLabel.getPreSeeded() != 1) {
			txnLabel.setTxnKey(txnLabelDto.getTxnKey());
			txnLabel.setActive(txnLabelDto.getActive());
		}
		txnLabel.setLabel(txnLabelDto.getLabel());
		txnLabel.setUpdatedBy(authSessionService.getCreatedBy());
		txnLabel.setUpdatedOn(RippsUtility.getCurrentTime());
		return txnLabel;
	}

	private TxnLabelDto mapTxnKeyLabelToDto(TxnLabel newtxnLabel) {
		TxnLabelDto dto = new TxnLabelDto();
		dto.setId(newtxnLabel.getId());
		dto.setActive(newtxnLabel.getActive());
		dto.setTxnKey(newtxnLabel.getTxnKey());
		dto.setLabel(newtxnLabel.getLabel());
		dto.setLocale(newtxnLabel.getLocale());
		dto.setPreSeeded(newtxnLabel.getPreSeeded());
		return dto;
	}

	@Override
	public void delete(int id) {
		TxnLabel txnLabel = helper.getTxnKeyLabelById(id);
		if (txnLabel == null) {
			throw new RippsAdminException("TxnKeyLabel not found");
		}
		if (txnLabel.getPreSeeded() == '1') {
			throw new RippsAdminException("TxnKeyLabel cannot be deleted");
		}
		try {
			helper.delete(txnLabel);
			getTxnKeyMap(true);
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException(ERROR_IN_SAVING_TXN_KEY_LABEL);
		}
	}

	public List<TxnLabel> findAllRecords() {
		return (List<TxnLabel>) helper.findAll();
	}

	public Map<String, String> getTxnKeyMap(Boolean updateFlag) {
		if (updateFlag.booleanValue() || TxnLogMapper.getTxnKeysMap().size() < 1) {
			List<TxnLabel> list = findAllRecords();
			TxnLogMapper.setTxnKeysMap(
					list.stream().collect(Collectors.toMap(item -> item.getTxnKey(), item -> item.getLabel())));
		}
		return TxnLogMapper.getTxnKeysMap();
	}
}
