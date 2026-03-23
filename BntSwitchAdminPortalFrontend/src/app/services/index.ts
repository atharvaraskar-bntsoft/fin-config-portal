import { MasterConfigurationService } from './master-configuration.service';
import { AuditLogService } from './audit-log.service';
import { AuthService } from './auth.service';
import { InstitutionGroupService } from './institution-group.service';
import { TransactionLogService } from './transaction-log.service';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { UserRolesService } from './user-roles.service';
import { CountriesService } from './countries.service';
import { DashboardService } from './dashboard.service';
import { VelocityLimitsService } from './velocity-limits.service';
import { ImportFileService } from './import-file.service';
import { LocationService } from './location.service';
import { InstitutionService } from './institution.service';
import { DeviceService } from './device.service';
import { FilterService } from '@app/services/filter.service';
import { MonitoringService } from './monitoring.service';
import { ExportEntitiesService } from '@app/services/export-entities.service';
import { DeviceTypesService } from '@app/services/device-types.service';
import { MerchantCodeMappingService } from './merchant-code-mapping.service';
import { ApprovalsService } from './approvals.service';
import { NotificationsService } from './notications.service';
import { DestinationRulesService } from './destination-rules.service';
import { PermissionService } from '../services/permission.service';
import { StatusService } from './status.service';
import { ProfileService } from './profile.service';
import { AlertService } from './alert.service';
import { CountryStatesService } from './country-states.service';
import { CurrenciesService } from './currencies.service';
import { JsonApiService } from './json-api.service';
import { AcquirerService } from './acquirer.service';
import { ViewSettingsService } from './view-settings.service';
import { WorkflowService } from '@app/services/workflow.service';
import { MessageService } from '@app/services/message.service';
import { ProcessorAdapterService } from './procesoor-adapter.service';
import { RulesService } from './rule.service';
import { RouterService } from './router.service';
import { GMapsService } from '@app/services/locations-geocoding.service';
import { InvalidLogService } from './invalid-log.service';
import { ruleEngineService } from './rule-engine.services';
import { WorkflowEventService } from './workflows.services';
import { AcquirerIdConfigService } from './acquirer-id-config.service';
import { TransactionTypeService } from './transaction-type.service';
import { SubscribeService } from './subscribe.services';
import { ImfJsonService } from './imf-json.service';
import { L1AdapterService } from './l1-adapter.service';
import { SchemeImfMapperService } from './scheme-imf-mapper.service';
import { LookUpConfigurationService } from './look-up-configuration.service';
import {TxnKeyLableService} from './txn-key-lable.service'
import { RuleTagService } from './rule-tag.service';
import { SwitchClustersService } from './switch-clusters.service';
import { HistoryService } from './history.service';
import { DeploymentStatusService } from './deployment-status.service';
import { DeploymentWorkflowService } from './deployment-workflow-mapper.service';
import { L3AdapterService } from './l3-adapter.service';
import { BinTableService } from './bin-table.service';
import { ExtractorService } from './extractor.service';
import { RuntimePropertiesService } from './runtime-Properties.service';
import { CorePropertiesService } from './core-properties.service';
import { AddRoleService } from './add-role.service';
import { JsonCompareService } from './json-compare.service';
import { DekService } from './dek.service';

export const services = [
  AddRoleService,
  AlertService,
  SubscribeService,
  AcquirerService,
  AcquirerIdConfigService,
  AuditLogService,
  ApprovalsService,
  AuthService,
  CookieService,
  CountriesService,
  CountryStatesService,
  CurrenciesService,
  DashboardService,
  DeviceService,
  DestinationRulesService,
  DeviceTypesService,
  ExportEntitiesService,
  DeviceService,
  FilterService,
  GMapsService,
  InstitutionGroupService,
  InvalidLogService,
  ImportFileService,
  ImfJsonService,
  JsonApiService,
  MonitoringService,
  CorePropertiesService,
  LocationService,
  MerchantCodeMappingService,
  NotificationsService,
  ProcessorAdapterService,
  ExtractorService,
  RouterService,
  PermissionService,
  ProfileService,
  StatusService,
  TransactionLogService,
  TransactionTypeService,
  UserService,
  UserRolesService,
  InstitutionService,
  VelocityLimitsService,
  ViewSettingsService,
  WorkflowService,
  WorkflowEventService,
  MessageService,
  RulesService,
  ruleEngineService,
  L1AdapterService,
  RuleTagService,
  L3AdapterService,
  LookUpConfigurationService,
  SchemeImfMapperService,
  SwitchClustersService,
  HistoryService,
  DeploymentStatusService,
  DeploymentWorkflowService,
  BinTableService,
  MasterConfigurationService,
  TxnKeyLableService,
  RuntimePropertiesService,
  JsonCompareService,
  DekService
];
