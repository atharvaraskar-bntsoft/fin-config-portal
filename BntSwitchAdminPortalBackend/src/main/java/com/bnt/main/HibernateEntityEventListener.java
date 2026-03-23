package com.bnt.main;

import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.event.spi.LoadEvent;
import org.hibernate.event.spi.LoadEventListener;
import org.hibernate.event.spi.MergeContext;
import org.hibernate.event.spi.MergeEvent;
import org.hibernate.event.spi.MergeEventListener;
import org.hibernate.event.spi.PostCommitUpdateEventListener;
import org.hibernate.event.spi.PostDeleteEvent;
import org.hibernate.event.spi.PostDeleteEventListener;
import org.hibernate.event.spi.PostInsertEvent;
import org.hibernate.event.spi.PostInsertEventListener;
import org.hibernate.event.spi.PostUpdateEvent;
import org.hibernate.event.spi.PostUpdateEventListener;
import org.hibernate.event.spi.PreDeleteEvent;
import org.hibernate.event.spi.PreDeleteEventListener;
import org.hibernate.event.spi.PreInsertEvent;
import org.hibernate.event.spi.PreInsertEventListener;
import org.hibernate.event.spi.PreUpdateEvent;
import org.hibernate.event.spi.PreUpdateEventListener;
import org.hibernate.persister.entity.EntityPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bnt.common.HttpCommons;
import com.bnt.common.LoggerCommons;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.annotations.ExcludeLoggedEntity;
import com.bnt.constant.HttpConstants;
import com.bnt.rest.service.ExportSchemaServiceRest;
import com.bnt.rest.service.UserServiceRest;
import com.bnt.rest.wrapper.dto.ExportRequestWrapper;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
public class HibernateEntityEventListener implements LoadEventListener, PostInsertEventListener,
		PostUpdateEventListener, PostCommitUpdateEventListener, PostDeleteEventListener, PreInsertEventListener,
		PreUpdateEventListener, PreDeleteEventListener, MergeEventListener {

	private static final Logger logger = LogManager.getLogger(HibernateEntityEventListener.class);

	private static final long serialVersionUID = 1L;

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private ExportSchemaServiceRest exportService;

	@Autowired
	UserServiceRest userService;

	@Override
	public boolean onPreInsert(PreInsertEvent event) {

		String entityName = JPAUtils.getEntityName(event.getEntity());
		logger.debug("PreInsert event invoked for:{}", entityName);

		return false;
	}

	@Override
	public void onPostInsert(PostInsertEvent event) {
		logger.debug("PostInsert event invoked for:{}", JPAUtils.getEntityName(event.getEntity()));
		saveUpdateProcessing(event.getEntity(), event.getClass().getSimpleName());

	}

	@Override
	// @Transactional(propagation=Propagation.REQUIRES_NEW)
	public boolean onPreUpdate(PreUpdateEvent event) {

		String entityName = JPAUtils.getEntityName(event.getEntity());
		logger.debug("PreUpdate event invoked for:{}", entityName);

		return false;
	}

	@Override
	public void onPostUpdateCommitFailed(PostUpdateEvent event) {
		// Here we can do something useful, may be log or notify some external system
	}

	@Override
	public void onPostUpdate(PostUpdateEvent event) {

		logger.debug("PostUpdate event invoked for:{}", JPAUtils.getEntityName(event.getEntity()));
		saveUpdateProcessing(event.getEntity(), event.getClass().getSimpleName());
	}

	private void saveUpdateProcessing(Object entity, String eventType) {
		String clientIP = HttpCommons.getClientIP(request);
		Class<?> classType = entity.getClass();

		if (JPAUtils.isJPAManagedBaseEntity(classType)) {
			logUserActivity(entity, eventType, clientIP, classType);
		}
	}

	@Override
	public void onMerge(MergeEvent event) throws HibernateException {
		// No action required, it is just overridden on implementing interface.
	}

	@Override
	public boolean onPreDelete(PreDeleteEvent event) {
		logger.debug("PreDelete event invoked for:{}", JPAUtils.getEntityName(event.getEntity()));

		return false;
	}

	@Override
	public void onPostDelete(PostDeleteEvent event) {
		logger.debug("PostDelete event invoked for:{}", JPAUtils.getEntityName(event.getEntity()));
	}

	private void logUserActivity(Object entity, String eventType, String clientIP, Class<?> classType) {
		if (!(classType.isAnnotationPresent(ExcludeLoggedEntity.class))) {
			logger.debug("Logging user activity for '{}':", classType.getSimpleName());
			LoggerCommons.logUserActivity(entity, eventType, clientIP);
		}
	}

	@SuppressWarnings("unused")
	private void exportEntity(Object entity, String eventType, String uri, Class<?> classType) {
		if (JPAUtils.isOperationExportable(classType, eventType, uri)) {

			exportUpdatedEntity(entity);
		}
	}

	private void exportUpdatedEntity(Object entity) {
		logger.debug("export operation invoked for '{}'", entity.getClass().getSimpleName());
		String groupType = request.getHeader(HttpConstants.EXPORT_GROUP_HEADER);

		ExportRequestWrapper requestWrapper = ExportRequestWrapper.getInstance(groupType,
				entity.getClass().getSimpleName());

		String requestToken = RippsUtility.getToken(request);
		exportService.exportSchema(requestWrapper, requestToken);
	}

	@Override
	public void onLoad(LoadEvent event, LoadType loadType) throws HibernateException {
		// No action required, it is just overridden on implementing interface.
	}

	@Override
	public boolean requiresPostCommitHandling(EntityPersister persister) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onMerge(MergeEvent event, MergeContext copiedAlready) throws HibernateException {
		// TODO Auto-generated method stub

	}
}
