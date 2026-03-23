package com.bnt.common.util.exception;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.hibernate.PropertyValueException;
import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.exception.DataException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@ControllerAdvice
@CrossOrigin(origins = { "${crossOriginUrl}" })
public class RippsControllerAdvice extends ResponseEntityExceptionHandler {

	private static final String ERROR = "Error";
	private static final Logger log = LogManager.getLogger(RippsControllerAdvice.class.getName());

	@ExceptionHandler(RippsAdminRestMethodException.class)
	public ResponseEntity<Map<String, Object>> exception(RippsAdminRestMethodException e) {
		log.error(e.getMessage(), e);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("message", e.getMessage());
		responseHeaders.add("status", e.getStatus());
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
				responseHeaders, e.getHttpStatus());
	}

	@ExceptionHandler(InvalidTokenException.class)
	public ResponseEntity<Map<String, Object>> exception(InvalidTokenException e) {
		log.error(e.getMessage());
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("message", e.getMessage());
		responseHeaders.set("x-auth-token", null);
		responseHeaders.set("Access-Control-Allow-Origin", "*");
		responseHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
				responseHeaders, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(TokenException.class)
	public ResponseEntity<Map<String, Object>> exception(TokenException e) {
		log.info(e.getMessage());
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("message", e.getMessage());
		responseHeaders.set("access-control-expose-headers", "x-auth-token");
		responseHeaders.set("x-auth-token", null);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, e.getMessage(), null),
				responseHeaders, HttpStatus.OK);
	}

	@ExceptionHandler(AuthException.class)
	public ResponseEntity<Map<String, Object>> exception(AuthException e) {
		log.error(e);
		if (e.isExpired) {
			Map<String, Object> map = new HashMap<>();
			map.put("isExpired", true);
			map.put("email", e.getEmail());
			log.error(e.getMessage(), e);
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, e.getMessage(), map), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}

	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<Map<String, Object>> exception(AccessDeniedException e) {
		log.error(e);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("x-auth-token", null);
		responseHeaders.set("Access-Control-Allow-Origin", "*");
		responseHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, e.getMessage(), null),
				responseHeaders, e.getHttpStatus());
	}

	@ExceptionHandler(DuplicateEntryException.class)
	public ResponseEntity<Map<String, Object>> exception(DuplicateEntryException e) {
		log.error(e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, e.getMessage(), null),
				HttpStatus.OK);
	}

	@ExceptionHandler(CommonException.class)
	public ResponseEntity<Map<String, Object>> exception(CommonException e) {
		log.error(e);
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "ERROR", null),
				HttpStatus.OK);
	}

	@ExceptionHandler(DisplayMessageException.class)
	public ResponseEntity<Map<String, Object>> exception(DisplayMessageException e) {
		log.error(e.getMessage(), e);
		if (e.getHttpStatus().equals(HttpStatus.OK)) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.SUCCESS, e.getMessage(), null), HttpStatus.OK);
		}

		if (e.getHttpStatus().name().equals(HttpStatus.ALREADY_REPORTED.name())) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null), HttpStatus.OK);
		}
		return null;
	}

	@ExceptionHandler(RippsAdminRestException.class)
	protected ResponseEntity<Map<String, Object>> handleInvalidRequest(RippsAdminRestException e) {
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
				HttpStatus.OK);
	}

	@ExceptionHandler(RippsAdminException.class)
	protected ResponseEntity<Map<String, Object>> handleInvalidRequest(RippsAdminException e) {
		/** log.error(ExceptionLog.printStackTraceToString(e)); */
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
				HttpStatus.OK);
	}

	@ExceptionHandler(Exception.class)
	protected ResponseEntity<Map<String, Object>> handleInvalidRequest(Exception e) {
		log.debug(e);
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR, null),
				HttpStatus.OK);
	}

	@ExceptionHandler(Throwable.class)
	protected ResponseEntity<Map<String, Object>> handleInvalidRequest(Throwable e) {
		log.debug(e);
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR, null),
				HttpStatus.OK);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		log.error(ex.getMessage());
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
				ex.getBindingResult().getAllErrors().get(0).getDefaultMessage(), null), HttpStatus.OK);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	protected ResponseEntity<Map<String, Object>> handleInvalidRequest(DataIntegrityViolationException e) {
		log.error(e.getMessage(), e);
		if (e.getCause() instanceof ConstraintViolationException) {
			return handleDuplicateException(e);
		}

		if (e.getCause() instanceof DataException dataException) {
			log.error("Get DataException ");
			return getExceptionMessage(e, dataException.getCause());
		}

		if (e.getCause() instanceof PropertyValueException propertyValueException) {
			log.error("Get PropertyValueException ");
			return getExceptionMessage(e, propertyValueException.getCause());
		}
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, ERROR, null),
				HttpStatus.OK);

	}

	private ResponseEntity<Map<String, Object>> handleDuplicateException(DataIntegrityViolationException e) {
		log.error("Get ConstraintViolationException ");
		log.error("ConstraintViolationException");
		log.error(e.getMessage(), e);
		ConstraintViolationException constraintViolationException = (ConstraintViolationException) e.getCause();
		String constraintName = constraintViolationException.getConstraintName();

		SQLIntegrityConstraintViolationException sqlException = (SQLIntegrityConstraintViolationException) constraintViolationException
				.getCause();

		if (constraintName != null) {

			log.debug(e);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Some field should be unique:Contact Administrator", null), HttpStatus.OK);
		}

		else if ("23000".equals(sqlException.getSQLState())) {

			log.debug(e);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Required field should not be empty:Contact Administrator ", null), HttpStatus.OK);
		}

		else {

			return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
					"Constraint Violation exception", null), HttpStatus.OK);
		}
	}

	private ResponseEntity<Map<String, Object>> getExceptionMessage(DataIntegrityViolationException e,
			Throwable throwable) {
		String errorMessage = throwable.getMessage();
		log.error("Get Exception :" + errorMessage);

		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, errorMessage, null),
				HttpStatus.OK);
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<Map<String, Object>> exception(EntityNotFoundException e) {
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE,
				"Entity not found" + e.getMessage(), null), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(RuntimeException.class)
	protected ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException e) {
		log.debug(e);
		log.error(e.getMessage(), e);
		return new ResponseEntity<>(RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, e.getMessage(), null),
				HttpStatus.OK);
	}
}
