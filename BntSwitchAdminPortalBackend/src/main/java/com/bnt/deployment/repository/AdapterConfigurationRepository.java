package com.bnt.deployment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnt.rest.entity.AdapterConfiguration;

import java.util.Optional;

@Repository
public interface AdapterConfigurationRepository  extends JpaRepository<AdapterConfiguration, Long> {

	Optional<AdapterConfiguration> findByAdapter_IdAndVersion(Long adapterId, Integer version);
}
