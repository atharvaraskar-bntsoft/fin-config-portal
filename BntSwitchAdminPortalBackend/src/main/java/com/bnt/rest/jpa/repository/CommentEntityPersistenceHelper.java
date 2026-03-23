package com.bnt.rest.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.CommentEntity;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
public interface CommentEntityPersistenceHelper extends CrudRepository<CommentEntity, Long> {
	@Query("select c from CommentEntity c where c.transactionId = ?1 ")
	CommentEntity findByTransactionId(String transactionId);

	@Query("select c from CommentEntity c where c.transactionId = ?1 ")
	CommentEntity findForReviewByTransactionId(String transactionId);
}
