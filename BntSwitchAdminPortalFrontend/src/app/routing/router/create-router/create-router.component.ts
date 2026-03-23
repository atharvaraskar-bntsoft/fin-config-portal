import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  GetServiceType,
  GetRuleList,
  SaveRuleList,
  GetRuleById,
  CommitRuleList,
  ClearState,
  ClearCommitRuleSucess,
  GetRuters,
} from '@app/store/actions/router.actions';
import {
  commitRouterResponse,
  routerServiceType,
  routerRuleList,
  getRouterById,
  routers,
} from '@app/store/selectors/router.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { AlertService } from '@app/services/alert.service';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-create-router',
  styleUrls: ['./create-router.component.scss'],
  templateUrl: './create-router.component.html',
})
export class CreateRouterComponent implements OnInit, OnDestroy {
  public serviceTypeList: any = [];
  public ruleList: any = [];
  public currentLang: 'en_EN';
  public ruleOrderList: number;
  public name: string;
  public description: string;
  public isItemEnable = false;
  public paymenttype: null;
  public version: any;
  public verdata: any;
  public ruleTypeRouter: any;
  public editId: any;
  public submitted = false;
  public commit = false;
  public saveasnew: any;
  public saveversion = false;
  public ruletype: any;
  public ruleListCount = false;
  componetDestroyed = new Subject();
  submit = new Subscription();
  usedService: any = [];
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    protected router: Router,
    private alertService: AlertService,
    private activeRouter: ActivatedRoute,
  ) {

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(routers))
      .subscribe((routerList: any) => {
        if (routerList !== null) {
          this.usedService = routerList
            .map(item => {
              if (item.routetype === 'service') {
                return item.routetypevalue;
              }
            })
            .filter(it => it);
          this._store.dispatch(new GetServiceType(routerType));
        }
      });

    this.ruleTypeRouter = this.activeRouter.snapshot.data.ruletype;

    const routerType = this.ruleTypeRouter === 'workflow' ? 'workflow' : 'service';

    this._store.dispatch(new GetRuleList(this.ruleTypeRouter));

    this.ruleTypeRouter = this.ruleTypeRouter === 'workflow' ? 'workflow' : 'service';

    this._store.dispatch(new GetRuters(this.ruleTypeRouter));

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(routerServiceType))
      .subscribe((serviceType: any) => {
        if (serviceType !== null) {
          this.serviceTypeList = serviceType.filter(
            service =>
              service.name !== null &&
              service.name !== 'GATEWAY_SERVICE' &&
              this.usedService.indexOf(service.name) === -1,
          );
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: any) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });
    if (this.editId) {
      this._store.dispatch(new GetRuleById(this.editId));
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(getRouterById))
        .subscribe((result: any) => {
          if (result) {
            const data = JSON.parse(JSON.stringify(result));
            this.name = JSON.parse(JSON.stringify(data.routeName));
            if (this.ruleTypeRouter === 'workflow') {
              this.paymenttype = JSON.parse(JSON.stringify(data.routetypevalue));
            } else {
              this.paymenttype = JSON.parse(JSON.stringify(data.routetypevalue.name));
            }
            this.description = JSON.parse(JSON.stringify(data.routeDesc));
            this.ruleList = JSON.parse(JSON.stringify(data.ruleListUpdate));
            this.ruletype = JSON.parse(JSON.stringify(data.routetypevalue));
            this.ruleList = this.ruleList.map(item => {
              //  item['ruleversion'] = item.versionList.value;
              item['enable'] = item.priority > 0;
              item['priority'] = item.priority === '0' ? null : item.priority;
              item['ruleConfiguration'] = item.versionList.map(version => {
                version['version'] = version.text;
                version['id'] = version.value;
                return version;
              });
              item['ruleversion'] = item.liveVersion;
              return item;
            });
            this._ruleSort();
            this.ruleListCount =
              this.ruleList.filter(
                priority => priority.priority !== null && priority.priority !== 0,
              ).length === 0;
            this._store.dispatch(new ClearCommitRuleSucess());
          }
        });
    } else {
      this._store
        .pipe(takeUntil(this.componetDestroyed), select(routerRuleList))
        .subscribe((ruleList: any) => {
          
          if (ruleList !== null) {
            this.ruleList = Utils.newData(ruleList);
            this.ruleList = this.ruleList.map(item => {
              item['priority'] = 0;
              item['ruleversion'] = item.ruleConfiguration[0].id;
              return item;
            });
          }
        });
    }
  }

  ngOnInit() {

    this.editId = this.activeRouter.snapshot.paramMap.get('id');
   this._store.pipe(select(commitRouterResponse)).subscribe((data: any) => {
      
      this.submitted = false;
      if (data && data.status === 'success') {
        this._store.dispatch(new ClearCommitRuleSucess());
        if (this.ruleTypeRouter === 'workflow') {
          this.router.navigate(['routing/router/workflow']);
        } else if (this.ruleTypeRouter === 'service') {
          this.router.navigate(['routing/router/route']);
        }
        this._store.dispatch(new ClearState());
      }
    });
  }

  public saveRouter() {
    const saveObject = {
      id: this.editId ? this.editId : null,
      routeDesc: this.description,
      routeName: this.name,
      routetype: this.ruleTypeRouter === 'workflow' ? 'workflow' : 'service',
      routetypevalue: this.editId ? this.ruletype : this.paymenttype,
      ruleList: this.verdata,
      ruletype: this.ruleTypeRouter === 'workflow' ? 'workflow' : 'route',
    };
    if (!this.commit) {
      this._store.dispatch(new SaveRuleList(saveObject));
    } else if (this.saveversion && this.commit) {
      this._store.dispatch(new CommitRuleList(saveObject));
    } else if (this.commit) {
      this._store.dispatch(new CommitRuleList(saveObject));
    }
  }

  public save() {
    this.ruleList.forEach(item => {
      if (item.priority !== 0 && item.priority !== null) {
        if (item.ruleversion == null) {
          this.isItemEnable = true;
        } else {
          this.isItemEnable = false;
        }
      }
    });
    const ruleOrderList = this.ruleList
      .filter(rule => rule.priority !== 0)
      .map(item => {
        return {
          active: true,
          priority: item.priority,
          version: item.ruleversion,
        };
      });
    const lastvalue = this.ruleList
      .filter(rule => rule.priority === 0)
      .map(item => {
        return {
          active: false,
          priority: item.priority,
          version: item.ruleversion,
        };
      });
    this.verdata = [...ruleOrderList, ...lastvalue];

    if (!this.isItemEnable) {
      this.saveRouter();
      this.submitted = true;
      this.isSubmitted();
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please Select Version for enabled Rule',
      });
    }
  }
  // loader
  isSubmitted() {
    this.submit = this.alertService
      .getLoader()
      .pipe(
        takeUntil(this.componetDestroyed),
        takeWhile(() => this.submitted),
      )
      .subscribe(data => {
        if (data === false) {
          this.submitted = data;
          this.submit.unsubscribe();
        }
      });
  }
  // loader
  public toggle(item) {
    const list = this.ruleList.filter(
      priority =>
        priority.priority !== undefined && priority.priority !== 0 && priority.priority !== null,
    );
    item['enable'] = item['enable'] !== undefined ? !item['enable'] : true;
    this.isItemEnable = item['enable'] == true ? true : false;
    item['priority'] = list === undefined ? 1 : list.length + 1;
    if (!item['enable']) {
      item['priority'] = 0;
    }
    this.ruleListCount =
      this.ruleList.filter(priority => priority.priority !== null && priority.priority !== 0)
        .length === 0;
    this._ruleSort();
  }

  public up(idx: any) {
    if (idx !== 0) {
      let ruleOrderList = this.ruleList.filter(rule => rule.priority !== 0);
      const lastvalue = this.ruleList.filter(rule => rule.priority === 0);
      const x = idx;
      const y = idx - 1;
      ruleOrderList[x] = ruleOrderList.splice(y, 1, ruleOrderList[x])[0];
      ruleOrderList = ruleOrderList.map((item, index) => {
        item.priority = index + 1;
        return item;
      });
      this.ruleOrderList = ruleOrderList.length;
      this.ruleList = [...ruleOrderList, ...lastvalue];
    }
  }
  public down(idx: any) {
    let ruleOrderList = this.ruleList.filter(rule => rule.priority !== 0);
    if (idx !== ruleOrderList.length - 1) {
      const lastvalue = this.ruleList.filter(rule => rule.priority === 0);
      const x = idx;
      const y = idx + 1;
      ruleOrderList[x] = ruleOrderList.splice(y, 1, ruleOrderList[x])[0];
      ruleOrderList = ruleOrderList.map((item, index) => {
        item.priority = index + 1;
        return item;
      });
      this.ruleOrderList = ruleOrderList.length;
      this.ruleList = [...ruleOrderList, ...lastvalue];
    }
  }

  private _ruleSort() {
    const ruleList = this.ruleList.filter(
      rule => parseInt(rule.priority) > 0 && rule.priority !== null,
    );
    const lastvalue = this.ruleList.filter(rule => rule.priority === 0 || rule.priority === null);
    let ruleOrderList = ruleList.sort((item1, item2) => item1.priority - item2.priority);
    ruleOrderList = ruleOrderList.map((item, index) => {
      item.priority = index + 1;
      return item;
    });
    this.ruleOrderList = ruleOrderList.length;
    this.ruleList = [...ruleOrderList, ...lastvalue];
  }

  public cancel() {
    if (this.ruleTypeRouter === 'workflow') {
      this.router.navigate(['routing/router/workflow']);
    } else {
      this.router.navigate(['routing/router/route']);
    }
  }

  public commitSave() {
    this.commit = true;
    this.saveversion = false;
    this.save();
  }

  public saveAsNewVersion() {
    this.commit = true;
    this.saveversion = true;
    this.save();
  }

  public saveOnly() {
    this.commit = false;
    this.saveversion = false;
    this.save();
  }
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.submit.unsubscribe();
    this._store.dispatch(new ClearState());
    this.componetDestroyed.unsubscribe();
  }
}
