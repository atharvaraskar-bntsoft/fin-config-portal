import { Subscription } from 'rxjs';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { TemplateRef, ViewChild, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { IAppState } from '@app/store/state/app.state';
import { Store } from '@ngrx/store';
import { UpdateMasterConfigurationDetails } from '@app/store/actions/master-configuration.action';
import { configurationUpdated } from '@app/store/selectors/master-configuration.selector';

@Component({
  selector: 'app-master-configuration-details',
  templateUrl: './master-configuration-details.component.html',
  styleUrls: ['./master-configuration-details.component.scss'],
})
export class MasterConfigurationDetailsComponent implements OnInit {
  loading: boolean;
  rowHeight = 40;
  headerHeight = 40;
  columns = [];
  rows;
  isEditDialogVsl: boolean;
  screen: boolean;
  resultMaster = {
    row: null,
    screen: null,
  };
  tableProps: any;
  @ViewChild('editTemplate', { static: true }) editTemplate: TemplateRef<HTMLElement>;
  currentRow: any;
  masterForm: UntypedFormGroup;
  subscription: Subscription;
  constructor(
    private translateService: TranslateService,
    private store: Store<IAppState>,
    private router: Router,
  ) {
    const result =
      this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state;
    Object.assign(this.resultMaster, result);

    if (!result) {
      this.router.navigateByUrl('/settings/master-configuration');
    }
  }

  ngOnInit(): void {
    this.masterForm = new UntypedFormGroup({
      label: new UntypedFormControl(null, [Validators.required]),
      value: new UntypedFormControl(null, [Validators.required]),
      mandatory: new UntypedFormControl(false),
      hidden: new UntypedFormControl(false),
    });
    // Set columns
    this.setColumns();
    if (this.resultMaster && this.resultMaster.row && this.resultMaster.row != null) {
      this.tableProps = JSON.parse(this.resultMaster.row?.properties);
      if (this.resultMaster.screen === 'l1') {
        this.rows = this.tableProps.l1configuration.message;
      } else {
        this.rows = this.tableProps.l3configuration.message;
      }
    }

    this.subscription = this.store.select(configurationUpdated).subscribe(res => {
      console.log('configurationUpdated', res);

      if (res) {
        // Navigate to main page
        this.router.navigateByUrl('/settings/master-configuration');
      }
    });
  }

  tabChange({ index, tab }) {
    if (this.resultMaster.screen) {
      const screen = this.resultMaster.screen === 'l1' ? 'l1configuration' : 'l3configuration';
      if (index === 1 && tab.title) {
        this.rows = this.tableProps[screen].network;
      } else {
        this.rows = this.tableProps[screen].message;
      }
    }
  }

  setColumns() {
    this.translateService
      .get([
        'DATA_TYPE',
        'FIELD_NAME',
        'FORMAT',
        'HIDDEN',
        'LABEL',
        'MANDATORY',
        'LIST_VALUES',
        'FIELD_VALUE',
      ])
      .subscribe(res => {
        this.columns = [
          { name: res.DATA_TYPE, prop: 'datatype', sortable: false, width: 100 },
          { name: res.FIELD_NAME, prop: 'field', sortable: false, width: 200 },
          { name: res.FORMAT, prop: 'format', sortable: false, width: 200 },
          { name: res.LABEL, prop: 'label', sortable: false, width: 240 },
          { name: res.HIDDEN, prop: 'hidden', sortable: false },
          { name: res.MANDATORY, prop: 'mandatory', sortable: false, width: 80 },
          { name: res.FIELD_VALUE, prop: 'value', sortable: false },
          { name: 'Edit', prop: 'edit', sortable: false, cellTemplate: this.editTemplate },
        ];
      });
  }

  updateData(value) {
    Object.assign(this.currentRow, value);
    this.resultMaster.row.properties = JSON.stringify(this.tableProps);
    this.isEditDialogVsl = false;
    this.store.dispatch(new UpdateMasterConfigurationDetails(this.resultMaster.row));
  }

  submitForm() {
    console.log('this form', this.masterForm);
  }

  cancelForm() {
    this.isEditDialogVsl = false;
    this.masterForm.reset();
  }

  editDetail(row) {
    const formValues = this.masterForm.value;
    this.isEditDialogVsl = true;
    this.currentRow = row;
    Object.keys(formValues).forEach(ele => {
      this.masterForm.controls[ele].setValue(row[ele]);
    });
  }
}
