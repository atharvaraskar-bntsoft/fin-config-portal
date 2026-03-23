package com.bnt.common;

import io.swagger.v3.oas.annotations.media.Schema;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Schema
public class ResponseEntityData {
	@Schema(description = "response status as SUCCESS or FAILURE")
    private String status;
    @Schema(description = "success or failure message")
    private String message;
    @Schema(description = "actual response data")
    private Object data;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
