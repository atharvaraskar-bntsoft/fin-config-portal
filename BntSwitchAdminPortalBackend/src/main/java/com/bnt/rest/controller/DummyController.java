package com.bnt.rest.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bnt.common.ResponseEntityData;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.RippsUtility;
import com.bnt.constant.RippsRestConstant;

/**************************
 * @author vaibhav.shejol *
 **************************/

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "${crossOriginUrl}")
public class DummyController {

	@GetMapping(value = "dummy1")
	public ResponseEntity<Map<String, Object>> get() {
		try {
			ResponseWrapper pageJPAData = new ResponseWrapper();
			pageJPAData.setContent("[\r\n" + "  {\r\n" + "    \"id\": \"UUID\",\r\n" + "    \"name\": \"UUID\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"ReferenceNumber\",\r\n" + "    \"name\": \"ReferenceNumber\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"TransactionType\",\r\n" + "    \"name\": \"TransactionType\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"Amount\",\r\n" + "    \"name\": \"Amount\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"Currency\",\r\n" + "    \"name\": \"Currency\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"Terminal\",\r\n" + "    \"name\": \"Terminal\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"Merchant\",\r\n" + "    \"name\": \"Merchant\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"AcquirerId\",\r\n" + "    \"name\": \"AcquirerId\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"CustomerName\",\r\n" + "    \"name\": \"CustomerName\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"CustomerEmail\",\r\n" + "    \"name\": \"CustomerEmail\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"CustomerMobile\",\r\n" + "    \"name\": \"CustomerMobile\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  },\r\n" + "  {\r\n"
					+ "    \"id\": \"CustomerAddress\",\r\n" + "    \"name\": \"CustomerAddress\",\r\n"
					+ "    \"possibleValue\": null,\r\n" + "    \"parentField\": null\r\n" + "  }\r\n" + "]\r\n" + "");
			ResponseEntityData responseEntityData = new ResponseEntityData();
			responseEntityData.setStatus(RippsRestConstant.SUCCESS);
			responseEntityData.setMessage("Dummy1");
			Map<String, Object> data = RippsUtility.setPageJPAData(pageJPAData);
			data.put("dummy1", pageJPAData.getContent());
			responseEntityData.setData(data);
			return new ResponseEntity<>(RippsUtility.setResponseEntityData(responseEntityData), HttpStatus.OK);
		} catch (RippsAdminException e) {
			return new ResponseEntity<>(
					RippsUtility.setResponseEntityData(RippsRestConstant.FAILURE, "Find all user", null),
					HttpStatus.FORBIDDEN);
		}
	}

}
