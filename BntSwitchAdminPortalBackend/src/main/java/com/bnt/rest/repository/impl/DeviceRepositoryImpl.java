package com.bnt.rest.repository.impl;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;
import com.bnt.common.util.JPAPredicateHelper;
import com.bnt.common.util.JPAUtils;
import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.Device;
import com.bnt.rest.entity.QDevice;
import com.bnt.rest.jpa.repository.DevicePersistenceRepository;
import com.bnt.rest.repository.DeviceRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public class DeviceRepositoryImpl implements DeviceRepository {

	@PersistenceContext
	public EntityManager entityManager;

	@Autowired
	private DevicePersistenceRepository devicePersistenceRepo;

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Device> findFilterData(Pageable pageable, String[] filters) {
		QDevice device = QDevice.device;
		Predicate lockedPredicate = null;
		Predicate institutionsPredicate = null;
		Predicate merchantsPredicate = null;
		Predicate locationsPredicate = null;
		Predicate codePredicate = null;
		for (String each : filters) {
			String param = each.split(":")[0];
			String value = each.split(":")[1];
			if (param.equals("status")) {
				lockedPredicate = JPAPredicateHelper.getStatusPredicate(device.locked, value);
			} else if (param.equals("merchant")) {
				merchantsPredicate = device.merchant.id.eq(Integer.parseInt(value));
			} else if (param.equals("location")) {
				locationsPredicate = device.location.id.eq(Integer.parseInt(value));
			} else if (param.equals("code")) {
				codePredicate = device.code.like(value + '%');
			}

		}
		Predicate deletePredicate = device.deleted.eq('0');
		Page<Device> merchantInstitutionPage = null;
		JPAQuery jpaQuery = null;
		jpaQuery = new JPAQuery(entityManager);
		jpaQuery.from(device).where(lockedPredicate, institutionsPredicate, merchantsPredicate, locationsPredicate,
				deletePredicate, codePredicate).limit(pageable.getPageSize()).offset(pageable.getOffset());
		List<Device> merchantInstitutionList = jpaQuery.fetch();
		merchantInstitutionPage = (Page<Device>) JPAUtils.getPageObjectFromList(pageable, merchantInstitutionList,
				jpaQuery.fetchCount());
		return merchantInstitutionPage;
	}

	@Override
	public Device findDeviceById(Integer deviceId) {
		return devicePersistenceRepo.findById(deviceId).orElse(null);
	}

	@Override
	public String getDeviceCodeById(Integer id) {

		Device device = devicePersistenceRepo.findById(id).orElse(null);
		String deviceCode = null;
		if (device != null) {
			deviceCode = device.getCode();
		}
		return deviceCode;
	}

	@Override
	public String getLocationCode(String deviceCode) {
		Object result = devicePersistenceRepo.findLocationCode(deviceCode);

		if (result != null) {
			return result.toString();
		}
		return null;
	}
}
