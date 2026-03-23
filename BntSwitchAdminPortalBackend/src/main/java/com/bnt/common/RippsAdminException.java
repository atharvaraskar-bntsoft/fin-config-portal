package com.bnt.common;

import org.springframework.http.HttpStatus;

import com.bnt.enums.ErrorCodes;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class RippsAdminException extends RuntimeException {
	
    private static final long serialVersionUID = 1L;
    
    private final ErrorCodes codes;
    
    private final String errorMessage;

    private final String message;

    private final HttpStatus httpStatus;

    public RippsAdminException(String message) {
        super(message);
        this.codes = ErrorCodes.SYSTEM_ERROR;
        this.errorMessage = codes.getMessage();
        this.message = message;
        this.httpStatus = HttpStatus.ACCEPTED;
    }
    
    public RippsAdminException(ErrorCodes codes, Throwable th) {
        this.codes = codes;
        this.errorMessage = codes.getMessage();
        this.message = "sds";
        this.httpStatus = HttpStatus.ACCEPTED;
    }

    public RippsAdminException(String messgae, HttpStatus httpStatus) {
        this.message = messgae;
        this.httpStatus = httpStatus;
        this.codes = ErrorCodes.SYSTEM_ERROR;
        this.errorMessage = codes.getMessage();
    }
    
    public ErrorCodes getCodes() {
        return codes;
    }
    
    public String getErrorMessage() {
        return errorMessage;
    }
    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}