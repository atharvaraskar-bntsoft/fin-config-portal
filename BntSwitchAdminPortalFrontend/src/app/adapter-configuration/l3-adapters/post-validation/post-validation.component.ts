import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppState } from '@app/store/state/app.state';
import { DraftTransform, VersionData } from '../../../store/actions/l1-adapter.action';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectVersionData } from '@app/store/selectors/l1-adapter.selectors';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '@app/services/alert.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-validation',
  templateUrl: './post-validation.component.html',
  styleUrls: ['./post-validation.component.scss'],
})
export class PostValidationComponent implements OnInit {
  @Input() widthConfig: any;
  @Input() adapterData: any;
  @Input() name: any;
  @Input() template: any;
  @Input() tabIndex: any;
  @Input() isEdit: any;
  @Input() public readOnlyFlag = false;
  public componetDestroyed = new Subject();
  public btnDisable = false;
  @Output() public tabValue: EventEmitter<Object> = new EventEmitter<Object>();
  public editorContent = {
    ipc: 'SCRIPT_ERROR',
    marker: 'post_validation',
    script: '',
    type: 'groovy_executor',
  };
  public transjections: Array<any>;
  public isSaveDraft = true;
  public transactionRequest: Array<any>;
  public currentLang: string;
  editorOptions = {theme: 'vs-dark', language: 'text/plain'};
  constructor(
    private alertService: AlertService,
    private _router: Router,
    private _store: Store<IAppState>,
    private translate: TranslateService) { 
      this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentLang = response.data.settingDto.language;
          this.translate.setDefaultLang(this.currentLang);
        }
      });   
  }

  ngOnInit() {   
    if (this.adapterData && this.adapterData.transformData.requestMapping) {
      this.adapterData?.transformData?.requestMapping?.transactions.map(item => {
        const mapping = item.request.mappings.find(map => map && map.marker === 'post_validation');
        if (mapping) {
          this.editorContent = mapping;
          if (!this.transjections) {
            this.transjections = [];
          }
          this.transjections.push(item);
        }
        return item;
      });
    }
  }
  public draftTransform(): void {
    this.removeMapping();
    if (this.transjections) {
      this.updateObject();
      this.editorContent = {
        ipc:this.editorContent.ipc,
        marker:this.editorContent.marker,
        script:this.editorContent.script.replace(/<[^>]*>/g, ''),
        type:this.editorContent.type
      }
      this.adapterData.postvalidation = this.editorContent;
    }
    this._store.dispatch(new DraftTransform(this.adapterData));
  }

  public getrequest(data) {
    if (data && data.transformData.requestMapping) {
      return data.transformData.requestMapping.transactions;
    }
    return [];
  }
  
  prevTabValue(): void {
    this.tabValue.emit(3);
  }
  removeMapping() {
    if (this.adapterData && this.adapterData.transformData.requestMapping) {
      this.adapterData.transformData.requestMapping.transactions.map(item => {
        item.request.mappings = item.request.mappings.filter(
          map => map && map.marker !== 'post_validation',
        );
        return item;
      });
    }
  }

  private updateObject(): void {
    this.adapterData.transformData.requestMapping.transactions.map(item => {
      const items = this.transjections.find(tran => tran.name === item.name);
      if (items) {
        const mapping = item.request.mappings.find(
          map => map && map.marker === this.editorContent.marker,
        );
        if (!mapping) {
          item.request.mappings.push(this.editorContent);
        }
        return item;
      } else {
        return item;
      }
    });
  }

  public versionData(): void {
    this.btnDisable = true;
    this._store.dispatch(new VersionData(this.adapterData));
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectVersionData))
      .subscribe((response: any) => {
        if (response && response.status === 'success') {
          this.btnDisable = false;
          this._router.navigateByUrl('/adapter-configuration/l3-adapters');
        }
      });
  }


}
