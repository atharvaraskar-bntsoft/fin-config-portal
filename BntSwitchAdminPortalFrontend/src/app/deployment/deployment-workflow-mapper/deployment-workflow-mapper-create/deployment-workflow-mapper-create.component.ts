import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterService } from '@app/services/router.service';

import { Store, select } from '@ngrx/store';
import { GetCoreProperties } from '@app/store/actions/core-properties.action';
import { selectCorePropertiesListGet } from '@app/store/selectors/core-properties.selector';

import { DeploymentWorkflowService } from '@app/services/deployment-workflow-mapper.service';
import { GetLatestWorkFlows } from '@app/store/actions/workflows.actions';
import { selectLatestWorkflow } from '@app/store/selectors/workflows.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deployment-workflow-mapper-create',
  templateUrl: './deployment-workflow-mapper-create.component.html',
  styleUrls: ['./deployment-workflow-mapper-create.component.scss']
})
export class DeploymentWorkflowMapperCreateComponent implements OnInit, OnDestroy {

  serviceRows: any[] = [];
  workflowRows: any[] = [];
  coreRows: any[] = [];
  latestWorkflowRows: any[] = [];

  loadingService = true;
  loadingWorkflow = true;
  loadingLatestWorkflow = true;
  public isLoading = false;
  public loaderText = 'Generating Deployment Workflow...';

  private destroy$ = new Subject<void>();

  constructor(
    private _routerService: RouterService,
    private _store: Store,
    private _deploymentWorkflowService: DeploymentWorkflowService,
	private router: Router,
    ) {}

  ngOnInit(): void {
    this.loadService();
    this.loadWorkflow();
    this.loadCoreProperties();
    this.loadLatestWorkflow();
  }

  // ================= SERVICE =================
  loadService(): void {
    this._routerService.getRouterList({ payload: 'service' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const list = res?.data?.routingList || res?.routingList || [];
          this.serviceRows = this.mapData(list, false);
          this.loadingService = false;
        },
        error: () => this.loadingService = false
      });
  }

  // ================= WORKFLOW ROUTER =================
  loadWorkflow(): void {
    this._routerService.getRouterList({ payload: 'workflow' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const list = res?.data?.routingList || res?.routingList || [];
          this.workflowRows = this.mapData(list, true);
          this.loadingWorkflow = false;
        },
        error: () => this.loadingWorkflow = false
      });
  }

  // ================= CORE =================
  loadCoreProperties(): void {
    this._store.dispatch(
      new GetCoreProperties({ filter: '', page: 1, 'page-size': 20 })
    );

    this._store.pipe(
      takeUntil(this.destroy$),
      select(selectCorePropertiesListGet)
    ).subscribe((res: any) => {

      if (res?.data?.corePropertiesList) {
        this.coreRows = res.data.corePropertiesList.map(item => {
          const versions = item.corePropertiesDetails || [];

          return {
            id: item.id,
            name: item.name,
            type: 'Core Property',
            versions,
            selectedVersion: versions.find((v: any) => v.live) || versions[0] || null,
            selected: false
          };
        });
      }
    });
  }

  // ================= LATEST WORKFLOW =================
  loadLatestWorkflow(): void {
    this._store.dispatch(
      new GetLatestWorkFlows({ page: 1, 'page-size': 20 })
    );

    this._store.pipe(
      takeUntil(this.destroy$),
      select(selectLatestWorkflow)
    ).subscribe((res: any) => {

      if (res && res.status === 'success') {

        const list = res.data.workflowlist || [];
        const groupedMap = new Map();

        list.forEach(item => {
          if (!groupedMap.has(item.workflowId)) {
            groupedMap.set(item.workflowId, {
              
              name: item.name,
			  type: 'Workflow',
              versions: [],
              selectedVersion: null,
              selected: false
            });
          }

          groupedMap.get(item.workflowId).versions.push({
            id: item.id,
            version: item.version
          });
        });

        this.latestWorkflowRows = Array.from(groupedMap.values()).map(row => {
          row.versions.sort((a, b) => b.version - a.version);

          return {
            ...row,
            selectedVersion: row.versions[0]
          };
        });

        this.loadingLatestWorkflow = false;
      }
    });
  }

  // ================= MAPPING =================
  mapData(list: any[], isWorkflow: boolean) {
    return list.map(item => {
      const versions = item.routingVersion || [];

      return {
        id: item.id,
        name: item.name,
        type: isWorkflow ? 'Workflow Router' : 'Destination Router',
        versions,
        selectedVersion: versions.find((v: any) => v.live) || versions[0] || null,
        selected: false
      };
    });
  }

  // ================= SELECT =================
  onServiceSelect(row: any) {
    this.serviceRows.forEach(r => r.selected = false);
    row.selected = !row.selected;
  }

  onWorkflowSelect(row: any) {
    this.workflowRows.forEach(r => r.selected = false);
    row.selected = !row.selected;
  }

  onCoreSelect(row: any) {
    this.coreRows.forEach(r => r.selected = false);
    row.selected = !row.selected;
  }

  onLatestWorkflowSelect(row: any) {
    this.latestWorkflowRows.forEach(r => r.selected = false);
    row.selected = !row.selected;
  }

  // ================= MAIN =================
  generateDeployment() {

    const selectedCore = this.coreRows.find(r => r.selected);
    const selectedLatestWorkflow = this.latestWorkflowRows.find(r => r.selected);

    const selectedRouters = [
      ...this.serviceRows,
      ...this.workflowRows
    ].filter(r => r.selected);

    if (!selectedCore || !selectedRouters.length) {
      alert('Please complete selection');
      return;
    }


    const deploymentStatus: any[] = selectedRouters.map(r => ({
      id: null,
      componentId: r.selectedVersion?.id,
      componentName: r.name,
      componentType: 'Router',
      componentTypeShowOnUI: null,

      currentVersion: r.selectedVersion?.version,

      idVersionListToSchedule: r.versions.map(v => ({
        id: v.id,
        version: v.version
      })),

      lastDeploymentHistory: {
        version: null,
        lastModified: null,
        status: null,
        message: "Never deployed"
      },

      lastModifiedOn: Date.now(),
      lastModifiedBy: 1,

      status: 'Non-scheduled',
      userName: 'BNT Admin',
      select: true
    }));

    // 🔥 WORKFLOW FIX (FINAL)
    if (selectedLatestWorkflow) {
      deploymentStatus.push({
        id: null,

         componentId: selectedLatestWorkflow.selectedVersion?.id ,// ✅ IMPORTANT
        componentName: selectedLatestWorkflow.name,
        componentType: 'WF',
        componentTypeShowOnUI: null,

        currentVersion: selectedLatestWorkflow.selectedVersion?.version,

        // ✅ FULL VERSION LIST (REQUIRED)
        idVersionListToSchedule: selectedLatestWorkflow.versions.map(v => ({
          id: v.id,
          version: v.version
        })),

        lastDeploymentHistory: {
          version: null,
          lastModified: null,
          status: null,
          message: "Never deployed"
        },

        lastModifiedOn: Date.now(),
        lastModifiedBy: 1,

        status: 'Non-scheduled',
        userName: 'BNT Admin',
        select: true
      });
    }

    const payload = {
      //switchCluster: { id: "1", name: "0001" }, // ✅ REQUIRED
      corePropertyDetailId: selectedCore.selectedVersion?.id,
      scheduledOn: Date.now(),
      deploymentStatus
    };

    console.log('FINAL PAYLOAD:', payload);
	this.isLoading = true;
    this._deploymentWorkflowService.generateWorkflow(payload).subscribe({
		next: () => {
		this.isLoading = false;	
		   alert('Deployment created successfully');
           
		   this.router.navigate(['/deployment/deployment-workflow-mapper']);
		 },
      error: () => {
		this.isLoading = false;
		alert('Error creating deployment')
		}
    });
  }

  get isValidSelection(): boolean {
    return (
      this.serviceRows?.some(r => r.selected) &&
      this.workflowRows?.some(r => r.selected) &&
      this.latestWorkflowRows?.some(r => r.selected) &&
      this.coreRows?.some(r => r.selected)
    );
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}