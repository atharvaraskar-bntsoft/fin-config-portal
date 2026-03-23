import { environment } from '../../../../environments/environment';

/** base path or host name */
export const basePath = {
  domain: environment['serviceCoreUrl'],
};

export const ScheduleRouterUrl = {
  getRouter: '/schedules',
  getRoutingList: '/routing-name-routetypevalue-list',
  getRoutingService: '/routing-service-value',
  getRoutingVersionList: '/routing-version-list',
};


export const getFiltersData = {
  getRouter: '/smart-filter/dropdown',
};

export const DeployedRouter = {
  getRouter: '/deployed-router',
};

export const PedIdUrls = {
  getPedId: '/template/products',
};

export const DekUrls = {
  getDek: '/mek',
  postDek: '/mek/generate',
};

export const AccessLogUrls = {
  getLogs: '/logs-access',
};

export const imfJsonUrl = {
  imfJson: '/imf-structure',
  imfJsonDraft: '/imf-structure/draft',
  imfJsonVersion: '/imf-structure/version-it',
  // tslint:disable-next-line: object-literal-sort-keys
  getIMFVersion: '/get-imf-version-list',
  userViewJson: '/imf-structure/runtime',
  downloadImf: '/adapterconfig/download-imf',
  imfJsonUpload: '/adapterconfig/upload-imf',
};

export const DestinationRulesUrls = {
  conFrimRule: '/rule-new/confirm-rule',
  getConditions: '/conditions',
  getDestination: '/destinations',
  getDestinationRules: '/rule-new',
  getRuleType: '/rule-message-types?conditionID=messageType',
  updRule: '/rule-new',
};

export const AuditLogUrls = {
  getLogs: '/logs-audit',
};
export const InvalidLogUrls = {
  getInvalidLogs: '/invalid-logs-transactions',
  safList: '/safing/saf-queue-list',
  exceptionList: '/safing/exception-queue-list',
  moveToSaf: '/safing/exception-to-saf',
  deleteSaf: '/safing/delete',
  safQueueList: '/safing/saf-status-filter-list',
  safProcessorList: '/safing/saf-processor-filter-list',
  deleteMultiple: '/safing/deleteSaf',
};

export const TransactionLogUrls = {
  getLogs: '/logs-transactions',
  getSourceAcquirer: '/logs-transactions/source-acquirer',
  getSourceDevice: '/logs-transactions/device',
  getSourceMerchant: '/logs-transactions/location',
  getSourceDestinationEndpointName: '/logs-transactions/destination-endpoint',
};

export const masterConfigurationUrls = {
  getMasterAll: '/master-configuration',
  updateMasterConfig: '/master-configuration',
};

export const DeviceUrls = {
  deleteDevice: '/device',
  getDevice: '/device',
  getDeviceDetail: '/device',
  getDeviceTypes: '/device-types-list',
  getInstitutionGroupList: '/institution-list',
  getInstitutionList: '/merchant-list',
  getLocationList: '/location-list',
  getTreeDeepDevice: '/institutions-tree-list?enclosure_level=3',
  postDevice: '/device',
  deviceModelUrl: '/device-model/get-device-type-device-model-map',
};

export const SecureCleanUpUrls = {
  deleteSecureCleanUp: '/logs-transactions/merchant',
  getInfo: '/logs-transactions/count',
};

export const InternalProcessingcodeUrls = {
  getInternalProcessingCode: '/internal-processing-code',
  postInternalProcessingCode: '/internal-processing-code',
};

export const HsmKeysLogUrl = {
  domain: environment['serviceCoreUrl'],
  getHsmKeys: '/hsm-key',
  getInstitutionGroupList: '/institution-list',
  getInstitutionList: '/merchant-list',
  getLocationList: '/location-list',
  getTreeDeepDevice: '/institutions-tree-list?enclosure_level=3',
  postHsmKeys: '/hsm-key',
};

export const InstitutionGroupUrls = {
  getInstitutionGroupDetails: '/merchant-institution',
  getInstitutionGroupList: '/institutions-list',
  getInstitutionGroups: '/merchant-institution',
  validate: '/institution/validate',
};

export const AcquirersUrls = {
  getAcquirer: '/merchant-acquirer',
  getAcquirerRowData: '/merchant-acquirer',
  getInstitutionAcquirerProcessorList: '/add',
  postAcquirer: '/merchant-acquirer',
  putAcquirer: '/merchant-acquirer',
};

export const UsersUrls = {
  getFunctionsList: '/functions-list',
  roleHiddenLink: '/roles/adminportal-role-viewonly-links',
  getRoles: '/role-list',
  getUserRoles: '/roles',
  getUsers: '/users',
  getAdminRoleCheck: '/users/check',
};

export const VelocityLimitsUrls = {
  getLimits: '/velocity-limits',
};

export const VelocityLimitsDeleteUrls = {
  deleteLimits: '/velocity-limits',
};

export const VelocityLimitsEditUrls = {
  createLimits: '/velocity-limits',
  getCurrency: '/codeandiso-currency-list',
  getCurrencyNew: '/currency-list',
  getInstitutionTreeList: '/institutions-tree-list',
  getTransactionTypeList: '/transaction-type-list',
  updateLimits: '/velocity-limits',
};

export const CountriesUrls = {
  getCountries: '/countries',
  getCountryList: '/country-list',
  getStateListbyCountry: '/country-states-list',
};

export const CountrZoneSchemeUrls = {
  CountryZoneScheme: '/country-zone-scheme',
  getSchemeNameList: '/scheme-name-list',
  getZoneList: '/zone-list',
};

export const CountryStateUrls = {
  countryStates: '/states',
};

export const CurrenciesUrls = {
  cuurencies: '/currencies',
};

export const MultihopServicesUrls = {
  multihopServices: '/services',
};

export const ProcessorAdapterUrls = {
  get13List: '/get-l3-list-for-processor-adapter',
  getServiceList: '/lookup-value-list/SERVICE_TYPE',
  multihopServices: '/processor-adapter',
};

export const InstitutionZoneUrls = {
  InstitutionZone: '/merchant-zone',
  getInstitutionGroupList: '/institution-list',
  getInstitutionList: '/merchant-list',
};

export const LocationUrls = {
  getLocation: '/location',
};

export const InstitutionUrls = {
  getCategoryCode: '/merchant/category-codes',
  getCountryList: '/country-list',
  getCurrency: '/currency-list',
  getInstitution: '/merchant',
  getInstitutionAdditionalServiceList: '/merchant-additional-service-list',
  getInstitutionDetail: '/merchant',
  getInstitutionGroupList: '/institution-list',
  getInstitutionList: '/institutions-tree-list',
  getInstitutionRowData: '/merchant/id',
  getInstitutionService: '/merchant-service-list',
  getStateList: '/country-states-list',
};

export const AuthURL = {
  login: '/login',
  metaInfo: '/meta-info',
  permissions: '/permissions',
};

export const DashboardUrls = {
  getDashboard: '/dashboard',
};

export const MonitoringUrls = {
  getMonitoringScreen: '/monitoring-screen',
  monitoringOperation: '/monitoring-screen/monitoring-screen-detail',
};

export const DeviceCodeMappingUrls = {
  getDeviceCodeList: '/device-list',
  getDeviceCodeMapping: '/device-mapping',
  getProcessorName: '/destinations',
};

export const AcquirerIdConfigUrls = {
  getAcquirerIdConfig: '/acquirer-mapping',
  GetAcquirerIdFlag: '/acquirer-mapping/get-condition-flag',
};

export const AddRoleUrls = {
  getRoleList: '/list-role',
};

export const ErrorCodeMappingUrls = {
  deleteErrorCodeMapping: '/error-mapping',
  getErrorCodeMapping: '/error-mapping',
};
export const CuttOffMappingUrls = {
  getCuttOffMapping: '/cutoff-mapping',
  getCuttOffMappingbyid: '/acquirer-id-config-list',
};
export const activationUrls = {
  verifyActivation: '/confirm-token',
};
export const binDataUrls = {
  getBinData: '/bin-data',
  getBinDatabyid: '',
};
export const eLFunctionUrls = {
  getByIdELFunctionUrl: '/el-function',
  getELFunctionUrl: '/el-function',
  getExeTypeUrl: '/el-expression/exp-type-list',
  getFeatureUrl: '/el-expression/feature-type-list',
  getHintUrl: '/el-function/documentation',
  getParaCountUrl: '/el-expression/param-type-list',
  postELFunctionUrl: '/el-function',
  putELFunctionUrl: '',
  validateELFunctionUrl: '/el-function/validate',
};
export const switchClustersUrls = {
  getByIdSwitchClustersUrl: '/switch-controller',
  getSwitchClustersUrl: '/switch-controller',
  postSwitchClustersUrl: '/switch-controller',
  putSwitchClustersUrl: '/switch-controller',
};

export const deploymentWorkflowUrls = {
  getByIdDeploymentWorkflowUrl: '/deployment-workflow',
  getDeploymentWorkflowUrl: '/deployment-workflow',
  downloadL2Workflow: '/adapterconfig/download-l2-files' ,
  uploadWorkflow: '/adapterconfig/upload-workflow'
  
};

export const historyUrls = {
  getByIdHistoryUrl: '/deployment',
  getHistoryUrl: '/history',
};

export const deploymentStatusUrls = {
  getDeploymentStatusUrl: '/deployment/status',
};

export const magicUrls = {
  getMagic: '/magic-number',
  getMagicAccountList: '/magic-number/account-list',
  getMagicbyid: '',
  getTerminalId: '/deviceCodeList',
};
export const ruleTagUrls = {
  getConditions: '/inputfields/rulecondition',
  getOperatorTypeList: '/getOperatorTypeList',
  getImfMessageList: '/getMessageContextFieldList',
  getRuleTagList: '/tag-rule-list',
  updateRuleTag: '/rule-new',
  getRuleTags: '/rule-new',
};
export const tagUrls = {
  createTag: '/tags/create',
  editTags: '/tags/',
  getTags: '/tags/all-pagable-list',
  updateTag: '/tags/update/',
};
export const NetworkResponseUrls = {
  getLogs: '/networkresponse',
};

export const WorkflowIdentificationRuleUrls = {
  getLogs: '/workflow-rule',
};

export const DeviceTypesUrls = {
  getLogs: '/device-types',
};
export const transactionTypeUrls = {
  getTransactionType: '/txn-type',
};

export const MerchantCodeMappingUrls = {
  getMerchantCodeMapping: '/merchant-mapping',
  getMerchantConfigUrl: '/merchant-mapping/configure-options',
};

export const LookUpConfigurationUrls = {
  lookUpType: '/lookup-type',
  lookUpTypeUrl: '/lookup-type-value-map',
  lookUpValue: '/lookup-value',
};

export const TxnKeyLableUrls = {
  TxnKeyLableTypeGet: '/txn-label',
  TxnKeyLableTypeGetById: '/txn-label',
  TxnKeyLableTypeDelete: '/txn-label',
  TxnKeyLableTypePost: '/txn-label',
  TxnKeyLableTypeUpdate: '/txn-label',
};

export const ApprovalsUrls = {
  getChecker: '/checker',
  putChecker: '/checker/approve',
  getCheckerCount: '/checker/count',
};

export const NotificationsUrls = {
  getAlerts: '/alerts',
  getNotification: '/checker/notification',
};

export const ReportsUrls = {
  generateCsvReport: '/report/generateCsvReport',
  generatePdfReport: '/report/generatePdfReport',
  getReportTransactionData: '/report/getTransactionData',
  getReportsEntity: '/report/chainData',
};

export const BinTableUrls = {
  getBinTable: '/bin-master',
  getBinMaster: '',
  uploadFile: '/bin-master/upload',
  binDataDetails: '/bin-table/pagable',
  getBinTableData: '/bin-table',
  getBinMasterAll: '/bin-master/all',
  getAccountTypeDetails: '/bin-account-type/pagable',
  getAccountType: '/bin-account-type',
  getBinTableAll: '/bin-table/all-bin-tables',
};

export const PermissionUrls = {
  getPermission: '/permissions',
};

export const ExportEntitiesUrls = {
  domain: environment['serviceCoreUrl'],
  getExportEntities: '/entity-group-list',
  getData: '/export-snapshot',
  getExportSchema: '/export-group',
  postExportSchema: '/export-group',
  postImportSchema: '/import-group',
  exportSnapshot: '/export-snapshot',
  importData: '/import-snapshot/upload',
  importDataConfirmation: '/import-snapshot/import_confirmation',
  importList: '/import-snapshot',
  downloadSnapshot: '/export-snapshot/download',
};

export const StatusUrls = {
  getAppHealth: '/portal-health',
  getStatus: '/portal-status',
};
export const StateMachineUrls = {
  getFilterDestionation: '/state-machine/filter/destinations',
  getStateMachine: '/state-machine',
  getStateMachineById: '/state-machine',
  getStateMachineList: '/network-state-list',
};

export const ProfileUrls = {
  getLogout: '/logout',
  getUsers: '/users',
};

export const ViewSettingsUrls = {
  getSettings: '/view-setting',
};
export const WorkflowsUrls = {
  deleteWorkflow: '/workflow',
  getPaymentMethod: '/payment-methods-list',
  getServicesList: '/services-list',
  getWorkflows: '/workflow-groups',
  makeAsDefault: '/workflow/default',
  postPaymentMethod: '/workflow-groups',
};

export const RuleEngine = {
  getRuleCondition: '/rule-new/condition-list',
  getRuleItem: '/rule-new',
  postRule: '/rule-new',
  putRule: '/rule-new',
};

export const Router = {
  commitRule: '/routing/commit',
  deleteRoute: '/routing',
  getRouter: '/routing/routeType/',
  getRuleCondition: '/inputfields/rulecondition',
  ruleList: '/rule-new/routing/',
  saveRule: '/routing',
  serviceType: '/routing/services-list/',
  updateRouter: '/routing/version/live',
};


export const TemplateUrl = {
  TemplateDetails: '/imf-template',
  TemplateList: '/imf-template-list',
};
export const l1AdapterUrls = {
  deleteRowUrl: '/adapter/configuration',
  transformpackager: '/transformpackager',
  draftSchema: '/adapter/draft',
  nextSchema: '/adapter/convert-data',
  getFormat: '/adapter-toolkit-format-list',
  getL1Adapter: '/AdapterToolKit-Schema/load-template',
  copyL1Adapter: '/adapter/copy',
  postL1Adapter: '/adapter/draft',
  getL1Adapterbyid: '',
  // tslint:disable-next-line: object-literal-sort-keys
  getL1AdapterEntityMappingList: '/data-enrichment/entity-mapping-list',
  getL1AdapterEntityIMFList: '/data-enrichment/entity-imf-field-list',
  getL1AdapterTransactionType: '/lookup-value-list/TRANSACTION_TYPE',
  getL1AdapterRuleList: '/AdapterToolKit-Transform/rule-list',
  getSchema: '/AdapterToolKit-Schema/templateschema',
  getTemplate: '/adapter-toolkit-template-list',
  getNetwork: '/adaptertoolKit-network/adapter-network-attribute',
  draftNetwork: '/AdapterToolKit-Network/draft',
  draftTransform: '/adapter/draft',
  getAdapterById: '/adapter',
  getMenu: '/adapter/adapter-summary',
  getSchemeImfMapper: '/scheme-imf-mapper/get-scheme-imf-mapper',
  getAdapterDataMap: '/adapter-data-map',
  getInternalCode: '/lookup-value-list/INTERNAL_PROCESSING_CODE',
  versionData: '/adapter/version-it',
  downloadTemplate: '/AdapterToolKit-Schema/download',
  downloadTemplateById: '/AdapterToolKit-Schema/download-packager',
  uploadTemplate: '/AdapterToolKit-Schema/upload',
  getMessageContextImList: '/getMessageContextFieldList',
  getMessageContextImListbyVersion: '/get-messagecontext-fieldList-by-imf-version',
  getNameValidation: '/adapter/validate-adapter-name/',
  getPaymentMethod: '/lookup-value-list/Payment_Method',
  postActionMethodUrl: '/AdapterToolKit-Transform/adapter-post-actions-method-list',
  preActionMethodUrl: '/AdapterToolKit-Transform/adapter-pre-actions-method-list',
  StepListMethodUrl: '/AdapterToolKit-Transform/adapter-l1-steps-validation-list',
  downloadL1Config: `/adapterconfig/download-l1-files`,
  uploadL1Config: `/adapterconfig/upload-l1-adapter-files`,
};

export const l3AdapterUrls = {
  getL3AdapterList: '/adapter/adapter-summary/L3',
  getL3Adapter: '/AdapterToolKit-Schema/load-template/L3',
  getL3AdapterById: '/adapter',
  getL3Network: '/adaptertoolKit-network/adapter-network-attribute/L3',
  copyL3Adapter: '/adapter/copy',
  postActionMethodUrl: '/AdapterToolKit-Transform/adapter-l3-post-actions-method-list',
  preActionMethodUrl: '/AdapterToolKit-Transform/cart-pre-actions-method-list',
  StepListMethodUrl: '/AdapterToolKit-Transform/adapter-l3-step-method-list',
  downloadL3Config : `/adapterconfig/download-l3-files`,
  uploadL3Config: '/adapterconfig/upload-l3-adapter-files'
  

};

export const schemeImfMapperUrls = {
  gerSchemeImfMapper: '/scheme-imf-mapper',
  gerSchemeImfMapperById: '/scheme-imf-mapper',
  getScheme: '/adapter-toolkit-template-list',
  getField: '/schema-specification-field-list',
  getIMF: '/imf-field-list-byid-hide-false/',
  getIPC: '/lookup-value-list/INTERNAL_PROCESSING_CODE',
  getMap: '/adapter-data-map',
  saveSchemeImfMapper: '/scheme-imf-mapper/save',
  // getFlFunction: '/el-function',
  getFlFunction: '/AdapterToolKit-Transform/el-function-list',
  getService: '/lookup-value-list/SERVICE_TYPE',
  getInBuiltMapperList: '/AdapterToolKit-Transform/inbuilt-mapper-list',
  getMapperList: '/AdapterToolKit-Transform/get-scheme-mapper-list/',
};

export const deploymentSchedule = {
  clusterListUrl: '/switch-cluster-list',
  corePropertiesUrl: '/coreProperties/getPublishCoreProperties',
  getCurrentScheduledDeployments: '/deployment/schedule',
  getNewlyDeployedComponents: '/deployment/non-schedule-component',
  updateCurrentDeployedComponents: '/deployment',
};

export const acquirerMappingurls = {
  getList: '/acquirer',
  getById: '/acquirer/',
  paymentMethodList: '/lookup-value-list/Payment_Method',
};

export const emvDataUrls = {
  getList: '/device-model',
  saveEMV: '/device-model/upload',
  validateModelName: '/device-model/validate-device-model-name',
};

export const ExtractorUrls = {
  getExtractor: '/ext-etl-job-new',
  getByIdExtractor: '/ext-etl-job-new',
  postExtractor: '/ext-etl-job-new',
  putExtractor: '/ext-etl-job-new',
  startExtractor: '/ext-etl-job/start',
  stopExtractor: '/ext-etl-job/stop',
  pauseExtractor: '/ext-etl-job/pause',
  resumeExtractor: '/ext-etl-job/resume',
  getMessageContextImListbyVersion: '/ext-etl-job-new/get-messagecontext-fieldList-by-imf-version',
};

export const RuntimePropertiesUrls = {
  runtimeProperty: '/runtime-property',
  property: '/runtime-property/property',
};

export const CorePropertiesUrls = {
  getCorePropertiesScreen: '/coreProperties',
  downloadCoreProperties: '/adapterconfig/download-core-properties',
  uploadCoreProperties: '/adapterconfig/upload-core-properties' ,
};

export const HolidayUrls = {
  getHolidayList: '/holiday-calender',
};

export const JsonCompareUrls = {
  getComponentType: '/adapter/component-type',
  postJsonCompare: '/adapter/component-type-json',
};
