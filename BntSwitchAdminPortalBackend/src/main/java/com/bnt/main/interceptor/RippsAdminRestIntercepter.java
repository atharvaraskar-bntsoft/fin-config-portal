package com.bnt.main.interceptor;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Stream;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.bnt.common.HttpCommons;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.RippsAdminRestException;
import com.bnt.common.util.exception.RippsAdminRestMethodException;
import com.bnt.common.util.exception.TokenException;
import com.bnt.constant.Constants;
import com.bnt.constant.HttpConstants;
import com.bnt.rest.dto.SystemUserDto;
import com.bnt.rest.entity.AuthSession;
import com.bnt.rest.entity.SystemUser;
import com.bnt.rest.jpa.repository.AuthSessionHelper;
import com.bnt.rest.service.CheckerService;
import com.bnt.rest.service.SubMenuFunctionService;
import com.bnt.rest.service.UserServiceRest;
import com.bnt.rest.service.impl.AuthSessionService;
import com.bnt.rest.service.impl.ListService;
import com.bnt.rest.wrapper.dto.KeycloakTokenResponse;

/**************************
 * @author vaibhav.shejol *
 **************************/

@SuppressWarnings("deprecation")
@Component
public class RippsAdminRestIntercepter implements HandlerInterceptor {

	private static final Logger log = LogManager.getLogger(RippsAdminRestIntercepter.class.getName());

	@Autowired
	private UserServiceRest userService;

	@Autowired
	private CheckerService checkerService;

	@Autowired
	private SubMenuFunctionService subMenuFunctionService;

	@Autowired
	private AuthSessionHelper authSessionHelper;

	@Autowired
	AuthSessionService authSessionService;

	@Autowired
	private ListService listService;

	@Value("${skip.token.url}")
	private String skipUrl;

	@Value("${skip.origin.validation}")
	private boolean skipOriginValidation;

	private static final String HEADER_NAME = "Strict-Transport-Security";
	private static final String MAX_AGE_DIRECTIVE = "max-age=%s";
	private static final String INCLUDE_SUB_DOMAINS_DIRECTIVE = "includeSubDomains";
	private int maxAgeSeconds = 31536000;

	private static final Logger userActivityLogger = LogManager.getLogger("userActivityLogger");

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String directives;

		if (Constants.SHUTDOWN_ACTIVATED.booleanValue()) {
			log.error("prehandle() interceptor invocation start failed because shutdown hook activated.");
			throw new RippsAdminRestMethodException("Service Unavailable", HttpStatus.SERVICE_UNAVAILABLE.toString(),
					HttpStatus.SERVICE_UNAVAILABLE);
		}
		boolean performRequest = true;

		if (!(HttpMethod.GET.matches(request.getMethod()) || HttpMethod.PUT.matches(request.getMethod())
				|| HttpMethod.DELETE.matches(request.getMethod()) || HttpMethod.POST.matches(request.getMethod())
				|| HttpMethod.OPTIONS.matches(request.getMethod()))) {
			userActivityLogger.error("HTTP-Method {}  not allowed", request.getMethod());
			throw new RippsAdminRestMethodException("Access-Denied", HttpStatus.METHOD_NOT_ALLOWED.toString(),
					HttpStatus.METHOD_NOT_ALLOWED);
		}

//		if(!skipOriginValidation && !validateRequestOrigin(request)) {
//			throw new RippsAdminRestMethodException("Access-Denied", HttpStatus.UNAUTHORIZED.toString(),
//					HttpStatus.UNAUTHORIZED);
//		}

		directives = String.format(MAX_AGE_DIRECTIVE, this.maxAgeSeconds);
		directives += "; " + INCLUDE_SUB_DOMAINS_DIRECTIVE;

		HttpServletResponse res = response;
		res.addHeader(HEADER_NAME, directives);
		String requestToken = RippsUtility.getToken(request);

		if (skipIntercept(request)) {
			return true;
		}
		String url = request.getRequestURL().toString();

		try {
			AuthSession authSession = authSessionHelper.findByTokenAndInvalidated(requestToken, "0");
			boolean runDelete = true;
			if (authSession == null) {
				throw new TokenException("Token Not Match", HttpStatus.OK);
			} else {
				if (runDelete) {
					Timestamp timestamp = new Timestamp(System.currentTimeMillis());
					int flag = RippsUtility.differenceTimeStamp(timestamp, authSession.getExpireTime());
					if (flag == 1) {
						KeycloakTokenResponse keycloakTokenResponse = listService
								.getRefreshTokenCall(authSession.getRefreshToken());
						authSessionService.deleteAuthSession(requestToken);
						response.setHeader("x-auth-token", keycloakTokenResponse.getAccess_token());
						runDelete = false;
						authSessionService.generateAuthsession(keycloakTokenResponse);

					} else if (flag == 2) {
						response.setHeader("x-auth-token", null);
						listService.signOut(request.getHeader("id"), RippsUtility.getToken(request));
						authSessionService.deleteAuthSession(RippsUtility.getToken(request));
						runDelete = false;
						throw new TokenException("Token expired", HttpStatus.OK);
					} else if (flag == 0) {
						runDelete = false;
					}
				}
			}
		} catch (Throwable e) {
			if (e instanceof ObjectOptimisticLockingFailureException) {

			}
			if (e instanceof TokenException) {
				throw new TokenException(e.getMessage(), HttpStatus.OK);
			}
		}

		if (!url.contains("checker")) {
			performRequest = verifyCheckerOperation(request, response, requestToken);
		}
		return performRequest;
	}

	private boolean verifyCheckerOperation(HttpServletRequest request, HttpServletResponse response,
			String requestToken) {
		String requestUri = request.getRequestURI();
		String requestMethod = request.getMethod();
		String requestUrl = null;

		try {
			if (HttpCommons.isCheckerSupportedOperation(requestMethod)) {
				requestUrl = (requestUri.split("/"))[3];
				Integer subMenuFunctionId = subMenuFunctionService.getSubMenuIdByUrl(requestUrl);

				String checkerEnabledEntity = checkerService.getCheckerEnabledEntity(requestToken, subMenuFunctionId);
				if (checkerEnabledEntity != null) {
					return extractedCheck(request, response, requestMethod, checkerEnabledEntity);
				}
			}
		} catch (Exception e) {
			log.error("Checker functionality is not supported for Url :{}" + requestUrl);
		}
		return true;
	}

	private boolean extractedCheck(HttpServletRequest request, HttpServletResponse response, String requestMethod,
			String checkerEnabledEntity) {
		try {
			if (requestMethod.equals(HttpConstants.PUT)) {
				String entityId = HttpCommons.getPathParamValue(request, "id");
				request.setAttribute("entityId", entityId);
			}
			request.setAttribute("entityName", checkerEnabledEntity);
			request.getRequestDispatcher("/rest/checker").forward(request, response);
			log.info("Interceptor redirects!: " + request.getMethod() + " : " + request.getRequestURL().toString());
			return false;
		} catch (Exception e) {
			log.error(e);
			return true;
		}
	}

	private boolean skipIntercept(HttpServletRequest request) throws Exception {
		String requestUri = request.getRequestURI();
		String requestMethod = request.getMethod();
		String requestUrl = requestUri.substring(requestUri.lastIndexOf('/') + 1, requestUri.length());
		List<String> skipUrlList = Stream.of(skipUrl.split(",")).map(String::trim).toList();

		if ("permissions".contains(requestUrl) && "GET".contains(requestMethod) && !validateKeycloakUser(request)) {
			return false;
		}
		return (skipUrlList.contains(requestUrl) || skipUrlList.contains(requestMethod));
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		String uri = request.getRequestURI();
		String method = request.getMethod();
		String updatedUri = uri.substring(uri.lastIndexOf('/') + 1, uri.length());
		List<String> skipUrlList = Stream.of(skipUrl.split(",")).map(String::trim).toList();
		if (skipUrlList.contains(updatedUri) || skipUrlList.contains(method)) {
			return;
		}
	}

	private boolean validateKeycloakUser(HttpServletRequest request) throws Exception {
		String email = request.getHeader("kcemail");
		String firstName = request.getHeader("kcfirstname");
		String lastName = request.getHeader("kclastname");
		String username = request.getHeader("kcpreferredusername");
		String token = request.getHeader("X-Auth-Token");
		String id = request.getHeader("id");
		String logIn = request.getHeader("logIn");
		String refreshToken = request.getHeader("refreshToken");
		String exp = request.getHeader("exp");
		String refreshExp = request.getHeader("refreshExp");
		StringBuffer sb = new StringBuffer();
		boolean flag = false;

		if (email.equalsIgnoreCase("undefined")) {
			flag = true;
			sb.append("email");
			sb.append(",");
		}
		if (firstName.equalsIgnoreCase("undefined")) {
			flag = true;
			sb.append("First name");
			sb.append(",");

		}
		if (lastName.equalsIgnoreCase("undefined")) {
			flag = true;
			sb.append("Last name");
			sb.append(",");

		}
		if (username.equalsIgnoreCase("undefined")) {
			flag = true;
			sb.append("Username");
			sb.append(",");

		}
		if (flag) {
			String dd = "Please update user detail :[" + sb.toString().substring(0, sb.toString().length() - 1)
					+ "] on keyclock";
			// listService.signOut(id.trim(), token);
			throw new RippsAdminRestException(dd, HttpStatus.OK);
		}

		log.info("validateKeycloakUser() inputs are :");
		log.info("FirstName:" + firstName + ",lastName:" + lastName + ",Email:" + email + ",userName:" + username);

		SystemUser systemUser = userService.isUserExistByUserNameOrEmail(username, email);
		if (systemUser == null) {
			userActivityLogger.error("Key clock user not found");
			SystemUserDto user = new SystemUserDto();
			user.setEmail(email);
			user.setUserId(username);
			user.setLoginName(email);
			user.setFirstName(firstName);
			user.setLastName(lastName);
			int userId = userService.saveUser(user, '0');
			authSessionService.generateAuthSession(token, userId, refreshToken, logIn, exp, refreshExp);
			return false;
		} else {
			authSessionService.generateAuthSession(token, systemUser.getId(), refreshToken, logIn, exp, refreshExp);
			return true;
		}
	}
}
