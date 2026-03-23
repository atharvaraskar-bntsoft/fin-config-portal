package com.bnt.main;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import com.bnt.main.interceptor.RippsAdminRestIntercepter;

/**************************
 * @author vaibhav.shejol *
 **************************/

@EnableWebMvc
@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Bean
	public RippsAdminRestIntercepter myIntercepter() {
		return new RippsAdminRestIntercepter();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(myIntercepter());
		registry.addInterceptor(new LocaleChangeInterceptor());
	}
}
