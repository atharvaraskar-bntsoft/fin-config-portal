package com.bnt.common.util;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bnt.common.RippsAdminException;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ApacheCSVUtil {

	private static final Logger logger = LogManager.getLogger(ApacheCSVUtil.class);

	private ApacheCSVUtil() {
		super();
	}

	public static Iterable<CSVRecord> readCSVFile(String path, Boolean ignoreHeader) {
		try {

			FileReader fileReader = FileUtil.getFileReaderFromResource(path);

			if (!ignoreHeader.booleanValue()) {
				return CSVFormat.DEFAULT.withAllowMissingColumnNames(true).withIgnoreSurroundingSpaces(true)
						.parse(fileReader);
			} else {
				return CSVFormat.DEFAULT.withAllowMissingColumnNames(true).withIgnoreSurroundingSpaces(true)
						.withFirstRecordAsHeader() // skipping the first line as header
						.parse(fileReader);
			}

		}

		catch (Exception e) {
			logger.error("error in parsing CSV file {}", e.getMessage());
			throw new RippsAdminException("error in parsing CSV file" + e.getMessage());
		}
	}

	private static CSVRecord getCSVRecordBySearchKey(String path, String id, int searchIndex, Boolean skipHeader) {
		try {
			Iterable<CSVRecord> records = readCSVFile(path, skipHeader);
			for (CSVRecord csvRecord : records) {
				if (csvRecord.get(searchIndex).equals(id)) {
					return csvRecord;
				}
			}
		}

		catch (Exception e) {

			logger.error("error in getting CSV Record by id: {}", e.getMessage());
		}
		return null;
	}

	private static CSVRecord getCSVRecordByRowId(String path, int rowId, Boolean skipHeader) {
		try {
			Iterable<CSVRecord> records = readCSVFile(path, skipHeader);
			int rowCount = 0;
			for (CSVRecord csvRecord : records) {

				if (rowCount == rowId) {
					return csvRecord;
				}

				rowCount++;
			}
		}

		catch (Exception e) {

			logger.error("error in getting CSV Record by id: {} ", e.getMessage());
		}
		return null;
	}

	public static List<String> convertCSVRecordToList(CSVRecord csvRecord, int beginIndex) {
		List<String> content = new ArrayList<>();

		if (csvRecord != null) {
			for (int i = beginIndex; i < csvRecord.size(); i++) {
				content.add(csvRecord.get(i));
			}

		}
		return content;

	}
}
