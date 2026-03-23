export const adminLteConf = {
  enableBoxRefresh: true,
  isSidebarLeftCollapsed: true,
  isSidebarLeftExpandOnOver: false,
  isSidebarLeftMini: true,
  isSidebarLeftMouseOver: false,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  layout: 'normal',
  sidebarLeftMenu: [
    // { label: '', separator: true },
    {
      iconClasses: 'fa fa-area-chart fa-lg desktop',
      id: 'link_dashboard',
      label: 'DASHBOARD',
      route: '/',
    },
    {
      iconClasses: 'fa fa-pie-chart fa-lg desktop',
      id: 'link_monitoring',
      label: 'MONITORING',
      route: '/monitoring',
    },
    {
      iconClasses: 'fa fa-credit-card fa-lg desktop',
      id: 'link_txn_log',
      label: 'TRANSACTION_LOG',
      route: 'logs/transaction-log',
    },
    {
      children: [
        {
          label: 'MERCHANT',
          children: [
            {
              id: 'link_acquirer_id_config',
              label: 'ACQUIRER_ID_CONFIG',
              route: 'institutions/acquirer-id-config',
            },
            {
              id: 'link_institution',
              label: 'INSTITUTION_GROUPS',
              route: 'institutions/institution-group',
            },
            {
              id: 'link_merchant',
              label: 'INSTITUTIONS',
              route: 'institutions/institutions',
            },
            {
              id: 'link_location',
              label: 'LOCATIONS',
              route: 'institutions/locations',
            },
            {
              id: 'link_device',
              label: 'DEVICES',
              route: 'institutions/devices',
            },
            // {
            //   id: 'link_acquirer',
            //   label: 'INSTITUTION_ACQUIRER',
            //   route: 'institutions/acquirers',
            // },
            {
              id: 'link_velocity',
              label: 'VELOCITY_LIMIT',
              route: 'limits/velocity-limits',
            },
            {
              id: 'link_velocity',
              label: 'HOLIDAY',
              route: 'institutions/holiday',
            },
            // {
            //   id: 'link_hsm',
            //   label: 'HSM_KEYS',
            //   route: 'institutions/hsm-keys',
            // },
          ],
        },
        {
          label: 'PROCESSOR',
          // id: 'link_processor_config',
          children: [
            // {
            //   id: 'link_device_mapping',
            //   label: 'TID_MAPPING',
            //   route: 'processor-config/device-code-mapping',
            //   // route: '/'
            // },
            {
              id: 'link_mid',
              label: 'MID_MAPPING',
              route: 'processor-config/merchant-code-mapping',

              // route: '/'
            },
            /* {
              id: 'link_acquirer_mapping',
              label: 'Acquirer Mapping',
              route: 'institutions/acquirer-mapping',
            },*/
            // {
            //     label: 'PED_ID',
            //     route: 'processor-config/ped-id',
            //   },
          ],
        },
      ],
      iconClasses: 'fa fa-cogs fa-lg desktop',
      // id: 'link_setup',
      label: 'SETUP',
    },
    {
      children: [
        {
          label: 'ROUTING',
          children: [
            {
              id: 'link_processor_adapter',
              label: 'DESTINATION_END_POINT',
              route: 'routing/processor-adapter',
            },
            {
              id: 'link_routing_rule',
              label: 'ROUTING_RULE',
              route: 'routing/rule/destination',
            },
            {
              id: 'link_routing_router',
              label: 'DESTINATION_ROUTER',
              route: 'routing/router/route',
            },
          ],
        },
        {
          label: 'WORKFLOWS',
          children: [
            {
              id: 'link_workflow',
              label: 'WORKFLOW',
              route: 'routing/workflow-new',
            },
            {
              id: 'link_workflow_rule',
              label: 'MULTI_DESTINATION',
              route: 'routing/rule/workflow',
            },
            {
              id: 'link_workflow_router',
              label: 'WORKFLOW_ROUTER',
              route: 'routing/router/workflow',
            },
          ],
        },
        {
          id: 'link_imf',
          label: 'IMF',
          route: 'adapter-configuration/imf',
        },
        {
          id: 'link_l1_adapters',
          label: 'L1_ADAPTERS',
          route: 'adapter-configuration/l1-adapters',
        },
        {
          id: 'link_l3_adapters',
          label: 'L3_ADAPTERS',
          route: 'adapter-configuration/l3-adapters',
        },
        {
          id: 'link_tag_rule',
          label: 'Tags',
          route: 'routing/ruletags',
        },
        // {
        //   id: 'link_el_function',
        //   label: 'EL_FUNCTIONS',
        //   route: 'processor-config/el-function',
        // },
        {
          id: 'link_lookup_values',
          label: 'LOOKUP_VALUES',
          route: 'look-up-configuration',
        },
 /*       {
          id: 'link_bin_table',
          label: 'BIN_TABLE',
          route: 'processor-config/bin-table',
        },
        {
          id: 'link_emv_data',
          label: 'EMV Data',
          route: 'processor-config/emv-data',
        },
        {
          id: 'link_extractor',
          label: 'Extractor',
          route: '/extractor-ui',
        },
 */       {
          id: 'link_dek',
          label: 'DEK',
          route: 'processor-config/dek',
        },
/*        {
          id: 'link_l1_adapters',
          label: 'RUNTIME_PROPER',
          route: 'runtime/runtimeproperties',
        },
*/        {
          // id: 'link_core_properties',
          id: 'link_l1_adapters',
          label: 'CORE_PROPERTIES',
          route: 'processor-config/core-properties',
        },
      ],
      iconClasses: 'fa fa-sliders fa-lg desktop',
      // id: 'link_configuration',
      label: 'CONFIGURATION',
    },
    {
      children: [
        {
          label: 'STATUS',
          route: 'deployment/deployment-status',
          id: 'link_deployment_status',
        },
        {
          label: 'Schedule',
          route: 'deployment/deployment-schedule',
          id: 'link_deployment_schedule',
        },
        {
          label: 'HISTORY',
          route: 'deployment/history',
          id: 'link_deployment_history',
        },
        {
          label: 'SWITCH_CLUSTERS',
          route: 'deployment/switch-clusters',
          id: 'link_deployment_clusters',
        },
        {
          label: 'Workflow JSON',
          route: 'deployment/deployment-workflow-mapper',
          id: 'link_deployment_l2json',
        },
      ],
      iconClasses: 'fa fa-server fa-lg desktop',
      // id: 'link_deployment_and_scheduling',
      label: 'DEPLOYMENT',
    },
    {
      children: [
        {
          id: 'link_txn_log',
          label: 'TRANSACTION_LOG',
          route: 'logs/transaction-log',
        },
        {
          id: 'link_invalid_txn_log',
          label: 'INVALID_LOG',
          route: 'logs/invalid-log',
        },
        // {
        //   id: 'link_access_log',
        //   label: 'ACCESS_LOG',
        //   route: 'logs/access-log',
        // },
        {
          id: 'link_audit_log',
          label: 'AUDIT_LOG',
          route: 'logs/audit-log',
        },
        {
          id: 'link_saf_queue',
          label: 'SAF_QUEUE',
          route: 'logs/saf-queue',
        },
        {
          id: 'link_exception_queue',
          label: 'EXCEPTION_QUEUE',
          route: 'logs/exception-queue',
        },
      ],
      iconClasses: 'fa fa-database fa-lg desktop',
      label: 'LOGS',
    },
    // {
    //   children: [
    //     {
    //       id: 'link_device_mapping',
    //       label: 'DEVICE_CODE_MAPPING',
    //       route: 'processor-config/device-code-mapping',
    //     },
    //     {
    //       id: 'link_merchant_mapping',
    //       label: 'MERCHANT_CODE_MAPPING',
    //       route: 'processor-config/merchant-code-mapping',
    //     },
    //     {
    //       id: 'link_error_mapping',
    //       label: 'ERROR_CODE_MAPPING',
    //       route: 'processor-config/error-code-mapping',
    //     },
    //     {
    //       id: 'link_cut_off_mapping',
    //       label: 'CUTT_OFF_MAPPING',
    //       route: 'processor-config/cutt-off-mapping',
    //     },
    //     {
    //       id: 'link_bin_data',
    //       label: 'BIN_DATA',
    //       route: 'processor-config/bin-data',
    //     },

    //   ],
    //   iconClasses: 'icon-size icon-padding icon-processor_config',
    //   label: 'PROCESSOR_CONFIG',
    // },
    {
      iconClasses: 'fa fa-battery-three-quarters fa-lg desktop',
      id: 'link_status',
      label: 'STATUS',
      route: 'status',
    },
    {
      children: [
        {
          id: 'link_pending_approvals',
          label: 'Approval',
          route: 'approvals/approvals',
        },
        {
          id: 'link_notification',
          label: 'NOTIFICATION',
          route: 'approvals/notifications',
        },
      ],
      iconClasses: 'fa fa-bell-o fa-lg desktop',
      label: 'Change Request',
    },
    /*  {
      iconClasses: 'fa fa-battery-three-quarters fa-lg desktop',
      id: 'link_status',
      label: 'Master Config',
      route: 'status',
    },
    {
      children: [
        {
          id: 'link_pending_approvals',
          label: 'Copy as',
          route: 'approvals/approvals',
        },
        {
          id: 'link_notification',
          label: 'NOTIFICATION',
          route: 'approvals/notifications',
        },
      ],
      iconClasses: 'fa fa-bell-o fa-lg desktop',
      label: 'Change Request',
    }, */
    // {
    //   children: [
    //     {
    //       id: 'link_merchant_reports',
    //       route: 'reports/merchant',
    //       label: 'MERCHANT',
    //     },
    //   ],
    //   iconClasses: 'fa fa-bar-chart fa-lg desktop',
    //   label: 'REPORTS',
    // },
    {
      children: [
        {
          id: 'link_exports',
          label: 'Export',
          route: 'export-list',
        },
        {
          id: 'link_exports',
          label: 'Import',
          route: 'export-list/import-snapshot',
        },
      ],
      iconClasses: 'fa fa-exchange fa-lg desktop',
      id: 'link_exports',
      label: 'IMPORT_EXPORT',
    },
	{
	      children: [
	        {
	          id: 'link_download',
	          label: 'Download',
	          route: 'share-configurations/download',
	        },
			{
			  id: 'link_upload',
			  label: 'Upload',
			  route: 'share-configurations/upload',
			},
	     
	      ],
	      iconClasses: 'fa fa-share-alt fa-lg desktop',
	      id: 'link_download',
	      label: 'Share Configurations ',
	    },
	
	  
  ],
  skin: 'blue-light',
};
