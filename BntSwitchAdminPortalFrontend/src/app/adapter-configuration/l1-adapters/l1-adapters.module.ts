import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AdapterTemplateComponent } from './adapter-template/adapter-template.component';
import { AlphabetOnlyDirective } from './alphabet-only-directive';
import { BeansComponent } from './beans/beans.component';
import { L1AdapterHomeComponent } from './l1-adapter-home/l1-adapter-home.component';
import { L1AdaptersRoutingModule } from './l1-adapters-routing.module';
import { L1AdaptersComponent } from './l1-adapters.component';
import { NetworkComponent } from './network/network.component';
import { PostValidationComponent } from './post-validation/post-validation.component';
import { ResponseCodeTabComponent } from './response-code-tab/response-code-tab.component';
import { SchemaComponent } from './schema/schema.component';
import { TransformActionComponent } from './transform-action/transform-action.component';
import { TransformSOAPComponent } from './transform-soap/transform-soap.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { InputRvModule } from 'library/bnt/src/lib/input/input.module';
import { DisplayDetailsComponent } from './imf-json-create/display-details/display-details.component';
import { ImfCreationTableComponent } from './imf-json-create/imf-creation-table/imf-creation-table.component';
import { ImfHierarchyTreeComponent } from './imf-json-create/imf-hierarchy-tree/imf-hierarchy-tree.component';
import { ImfJsonCreateComponent } from './imf-json-create/imf-json-create.component';
import { ImfJsonChildComponent } from './imf-json-create/imf-json-child/imf-json-child.component';
import { SchemaJsonComponent } from './schema-json/schema-json.component';
import { TransformJsonComponent } from './transform-json/transform-json.component';
import { TransformIsoComponent } from './transform-iso/transform-iso.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { L1ConnectionManagmentComponent } from './l1-connection-managment/l1-connection-managment.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { HttpUrlencodedComponent } from './http-urlencoded/http-urlencoded.component';
import { UrlEncodedImfCreationTableComponent } from './http-urlencoded-imf-create/imf-creation-table/imf-creation-table.component';
import { UrlEncodedImfHierarchyTreeComponent } from './http-urlencoded-imf-create/imf-hierarchy-tree/imf-hierarchy-tree.component';
import { ResponsetabHttpJsonComponent } from './responsetab-http-json/responsetab-http-json.component';
import { ResponsetabJsonComponent } from './responsetab-json/responsetab-json.component';
import { ArrayActionComponent } from './array-action/array-action.component';
import { XmlOverHttpComponent } from './xml-over-http/xml-over-http.component';

@NgModule({
  declarations: [
    SchemaJsonComponent,
    XmlOverHttpComponent,
    ArrayActionComponent,
    TransformIsoComponent,
    TransformJsonComponent,
    ImfCreationTableComponent,
    ImfHierarchyTreeComponent,
    ImfJsonChildComponent,
    ImfJsonCreateComponent,
    DisplayDetailsComponent,
    L1AdaptersComponent,
    TransformActionComponent,
    AdapterTemplateComponent,
    NetworkComponent,
    SchemaComponent,
    ResponseCodeTabComponent,
    TransformSOAPComponent,
    L1AdapterHomeComponent,
    PostValidationComponent,
    BeansComponent,
    AlphabetOnlyDirective,
    L1ConnectionManagmentComponent,
    HttpUrlencodedComponent,
    UrlEncodedImfCreationTableComponent,
    UrlEncodedImfHierarchyTreeComponent,
    ResponsetabHttpJsonComponent,
    ResponsetabJsonComponent,
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    NzTableModule,
    L1AdaptersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NzCollapseModule,
    NgSelectModule,
    ModalModule,
    MonacoEditorModule,
    InputRvModule,
    NzEmptyModule,
    NzSpinModule,
  ],
  providers: [AuthGuard],
})
export class L1AdaptersModule {}
