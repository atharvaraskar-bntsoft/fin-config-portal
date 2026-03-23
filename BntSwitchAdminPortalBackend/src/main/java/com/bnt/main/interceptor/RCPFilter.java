package com.bnt.main.interceptor;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class RCPFilter implements Filter {

	private static final Logger log = LogManager.getLogger(RCPFilter.class);

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
		httpServletResponse.setHeader("access-control-expose-headers", "x-auth-token");
		filterChain.doFilter(servletRequest, servletResponse);
	}
}
