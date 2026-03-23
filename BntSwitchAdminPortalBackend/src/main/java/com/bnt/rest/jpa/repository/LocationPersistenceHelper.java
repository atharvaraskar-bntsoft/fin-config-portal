package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bnt.multi.database.ReadOnlyRepository;
import com.bnt.rest.entity.Location;
import com.bnt.rest.entity.Merchant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Repository
@ReadOnlyRepository
public interface LocationPersistenceHelper extends JpaRepository<Location, Integer> {

	public Page<Location> findLocationByDeleted(Character deleted, Pageable pageable);

	public List<Location> findByLockedAndDeleted(Character locked, Character deleted);

	public List<Location> findByDeleted(Character deleted);

	public List<Location> findLocationByMerchantAndLockedAndDeleted(Merchant merchant, char locked, char deleted);

	public Location findLocationById(Integer id);
}
