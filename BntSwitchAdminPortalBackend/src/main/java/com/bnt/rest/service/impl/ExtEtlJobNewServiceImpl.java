package com.bnt.rest.service.impl;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.bnt.bswitch.transformer.processor.transaction.AdapterTransaction;
import com.bnt.common.ResponseWrapper;
import com.bnt.common.RippsAdminException;
import com.bnt.common.util.JPAUtils;
import com.bnt.common.util.ParamMapUtil;
import com.bnt.common.util.RippsUtility;
import com.bnt.common.util.exception.ExceptionLog;
import com.bnt.rest.dto.ExtEtlJobNewDetailDto;
import com.bnt.rest.dto.ExtEtlJobNewDto;
import com.bnt.rest.dto.ExtEtlJobNewListDto;
import com.bnt.rest.dto.ImfStructureDto;
import com.bnt.rest.entity.ExtEtlJobNew;
import com.bnt.rest.entity.ExtEtlJobNewDetail;
import com.bnt.rest.entity.ImfStructure;
import com.bnt.rest.jpa.repository.DeploymentComponentPeresistenceHelper;
import com.bnt.rest.jpa.repository.DeploymentPersistenceHelper;
import com.bnt.rest.jpa.repository.ExtEtlJobNewDetailPersistenceHelper;
import com.bnt.rest.jpa.repository.ExtEtlJobNewPersistenceHelper;
import com.bnt.rest.service.ExtEtlJobNewService;
import com.bnt.rest.wrapper.dto.ExtEtlJobNewWrapper;
import com.bnt.rest.wrapper.dto.IdVersionAndStatusWrapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Service
public class ExtEtlJobNewServiceImpl implements ExtEtlJobNewService {

	private static Log logger = LogFactory.getLog(ExtEtlJobNewServiceImpl.class);

	@Autowired
	private ExtEtlJobNewPersistenceHelper extEtlJobNewPercistenceHelper;

	public static final String MAPPING_JSON = "mapping.json";

	public static final String PACKAGER_JSON = "packager.json";

	public static final String TRANSFORMER_STRING = "transformer";

	public static final String INPUT_STRING = "input";

	public static final String MAPPER_STRING = "mapper";

	public static final String PACKAGER_STRING = "packager";

	@Autowired
	private ExtEtlJobNewDetailPersistenceHelper detailHelper;

	@Autowired
	private DeploymentComponentPeresistenceHelper deploymentComponentPeresistenceHelper;

	@Autowired
	private DeploymentPersistenceHelper deploymentPersistenceHelper;

	@Autowired
	private EntityManager entityManager;

	@Override
	public ResponseWrapper findAllExtEtlJobNew(Map<String, Object> requestParamMap) {

		Pageable pageable = JPAUtils.getPageableObject(requestParamMap);
		List<ExtEtlJobNewWrapper> list = new ArrayList<>();
		List<Object[]> extEtlJobNewPage = getCustomList(pageable);
		if (null != extEtlJobNewPage) {
			for (Object[] extEtlJobNew : extEtlJobNewPage) {
				ExtEtlJobNewWrapper dto = null;
				try {
					dto = fetchExtEtlJobNewDto(extEtlJobNew);
				} catch (Exception e) {
					ExceptionLog.printStackTraceToString(e);
				}
				list.add(dto);
			}
		}

		ResponseWrapper pageJPAData = JPAUtils.getResponseWrapperByList(requestParamMap, extEtlJobNewPage);
		pageJPAData.setContent(list);
		pageJPAData.setTotalRecords(extEtlJobNewPercistenceHelper.count());
		return pageJPAData;
	}

	private ExtEtlJobNewWrapper fetchExtEtlJobNewDto(Object[] extEtlJobNew) {
		ExtEtlJobNewWrapper dto = new ExtEtlJobNewWrapper();
		BigInteger x = (BigInteger) extEtlJobNew[0];
		dto.setId(x.intValue());
		dto.setJobName(extEtlJobNew[1].toString());
		dto.setJobGroup(extEtlJobNew[2].toString());
		dto.setVersions(fetchVersionList(extEtlJobNew));
		return dto;
	}

	@Override
	public List<ExtEtlJobNewListDto> getExEtlNotInDeployedComponentNew() {
		List<ExtEtlJobNewListDto> extEtlJobNewListDto = new ArrayList<>();
		List<Object[]> result = extEtlJobNewPercistenceHelper.findAllNotinDeployedComponentNew();
		if (result != null && !result.isEmpty()) {
			ExtEtlJobNewListDto extEtlJobDto = null;
			ExtEtlJobNew extEtlJobNew = null;
			for (Object[] data : result) {
				extEtlJobDto = new ExtEtlJobNewListDto();
				extEtlJobNew = new ExtEtlJobNew();
				extEtlJobDto.setId((Integer) data[0]);
				extEtlJobNew.setJobName((String) data[1]);
				extEtlJobNew.setType("EX");
				extEtlJobDto.setVersion((String) data[3]);
				extEtlJobDto.setJobStatus((String) data[4]);
				extEtlJobDto.setCreatedBy((Integer) data[5]);
				extEtlJobDto.setCreatedOn((Timestamp) data[6]);
				extEtlJobDto.setUpdatedBy((Integer) data[7]);
				extEtlJobDto.setUpdatedOn((Timestamp) data[8]);
				extEtlJobDto.setExtEtlJobNew(extEtlJobNew);
				extEtlJobNewListDto.add(extEtlJobDto);
			}
		}
		return extEtlJobNewListDto;
	}

	private List<IdVersionAndStatusWrapper> fetchVersionList(Object[] extEtlJobNew) {
		List<IdVersionAndStatusWrapper> list = new ArrayList<>();
		String x = extEtlJobNew[3].toString();
		String[] versionArray = x.split("\\|");
		for (String each : versionArray) {
			IdVersionAndStatusWrapper idVersionAndStatusWrapper = new IdVersionAndStatusWrapper();
			int version = Integer.parseInt(each.split(":")[2]);
			idVersionAndStatusWrapper.setId(Integer.parseInt(each.split(":")[0]));
			idVersionAndStatusWrapper.setJobStatus(each.split(":")[1]);
			if (idVersionAndStatusWrapper.getJobStatus().equalsIgnoreCase("CREATED")) {
				int VersionDetailId = idVersionAndStatusWrapper.getId();
				String deploymentId = deploymentComponentPeresistenceHelper
						.findDeployedIdByComponentTypeAndComponentId(VersionDetailId);
				if (deploymentId == null) {
					idVersionAndStatusWrapper.setDeployed(false);
				} else {

					String deploymentStatus = deploymentPersistenceHelper
							.findStatusById(Integer.parseInt(deploymentId));
					if (deploymentStatus.equalsIgnoreCase("DEPLOYED")) {
						idVersionAndStatusWrapper.setDeployed(true);
					} else {
						idVersionAndStatusWrapper.setDeployed(false);
					}

				}
			}
			idVersionAndStatusWrapper.setVersion(version);
			list.add(idVersionAndStatusWrapper);
		}
		return list;
	}

	public List<Object[]> getCustomList(Pageable pageable) {
		String queryString = "SELECT ext_etl_job.id id, ext_etl_job.job_name jobName, ext_etl_job.job_group jobGroup,\r\n"
				+ "GROUP_CONCAT(ext_etl_job_detail.id, ':', ext_etl_job_detail.job_status, ':', ext_etl_job_detail.version ORDER BY ext_etl_job_detail.created_on DESC\r\n"
				+ "SEPARATOR '|') AS versions\r\n" + "FROM ext_etl_job\r\n"
				+ "JOIN ext_etl_job_detail ON ext_etl_job.id = ext_etl_job_detail.ext_etl_job_id\r\n"
				+ "GROUP BY ext_etl_job.id Order BY ext_etl_job.created_on DESC";

		Query query = entityManager.createNativeQuery(queryString);
		int pageNumber = pageable.getPageNumber();
		int pageSize = pageable.getPageSize();
		query.setFirstResult((pageNumber) * pageSize);
		query.setMaxResults(pageSize);
		List<Object[]> resultList = new ArrayList<>();
		try {
			resultList = query.getResultList();
		} catch (Exception e) {
			ExceptionLog.printStackTraceToString(e);
		}
		return resultList;
	}

	@Override
	@Transactional
	public void saveEtlJob(ExtEtlJobNewDto extEtlJobDto) {
		ExtEtlJobNew etlJob = new ExtEtlJobNew();
		ExtEtlJobNewDetail detail = new ExtEtlJobNewDetail();
		setValueEntity(etlJob, extEtlJobDto);
		setValueDetail(detail, extEtlJobDto.getDetails());
		if (extEtlJobDto.getSaveDarft().equalsIgnoreCase("1")) {
			detail.setVersion("0");
			String mapping = extEtlJobDto.getJobName() + "_" + "v0" + "_" + MAPPING_JSON;
			String packager = extEtlJobDto.getJobName() + "_" + "v0" + "_" + PACKAGER_JSON;
			String json = extEtlJobDto.getDetails().getEtlJson().replace("mapper.json", mapping);
			json = json.replace(PACKAGER_JSON, packager);
			detail.setEtlJson(json);
		} else {
			detail.setVersion("1");
			String mapping = extEtlJobDto.getJobName() + "_" + "v1" + "_" + MAPPING_JSON;
			String packager = extEtlJobDto.getJobName() + "_" + "v1" + "_" + PACKAGER_JSON;
			String json = extEtlJobDto.getDetails().getEtlJson().replace("mapper.json", mapping);
			json = json.replace(PACKAGER_JSON, packager);
			detail.setEtlJson(json);
		}
		detail.setExtEtlJobId(etlJob);
		Set<ExtEtlJobNewDetail> set = new HashSet<>();
		set.add(detail);
		etlJob.setDetails(set);

		try {
			extEtlJobNewPercistenceHelper.save(etlJob);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new RippsAdminException("Error in saving");
		}
	}

	private void setValueEntity(ExtEtlJobNew entity, ExtEtlJobNewDto dto) {
		entity.setJobName(dto.getJobName());
		entity.setJobGroup(dto.getJobGroup());
		entity.setDescription(dto.getJobDesc());
		entity.setActive(RippsUtility.convertBooleanToActive(dto.getActive()));
		entity.setType(dto.getType());
		entity.setCreatedBy(1);
		entity.setCreatedOn(RippsUtility.getCurrentTime());
		entity.setUpdatedBy(1);
		entity.setUpdatedOn(RippsUtility.getCurrentTime());
	}

	private void setValueDetail(ExtEtlJobNewDetail detail, ExtEtlJobNewDetailDto detailDto) {
		detail.setBatchMode(detailDto.getBatchMode());
		detail.setBatchSize(detailDto.getBatchSize());
		detail.setCornExp(detailDto.getCronExp());
		detail.setCreatedBy(1);
		detail.setCreatedOn(RippsUtility.getCurrentTime());
		detail.setCronJob(detailDto.getCronExp() != null ? "Y" : "N");
		detail.setEtlJson(detailDto.getEtlJson());
		ImfStructure imf = new ImfStructure();
		imf.setId(detailDto.getImfId().getId());
		detail.setImfId(imf);
		detail.setJobClass(detailDto.getJobClass());
		detail.setJobStatus("CREATED"); // CREATED
		detail.setPackager(detailDto.getPackager());
		detail.setRepeatTime(detailDto.getRepeatTime());
		detail.setRequestMapping(createRequestMapping(detailDto.getMapping())); // at last
		detail.setUiMapping(detailDto.getMapping());
		detail.setUpdatedBy(1);
		detail.setUpdatedOn(RippsUtility.getCurrentTime());
	}

	private String createRequestMapping(String mapping) {
		if (mapping != null && !mapping.isEmpty()) {
			AdapterTransaction adapterTransaction = ParamMapUtil.getRequestMappingFromUiMapping(mapping);
			if (adapterTransaction != null) {
				ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
				String json = null;
				try {
					json = ow.writeValueAsString(adapterTransaction);
				} catch (JsonProcessingException e) {
					logger.error(e);
				}
				return json;
			} else {
				return null;
			}
		}
		return null;
	}

	@Override
	public ExtEtlJobNewDto findExtEtlJobById(int id) {

		try {
			ExtEtlJobNewDto extEtlJobNewDto = new ExtEtlJobNewDto();
			ExtEtlJobNewDetail extEtlJobNewDetail = detailHelper.findById(id)
					.orElseThrow(() -> new RippsAdminException("Job not found"));
			ExtEtlJobNew extEtlJobNew = extEtlJobNewPercistenceHelper
					.findById(extEtlJobNewDetail.getExtEtlJobId().getId())
					.orElseThrow(() -> new RippsAdminException("Job not found"));
			extEtlJobNewDto.setActive(RippsUtility.convertActiveToBoolean(extEtlJobNew.getActive()));
			extEtlJobNewDto.setJobDesc(extEtlJobNew.getDescription());
			extEtlJobNewDto.setJobGroup(extEtlJobNew.getJobGroup());
			extEtlJobNewDto.setJobName(extEtlJobNew.getJobName());
			extEtlJobNewDto.setType(extEtlJobNew.getType());
			extEtlJobNewDto.setId(extEtlJobNewDetail.getExtEtlJobId().getId());
			ExtEtlJobNewDetailDto extEtlJobNewDetailDto = new ExtEtlJobNewDetailDto();
			extEtlJobNewDetailDto.setBatchMode(extEtlJobNewDetail.getBatchMode());
			extEtlJobNewDetailDto.setBatchSize(extEtlJobNewDetail.getBatchSize());
			extEtlJobNewDetailDto.setCronExp(extEtlJobNewDetail.getCornExp());
			extEtlJobNewDetailDto.setEtlJson(extEtlJobNewDetail.getEtlJson());
			ImfStructureDto imfStructureDto = new ImfStructureDto();
			imfStructureDto.setId(extEtlJobNewDetail.getImfId().getId());
			imfStructureDto.setName(extEtlJobNewDetail.getImfId().getName());
			imfStructureDto.setVersion(extEtlJobNewDetail.getImfId().getVersion());
			extEtlJobNewDetailDto.setImfId(imfStructureDto);
			extEtlJobNewDetailDto.setJobClass(extEtlJobNewDetail.getJobClass());
			extEtlJobNewDetailDto.setMapping(extEtlJobNewDetail.getUiMapping());
			extEtlJobNewDetailDto.setPackager(extEtlJobNewDetail.getPackager());
			extEtlJobNewDetailDto.setRepeatTime(extEtlJobNewDetail.getRepeatTime());
			extEtlJobNewDto.setDetails(extEtlJobNewDetailDto);
			return extEtlJobNewDto;
		} catch (Exception e) {
			logger.error(e);
		}
		return null;
	}

	@Override
	public Integer updateJob(ExtEtlJobNewDto extEtlJobDto, int id, String requestToken) {
		try {
			Optional<ExtEtlJobNewDetail> optional = detailHelper.findById(id);

			if (optional.isPresent()) {
				ExtEtlJobNewDetail detail = optional.get();
				setValueDetail(detail, extEtlJobDto.getDetails());

				if (detail.getVersion().equalsIgnoreCase("0")) {
					if (extEtlJobDto.getSaveDarft().equalsIgnoreCase("1")) {
						String mapping = detail.getExtEtlJobId().getJobName() + "_" + "v0" + "_" + MAPPING_JSON;
						String packager = detail.getExtEtlJobId().getJobName() + "_" + "v0" + "_" + PACKAGER_JSON;
						String jsonString = extEtlJobDto.getDetails().getEtlJson();
						JSONObject jsonObject = new JSONObject(jsonString);
						JSONObject transformer = jsonObject.getJSONObject(TRANSFORMER_STRING);
						JSONObject input = transformer.getJSONObject(INPUT_STRING);
						String mapper = input.getString(MAPPER_STRING);
						String packag = input.getString(PACKAGER_STRING);
						String json = extEtlJobDto.getDetails().getEtlJson().replace(mapper, mapping);
						json = json.replace(packag, packager);
						detail.setEtlJson(json);
						detailHelper.save(detail);
					} else {
						Integer max = detailHelper.findMax(detail.getExtEtlJobId().getId());
						detail.setVersion(String.valueOf(max));
						String jsonString = extEtlJobDto.getDetails().getEtlJson();
						JSONObject jsonObject = new JSONObject(jsonString);
						JSONObject transformer = jsonObject.getJSONObject(TRANSFORMER_STRING);
						JSONObject input = transformer.getJSONObject(INPUT_STRING);
						String mapper = input.getString(MAPPER_STRING);
						String packag = input.getString(PACKAGER_STRING);
						String mapping = detail.getExtEtlJobId().getJobName() + "_" + "v" + String.valueOf(max) + "_"
								+ MAPPING_JSON;
						String packager = detail.getExtEtlJobId().getJobName() + "_" + "v" + String.valueOf(max) + "_"
								+ PACKAGER_JSON;
						String json = extEtlJobDto.getDetails().getEtlJson().replace(mapper, mapping);
						json = json.replace(packag, packager);
						detail.setEtlJson(json);
						detailHelper.save(detail);
					}

				} else {
					if (extEtlJobDto.getSaveDarft().equalsIgnoreCase("1")) {
						ExtEtlJobNewDetail updatedExtEtlJobNewDetail = createExtEtlJobNewDetailObj(detail);
						updatedExtEtlJobNewDetail.setVersion("0");
						String jsonString = extEtlJobDto.getDetails().getEtlJson();
						JSONObject jsonObject = new JSONObject(jsonString);
						JSONObject transformer = jsonObject.getJSONObject(TRANSFORMER_STRING);
						JSONObject input = transformer.getJSONObject(INPUT_STRING);
						String mapper = input.getString(MAPPER_STRING);
						String packag = input.getString(PACKAGER_STRING);
						String mapping = detail.getExtEtlJobId().getJobName() + "_" + "v0" + "_" + MAPPING_JSON;
						String packager = detail.getExtEtlJobId().getJobName() + "_" + "v0" + "_" + PACKAGER_JSON;
						String json = extEtlJobDto.getDetails().getEtlJson().replace(mapper, mapping);
						json = json.replace(packag, packager);
						updatedExtEtlJobNewDetail.setEtlJson(json);
						detailHelper.save(updatedExtEtlJobNewDetail);
					} else {
						ExtEtlJobNewDetail updatedExtEtlJobNewDetail = createExtEtlJobNewDetailObj(detail);
						Integer max = detailHelper.findMax(detail.getExtEtlJobId().getId());
						updatedExtEtlJobNewDetail.setVersion(String.valueOf(max));
						String jsonString = extEtlJobDto.getDetails().getEtlJson();
						JSONObject jsonObject = new JSONObject(jsonString);
						JSONObject transformer = jsonObject.getJSONObject(TRANSFORMER_STRING);
						JSONObject input = transformer.getJSONObject(INPUT_STRING);
						String mapper = input.getString(MAPPER_STRING);
						String packag = input.getString(PACKAGER_STRING);
						String mapping = detail.getExtEtlJobId().getJobName() + "_" + "v" + String.valueOf(max) + "_"
								+ MAPPING_JSON;
						String packager = detail.getExtEtlJobId().getJobName() + "_" + "v" + String.valueOf(max) + "_"
								+ PACKAGER_JSON;
						String json = extEtlJobDto.getDetails().getEtlJson().replace(mapper, mapping);
						json = json.replace(packag, packager);
						updatedExtEtlJobNewDetail.setEtlJson(json);
						detailHelper.save(updatedExtEtlJobNewDetail);
					}
				}

			}

		} catch (Exception e) {
			logger.error(e);
		}
		return null;
	}

	private ExtEtlJobNewDetail createExtEtlJobNewDetailObj(ExtEtlJobNewDetail detail) {
		ExtEtlJobNewDetail updatedExtEtlJobNewDetail = new ExtEtlJobNewDetail();
		updatedExtEtlJobNewDetail.setBatchMode(detail.getBatchMode());
		updatedExtEtlJobNewDetail.setBatchSize(detail.getBatchSize());
		updatedExtEtlJobNewDetail.setCornExp(detail.getCornExp());
		updatedExtEtlJobNewDetail.setCreatedBy(detail.getCreatedBy());
		updatedExtEtlJobNewDetail.setCreatedOn(detail.getCreatedOn());
		updatedExtEtlJobNewDetail.setCronJob(detail.getCronJob());
		updatedExtEtlJobNewDetail.setEtlJson(detail.getEtlJson());
		updatedExtEtlJobNewDetail.setExtEtlJobId(detail.getExtEtlJobId());
		updatedExtEtlJobNewDetail.setImfId(detail.getImfId());
		updatedExtEtlJobNewDetail.setJobClass(detail.getJobClass());
		updatedExtEtlJobNewDetail.setJobStatus(detail.getJobStatus());
		updatedExtEtlJobNewDetail.setPackager(detail.getPackager());
		updatedExtEtlJobNewDetail.setRepeatTime(detail.getRepeatTime());
		updatedExtEtlJobNewDetail.setRequestMapping(detail.getRequestMapping());
		updatedExtEtlJobNewDetail.setUiMapping(detail.getUiMapping());
		updatedExtEtlJobNewDetail.setUpdatedBy(detail.getUpdatedBy());
		updatedExtEtlJobNewDetail.setUpdatedOn(detail.getUpdatedOn());
		return updatedExtEtlJobNewDetail;
	}
}
