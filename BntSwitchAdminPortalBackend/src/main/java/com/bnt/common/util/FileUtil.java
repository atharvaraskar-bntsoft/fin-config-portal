package com.bnt.common.util;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.bnt.common.RippsAdminException;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class FileUtil {

	private FileUtil() {
	}

	private static final Logger logger = LogManager.getLogger(FileUtil.class);

	public static FileReader getFileReaderFromResource(String filePath) throws IOException {
		Resource resource = new ClassPathResource(cleanString(FilenameUtils.normalize(filePath)));
		return new FileReader(resource.getFile());
	}

	public static File writeFileInResource(String abosolutePath) {
		File file;
		try {
			ClassLoader classLoader = FileUtil.class.getClassLoader();
			file = new File(classLoader.getResource(".").getFile() + abosolutePath);
			if (file.createNewFile()) {
				logger.info("File is created!");
			} else {
				logger.info("File already exists.");
			}

		} catch (Exception e) {
			logger.error("File not created: {}", abosolutePath);
			throw new RippsAdminException("file not created : " + abosolutePath);
		}
		return file;
	}

	public static String getAbsolutePath(String dirPath, String fileName) {
		return dirPath + File.separator + fileName;
	}

	public static boolean validateFileExtension(String fileName, String inputfileExtension) {
		logger.info("inside validateFileExtension {}", fileName);
		List<String> allowedFileList = Arrays.asList(inputfileExtension.toUpperCase().split(","));
		boolean allowedFlag = false;
		if (fileName != null) {
			fileName = fileName.trim();
			if (!fileName.contains(".")) {
				fileName = fileName + ".";
			}
			String fileExtension = fileName.substring(fileName.lastIndexOf("."), fileName.length());
			if (fileExtension.isBlank() || fileExtension.isEmpty()) {
				// Do Nothing
			} else if (fileExtension.length() == fileName.length()) {
				// Do Nothing
			} else {
				fileExtension = fileExtension.toUpperCase();
				if (allowedFileList.contains(fileExtension)) {
					allowedFlag = true;
				}
			}
		}
		if (!allowedFlag) {
			throw new RippsAdminException("Invalid file format : Please upload file with extension "
					+ inputfileExtension.replace(",", " or "));
		}
		return allowedFlag;
	}

	public static File getFileFromClassPathResource(String filePath) throws IOException {
		Resource resource = new ClassPathResource(filePath);
		return resource.getFile();
	}

	public static File getFileFromPath(String filePath, boolean createParentFolder) throws IOException {
		File file = null;
		file = new File(filePath);
		if (!file.exists()) {
			if (!(file.getParentFile().exists()) && createParentFolder) {
				file.getParentFile().mkdir();
				file.getAbsolutePath();
			}
			if (Boolean.TRUE.equals(file.createNewFile())) {
				logger.info("file created at path:{}", file.getAbsolutePath());
			}
		}
		return file;
	}

	public static boolean validateFileName(String fileName) {
		boolean isValidFileName = true;
		long count = fileName.chars().filter(ch -> ch == '.').count();
		if (count >= 2) {
			isValidFileName = false;
		}
		return isValidFileName;
	}

	public static String cleanString(String aString) {
		if (aString == null)
			return null;
		String cleanString = "";
		for (int i = 0; i < aString.length(); ++i) {
			cleanString += cleanChar(aString.charAt(i));
		}
		return cleanString;
	}

	private static char cleanChar(char aChar) {

		// 0 - 9
		for (int i = 48; i < 58; ++i) {
			if (aChar == i)
				return (char) i;
		}

		// 'A' - 'Z'
		for (int i = 65; i < 91; ++i) {
			if (aChar == i)
				return (char) i;
		}

		// 'a' - 'z'
		for (int i = 97; i < 123; ++i) {
			if (aChar == i)
				return (char) i;
		}

		// other valid characters
		switch (aChar) {
		case '/':
			return '/';
		case '\\':
			return '\\';
		case '.':
			return '.';
		case '-':
			return '-';
		case '_':
			return '_';
		case ' ':
			return ' ';
		}
		return '%';
	}
}
