package com.bnt.dashboard;

import java.util.Map;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.collect.Maps;
import com.bnt.rest.jpa.repository.MerchantPersistenceHelper;
import com.bnt.rest.jpa.repository.ProcessorAdapterPersistenceHelper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component()
public class RepositoryCache {

	public static final String MERCHANT_CACHE = "merchant";
	private static final Map<String, LoadingCache<Object, Object>> map = Maps.newHashMap();
	public static final String PROVIDER_CACHE = "provider";

	@Autowired
	private ProcessorAdapterPersistenceHelper persistenceRepository;

	@Autowired
	private MerchantPersistenceHelper merchantRepository;

	private LoadingCache<Object, Object> merchantcache = CacheBuilder.newBuilder().maximumSize(500)
			.build(new CacheLoader<Object, Object>() {
				public Object load(Object key) throws Exception {
					return merchantRepository.findMerchantByCode((String) key);
				}
			});

	private LoadingCache<Object, Object> providerCache = CacheBuilder.newBuilder().maximumSize(10)
			.build(new CacheLoader<Object, Object>() {
				public Object load(Object key) throws Exception {
					return persistenceRepository.findById((Integer) key);
				}
			});

	@PostConstruct
	public void postConstruct() {
		map.put(MERCHANT_CACHE, merchantcache);
		map.put(PROVIDER_CACHE, providerCache);
	}

	public static LoadingCache<Object, Object> getCache(String key) {
		return map.get(key);
	}

}
