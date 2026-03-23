import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { L3AdaptersRoutingModule } from './l3-adapters-routing.module';
import { L3AdaptersCreateComponent } from './l3-adapters-create/l3-adapters-create.component';
import { L3AdaptersComponent } from './l3-adapters.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { L3AdapterTemplateComponent } from './l3-adapter-template/l3-adapter-template.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'angular-custom-modal';
import { SchemaComponent } from './schema/schema.component';
import { SchemaJsonComponent } from './schema-json/schema-json.component';
import { NetworkComponent } from './network/network.component';
import { TransformComponent } from './transform/transform.component';
import { MapperComponent } from './mapper/mapper.component';
import { ResponseCodeTabComponent } from './response-code-tab/response-code-tab.component';
import { PostValidationComponent } from './post-validation/post-validation.component';
import { BeansComponent } from './beans/beans.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AlphabetOnlyDirective } from './alphabet-only-directive';
import { AlphabetOnlyNoSpaceDirective } from './alphabet-only-no-space-directive';
import { InputRvModule, PrettyJsonRvModule } from 'bnt';
import { DisplayDetailsComponent } from './imf-json-create/display-details/display-details.component';
import { ImfCreationTableComponent } from './imf-json-create/imf-creation-table/imf-creation-table.component';
import { ImfHierarchyTreeComponent } from './imf-json-create/imf-hierarchy-tree/imf-hierarchy-tree.component';
import { ImfJsonCreateComponent } from './imf-json-create/imf-json-create.component';
import { ImfJsonChildComponent } from './imf-json-create/imf-json-child/imf-json-child.component';
import { TransformJsonComponent } from './transform-json/transform-json.component';
import { TreeStructureConstantComponent } from './tree-structure-constant/tree-structure-constant.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { ConnectionManagmentComponent } from './connection-managment/connection-managment.component';
import { HttpUrlencodedComponent } from './http-urlencoded/http-urlencoded.component';
import { UrlEncodedImfCreationTableComponent } from './http-urlencoded-imf-create/imf-creation-table/imf-creation-table.component';
import { UrlEncodedImfHierarchyTreeComponent } from './http-urlencoded-imf-create/imf-hierarchy-tree/imf-hierarchy-tree.component';
import { TransformHttpComponent } from './transform-http/transform-http.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { L3XmlOverHttpComponent } from './l3-xml-over-http/l3-xml-over-http.component';

@NgModule({
  declarations: [
    L3AdaptersComponent,
    TreeStructureConstantComponent,
    L3AdaptersCreateComponent,
    L3AdapterTemplateComponent,
    SchemaJsonComponent,
    SchemaComponent,
    NetworkComponent,
    TransformJsonComponent,
    TransformComponent,
    MapperComponent,
    ResponseCodeTabComponent,
    PostValidationComponent,
    BeansComponent,
    AlphabetOnlyDirective,
    AlphabetOnlyNoSpaceDirective,
    ImfJsonChildComponent,
    ImfJsonCreateComponent,
    DisplayDetailsComponent,
    ImfCreationTableComponent,
    ImfHierarchyTreeComponent,
    ConnectionManagmentComponent,
    HttpUrlencodedComponent,
    UrlEncodedImfCreationTableComponent,
    UrlEncodedImfHierarchyTreeComponent,
    TransformHttpComponent,
    L3XmlOverHttpComponent,
  ],
  imports: [
    CommonModule,
    L3AdaptersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule,
    ModalModule,
    NzSelectModule,
    MonacoEditorModule,
    RxReactiveFormsModule,
    InputRvModule,
    PrettyJsonRvModule,
    NzTableModule,
    NzCollapseModule,
    NzSpinModule,
  ],
  providers: [AuthGuard],
})
export class L3AdaptersModule {}
