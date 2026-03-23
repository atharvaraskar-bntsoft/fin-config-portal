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
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
@EnableJpaRepositories(
excludeFilters = @ComponentScan.Filter(ReadOnlyRepository.class),
entityManagerFactoryRef = "readWriteEntityManager",
transactionManagerRef = "readWriteTransactionManager",
basePackages = { "com.bnt" }
)
public class PrimaryDataSourceConfiguration {

	private String url;
	private String username;
	private String password;
	private String driverClassName;

	/*
	 * @Autowired public
	 * PrimaryDataSourceConfiguration(@Value("${spring.datasource.url}") String url,
	 * 
	 * @Value("${spring.datasource.username}") String username,
	 * 
	 * @Value("${spring.datasource.driverClassName}") String driverClassName ) {
	 * this.url = url; this.username = username; this.driverClassName =
	 * driverClassName; }
	 * 
	 * 
	 * @SuppressWarnings("rawtypes")
	 * 
	 * @Bean
	 * 
	 * @Primary public DataSource readWriteDataSource() {
	 * 
	 * DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
	 * dataSourceBuilder.driverClassName(driverClassName);
	 * dataSourceBuilder.url(url); dataSourceBuilder.username(username);
	 * //dataSourceBuilder.password(password); return dataSourceBuilder.build(); }
	 */

	// for local db connection

	@Autowired
	public PrimaryDataSourceConfiguration(
			@Value("${spring.datasource.url}") String url,
			@Value("${spring.datasource.username}") String username,
			@Value("${spring.datasource.pwd}") String password,
			@Value("${spring.datasource.driverClassName}") String driverClassName) {
		this.url = url;
		this.username = username;
		this.password = password;
		this.driverClassName = driverClassName;
	}

	@SuppressWarnings("rawtypes")
	@Bean
	@Primary
	public DataSource readWriteDataSource() {

		DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
		dataSourceBuilder.driverClassName(driverClassName);
		dataSourceBuilder.url(url);
		dataSourceBuilder.username(username);
		dataSourceBuilder.password(password);
		return dataSourceBuilder.build();
	}

	@Bean(name = "readWriteEntityManager")
	@Primary
	public LocalContainerEntityManagerFactoryBean getReadWriteEntityManager(EntityManagerFactoryBuilder builder,
			@Qualifier("readWriteDataSource") DataSource readWriteDataSource) {
		return builder.dataSource(readWriteDataSource).packages("com.bnt.rest")
				.properties(additionalJpaProperties()).build();
	}

	Map<String, String> additionalJpaProperties() {
		return new HashMap<>();
	}

	@Bean(name = "readWriteTransactionManager")
	@Primary
	public JpaTransactionManager transactionManager(
			@Qualifier("readWriteEntityManager") EntityManagerFactory readWriteEntityManager) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(readWriteEntityManager);
		return transactionManager;
	}
}
