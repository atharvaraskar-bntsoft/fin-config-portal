import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { ClearState } from '@app/store/actions/rule-engine.actions';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import {
  CreateTags,
  EditTags,
  GetOperatorTypeList,
  GetTags,
  UpdateTags,
} from '@app/store/actions/rule-tag.action';
import { GetLatestWorkFlowService } from '@app/store/actions/workflows.actions';
import {
  createTagList,
  editTagList,
  selectOperators,
  selectRuleTagList,
  updateTagList,
} from '@app/store/selectors/rule-tag.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { selectLatestWorkflowService } from '@app/store/selectors/workflows.selectors';
import { GetMessageContextList } from '../../../store/actions/l1-adapter.action';
import { SelectMessageContextList } from '../../../store/selectors/l1-adapter.selectors';
import { IAppState } from '@app/store/state/app.state';
import { AlertService } from '@app/services/alert.service';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable, of, Subject } from 'rxjs';
import { distinct, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss'],
})
export class CreateTagComponent implements OnInit {
  public isSpinning = true;
  public serviceList: any;
  public tagList: any = [];
  public payload: any = {
    active: 1,
    condition: {},
    deleted: 0,
    exchangeType: null,
    name: null,
    serviceType: null,
    tag: null,
  };
  public currentLang: string;
  public componetDestroyed = new Subject();
  public conditionObj;
  public edit = false;
  public tagError = false;
  public tag = false;
  public ExchangeTypeList = [
    { name: 'Request', value: 'request' },
    { name: 'Response', value: 'response' },
  ];
  operatorList: any;
  public jsonData;
  public isVisiblecon = false;
  constructor(
    private _store: Store<IAppState>,
    private translate: TranslateService,
    protected router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private sanitize: DomSanitizer
  ) {
   
  }

  public ngOnInit() {
     // dispatch an Action for the OperatorList
     this._store.dispatch(new GetOperatorTypeList());
     this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
       if (response) {
         this.currentLang = response.data.settingDto.language;
         this.translate.setDefaultLang(this.currentLang);
       }
     });
     // Get the services for the tags
     this._store.dispatch(new GetLatestWorkFlowService());
     this._store
       .pipe(takeUntil(this.componetDestroyed), select(selectLatestWorkflowService))
       .subscribe(res => {
         if (res) {
           this.serviceList = res.servicelist;
           this.isSpinning = false;
         }
       });
     this._store
       .pipe(takeUntil(this.componetDestroyed), select(selectRuleTagList))
       .subscribe(res => {
         if (res) {
           this.tagList = res.data;
           this.isSpinning = false;
         }
       });
     this._store.pipe(takeUntil(this.componetDestroyed), select(createTagList)).subscribe(res => {
       if (res && this.tag) {
         this.tag = false;
         this.router.navigate(['routing/ruletags']);
       }
     });
     this._store.pipe(takeUntil(this.componetDestroyed), select(updateTagList)).subscribe(res => {
       if (res && this.tag) {
         this.tag = false;
         this.router.navigate(['routing/ruletags']);
       }
     });
     // get all the operator List
     this._store
       .pipe(
         takeUntil(this.componetDestroyed),
         select(selectOperators),
         map((resp: any) => {
           if (resp) {
             return [...resp.OperatorList.intOperators, ...resp.OperatorList.stringOperators];
           }
           return null;
         }),
       )
       .subscribe(res => {
         if (res) {
           const result = res.filter((v, i, a) => a.findIndex(t => t.text === v.text) === i);
           this.operatorList = result;
         }
       });
     // };
     this._store.dispatch(new GetMessageContextList(0));
     this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
       if (response && response.data) {
         this.jsonData = response.data.messageContextFieldsByVersion;
       }
     });
    this._store.dispatch(new GetTags());
    if (this.route.snapshot.paramMap.get('id')) {
      this.edit = true;
      this._store.dispatch(new EditTags(this.route.snapshot.paramMap.get('id')));
      this._store.pipe(takeUntil(this.componetDestroyed), select(editTagList)).subscribe(res => {
        if (res) {
          this.payload = res.data;
          this.conditionObj = JSON.parse(JSON.stringify(res.data.condition));
        }
      });
    }
  }
  public getRule(value) {
    if (value.condition) {
      this.conditionObj = JSON.parse(JSON.stringify(value.condition));
      this.payload.condition = JSON.parse(JSON.stringify(value.condition));
      this.isVisiblecon = false;
    }
  }
  public getService(value) {
    this.serviceList = value;
    this.isSpinning = false;
  }

  public saveRuleTag() {
    this.tagError = false;
     this.payload.name = this.payload.name.trim();
     this.payload.name = this.payload.name.replace(/<[^>]*>/g, '');
    if (
      JSON.stringify(this.payload).indexOf('null') === -1 &&
      this.payload.name &&
      this.payload.condition &&
      this.payload.condition.type
    ) {
      this.tag = true;
      this._store.dispatch(new CreateTags(this.payload));
    } else {
      this.alertService.responseMessage({
        status: 'failure',
        message: 'Please fill out mandatory fields',
      });
    }
  }
  public UpdateTag() {
    this.tagError = false;
    if (JSON.stringify(this.payload).indexOf('null') === -1 && this.payload.name) {
      this.tag = true;
      this._store.dispatch(new UpdateTags(this.payload));
    } else {
      this.tagError = true;
    }
    this.isSpinning = false;
  }
  private getValue(condition) {
    if (condition) {
      if (condition.conditions && condition.conditions.length > 0) {
        condition.conditions.forEach(element => {
          if (element.conditions) {
            this.getValue(element);
          } else {
            this.inValue(element);
          }
        });
      } else {
        this.inValue(condition);
      }
    }
  }
  private inValue(conditions) {
    if (conditions.type === 'in') {
      if (conditions.value.indexOf(',') !== -1) {
        conditions.value = conditions.value.split(',');
      } else {
        conditions.value = [conditions.value];
      }
    }
  }

  private getconValue(condition) {
    let conValue = condition.value;
    if (condition.type === 'in' && conValue[0]) {
      condition.value.forEach((a, i) => {
        if (i === 0) {
          conValue = a;
        } else {
          conValue = conValue + ',' + a;
        }
      });
      condition.value = conValue;
    }
    return condition;
  }
}
