package com.bnt.multi.database;

import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
@EnableJpaRepositories(
includeFilters = @ComponentScan.Filter(ReadOnlyRepository.class),
entityManagerFactoryRef = "readEntityManager",
transactionManagerRef = "readTransactionManager",
basePackages = { "com.bnt" }
)
public class ReadOnlyDataSourceConfiguration {

	private String url;
	private String username;
	private String password;
	private String driverClassName;

	/*
	 * @Autowired public
	 * ReadOnlyDataSourceConfiguration(@Value("${spring.datasource.read_url}")
	 * String url,
	 * 
	 * @Value("${spring.datasource.read_username}") String username,
	 * 
	 * @Value("${spring.datasource.driverClassName}") String driverClassName ) {
	 * this.url = url; this.username = username; this.driverClassName =
	 * driverClassName; }
	 * 
	 * @SuppressWarnings("rawtypes")
	 * 
	 * @Bean public DataSource readDataSource() { DataSourceBuilder
	 * dataSourceBuilder = DataSourceBuilder.create();
	 * dataSourceBuilder.driverClassName(driverClassName);
	 * dataSourceBuilder.url(url); dataSourceBuilder.username(username); return
	 * dataSourceBuilder.build();
	 * 
	 * }
	 */

	// for local db connection

	@Autowired
	public ReadOnlyDataSourceConfiguration(
			@Value("${spring.datasource.read_url}") String url,
			@Value("${spring.datasource.read_username}") String username,
			@Value("${spring.datasource.read_pwd}") String password,
			@Value("${spring.datasource.driverClassName}") String driverClassName) {
		this.url = url;
		this.username = username;
		this.password = password;
		this.driverClassName = driverClassName;
	}

	@SuppressWarnings("rawtypes")
	@Bean
	public DataSource readDataSource() {
		DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
		dataSourceBuilder.driverClassName(driverClassName);
		dataSourceBuilder.url(url);
		dataSourceBuilder.username(username);
		dataSourceBuilder.password(password);
		return dataSourceBuilder.build();
	}

	@Bean(name = "readEntityManager")
	public LocalContainerEntityManagerFactoryBean getReadEntityManager(EntityManagerFactoryBuilder builder,
			@Qualifier("readDataSource") DataSource readDataSource) {

		return builder.dataSource(readDataSource).packages("com.bnt.rest").properties(additionalJpaProperties())
				.build();
	}

	Map<String, String> additionalJpaProperties() {
		return new HashMap<>();
	}

	@Bean(name = "readTransactionManager")
	public JpaTransactionManager transactionManager(
			@Qualifier("readEntityManager") EntityManagerFactory readEntityManager) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(readEntityManager);
		return transactionManager;
	}
}
