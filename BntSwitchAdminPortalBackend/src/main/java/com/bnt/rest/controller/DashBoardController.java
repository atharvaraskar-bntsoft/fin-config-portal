package com.bnt.rest.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;
import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.Content;
import com.bnt.dashboard.DashBoardData;
import com.bnt.monitoring.charts.LinearDate;
import com.bnt.rest.service.DashboardService;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DashBoardController {

	private static final Logger logger = LogManager.getLogger(DashBoardController.class);

	@Autowired
	private DashboardService service;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getDashBoard(@RequestHeader(value = "X-Auth-Token") String xAuthToken) {
		logger.info("Find Dashboard Data");
		try {
			List<DashBoardData<?>> pageJPAData = service.buildDashboard(new ChartsConfig(1440, false));
			for (int i = 0; i < pageJPAData.size(); i++) {
				String cc = pageJPAData.get(i).getTitle();
				if (cc.equals("Transactions Velocity - Status")) {
					DashBoardData<?> resultDashBoard = extractedMethod(pageJPAData.get(i));
					pageJPAData.set(i, resultDashBoard);
				}
			}

			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("all access logs");
			responseEntityData.setData(pageJPAData);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all user", null),
					HttpStatus.FORBIDDEN);
		}
	}

	private static DashBoardData<?> extractedMethod(DashBoardData<?> data) {
		Content content = data.getContent();
		List<LinearDate> listLinear = (List<LinearDate>) data.getContent().getCoordinates();
		LinearDate totalL = null;
		LinearDate failedL = null;
		LinearDate approvedL = null;
		for (int i = 0; i < listLinear.size(); i++) {
			LinearDate map = (LinearDate) listLinear.get(i);
			if (map.getText().equals("TOTAL")) {
				totalL = new LinearDate(map.getText(), map.getXCoordinats(), map.getYCoordinats());
			} else if (map.getText().equals("APPROVED")) {
				approvedL = new LinearDate(map.getText(), map.getXCoordinats(), map.getYCoordinats());
			} else if (map.getText().equals("FAILED")) {
				failedL = new LinearDate(map.getText(), map.getXCoordinats(), map.getYCoordinats());
			}
		}

		List<LinearDate> bb = new ArrayList<>();
		List<Date> totalXCordinate = totalL.getXCoordinats();
		List<Integer> totalYCordinate = totalL.getYCoordinats();
		List<Integer> finalYCoordinats = new ArrayList<>();
		Map<Long, Integer> map = new HashMap<>();
		for (int i = 0; i < totalXCordinate.size(); i++) {
			Date val = totalXCordinate.get(i);
			map.put(val.getTime(), totalYCordinate.get(i));
		}
		Comparator<Date> comparator = (c1, c2) -> {
			return Long.valueOf(c1.getTime()).compareTo(c2.getTime());
		};
		Collections.sort(totalXCordinate, comparator);

		for (Date f : totalXCordinate) {
			finalYCoordinats.add(map.get(f.getTime()));
		}
		bb.add(new LinearDate("TOTAL", totalXCordinate, finalYCoordinats));
		bb.add(genericCopy(totalL, approvedL, "APPROVED"));
		bb.add(genericCopy(totalL, failedL, "FAILED"));
		content.setCoordinates(bb);
		return new DashBoardData<>(data.getBlockType(), data.getTitle(), data.getActionLink(), data.getActionTitle(),
				content);
	}

	/**
	 * copy all the values in xCoordinates update yCoordinats identify index
	 * positions in total comparing with subset update new coordinates value based
	 * on position
	 * 
	 */
	private static LinearDate genericCopy(LinearDate totalL, LinearDate subsetL, String text) {
		Map<Long, Integer> map = new HashMap<>();
		List<Date> xCoordinats = new ArrayList<>();
		List<Integer> yCoordinats = new ArrayList<>();
		List<Integer> finalYCoordinats = new ArrayList<>();
		List<Date> subsetXList = subsetL.getXCoordinats();
		List<Integer> subsetYList = subsetL.getYCoordinats();

		List<Date> listSuperSet = totalL.getXCoordinats();
		for (int i = 0; i < listSuperSet.size(); i++) {
			Date val = listSuperSet.get(i);
			xCoordinats.add(val);
			if (subsetXList.contains(val)) {
				map.put(val.getTime(), subsetYList.get(subsetXList.indexOf(val)));
				yCoordinats.add(subsetYList.get(subsetXList.indexOf(val)));
			} else {
				map.put(val.getTime(), 0);
				yCoordinats.add(0);
			}
		}
		Comparator<Date> comparator = (c1, c2) -> {
			return Long.valueOf(c1.getTime()).compareTo(c2.getTime());
		};
		Collections.sort(xCoordinats, comparator);

		for (Date f : xCoordinats) {
			finalYCoordinats.add(map.get(f.getTime()));
		}
		return new LinearDate(text, xCoordinats, finalYCoordinats);
	}

}
