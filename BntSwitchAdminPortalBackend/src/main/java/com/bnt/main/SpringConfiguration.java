package com.bnt.main;

import org.dozer.DozerBeanMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
public class SpringConfiguration {

	@Bean
	public DozerBeanMapper getDozerBeanMapper() {
		return new DozerBeanMapper();
	}
}
