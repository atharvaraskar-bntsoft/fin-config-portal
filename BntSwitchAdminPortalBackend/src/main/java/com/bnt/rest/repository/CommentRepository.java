package com.bnt.rest.repository;

import java.util.List;

import com.bnt.rest.dto.CommentEntityDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CommentRepository {

	public Boolean markTransactionReview(CommentEntityDto commentDto);

	public List<CommentEntityDto> getAllComments(String transactionId);

	public Long saveComment(CommentEntityDto comment);
}
