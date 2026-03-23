import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IAppState } from '../../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { ClearState, GetLatestWorkFlows } from '../../store/actions/workflows.actions';
import { selectLatestWorkflow } from '../../store/selectors/workflows.selectors';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { GetMessageContextList } from '@app/store/actions/l1-adapter.action';
import { SelectMessageContextList } from '@app/store/selectors/l1-adapter.selectors';
declare var jQuery: any;

@Component({
  selector: 'app-workflow',
  styleUrls: ['./workflow.component.scss'],
  templateUrl: './workflow.component.html',
})
export class WorkflowComponent implements OnInit {
  public rows: any = [];
  selectedVersion: any;
  public columns: Array<any> = [];
  readonly headerHeight = 40;
  readonly rowHeight = 75;
  readonly pageLimit = 15;
  private _page = 1;
  public currentPagination = '20';
  public currentLang: string;
  public isSpinning = true;
  componetDestroyed = new Subject();
  public fg: UntypedFormGroup;
  @ViewChild('date', { static: true }) date: TemplateRef<any>;
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
  isVisibleTop = false;
  request: boolean;
  totalRecords: any;
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public nodes: any = [
  ];

  public linkWorkflowId = 'link_workflow';
  constructor(
    private router: Router,
    private _store: Store<IAppState>,
    private formBuilder: UntypedFormBuilder,
    translate: TranslateService,
    // private _router: Router,
  ) {
    this._store.dispatch(new GetMessageContextList(0));
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.isSpinning = false;
      }
    });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLatestWorkflow))
      .subscribe(response => {
        if (response && response.status === 'success') {
          this.request = true;
          if (this._page === 1) {
            this.rows = response.data.workflowlist;
          } else if (this.rows.length !== 0) {
            this.rows = this.rows.concat(response.data.workflowlist);
          }
          if (response.data['total-record'] === this.rows.length) {
            this.request = false;
          }
          this.isSpinning = false
          this.totalRecords = response.data['total-record'];
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
          this.loadPage(this._page);
        }
      });

    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {
      if (response) {
        this.permission = response.data.find(item => item.id === this.linkWorkflowId);
        this.permissionObject = this.permission;
      }
    });
  }

  ngModelChange(event) {
    this.isSpinning = true
    const groupBy = (arr, key) => {
      const initialValue = {};
      return arr.reduce((acc, cval) => {
        const myAttribute = cval[key];
        acc[myAttribute] = [...(acc[myAttribute] || []), cval]
        return acc;
      }, initialValue);
    };
    let output = groupBy(this.rows, 'workflowId'); // group by module
    if (event == 1) {
      this.rows = Object.values(output).map((item: any) => {
        return item.reduce(function (prev, current) {
          if (+current.version > +prev.version) {
            return current;
          } else {
            return prev;
          }
        });
      })
      this.rows = this.rows.sort(function (a, b) {
        if (a.workflowId < b.workflowId) {
          return 1;
        }
        if (a.workflowId > b.workflowId) {
          return -1;
        }
        // names must be equal
        return 0;
      });
      this.isSpinning = false;
    } else {
      this.loadPage(1)
    }
  }

  public dataTransformation(data) {
    return [{
      title: `Name: ${data.name}`,
      key: data.id,
      expanded: true,
      parent: true,
      children: this.recursiveTree(data.workFlowServices)
    }]
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  public recursiveTree(data) {
    return data.map((item) => {
      if (item.services?.length) {
        return {
          title: (item.serviceType === 'SERVICE') ? item.serviceName : item.groupName, key: item.id,
          icon: 'smile', children: this.recursiveTree(item.services), expanded: true, isDecison: (item.precedingDecisionUi) ? true : false, parent: false
        }
      } else {
        return { title: (item.serviceType === 'SERVICE') ? item.serviceName : item.groupName, key: item.id, parent: false, isLeaf: true, isDecison: (item.precedingDecisionUi) ? true : false }
      }
    })
  }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],
    });

    this.columns = [
      { prop: 'workflow', name: 'Workflow' },
      {
        prop: 'date',
        name: 'Last Updated On',
        cellTemplate: this.date,
        width: 30,
      },
      { prop: '', name: 'Action', cellTemplate: this.actions, sortable: false },
    ];
  }

  public onScroll() {
    if (this.request) {
      this._page = ++this._page;
      this.loadPage(this._page);
    }
  }

  editItem(item: any) {
    this.router.navigate(['/routing/workflow-new/edit', item.id]);
  }

  viewItem(item: any) {
    this.router.navigate(['/routing/workflow-new/', item.id, 'view']);
  }

  // start for validation
  isFieldValid(field: string) {
    return !this.fg.get(field).valid && this.fg.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  get f() {
    return this.fg.controls;
  }

  public createWorkFlow() {
    if (this.fg.valid) {
      this.isSpinning = true;
      const data = {
        name: this.f.name.value,
      };
    } else {
      this.validateAllFormFields(this.fg);
    }
  }

  private loadPage(pagenumber: number) {
    this.isSpinning = true
    this._store.dispatch(
      new GetLatestWorkFlows({
        page: pagenumber,
        'page-size': this.currentPagination,
      }),
    );
    this.request = false;
  }

  showModal(): void {
    this.isVisibleTop = true;
    this.fg.reset();
  }

  closeModal(): void {
    this.isVisibleTop = false;
    this.fg.reset();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
    this._store.dispatch(new ClearState());
  }
}
