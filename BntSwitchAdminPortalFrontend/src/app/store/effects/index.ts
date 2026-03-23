import { MasterConfigurationEffect } from './master-configuration.effect';
import { UserEffects } from './user.effects';
import { ConfigEffects } from './config.effects';
import { AuditLogEffects } from './audit-log.effects';
import { TransactionLogEffects } from './transaction-log.effect';
import { InstitutionGroupEffects } from './institution-group.effects';
import { AuthEffects } from './auth.effects';
import { UserRolesEffects } from './user-roles.effects';
import { CountriesEffects } from './countries.effects';
import { DashboardEffects } from './dashboard.effects';
import { ImfJsonEffects } from './imf-json.effects';
import { ImportFileEffects } from './import-file.effects';
import { VelocityLimitsEffects } from './velocity-limits.effects';
import { InstitutionEffects } from './institution.effects';
import { LocationEffects } from './location.effects';
import { DeviceEffects } from '../effects/device.effects';
import { FilterEffects } from '../effects/filter.effects';
import { ExportEntitiesEffects } from '../effects/export-entities.effects';
import { MonitoringEffects } from '../effects/monitoring.effects';
import { DeviceTypesEffects } from '@app/store/effects/device-types.effects';
import { MerchantCodeMappingEffects } from './merchant-code-mapping.effects';
import { ApprovalsEffects } from './approvals.effects';
import { NotificationsEffects } from './notifications.effects';
import { PermissionEffects } from '@app/store/effects/permission.effects';
import { DestinationEffects } from './destination-rules.effects';
import { StatusEffects } from './status.effects';
import { ProfileEffects } from './profile.effects';
import { CountryStatesEffects } from '../effects/country-states.effects';
import { CurrenciesEffects } from '../effects/currencies.effects';
import { WorkflowEffects } from '@app/store/effects/workflow.effects';
import { AcquirerEffects } from './acquirer.effects';
import { ViewSettingsEffects } from './view-settings.effects';
import { ProcessorAdapterEffects } from './processor-adapter.effects';
import { RuleEngineEffects } from './rule-engine.effects';
import { RouterEffects } from './router.effects';
import { InvalidLogsLogEffects } from './invalid-log.effects';
import { AcquirerIdConfigEffects } from './acquirer-id-config.effects';
import { TransactionTypeEffects } from './transaction-type.effects';
import { L1AdapterEffects } from './l1-adapter.effects';
import { LookUpConfigurationsEffects } from './look-up-configuration.effects';
import { SchemeImfMapperEffects } from './scheme-imf-mapper.effects';
import { RuleTagEffects } from './rule-tag.effects';
import { SwitchClustersEffects } from './switch-clusters-effects';
import { HistorysEffects } from './history.effects';
import { DeploymentStatussEffects } from './deployment-status.effects';
import { DeployedScheduledEffects } from './deployment-schedule.effects';
import { DeploymentWorkflowEffects } from './deployment-workflow-mapper.effects';
import { L3AdapterEffects } from './l3-adapter.effects';
import { BinTableEffects } from './bin-table.effects';
import { EMVDataEffects } from './emv-data.effects';
import { ExtractorEffects } from './extractor.effects';
import { TxnKeyLableEffects } from './txn-key-lable.effects';
import { CorePropertiesEffects } from './core-properties.effects';
import { DekEffects } from './dek.effects';

export const effects = [
  ImfJsonEffects,
  AuthEffects,
  AuditLogEffects,
  AcquirerEffects,
  AcquirerIdConfigEffects,
  ApprovalsEffects,
  ConfigEffects,
  CountriesEffects,
  CountryStatesEffects,
  CurrenciesEffects,
  DashboardEffects,
  DeviceEffects,
  DestinationEffects,
  DeviceTypesEffects,
  ExportEntitiesEffects,
  FilterEffects,
  ImportFileEffects,
  InstitutionEffects,
  InvalidLogsLogEffects,
  LocationEffects,
  MonitoringEffects,
  InstitutionGroupEffects,
  MerchantCodeMappingEffects,
  NotificationsEffects,
  ProcessorAdapterEffects,
  RuleEngineEffects,
  RouterEffects,
  StatusEffects,
  PermissionEffects,
  ProfileEffects,
  TransactionLogEffects,
  TransactionTypeEffects,
  UserEffects,
  UserRolesEffects,
  VelocityLimitsEffects,
  ViewSettingsEffects,
  WorkflowEffects,
  L1AdapterEffects,
  RuleTagEffects,
  ExtractorEffects,
  L3AdapterEffects,
  LookUpConfigurationsEffects,
  SchemeImfMapperEffects,
  SwitchClustersEffects,
  HistorysEffects,
  DeploymentStatussEffects,
  DeployedScheduledEffects,
  DeploymentWorkflowEffects,
  BinTableEffects,
  EMVDataEffects,
  MasterConfigurationEffect,
  TxnKeyLableEffects,
  CorePropertiesEffects,
  DekEffects
];
