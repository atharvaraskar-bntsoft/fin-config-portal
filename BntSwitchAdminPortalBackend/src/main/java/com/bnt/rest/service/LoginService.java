package com.bnt.rest.service;

import com.bnt.common.util.exception.AuthException;
import com.bnt.common.util.exception.InvalidTokenException;
import com.bnt.rest.dto.LoginDto;
import com.bnt.rest.dto.SessionUserDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface LoginService {

	public SessionUserDto authenticateUser(LoginDto loginDto);

	public boolean generateAuthSession(String token, int id);

	boolean validateSession(String token) throws InvalidTokenException;

	boolean invalidateSession(String token) throws AuthException;

	void logout(String token) throws AuthException;

	void updateSession(String token) throws InvalidTokenException;

	boolean validateSession(String token, Integer id) throws InvalidTokenException;

}
