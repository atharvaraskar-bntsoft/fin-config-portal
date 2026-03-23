import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { DownloadComponent } from './share-configurations/download/download.component';
import { UploadComponent } from './share-configurations/upload/upload.component';


const routes: Routes = [
  {
    children: [
      {
        canActivate: [AuthGuard],
        component: HomeComponent,
        data: {
          id: 'link_dashboard',
          title: 'DASHBOARD',
        },
        path: '',
      },
      {
        canActivate: [AuthGuard],
        data: {
          id: 'link_workflow',
          title: 'SCHEME_IMF_MAPPING',
        },
        loadChildren: () =>
          import('./scheme-imf-mapping/scheme-imf-mapping.module').then(
            m => m.SchemeImfMappingModule,
          ),
        path: 'adapter-configuration/scheme-imf-mapping',
      },
      {
        canActivate: [AuthGuard],
        data: {
          id: 'link_imf',
          title: 'INTERNAL_MESSAGE_FORMAT',
        },
        loadChildren: () => import('./imf-json/imf-json.module').then(m => m.ImfJsonModule),
        path: 'adapter-configuration/imf',
      },
      {
        canActivate: [AuthGuard],
        data: {
          id: 'link_workflow',
          ruletype: 'workflow new',
          title: 'Workflow',
        },
        loadChildren: () =>
          import('./routing/work-flows/work-flow.module').then(m => m.WorkflowModule),
        path: 'routing/workflow-new',
      },
      {
        canActivate: [AuthGuard],
        data: {
          id: 'link_workflow_rule',
          ruletype: 'workflow',
          title: 'MULTI_DESTINATION',
        },
        loadChildren: () =>
          import('./routing/destination-rules/destination-rules.module').then(
            m => m.DestinationRulesModule,
          ),
        path: 'routing/rule/workflow',
      },
      {
        canActivate: [AuthGuard],
        data: {
          id: 'link_tag_rule',
          permission: 'read',
          title: 'Tags',
        },
        loadChildren: () => import('./routing/tag/tag.module').then(m => m.TagModule),
        path: 'routing/ruletags',
      },
      {
        data: {
          title: 'TXNKEYLABLE',
        },
        loadChildren: () =>
          import('./settings/txn-key-lable/txn-key-lable.module').then(m => m.TxnKeyLableModule),
        path: 'logs/txnKeyLable',
      },
      {
        canActivate: [AuthGuard],
        data: {
          id: 'link_routing_rule',
          ruletype: 'route',
          title: 'ROUTING_RULE',
        },

        loadChildren: () =>
          import('./routing/destination-rules/destination-rules.module').then(
            m => m.DestinationRulesModule,
          ),
        path: 'routing/rule/destination',
      },
      {
        data: {
          id: 'link_processor_adapter',
          title: 'DESTINATION_END_POINT',
        },

        loadChildren: () =>
          import('./routing/processor-adapter/processor-adapter.module').then(
            m => m.ProcessorAdapterModule,
          ),
        path: 'routing/processor-adapter',
      },
      {
        data: {
          id: 'link_location',
          title: 'LOCATIONS',
        },

        loadChildren: () =>
          import('./institutions/location/location.module').then(m => m.LocationModule),
        path: 'institutions/locations',
      },

      {
        data: {
          id: 'link_device',
          title: 'HOLIDAY',
        },

        loadChildren: () =>
          import('./institutions/holiday-list/holiday-list.module').then(m => m.HolidayListModule),
        path: 'institutions/holiday',
      },
      {
        data: {
          id: 'link_device',
          permission: 'read',
          title: 'DEVICES',
        },

        loadChildren: () => import('./institutions/device/device.module').then(m => m.DeviceModule),
        path: 'institutions/devices',
      },
      {
        canActivate: [AuthGuard],
        data: {
          id: 'link_monitoring',
          permission: 'read',
          title: 'MONITORING',
        },

        loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule),
        path: 'monitoring',
      },
      {
        data: {
          id: 'link_institution',
          title: 'INSTITUTION_GROUPS',
        },

        loadChildren: () =>
          import('./institutions/institution-group/institution-group.module').then(
            m => m.InstitutionGroupModule,
          ),
        path: 'institutions',
      },
      {
        data: {
          id: 'link_merchant',
          title: 'INSTITUTIONS',
        },

        loadChildren: () =>
          import('./institutions/institution/institution.module').then(m => m.InstitutionModule),
        path: 'institutions/institutions',
      },
      {
        data: {
          id: 'link_audit_log',
          permission: 'read',
          title: 'AUDIT_LOG',
        },

        canActivate: [AuthGuard],
        loadChildren: () => import('./logs/audit-log/audit-log.module').then(m => m.AuditLogModule),
        path: 'logs/audit-log',
      },
      {
        data: {
          title: 'SWITCH_CLUSTERS',
        },

        loadChildren: () =>
          import('./deployment/switch-clusters/switch-clusters.module').then(
            m => m.SwitchClustersModule,
          ),
        path: 'deployment/switch-clusters',
      },
      {
        data: {
          title: 'L2_JSON',
        },

        loadChildren: () =>
          import('./deployment/deployment-workflow-mapper/deployment-workflow-mapper.module').then(
            m => m.DeploymentWorkflowMapperModule,
          ),
        path: 'deployment/deployment-workflow-mapper',
      },
      {
        data: {
          title: 'DEPLOYMENT_HISTORY',
        },

        loadChildren: () =>
          import('./deployment/history/history.module').then(m => m.HistoryModule),
        path: 'deployment/history',
      },
      {
        data: {
          title: 'DEPLOYMENT_STATUS',
        },

        loadChildren: () =>
          import('./deployment/deployment-status/deployment-status.module').then(
            m => m.DeploymentStatusModule,
          ),
        path: 'deployment',
      },
      {
        data: {
          title: 'INVALID_LOG',
        },

        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./logs/invalid-log/invalid-log.module').then(m => m.InvalidLogModule),
        path: 'logs',
      },
      {
        loadChildren: () =>
          import('./server-error/server-error.module').then(m => m.ServerErrorModule),
        path: '',
      },
      {
        data: {
          title: 'TRANSACTION_LOG',
        },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./logs/transaction-log/transaction-log.module').then(m => m.TransactionLogModule),
        path: 'logs/transaction-log',
      },
      {
        data: {
          title: 'MONITORING',
        },
        canActivate: [AuthGuard],
        loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule),
        path: 'monitoring/screen',
      },
      {
        data: {
          id: 'link_lookup_values',
          permission: 'read',
          title: 'Lookup Type',
        },

        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./look-up-configuration/look-up-configuration.module').then(
            m => m.LookUpConfigurationModule,
          ),
        path: 'look-up-configuration',
      },
      {
        data: {
          title: 'VELOCITY_LIMIT',
        },
        loadChildren: () =>
          import('./limits/velocity-limits/velocity-limits.module').then(
            m => m.VelocityLimitsModule,
          ),
        path: 'limits',
      },
      {
        data: {
          title: 'Users',
        },

        loadChildren: () =>
          import('./settings/users-setting/users-setting.module').then(m => m.UsersSettingModule),
        path: 'settings',
      },
      {
        data: {
          title: 'COUNTRIES',
        },

        loadChildren: () =>
          import('./settings/countries/countries.module').then(m => m.CountriesModule),
        path: 'settings/countries',
      },
      {
        data: {
          title: 'CountryStates',
        },

        loadChildren: () =>
          import('./settings/country-states/country-states.module').then(
            m => m.CountryStatesModule,
          ),
        path: 'settings/country-states',
      },
      {
        data: {
          title: 'Currencies',
        },

        loadChildren: () =>
          import('./settings/currencies/currencies.module').then(m => m.CurrenciesModule),
        path: 'settings/currencies',
      },
      {
        data: {
          title: 'DeviceTypes',
        },

        loadChildren: () =>
          import('./settings/device-types/device-types.module').then(m => m.DeviceTypesModule),
        path: 'settings/device-types',
      },
      {
        data: {
          id: 'link_view_settings',
          permission: 'read',
          title: 'ViewSettings',
        },

        loadChildren: () =>
          import('./settings/view-settings/view-settings.module').then(m => m.ViewSettingsModule),
        path: 'settings',
      },
      {
        data: {
          title: 'DEK',
        },

        loadChildren: () => import('./processor-config/dek/dek.module').then(m => m.DekModule),
        path: 'processor-config/dek',
      },
      {
        data: {
          title: 'RUNTIME_PROPER',
        },

        loadChildren: () =>
          import('./runtime-properties/runtime-properties.module').then(
            m => m.RuntimePropertiesModule,
          ),
        path: 'runtime/runtimeproperties',
      },
      {
        data: {
          title: 'CORE_PROPERTIES',
        },

        loadChildren: () =>
          import('./processor-config/core-properties/core-properties.module').then(
            m => m.CorePropertiesModule,
          ),
        path: 'processor-config/core-properties',
      },
      {
        data: {
          title: 'JSON Compare',
        },

        loadChildren: () =>
          import('./processor-config/json-compare/json-compare.module').then(
            m => m.JsonCompareModule,
          ),
        path: 'processor-config/json-compare',
      },
      {
        data: {
          id: 'link_bin_table',
          permission: 'read',
          title: 'BIN_TABLE',
        },

        loadChildren: () =>
          import('./processor-config/bin-table/bin-table.module').then(m => m.BinTableModule),
        path: 'processor-config',
      },
      {
        data: {
          id: 'link_acquirer_id_config',
          permission: 'read',
          title: 'ACQUIRER_ID_CONFIG',
        },
        loadChildren: () =>
          import('./processor-config/acquirer-id-config/acquirer-id-config.module').then(
            m => m.AcquirerIdConfigModule,
          ),
        path: 'institutions/acquirer-id-config',
      },
      {
        data: {
          id: 'link_exports',
          permission: 'read',
          title: 'Export Snapshot',
        },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./export-entities/export-entities.module').then(m => m.ExportEntitiesModule),
        path: 'export-list',
      },



      {
        data: {
          title: 'L1 Adapters',
        },
        loadChildren: () =>
          import('./adapter-configuration/l1-adapters/l1-adapters.module').then(
            m => m.L1AdaptersModule,
          ),
        path: 'adapter-configuration/l1-adapters',
      },
      {
        data: {
          title: 'L3 Adapters',
        },
        loadChildren: () =>
          import('./adapter-configuration/l3-adapters/l3-adapters.module').then(
            m => m.L3AdaptersModule,
          ),
        path: 'adapter-configuration/l3-adapters',
      },
      {
        data: {
          title: 'MID_MAPPING',
        },

        loadChildren: () =>
          import('./processor-config/merchant-code-mapping/merchant-code-mapping.module').then(
            m => m.MerchantCodeMappingModule,
          ),
        path: 'processor-config/merchant-code-mapping',
      },
      {
        data: {
          title: 'APPROVALS',
        },

        loadChildren: () =>
          import('./approvals/approvals/approvals.module').then(m => m.ApprovalsModule),
        path: 'approvals/approvals',
      },
      {
        data: {
          title: 'NOTIFICATIONS',
        },

        loadChildren: () =>
          import('./approvals/notifications/notifications.module').then(m => m.NotificationsModule),
        path: 'approvals/notifications',
      },
      {
        data: {
          id: 'link_status',
          permission: 'read',
          title: 'STATUS',
        },

        loadChildren: () => import('./status/status.module').then(m => m.StatusModule),
        path: 'status',
      },
	  {
	    canActivate: [AuthGuard],
	    component: DownloadComponent,
	    data: {
	      id: 'link_download',
	      title: 'Download Configurations',
	    },
	    path: 'share-configurations/download',
	  },
	  {
	    canActivate: [AuthGuard],
	    component: UploadComponent,
	    data: {
	      id: 'link_upload',
	      title: 'Upload Configurations',
	    },
	    path: 'share-configurations/upload',
	  },

    ],
    data: {
      id: 'link_dashboard',
      title: 'DASHBOARD',
    },
    path: '',
  },
  {
    data: {
      ruletype: 'route',
      title: 'RuleEngineRoute',
    },
    loadChildren: () =>
      import('./routing/rule-engine/rule-engine.module').then(m => m.RuleEngineModule),
    path: 'routing/rule-engine/route',
  },
  {
    data: {
      ruletype: 'workflow',
      title: 'Rule_Engine_Workflow',
    },
    loadChildren: () =>
      import('./routing/rule-engine/rule-engine.module').then(m => m.RuleEngineModule),
    path: 'routing/rule-engine/workflow',
  },
  {
    data: {
      ruletype: 'workflow',
      title: 'WORKFLOW_ROUTER',
    },
    loadChildren: () => import('./routing/router/router.module').then(m => m.RouterModule),
    path: 'routing/router/workflow',
  },
  {
    data: {
      ruletype: 'route',
      title: 'DESTINATION_ROUTER',
    },
    loadChildren: () => import('./routing/router/router.module').then(m => m.RouterModule),
    path: 'routing/router/route',
  },
  {
    data: {
      title: 'Tags',
    },
    loadChildren: () => import('./routing/tag/tag.module').then(m => m.TagModule),
    path: 'routing/tag',
  },
  {
    data: {
      id: 'link_extractor',
      title: 'Extractor',
    },
    loadChildren: () => import('./extractor-ui/extractor-ui.module').then(m => m.ExtractorUiModule),
    path: 'extractor-ui',
  },
  
  {
    data: {
      customLayout: true,
    },
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    path: 'access',
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      relativeLinkResolution: 'legacy',
    }),
  ],
})
export class AppRoutingModule {}
