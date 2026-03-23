package com.bnt.rest.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bnt.rest.entity.Currency;

/**************************
 * @author vaibhav.shejol *
 **************************/

public interface CurrencyPersistenceHelper extends CrudRepository<Currency, Integer> {

	@Query("select c.id,c.code from Currency c")
	public List<Object[]> getIdAndCodeOnly();

	@Query("select c.isoCode,c.code  from Currency c")
	public List<Object> getCodeAndIsocodeOnly();

	public Currency findCurrencyByCode(String code);

	public Page<Currency> findCurrencyByDeleted(Character c, Pageable pageable);

	@Query("select c.isoCode, c.code FROM Currency c")
	public List<Object[]> findCurrencyByIsoCodeAndCode();
}
