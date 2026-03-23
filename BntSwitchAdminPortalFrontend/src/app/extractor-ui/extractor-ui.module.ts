import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { ExtractorUiComponent } from './extractor-ui.component';
import { SharedModule } from '@app/shared/shared.module';
import { ExtractorUiRoutingModule } from './extractor-ui.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// //import { ImportFileModule } from '@app/import-file/import-file.module';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ModalModule } from 'angular-custom-modal';
import { InputRvModule, AlertModule } from 'bnt';
import { PrettyJsonRvModule } from 'bnt';
import { ExtractorCreateComponent } from './extractor-create/extractor-create.component';
import { ExtractorJobConfigComponent } from './extractor-create/extractor-job-config/extractor-job-config.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TransformComponent } from './transform/transform.component';
import { SenderComponent } from './sender/sender.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { AddSenderPropertyComponent } from './sender/add-sender-property/add-sender-property.component';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ExtractorSchemaConditionComponent } from './extractor-create/extractor-schema-condition/extractor-schema-condition.component';
import { SchemaJsonComponent } from './schema-json/schema-json.component';
import { ImfCreationTableComponent } from './imf-creation-table/imf-creation-table.component';
import { ImfHierarchyTreeComponent } from './imf-hierarchy-tree/imf-hierarchy-tree.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { MapperModule } from './mapper/mapper.module';
import { ConstantExtractorComponent } from './constant-extractor/constant-extractor.component';

@NgModule({
  declarations: [
    ExtractorUiComponent,
    ExtractorCreateComponent,
    ExtractorJobConfigComponent,
    TransformComponent,
    ExtractorSchemaConditionComponent,
    SchemaJsonComponent,
    ImfCreationTableComponent,
    ImfHierarchyTreeComponent,
    // CopyasComponent,
    SenderComponent,
    AddSenderPropertyComponent,
    ConstantExtractorComponent
    
  ],
  imports: [
    NzDividerModule,
    CommonModule,
    SharedModule,
    ExtractorUiRoutingModule,
    FormsModule,
    InputRvModule,
    ModalModule,
    NgbAlertModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    // //ImportFileModule,
    AlertModule,
    PrettyJsonRvModule,
    FormsModule,
    NzFormModule,
    NzCollapseModule,
    NzButtonModule,
    NzDrawerModule,
    MapperModule,
    NzDatePickerModule,
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExtractorUiModule { }
