import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePropertiesRoutingModule } from './core-properties-routing.module';
import { CorePropertiesComponent } from './core-properties.component';
import { CreateCoreProperComponent } from './create-core-properties/create-core-proper.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular-custom-modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { InputRvModule, PrettyJsonRvModule } from 'bnt';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    CorePropertiesComponent,
    CreateCoreProperComponent
  ],
  imports: [
    CommonModule,
    CorePropertiesRoutingModule,
    NgxDatatableModule,
    NzSpinModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NzSelectModule,
    MonacoEditorModule,
    RxReactiveFormsModule,
    InputRvModule,
    PrettyJsonRvModule,
    NzTableModule,
    NzCollapseModule,
    MatMenuModule,
    MatDividerModule,
    NzPopconfirmModule,
    NzIconModule
  ]
})
export class CorePropertiesModule { }
