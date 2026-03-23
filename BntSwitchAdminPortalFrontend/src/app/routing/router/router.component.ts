import { RouterService } from '@app/services/router.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import {
  GetRuters,
  ClearState,
  ClearCommitRuleSucess,
  GetServiceType,
} from '@app/store/actions/router.actions';
import { routers, routerServiceType } from '@app/store/selectors/router.selectors';
import { GetFilterData, ClearFilterData } from '@app/store/actions/filter.actions';
import { selectFilterData } from '@app/store/selectors/filter.selectors';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  IDestinationRouterList,
  IDestinationRoutingVersion,
  IService,
} from '@app/models/destination-router.interface';
import { Utils } from 'src/utils';
import { AlertService } from '@app/services/alert.service';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';

@Component({
  selector: 'app-router',
  styleUrls: ['./router.component.scss'],
  templateUrl: './router.component.html',
})
export class RouterComponent implements OnInit, OnDestroy {
  public routerList: any = [];
  public service: IService[];
  public place: any = '';
  private _filters: Array<any> = [];
  private _page = 1;
  public currentPagination = '20';
  public workflow: String = 'workflow';
  public ruleTypeRouter: any;
  public versiondata: any = [];
  public visibleRole = false;
  public objectData: any;
  public dataName: any;
  public visibleAnimateRole = false;
  public visibleAnimate = false;
  public placeholder: string;
  public id: number;
  public addrouterversion = false;
  public edittype: string;
  public currentLang: string;
  public serviceTypeList: any;
  public serviceFlag = false;
  public loading = false;
  public filterService;
  componetDestroyed = new Subject();
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public routingDestinationRouterId = 'link_routing_router';
  public workflowRouterId = 'link_workflow_router';
  public request: Boolean = true;
  public totalRecords: Number;
  public routingList: any;

  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private activeRouter: ActivatedRoute,
    private _router: Router,
    private routerService: RouterService,
    private alertService: AlertService,
  ) {
    this.edittype = this.activeRouter.snapshot.data.ruletype;
    this.ruleTypeRouter = this.edittype === 'workflow' ? 'workflow' : 'service';
    /**
     * TODO:-Have to Confirm whether below API is needed or not
     */
    this._store.dispatch(new GetServiceType(this.ruleTypeRouter));

    this.loading = true;
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(routers), tap(console.log))
      .subscribe((data: IDestinationRouterList) => {
        if (data) {
          // this.request = true;
          // this.routerList = routerList;
          this.loading = false;
          this.request = true;
          if (this._page === 1) {
            this.routerList = data['routingList'];
          } else if (this.routerList.length !== 0) {
            this.routerList = this.routerList.concat(this.routerList);
          }
          if (data['total-filtered-record'] === this.routerList.length) {
            this.request = false;
          }
          this.totalRecords = data['total-record'];
          this.loading = false;
          this._store.dispatch(new ClearCommitRuleSucess());
          /**
           * Dispatch an Action if router is Destination Router
           * i.e. ruleTypeRouter === "service" or ruleTypeRouter !== 'workflow'
           */
          if (this.ruleTypeRouter !== 'workflow') {
            this._store.dispatch(new GetServiceType(this.ruleTypeRouter));
          }
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          this.loadPage(this._page);
          translate.setDefaultLang(this.currentLang);
        }
      });

    if (this.ruleTypeRouter === 'service') {
      this._store.dispatch(new GetFilterData('/routing/filter'));
      this._store.pipe(select(selectFilterData)).subscribe(filter => {
        if (filter && filter !== null && filter.status !== 'failure' && filter !== undefined) {
          if (filter.data !== undefined && filter.data.service !== undefined) {
            this.service = this.filterServiceByName(filter.data.service, 'GATEWAY_SERVICE');
            this._store.dispatch(new ClearFilterData());
          }
        }
      });
    }

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        if (this.edittype === 'workflow') {
          this.permission = response.data.find(item => item.id === this.workflowRouterId);
        } else {
          this.permission = response.data.find(item => item.id === this.routingDestinationRouterId);
        }
        this.permissionObject = this.permission;
      }
    });
  }

  ngOnInit() {
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(routerServiceType))
      .subscribe((serviceType: any) => {
        if (serviceType !== null) {
          /**
           * Destination Router Label Handling whether Button Visible or Label
           */
          this.serviceTypeList = this.filterServiceByName(serviceType, 'GATEWAY_SERVICE');
          if (this.serviceTypeList.length !== this.routerList.length) {
            this.serviceFlag = true;
          } else {
            this.serviceFlag = false;
          }
        }
      });
  }

  public getFilterServiceData(eventData: HTMLSelectElement) {
    this.ruleTypeRouter = this.edittype === 'workflow' ? 'workflow' : 'service';
    if (!eventData) {
      delete this._filters[this.ruleTypeRouter];
    } else {
      this._filters[this.ruleTypeRouter] = eventData.name;
    }
    this._page = 1;
    this.loadPage(this._page);
  }

  private loadPage(pagenumber: Number) {
    this.ruleTypeRouter = this.edittype === 'workflow' ? 'workflow' : 'service';
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    let filter = {
      filter: Utils.transFilters(this._filters),
      page: pagenumber,
      'page-size': this.currentPagination,
      url: this.ruleTypeRouter,
    };
    filter = Utils.transFilters(this._filters) === '' ? this.ruleTypeRouter : filter;
    this.loading = true;
    this._store.dispatch(new GetRuters(filter));
  }

  public openVersion(versiondata: IDestinationRoutingVersion) {
    this.versiondata = versiondata.selectedRuleList.filter(
      rule => rule.priority !== '0' && rule.priority !== null,
    );
    this.openPopup();
  }

  public details(id) {
    this.id = id;
    this.createNavigationLink('view-details' + this.edittype, id);
  }

  public openPopup(): void {
    document.body.style.overflow = 'hidden';
    this.visibleRole = true;
    setTimeout(() => (this.visibleAnimateRole = true), 200);
  }

  public closePopup(): void {
    document.body.style.overflow = 'auto';
    this.visibleAnimate = false;
    setTimeout(() => (this.visibleRole = false), 100);
  }

  public edit(id: number): void {
    this.id = id;
    if (this.addrouterversion) {
      this.createNavigationLink('editversion', this.edittype, id);
    } else {
      this.createNavigationLink('edit', this.edittype, id);
    }
  }

  // Method to handle all the navigation on the page with prefix route Name
  // routing/router/ + passed url in method

  private createNavigationLink(...args): void {
    const prefixUrl = 'routing/router/' + this.edittype;
    const url = `${prefixUrl}/${args.join('/')}`;
    this._router.navigate([url]);
  }

  public deleteRoute(data: any): void {
    this.dataName = data.name;
    this.routerService
      .deleteRouteList({ payload: data.id })
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(res => {
        if (res) {
          this.afterDeletingRouterHandling(res);
        }
      });
  }

  private afterDeletingRouterHandling(data) {
    if (data && data.status === 'success') {
      this.alertService.responseMessage(data);
      this.loadPage(this._page);
    }
  }

  public editLive(live: any): void {
    this.routerService.updRouterList({ payload: live }).subscribe(res => {
      if (res && res.status === 'success') {
        this._store.dispatch(new GetRuters(this.ruleTypeRouter));
      }
    });
  }

  public addrouter(routeid): void {
    this.id = routeid;
    this.addrouterversion = true;
    this.edit(this.id);
  }

  isAllServiceLabelVsbl(): boolean {
    if (
      ((this.ruleTypeRouter === 'workflow' && this.routerList.length) ||
        (this.ruleTypeRouter === 'service' && !this.serviceFlag && !this.filterService)) &&
      !this.loading
    ) {
      return true;
    }
  }

  isCreateBtnVsbl(): boolean {
    if (
      ((this.serviceFlag && !this.filterService && this.ruleTypeRouter === 'service') ||
        (this.ruleTypeRouter === 'workflow' && !this.routerList.length)) &&
      !this.loading
    ) {
      return true;
    }
  }

  private filterServiceByName(services: IService[], serviceToBeRemove): IService[] {
    return services.filter(item => item.id !== null && item.name !== serviceToBeRemove);
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
