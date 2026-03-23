import { IHistoryState, initialIHistoryState } from './history.state';
import { IAuditLogState, initialAuditLogState } from './audit-log.state';
import { initialConfigState, IConfigState } from './config.state';
import { IInstitutionGroupState, initialInstitutionGroupState } from './institution-group.state';
import { ILoginState, initialLoginState } from './auth.state';
import { ITransactionLogState, initialTransactionLogState } from './transaction-log.state';
import { IUserState, initialUserState } from './user.state';
import { IVelocityLimitsState, initialVelocityLimitsState } from './velocity-limits.state';
import { RouterReducerState } from '@ngrx/router-store';
import { initialUserRolesState, IUserRolesState } from './user-roles.state';
import { ICountriesState, initialCountriesState } from './countries.state';
import { ImportFileState, initialImportFileState } from './import-file.state';
import { IDashboardState, initialDashboardState } from './dashboard.state';
import { initialMonitoringState, IMonitoringState } from './monitoring.state';
import { IDeviceState, initialDeviceState } from './device.state';
import { IInstitutionState, initialInstitutionState } from './institution.state';
import { ILocationState, initialLocationState } from './location.state';
import { IFilterState, initialFilterState } from '@app/store/state/filter.state';
import { IDestinationRulesState, initialDestinationRulesState } from './destination-rules.state';
import { initialPermissionState, IPermissionState } from '@app/store/state/permission.state';
import { IDeviceTypesState, initialDeviceTypesState } from '@app/store/state/device-types.state';
import {
  initialMerchantCodeMappingState,
  IMerchantCodeMappingState,
} from './merchant-code-mapping.state';
import { initialApprovalsState, IApprovalsState } from './approvals.state';
import { INotificationsState, initialNotificationsState } from './notifications.state';
import { IExportEntitiesState, initialExportEntitiesState } from '../state/export-entities.state';
import { IStatusState, initialStatusState } from './status.state';
import { IProfileState, initialProfileState } from './profile.state';
import { IAcquirerState, initialAcquirerState } from './aquirer.state';
import { initialViewSettingsState, IViewSettingsState } from './viewsettings.state';
import { ICountryState, initialCountryStatesState } from '../../store/state/country-states.state';
import { ICurrencies, initialCurrenciesState } from '../../store/state/currencies.state';
import { initialProcessorAdapterState, IProcessorAdapterState } from './processor-adapter.state';
import { initialWorkflowsState, IWorkflowsState } from '../state/workflows.state';
import { IRuleEngineState, initialRuleEngine } from './rule-engine.state';
import { initialforgetPassState, IforgetPass } from './forget-pass.state';
import { INewPassState, initialNewPassState } from './new-pass.state';
import { IRouterState, initialRouterState } from './router.state';
import { initialInvalidLogState, IInvalidLogState } from './invalid-log.state';
import { IActivationState, initialIActivationState } from './activation-link.state';
import { IAcquirerIdConfigState, initialAcquirerIdConfigState } from './aquirer-id-config.state';
import { ITransactionTypeState, initialITransactionTypeState } from './transaction-type.state';
import { IImfJsonState, initialImfJsonState } from './imf-json.state';
import { IL1AdapterState, initialIL1AdapterState } from './l1-adapter.state';
import { initialExtractorState, IExtractorState } from './extractor.state';
import {
  ILookUpTypeConfigurationState,
  initialLookUpTypeConfigurationState,
} from './look-up-configuration.state';
import { ISchemeImfMapperState, initialSchemeImfMapperState } from './scheme-imf-mapper.state';
import { IRuleTagState, initialIRuleTagState } from './rule-tag.state';
import { ISwitchClustersState, initialISwitchClustersState } from './switch-clusters.state';
import { IDeploymentStatusState, initialDeploymentStatusState } from './deployment-status.state';
import { IDeploymentSchedule, initialDeploymentSchedule } from './deployment-schedule.state';
import {
  initialDeploymentWorkflowState,
  IDeploymentWorkflowState,
} from './deployment-workflow-mapper.state';
import { IL3AdapterState, initialL3AdapterState } from './l3-adapter.state';
import { IBinTableState, initialBinTableState } from './bin-table.state';
import { IEMVState, initialEMVState } from './emv-data.state';
import {
  IMasterConfiguration,
  initialMasterConfigurationState,
} from './master-configuration.state';
import { initialTxnKeyLableTypeState, ITxnKeyLableTypeState } from './txn-key-lable.state';
import { ICorePropertiesState, initialCorePropertiesState } from './core-properties.state';
import { IDekState, initialDekState } from './dek.state';
export interface IAppState {
  Device: IDeviceState;
  Location: ILocationState;
  acquirer: IAcquirerState;
  acquirerIdConfig: IAcquirerIdConfigState;
  approvals: IApprovalsState;
  auditLogs: IAuditLogState;
  auth: ILoginState;
  config: IConfigState;
  countries: ICountriesState;
  countryStates: ICountryState;
  currencies: ICurrencies;
  verifyActivation: IActivationState;
  transactionType: ITransactionTypeState;
  destination: IDestinationRulesState;
  deviceTypes: IDeviceTypesState;
  exportEntities: IExportEntitiesState;
  filterState: IFilterState;
  forgetPass: IforgetPass;
  importFile: ImportFileState;
  Institution: IInstitutionState;
  institutionGroups: IInstitutionGroupState;
  institutionGroupDetails: IInstitutionGroupState;
  invalidlogs: IInvalidLogState;
  merchantCodeMapping: IMerchantCodeMappingState;
  newPass: INewPassState;
  notifications: INotificationsState;
  processorAdapter: IProcessorAdapterState;
  dashboard: IDashboardState;
  permissions: IPermissionState;
  profile: IProfileState;
  router?: RouterReducerState;
  routersList: IRouterState;
  ruleEngine: IRuleEngineState;
  status: IStatusState;
  transactionLogs: ITransactionLogState;
  users: IUserState;
  velocityLimits: IVelocityLimitsState;
  viewsettings: IViewSettingsState;
  userRoles: IUserRolesState;
  Monitoring: IMonitoringState;
  workflows: IWorkflowsState;
  imfjson: IImfJsonState;
  l1Adapter: IL1AdapterState;
  Extractor: IExtractorState;
  l3Adapter: IL3AdapterState;
  ruleTag: IRuleTagState;
  switchClusters: ISwitchClustersState;
  lookUpConfiguration: ILookUpTypeConfigurationState;
  history: IHistoryState;
  schemeImfMapper: ISchemeImfMapperState;
  deploymentStatus: IDeploymentStatusState;
  deploymentScheduleList: IDeploymentSchedule;
  deploymentWorkflow: IDeploymentWorkflowState;
  binTable: IBinTableState;
  emvData: IEMVState;
  masterConfiguration: IMasterConfiguration;
  TxnKeyLable: ITxnKeyLableTypeState;
  CoreProperties: ICorePropertiesState;
  dek: IDekState;
}

export const initialAppState: IAppState = {
  Device: initialDeviceState,
  Institution: initialInstitutionState,
  Location: initialLocationState,
  Monitoring: initialMonitoringState,
  acquirer: initialAcquirerState,
  acquirerIdConfig: initialAcquirerIdConfigState,
  approvals: initialApprovalsState,
  auditLogs: initialAuditLogState,
  auth: initialLoginState,
  config: initialConfigState,
  countries: initialCountriesState,
  countryStates: initialCountryStatesState,
  currencies: initialCurrenciesState,
  dashboard: initialDashboardState,
  deploymentStatus: initialDeploymentStatusState,
  deploymentWorkflow: initialDeploymentWorkflowState,
  destination: initialDestinationRulesState,
  deviceTypes: initialDeviceTypesState,
  exportEntities: initialExportEntitiesState,
  filterState: initialFilterState,
  forgetPass: initialforgetPassState,
  history: initialIHistoryState,
  imfjson: initialImfJsonState,
  importFile: initialImportFileState,
  institutionGroupDetails: initialInstitutionGroupState,
  institutionGroups: initialInstitutionGroupState,
  invalidlogs: initialInvalidLogState,
  l1Adapter: initialIL1AdapterState,
  Extractor: initialExtractorState,
  l3Adapter: initialL3AdapterState,
  lookUpConfiguration: initialLookUpTypeConfigurationState,
  merchantCodeMapping: initialMerchantCodeMappingState,
  newPass: initialNewPassState,
  notifications: initialNotificationsState,
  permissions: initialPermissionState,
  processorAdapter: initialProcessorAdapterState,
  profile: initialProfileState,
  routersList: initialRouterState,
  ruleEngine: initialRuleEngine,
  schemeImfMapper: initialSchemeImfMapperState,
  status: initialStatusState,
  switchClusters: initialISwitchClustersState,
  transactionLogs: initialTransactionLogState,
  transactionType: initialITransactionTypeState,
  userRoles: initialUserRolesState,
  users: initialUserState,
  velocityLimits: initialVelocityLimitsState,
  verifyActivation: initialIActivationState,
  viewsettings: initialViewSettingsState,
  workflows: initialWorkflowsState,
  deploymentScheduleList: initialDeploymentSchedule,
  ruleTag: initialIRuleTagState,
  binTable: initialBinTableState,
  emvData: initialEMVState,
  masterConfiguration: initialMasterConfigurationState,
  TxnKeyLable: initialTxnKeyLableTypeState,
  CoreProperties: initialCorePropertiesState,
  dek: initialDekState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
