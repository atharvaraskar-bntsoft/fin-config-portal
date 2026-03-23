package com.bnt.ruleengine.sample.adp;

import java.util.List;
import java.util.Map;

import com.bnt.adapter.validations.AdapterPostActions;
import com.bnt.adapter.validations.CartPreActions;
import com.bnt.bswitch.query.parser.Condition;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class AdapterReqResMapping {

	private Map<String, Object> mapSourceDestination;

	private List<SourcesDto> sources;

	private Condition responseCondition;

	private String responsePackagerName;

	private List<MappingConstantField> listConstantMappingField;

	private List<MappingConstantImdg> listConstantMappingImdg;

	private List<MappingCopyAsIs> listCopyAsIsMapping;

	private List<MappingExtract> listExtractMapping;

	private List<MappingJoin> listJoinMapping;

	private List<MappingMapper> listMapperMapping;

	private List<MappingScript> listScriptMapping;

	private List<MappingLoop> listLoopMapping;

	private List<AdapterPostActions> listAdapterPostActions;

	private List<CartPreActions> listCartPreActions;

//	public Map<String, String> getMapSourceDestination() {
//		return mapSourceDestination;
//	}

//	public void setMapSourceDestination(Map<String, String> mapSourceDestination) {
//		this.mapSourceDestination = mapSourceDestination;
//	}

	public List<MappingConstantField> getListConstantMappingField() {
		return listConstantMappingField;
	}

	public void setListConstantMappingField(List<MappingConstantField> listConstantMappingField) {
		this.listConstantMappingField = listConstantMappingField;
	}

	public List<MappingConstantImdg> getListConstantMappingImdg() {
		return listConstantMappingImdg;
	}

	public void setListConstantMappingImdg(List<MappingConstantImdg> listConstantMappingImdg) {
		this.listConstantMappingImdg = listConstantMappingImdg;
	}

	public List<MappingCopyAsIs> getListCopyAsIsMapping() {
		return listCopyAsIsMapping;
	}

	public void setListCopyAsIsMapping(List<MappingCopyAsIs> listCopyAsIsMapping) {
		this.listCopyAsIsMapping = listCopyAsIsMapping;
	}

	public List<MappingExtract> getListExtractMapping() {
		return listExtractMapping;
	}

	public void setListExtractMapping(List<MappingExtract> listExtractMapping) {
		this.listExtractMapping = listExtractMapping;
	}

	public List<MappingJoin> getListJoinMapping() {
		return listJoinMapping;
	}

	public void setListJoinMapping(List<MappingJoin> listJoinMapping) {
		this.listJoinMapping = listJoinMapping;
	}

	public List<MappingMapper> getListMapperMapping() {
		return listMapperMapping;
	}

	public void setListMapperMapping(List<MappingMapper> listMapperMapping) {
		this.listMapperMapping = listMapperMapping;
	}

	public List<MappingScript> getListScriptMapping() {
		return listScriptMapping;
	}

	public void setListScriptMapping(List<MappingScript> listScriptMapping) {
		this.listScriptMapping = listScriptMapping;
	}

	public List<MappingLoop> getListLoopMapping() {
		return listLoopMapping;
	}

	public void setListLoopMapping(List<MappingLoop> listLoopMapping) {
		this.listLoopMapping = listLoopMapping;
	}

	public List<AdapterPostActions> getListAdapterPostActions() {
		return listAdapterPostActions;
	}

	public void setListAdapterPostActions(List<AdapterPostActions> listAdapterPostActions) {
		this.listAdapterPostActions = listAdapterPostActions;
	}

	public Condition getResponseCondition() {
		return responseCondition;
	}

	public void setResponseCondition(Condition responseCondition) {
		this.responseCondition = responseCondition;
	}

	public String getResponsePackagerName() {
		return responsePackagerName;
	}

	public void setResponsePackagerName(String responsePackagerName) {
		this.responsePackagerName = responsePackagerName;
	}

	public List<CartPreActions> getListCartPreActions() {
		return listCartPreActions;
	}

	public void setListCartPreActions(List<CartPreActions> listCartPreActions) {
		this.listCartPreActions = listCartPreActions;
	}

	public List<SourcesDto> getSources() {
		return sources;
	}

	public void setSources(List<SourcesDto> sources) {
		this.sources = sources;
	}
}
