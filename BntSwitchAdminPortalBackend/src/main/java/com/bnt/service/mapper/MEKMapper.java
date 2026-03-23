package com.bnt.service.mapper;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jpos.iso.ISOUtil;

import com.opencsv.CSVWriter;
import com.bnt.bswitch.encryption.KeysGeneration;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.FileUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.StringUtil;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.EncryptionKeysDto;
import com.bnt.rest.dto.SystemUserDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class MEKMapper {

	private static Log logger = LogFactory.getLog(MEKMapper.class.getName());

	private MEKMapper() {
	}

	private static String[] custodian = new String[2];
	private static final String DATE_FORMAT = "yyyy-MM-dd hh:mm:ss";
	private static String mekFIlePath = "";

	public static boolean addCustodianDetail(String inputData, SystemUserDto user) {
		logger.info("inside addCustodianDetail");
		String timeStampString = RippsUtility.getCurrentDate(DATE_FORMAT);
		String userDetail = user.getUserId();
		String data = inputData + "~" + userDetail + "~" + timeStampString;
		if (!validateCustodianEntries(user)) {
			return false;
		}
		if (StringUtil.isNotNullOrBlank(custodian[0])) {
			custodian[1] = data;
		} else {
			custodian[0] = data;
		}
		logger.info("addCustodianDetail completed");
		return true;
	}

	public static boolean resetCustodianDetail() {
		logger.info("inside resetCustodianDetail");
		custodian[0] = null;
		custodian[1] = null;
		logger.info("resetCustodianDetail completed");
		return true;
	}

	public static String[] getCustodianDetail() {
		return custodian;
	}

	public static boolean validateText(String str, String regex) {
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}

	public static boolean validateInputText(String str) {
		String regex = "^([0-9A-F]){32,32}$";
		String regex2 = "^([0-9a-f]){32,32}$";
		if (str == null) {
			return false;
		}
		if (validateText(str, regex)) {
			return true;
		} else {
			if (validateText(str, regex2)) {
				return true;
			} else {
				throw new RippsAdminException("Enter Valid Key");
			}
		}
	}

	public static boolean validateCustodianEntries(SystemUserDto user) {
		logger.info("validate validateCustodianEntries");
		String userDetail = "~" + user.getUserId() + "~";
		if ((custodian[0] != null && custodian[0].contains(userDetail))
				|| (custodian[1] != null && custodian[1].contains(userDetail))) {
			logger.info("Already have user detail");
			return false;
		}
		logger.info("validateCustodianEntries completed");
		return true;
	}

	public static boolean validateOtherCustodianEntry(SystemUserDto user) {
		logger.info("validate validateCustodianEntries");
		String userDetail = "~" + user.getUserId() + "~";
		if ((custodian[0] != null && !custodian[0].contains(userDetail))
				|| (custodian[1] != null && !custodian[1].contains(userDetail))) {
			return true;
		}
		logger.info("validateCustodianEntries completed");
		return false;
	}

	private static Integer getId(File file) {
		String lastValidLine = null;
		Integer id = 0;
		try (BufferedReader br = new BufferedReader(new FileReader(file))) {
			String line;
			while ((line = br.readLine()) != null) {
				if (line.contains(",")) {
					lastValidLine = line;
				}
				logger.info(line);
			}
		} catch (IOException ex) {
			logger.error(ExceptionLog.printStackTraceToString(ex));
		}
		if (lastValidLine != null) {
			String[] fileData = lastValidLine.split(",");
			if ("id".equalsIgnoreCase(fileData[0])) {
				id = 0;
			} else {
				id = Integer.parseInt(fileData[0]);
			}
			logger.info("recieved id:" + id);
		}
		id = id + 1;
		logger.info("returned id:" + id);
		return id;
	}

	public static String generateDEK(String encMEK, String kekKey) {
		String clearDEK = generateRandomHEX(32);
		String clearMEK = KeysGeneration.decryptData(kekKey, encMEK);
		return KeysGeneration.encryptData(clearMEK, clearDEK);
	}

	private static String generateRandomHEX(int keyLength) {
		String hexString = "";
		int leftLimit = 48;
		int rightLimit = 102;
		Random random = null;
		try {
			random = SecureRandom.getInstanceStrong();
			hexString = random.ints(leftLimit, rightLimit + 1).filter(i -> (i <= 57 || i >= 65) && (i <= 70))
					.limit(keyLength).collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
					.toString();
		} catch (NoSuchAlgorithmException e) {
			logger.error(e);
		}
		return hexString.toUpperCase();
	}

	public static String generateClearMek(String kekKey) {
		logger.info("inside generateClearMek()..for kekKey {}" + kekKey);
		String input1 = custodian[0].split("~")[0];
		String input2 = custodian[1].split("~")[0];
		return ISOUtil.hexor(input1, input2);
	}

	public static String generateMEK(String kekKey) {
		logger.info("inside generateMEK");
		String clearMEK = generateClearMek(kekKey);
		return KeysGeneration.encryptData(kekKey, clearMEK);
	}

	public static EncryptionKeysDto generateKey(String kekKey, String path) {
		EncryptionKeysDto dto1 = null;
		try {
			dto1 = new EncryptionKeysDto();
			File file = getMEKFile(path);
			int id = getId(file);
			String encMEK = generateMEK(kekKey);
			String encDEK = generateDEK(encMEK, kekKey);
			boolean writeFileStatus = writeFile(file, id, encMEK, custodian[0].split("~")[1],
					custodian[0].split("~")[2], custodian[1].split("~")[1], custodian[1].split("~")[2]);
			if (!writeFileStatus) {
				throw new RippsAdminException("File write process failed");
			}
			dto1.setDek(encDEK);
			dto1.setMekId(id);
			return dto1;
		} catch (RippsAdminException ripEx) {
			logger.error(ExceptionLog.printStackTraceToString(ripEx));
			throw new RippsAdminException(ripEx.getMessage());
		} catch (Exception e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
			throw new RippsAdminException("System-error: Contact admin");
		}
	}

	public static File getMEKFile(String filepath) {
		File file = null;
		String path = "";
		if ("".equalsIgnoreCase(mekFIlePath)) {
			path = filepath;
			try {
				file = FileUtil.getFileFromClassPathResource(path);
				mekFIlePath = file.getCanonicalPath();
			} catch (FileNotFoundException e) {
				logger.info("Now going for specifc path:" + path);
				try {
					file = FileUtil.getFileFromPath(path, true);
					mekFIlePath = file.getCanonicalPath();
				} catch (IOException ex) {
					throw new RippsAdminException(ex.getMessage());
				}
			} catch (IOException e) {
				throw new RippsAdminException(e.getMessage());
			}
		} else {
			try {
				file = FileUtil.getFileFromPath(mekFIlePath, true);
			} catch (IOException ex) {
				throw new RippsAdminException(ex.getMessage());
			}
		}
		logger.info("mek-file-path" + mekFIlePath);
		return file;
	}

	public static boolean writeFile(File file, Integer id, String encMEK, String userFirst, String firstTimeStamp,
			String userSecond, String secondTimeStamp) {

		try (FileWriter outputfile = new FileWriter(file, true); CSVWriter writer = new CSVWriter(outputfile)) {
			String[] data = new String[] { String.valueOf(id), encMEK, userFirst, firstTimeStamp, userSecond,
					secondTimeStamp };
			writer.writeNext(data, false);
			return true;
		} catch (IOException e) {
			logger.error(ExceptionLog.printStackTraceToString(e));
		}
		return false;
	}
}
