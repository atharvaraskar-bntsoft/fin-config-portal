package com.bnt.rest.service.impl;

import java.sql.Timestamp;
import java.util.Calendar;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bnt.common.util.RippsUtility;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.jpa.repository.AuthSessionHelper;
import com.bnt.rest.wrapper.dto.KeycloakTokenResponse;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class AuthSessionService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private AuthSessionHelper authSessionHelper;

	@Transactional
	public boolean generateAuthSession(String token, int id, String refreshToken, String logIn, String exp,
			String refreshExp) {
		AuthSession authSession = authSessionHelper.findAuthSessionByToken(token);
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		if (authSession == null) {
			authSession = new AuthSession();
		}
		authSession.setToken(token);
		authSession.setCreatedBy(id);
		authSession.setCreatedOn(timestamp);
		authSession.setStartTime(timestamp);
		authSession.setExpireTime(RippsUtility.convertStringToTimestamp1(exp));
		authSession.setRefreshTimeOut(RippsUtility.convertStringToTimestamp1(refreshExp));
		authSession.setRefreshToken(refreshToken);
		authSession.setInvalidated("0");
		authSessionHelper.save(authSession);
		return true;
	}

	@Transactional
	public AuthSession generateAuthsession(KeycloakTokenResponse response) {
		AuthSession authSession = new AuthSession();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		authSession.setToken(response.getAccess_token());
		authSession.setCreatedBy(Integer.parseInt(request.getHeader("user-id")));
		authSession.setCreatedOn(timestamp);
		authSession.setStartTime(timestamp);
		Calendar cal = Calendar.getInstance();
		cal.setTime(timestamp);
		int x = Integer.parseInt(response.getExpires_in());
		cal.add(Calendar.MINUTE, x / 60);
		authSession.setExpireTime(new Timestamp(cal.getTimeInMillis()));

		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(timestamp);
		int y = Integer.parseInt(response.getRefresh_expires_in());
		cal1.add(Calendar.MINUTE, y / 60);

		authSession.setRefreshTimeOut(new Timestamp(cal1.getTimeInMillis()));
		authSession.setRefreshToken(response.getRefresh_token());
		authSession.setInvalidated("0");
		return authSessionHelper.save(authSession);
	}

	@Transactional
	public void deleteAuthSession(String token) {
		authSessionHelper.deleteByToken(token);

	}

	public int getCreatedBy() {
		String value = request.getHeader("user-id");
		if (value != null) {
			return Integer.parseInt(request.getHeader("user-id"));
		} else {
			return 1;
		}
	}
}
