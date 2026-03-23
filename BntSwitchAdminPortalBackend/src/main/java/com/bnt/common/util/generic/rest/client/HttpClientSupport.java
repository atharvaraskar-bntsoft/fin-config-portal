package com.bnt.common.util.generic.rest.client;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

import org.apache.hc.client5.http.ConnectionKeepAliveStrategy;
import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.config.RequestConfig;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager;
import org.apache.hc.client5.http.socket.ConnectionSocketFactory;
import org.apache.hc.client5.http.socket.PlainConnectionSocketFactory;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactory;
import org.apache.hc.core5.http.HeaderElement;
import org.apache.hc.core5.http.config.Registry;
import org.apache.hc.core5.http.config.RegistryBuilder;
import org.apache.hc.core5.http.message.BasicHeaderElementIterator;
import org.apache.hc.core5.ssl.SSLContextBuilder;
import org.apache.hc.core5.ssl.TrustStrategy;
import org.apache.hc.core5.util.TimeValue;
//import org.apache.http.protocol.HTTP;
import org.apache.hc.core5.http.HttpHeaders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.client.RestTemplate;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Configuration
@EnableAsync
public class HttpClientSupport {

	public static final Logger LOGGER = LoggerFactory.getLogger(HttpClientSupport.class);

	public static final int DEFAULT_KEEP_ALIVE_TIME_MILLIS = 3 * 1000;
	public static final int CLOSE_IDLE_CONNECTION_WAIT_TIME_SECS = 5 * 1000;
	public static final int HTTP_CLIENT_MAX_CONNECTIONS = 20;

	@Value("${monitoring.health.rest.connection.timout.in.seconds}")
	private String connectionTimeout;

	private int getConnectionTimeout() {
		return Integer.parseInt(this.connectionTimeout) * 1000;
	}

	@Bean(name = "restTemplatePortal")
	public RestTemplate restTemplatePortal() {
		SSLConnectionSocketFactory sslsf = null;
		var builder = new SSLContextBuilder();
		try {
			builder.loadTrustMaterial(null, new TrustStrategy() {
				public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
					return true;
				}
			});

		} catch (NoSuchAlgorithmException | KeyStoreException e) {
			LOGGER.error("Pooling Connection Manager Initialization failure because of " + e.getMessage(), e);
		}

		try {
			sslsf = new SSLConnectionSocketFactory(builder.build());
		} catch (KeyManagementException | NoSuchAlgorithmException e) {
			LOGGER.error("Pooling Connection Manager Initialization failure because of " + e.getMessage(), e);
		}

		Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
				.register("https", sslsf).register("http", new PlainConnectionSocketFactory()).build();

		var poolingConnectionManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
		poolingConnectionManager.setMaxTotal(HTTP_CLIENT_MAX_CONNECTIONS);

		var requestConfig = RequestConfig.custom()
				.setConnectionRequestTimeout(CLOSE_IDLE_CONNECTION_WAIT_TIME_SECS, TimeUnit.SECONDS)
				.setConnectTimeout(CLOSE_IDLE_CONNECTION_WAIT_TIME_SECS, TimeUnit.SECONDS).build();

		HttpClientBuilder factory = HttpClients.custom().setDefaultRequestConfig(requestConfig)
				.setConnectionManager(poolingConnectionManager).setKeepAliveStrategy(connectionKeepAliveStrategy());

		CloseableHttpClient CloseableHttpClient = factory.build();

		var clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();
		clientHttpRequestFactory.setHttpClient((HttpClient) CloseableHttpClient);
		// clientHttpRequestFactory.setReadTimeout(10000);
		clientHttpRequestFactory.setConnectionRequestTimeout(getConnectionTimeout());
		clientHttpRequestFactory.setConnectTimeout(getConnectionTimeout());
		// clientHttpRequestFactory.setReadTimeout(getConnectionTimeout());
		RestTemplate restTemplatePortal = new RestTemplate(clientHttpRequestFactory);
		return restTemplatePortal;
	}

	@Bean
	public ConnectionKeepAliveStrategy connectionKeepAliveStrategy() {
		return (response, context) -> {
//			var it = new BasicHeaderElementIterator(response.headerIterator(HTTP.CONN_KEEP_ALIVE));
			var it = new BasicHeaderElementIterator(response.headerIterator(HttpHeaders.KEEP_ALIVE));
			while (it.hasNext()) {
				HeaderElement he = it.next();
				String param = he.getName();
				String value = he.getValue();

				if (value != null && param.equalsIgnoreCase("timeout")) {
					return TimeValue.ofMilliseconds(Long.parseLong("3") * 1000);

				}
			}
			return TimeValue.ofMilliseconds(DEFAULT_KEEP_ALIVE_TIME_MILLIS);
		};
	}

}
