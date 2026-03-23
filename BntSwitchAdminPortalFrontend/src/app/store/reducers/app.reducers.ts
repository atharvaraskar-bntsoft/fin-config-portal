import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../state/app.state';
import { configReducers } from './config.reducers';
import { authReducers } from './auth.reducers';
import { userReducers } from './user.reducers';
import { AuditLogReducers } from './audit-log.reducers';
import { TransactionLogReducers } from './transaction-log.reducers';
import {
  InstitutionGroupReducers,
  InstitutionGroupDetailsReducers,
} from './institution-group.reducers';
import { userRolesReducers } from './user-roles.reducers';
import { countriesReducers } from './countries.reducers';
import {
  VelocityLimitsReducers,
} from './velocity-limits.reducers';
import { dashboardReducers } from './dashboard.reducers';
import { MonitoringReducers } from './monitoring.reducers';
import { ImportFileReducer } from './import-file.reducers';
import { InstitutionReducers } from './institution.reducers';
import { LocationReducers } from './location.reducers';
import { DeviceReducers } from './device.reducers';
import { FilterReducers } from '@app/store/reducers/filter.reducers'
import { DestinationRulesReducers } from './destination-rules.reducers';
import { MerchantCodeMappingReducers } from './merchant-error-mapping.reducers';
import { ApprovalsReducers } from './approvals.reducers';
import { NotificationsReducers } from './notifications.reducers';
import { PermissionReducers } from '@app/store/reducers/permission.reducers';
import { DeviceTypesReducers } from './device-types.reducers';
import { ExportEntitiesReducers } from '@app/store/reducers/export-entities.reducers';
import { StatusReducers } from './status.reducers';
import { countryStatesReducers } from '../reducers/country-states.reducers';
import { currenciesReducers } from '../reducers/currencies.reducers';
import { WorkflowReducers } from '@app/store/reducers/workflows.reducers';
import { AcquirerReducers } from './acquirer.reducer';
import { ViewSettingsReducers } from './view-settings.reducers';
import { ProfileReducers } from './profile.reducers';
import { ProcessorAdapterReducers } from './processor-adapter.reducers';
import { RuleEngineReducers } from './rule-engine.reducers';
import { ForgetPassReducers } from './forget-pass.reducer';
import { NewPassReducers } from './new-pass.reducers';
import { RouterReducers } from './router.reducers';
import { InvalidLogReducers } from './invalid-log.reducers';
import { ActivationReducers } from './activation-link.reducers';
import { AcquirerIdConfigReducers } from './acquirer-id-config.reducer';
import { TransactionTypeReducers } from './transaction-type.reducers';
import { ImfJsonReducers } from './imf-json.reducers';
import { L1AdapterReducers } from './l1-adapter.reducers';
import { LookUpConfigurationsReducers } from './look-up-configuration.reducers';
import { SchemeImfMapperReducers } from './scheme-imf-mapper.reducers';
import { RuleTagcReducers } from './rule-tag.reducers';
import { SwitchClustersReducers } from './switch-clusters.reducer';
import { HistoryReducers } from './history.reducers';
import { DeploymentStatusReducers } from './deployment-status.reducer';
import { DeploymentScheduleReducer } from './deployment-schedule.reducers';
import { DeploymentWorkflowReducers } from './deployment-workflow-mapper.reducer';
import { L3AdapterReducers } from './l3-adapter.reducers';
import { BinTableReducers } from './bin-table.reducers';
import { EMVDataReducers } from './emv-data.reducers';
import { masterConfigurationReducers } from './master-configuration.reducers';
import { ExtractorReducers } from './extractor.reducers';
import { TxnKeyLableReducers } from './txn-key-lable.reducers';
import { CorePropertiesReducers } from './core-properties.reducers';
import { DekReducers } from './dek.reducer';

export const appReducers: ActionReducerMap<IAppState> = {
  Device: DeviceReducers,
  Institution: InstitutionReducers,
  Location: LocationReducers,
  Monitoring: MonitoringReducers,
  acquirer: AcquirerReducers,
  acquirerIdConfig: AcquirerIdConfigReducers,
  approvals: ApprovalsReducers,
  auditLogs: AuditLogReducers,
  auth: authReducers,
  config: configReducers,
  countries: countriesReducers,
  countryStates: countryStatesReducers,
  currencies: currenciesReducers,
  dashboard: dashboardReducers,
  deploymentStatus: DeploymentStatusReducers,
  deploymentWorkflow: DeploymentWorkflowReducers,
  destination: DestinationRulesReducers,
  deviceTypes: DeviceTypesReducers,
  exportEntities: ExportEntitiesReducers,
  filterState: FilterReducers,
  forgetPass: ForgetPassReducers,
  history: HistoryReducers,
  importFile: ImportFileReducer,
  institutionGroupDetails: InstitutionGroupDetailsReducers,
  institutionGroups: InstitutionGroupReducers,
  invalidlogs: InvalidLogReducers,
  merchantCodeMapping: MerchantCodeMappingReducers,
  newPass: NewPassReducers,
  notifications: NotificationsReducers,
  permissions: PermissionReducers,
  processorAdapter: ProcessorAdapterReducers,
  profile: ProfileReducers,
  router: routerReducer,
  routersList: RouterReducers,
  ruleEngine: RuleEngineReducers,
  status: StatusReducers,
  transactionLogs: TransactionLogReducers,
  transactionType: TransactionTypeReducers,
  userRoles: userRolesReducers,
  users: userReducers,
  velocityLimits: VelocityLimitsReducers,
  verifyActivation: ActivationReducers,
  viewsettings: ViewSettingsReducers,
  workflows: WorkflowReducers,
  imfjson: ImfJsonReducers,
  ruleTag: RuleTagcReducers,
  lookUpConfiguration: LookUpConfigurationsReducers,
  l1Adapter: L1AdapterReducers,
  l3Adapter: L3AdapterReducers,
  schemeImfMapper: SchemeImfMapperReducers,
  switchClusters: SwitchClustersReducers,
  deploymentScheduleList: DeploymentScheduleReducer,
  binTable: BinTableReducers,
  emvData: EMVDataReducers,
  masterConfiguration: masterConfigurationReducers,
  Extractor: ExtractorReducers,
  TxnKeyLable: TxnKeyLableReducers,
  CoreProperties: CorePropertiesReducers,
  dek: DekReducers
};
