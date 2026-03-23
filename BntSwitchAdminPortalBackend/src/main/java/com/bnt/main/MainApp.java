package com.bnt.main;

import java.util.Arrays;
import java.util.TimeZone;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**************************
 * @author vaibhav.shejol *
 **************************/

@SpringBootApplication(scanBasePackages = { "com.bnt.common", 
		"com.bnt.constant",
		"com.bnt.dashboard",
		 "com.bnt.deployment",
		"com.bnt.enums",
		"com.bnt.main",
		"com.bnt.monitoring",
		"com.bnt.multi",
		"com.bnt.repo",
		"com.bnt.rest",
		"com.bnt.ruleengine",
		"com.bnt.service"})
@EntityScan(basePackages = { "com.bnt.common", 
		 "com.bnt.deployment",
		"com.bnt.constant",
		"com.bnt.dashboard",
		"com.bnt.enums",
		"com.bnt.main",
		"com.bnt.monitoring",
		"com.bnt.multi",
		"com.bnt.repo",
		"com.bnt.rest",
		"com.bnt.ruleengine",
		"com.bnt.service",
		"com.bnt.ripps.kernel.db" })
//@EnableJpaRepositories(basePackages = "com.bnt.ripps")
@PropertySources({ @PropertySource("classpath:groupMonitoringOptions.properties"),
		@PropertySource("classpath:jmx.properties"), @PropertySource("classpath:version.prop"),
		@PropertySource("classpath:conf/common.properties"),
		@PropertySource(ignoreResourceNotFound = true, value = "file:${SWITCH_HOME}/common.properties") })
@EnableCaching
@Configuration
@EnableJpaAuditing
@EnableAutoConfiguration
public class MainApp extends SpringBootServletInitializer {

	@Value("${spring.jpa.properties.hibernate.jdbc.time_zone}")
	String timeZone;

	public static void main(String[] args) {
		SpringApplication.run(MainApp.class, args);
	}

	@Bean
	public CacheManager cacheManager() {
		SimpleCacheManager cacheManager = new SimpleCacheManager();
		cacheManager.setCaches(Arrays.asList(new ConcurrentMapCache("urls")));
		return cacheManager;
	}

	@PostConstruct
	public void started() {
		TimeZone.setDefault(TimeZone.getTimeZone(timeZone));
	}
}
