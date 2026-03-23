package com.bnt.main;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;

import org.hibernate.event.service.spi.EventListenerRegistry;
import org.hibernate.event.spi.EventType;
import org.hibernate.internal.SessionFactoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class HibernateEntityEventListenerConfig {

	@PersistenceUnit
	private EntityManagerFactory emf; // NOTE Can't autowire SessionFactory here.

	@Autowired
	private HibernateEntityEventListener entityEventListener;

	@PostConstruct
	public void registerListeners() {
		// NOTE the emf.unwrap() to get the SessionFactoryImpl
		SessionFactoryImpl sessionFactory = emf.unwrap(SessionFactoryImpl.class);
		EventListenerRegistry registry = sessionFactory.getServiceRegistry().getService(EventListenerRegistry.class);
		registry.getEventListenerGroup(EventType.PRE_INSERT).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.PRE_UPDATE).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.POST_COMMIT_UPDATE).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.PRE_DELETE).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.POST_INSERT).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.POST_UPDATE).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.POST_DELETE).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.LOAD).appendListener(entityEventListener);
		registry.getEventListenerGroup(EventType.MERGE).appendListener(entityEventListener);
	}
}
