package com.bnt.rest.repository.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.jdo.annotations.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.ReflectionUtil;
import com.bnt.constant.IgnoreCopyConstants;
import com.bnt.main.ObjectMapper;
import com.bnt.rest.dto.CommentEntityDto;
import com.bnt.rest.entity.CommentEntity;
import com.bnt.rest.jpa.repository.CommentEntityPersistenceHelper;
import com.bnt.rest.repository.CommentRepository;
import com.bnt.rest.repository.TxnLogBNTRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public class CommentRepositoryImpl implements CommentRepository {

	@Autowired
	@Lazy
	TxnLogBNTRepository txnLogRepository;

	@Autowired
	private CommentEntityPersistenceHelper commentPersistanceHelper;

	@Override
	@Transactional
	public Boolean markTransactionReview(CommentEntityDto commentEntityDto) {

		CommentEntity comment = commentPersistanceHelper.findByTransactionId(commentEntityDto.getTransactionId());

		List<String> ignoreCopyAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS_UPDATE);
		if (comment == null) {

			comment = new CommentEntity();
		}
		try {
			ReflectionUtil.copy(comment, commentEntityDto, ignoreCopyAuditField);

		} catch (Exception e) {
			throw new RippsAdminException("Exception while updating entity Data");
		}

		comment.setForReview(commentEntityDto.isForReview());

		comment.setRemarks(getDefaultRemarks(commentEntityDto.isForReview()));

		comment.setUpdatedBy(commentEntityDto.getUpdatedBy());

		comment.setUpdatedOn(new Date());

		commentPersistanceHelper.save(comment);

		return true;
	}

	private byte[] getDefaultRemarks(boolean forReview) {

		String remarks = null;

		if (forReview) {
			remarks = "transaction verified";
		}

		else {
			remarks = "transaction un-verified";
		}

		return remarks.getBytes();

	}

	@Override
	public List<CommentEntityDto> getAllComments(String transactionId) {
		List<CommentEntity> commentList = new ArrayList<>();

		CommentEntity comment = commentPersistanceHelper.findByTransactionId(transactionId);

		commentList.add(comment);

		List<CommentEntityDto> commentDtoList;
		try {

			commentDtoList = ObjectMapper.mapListObjects(commentList, CommentEntityDto.class);
			return commentDtoList;

		} catch (Exception e) {
			throw new RippsAdminException("Exception while getting comment list");
		}

	}

	@Override
	public Long saveComment(CommentEntityDto commentDto) {
		CommentEntity commentEntity = new CommentEntity();
		List<String> ignoreCopyAuditField = Arrays.asList(IgnoreCopyConstants.IGNORE_COPY_AUDITFIELDS_UPDATE);
		try {
			ReflectionUtil.copy(commentEntity, commentDto, ignoreCopyAuditField);

			CommentEntity addedComment = commentPersistanceHelper.save(commentEntity);

			return addedComment.getId();

		} catch (Exception e) {
			throw new RippsAdminException("Exception while adding comment entity Data");
		}
	}
}
