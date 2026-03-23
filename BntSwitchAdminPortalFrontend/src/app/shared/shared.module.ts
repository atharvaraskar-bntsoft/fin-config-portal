import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaceLabelPipe } from './pipes/replace-label.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// AoT requires an exported function for factories
// required for AOT compilation
import { TreeviewModule } from 'ngx-treeview';
import { DropdownTreeviewSelectComponent } from './imf-tree/dropdown-treeview-select.component';
import { DropdownTreeviewSelectDemoComponent } from './imf-tree/dropdown-treeview-select-demo.component';
import {
  TranslateLoader,
  TranslateModule,
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { UtcDatePipe } from './pipes/utc-date.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { RuleConditionComponent } from './rule-condition/rule-condition.component';
import { ConditionBuilderComponent } from './condition_builder/condition_builder.component';
import { en } from './en_EN';
import { MaterialModule } from './material-module';
import { DicisonDialogComponent } from './decision-dialog/decision-dialog.component';
import { RuleConditionNodeComponent } from './rule-condition-node/rule-condition-node.component';
import { RuleConditionTagComponent } from './rule-condition-tag/rule-condition-tag.component';
import { ImfTreeComponent } from './imf-tree/imf-tree.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TreeStructureComponent } from '../adapter-configuration/l1-adapters/tree-structure/tree-structure.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { NgZorroModule } from './ng-zorro-module';
import { RuleDecisionConditionComponent } from './rule-decision-condition/rule-decision-condition.component';
import { StructuredDataTableComponent } from './structured-data-table/structured-data-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddNetworkComponent } from './add-network/add-network.component';
import { NgxDatatableWatcherDirective } from './ngx-datatable-watcher.directive';
import { PackagerConditionComponent } from './packager_Condition/packager_condition.component';
import { PackagerConditionBuilderComponent } from './packager_condition_builder/packager_condition_builder.component';
import { IMFTreeStructureComponent } from './imf-tree-structure/imf-tree-structure.component';
import { ReversalConditionBuilderComponent } from './reversal_condition_builder/reversal_condition_builder.component';
import { CommonParameterComponent } from './commonParameter/commonParameter.component';
import { TooltipDirective } from './tooltip.directive';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ScriptOptionComponent } from './scriptOption/scriptOption.component';
import { IMFTreeStructureResComponent } from './imf-tree-structure-res/imf-tree-structure-res';
import { L1RequestMapperComponent } from './l1/mapper/request/request.component';
import { L1ResponseMapperComponent } from './l1/mapper/response/response.component';
import { L3RequestMapperComponent } from './l3/mapper/request/request.component';
import { L3ResponseMapperComponent } from './l3/mapper/response/response.component';
import { L1JoinResponseComponent } from './l1/join/response/response.component';
import { L3RequestJoinComponent } from './l3/join/request/request.component';
import { NewDatePipe } from './pipes/new-date.pipe';
import { L1CopyReqOptionComponent } from './l1/copyas/request/request.component';
import { L1CopyResOptionComponent } from './l1/copyas/response/response.component';
import { L3CopyResOptionComponent } from './l3/copyas/response/response.component';
import { L3CopyReqOptionComponent } from './l3/copyas/request/request.component';
import { L1SetConstantRequestComponent } from './l1/set-constant/request/request.component';
import { L1SetConstantResponseComponent } from './l1/set-constant/response/response.component';
import { L3SetConstantRequestComponent } from './l3/set-constant/request/request.component';
import { L3SetConstantResponseComponent } from './l3/set-constant/response/response.component';
import { TreeStructureConstantComponent } from './tree-structure-constant/tree-structure-constant.component';
import { L3ExtractDataRequestComponent } from './l3/extract-data/request/request.component';
import { L3ExtractDataResponseComponent } from './l3/extract-data/response/response.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AddCorePropertiesComponent } from './add-core-properties/add-core-properties.component';
import {AddRoleComponent} from './add-role/add-role.component';
import { NumberDirective } from './_directive/only-number.directive';
import { InputTrimDirective } from './trim.directive';
import { NumbersOnlyDirective } from './_directive/onlyNumber.directive';
import {JsonCompareComponent} from 'src/app/processor-config/json-compare/json-compare.component';
import { NgxObjectDiffModule } from 'ngx-object-diff';
// l1

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.baseHref + 'assets/i18n/', '.json');
}
export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    if (params.key === 'Transactions Count - Top 5 Merchant') {
      return 'Transactions Count - Top 5 Merchant Chains';
    } else if (params.key === 'Rejected Transactions Count - Top 5 Merchant') {
      return 'Rejected Transactions Count - Top 5 Merchant Chains';
    } else {
      return en[params.key];
    }
  }
}
@NgModule({
    declarations: [
        NumbersOnlyDirective,
        InputTrimDirective,
        NumberDirective,
        L3SetConstantRequestComponent,
        L3SetConstantResponseComponent,
        L3ExtractDataResponseComponent,
        L3ExtractDataRequestComponent,
        TreeStructureConstantComponent,
        L1SetConstantResponseComponent,
        L1SetConstantRequestComponent,
        L3RequestJoinComponent,
        L3CopyResOptionComponent,
        L3CopyReqOptionComponent,
        L1RequestMapperComponent,
        L1JoinResponseComponent,
        L1ResponseMapperComponent,
        L3RequestMapperComponent,
        L3ResponseMapperComponent,
        UtcDatePipe,
        FieldErrorDisplayComponent,
        IMFTreeStructureResComponent,
        LocalDatePipe,
        DicisonDialogComponent,
        RuleConditionNodeComponent,
        RuleConditionTagComponent,
        RuleConditionComponent,
        ConditionBuilderComponent,
        ImfTreeComponent,
        DropdownTreeviewSelectComponent,
        DropdownTreeviewSelectDemoComponent,
        ReplaceLabelPipe,
        TreeStructureComponent,
        UploadMediaComponent,
        RuleDecisionConditionComponent,
        StructuredDataTableComponent,
        NotFoundComponent,
        AddNetworkComponent,
        AddCorePropertiesComponent,
        NgxDatatableWatcherDirective,
        PackagerConditionComponent,
        PackagerConditionBuilderComponent,
        IMFTreeStructureComponent,
        ReversalConditionBuilderComponent,
        CommonParameterComponent,
        TooltipDirective,
        ScriptOptionComponent,
        L1CopyReqOptionComponent,
        L1CopyResOptionComponent,
        NewDatePipe,
        AddRoleComponent,
        JsonCompareComponent
    ],
    exports: [
        NumbersOnlyDirective,
        NumberDirective,
        L3SetConstantRequestComponent,
        L3SetConstantResponseComponent,
        L3ExtractDataResponseComponent,
        L3ExtractDataRequestComponent,
        TreeStructureConstantComponent,
        L1SetConstantResponseComponent,
        L1SetConstantRequestComponent,
        L3CopyResOptionComponent,
        L3CopyReqOptionComponent,
        L1CopyReqOptionComponent,
        L1CopyResOptionComponent,
        L3RequestJoinComponent,
        L1RequestMapperComponent,
        L1JoinResponseComponent,
        L1ResponseMapperComponent,
        L3RequestMapperComponent,
        L3ResponseMapperComponent,
        TooltipDirective,
        IMFTreeStructureResComponent,
        UtcDatePipe,
        NzToolTipModule,
        ReplaceLabelPipe,
        DropdownTreeviewSelectDemoComponent,
        RuleConditionTagComponent,
        TranslateModule,
        DicisonDialogComponent,
        LocalDatePipe,
        FieldErrorDisplayComponent,
        RuleConditionComponent,
        ConditionBuilderComponent,
        ImfTreeComponent,
        RuleConditionNodeComponent,
        MaterialModule,
        TreeStructureComponent,
        NzSwitchModule,
        UploadMediaComponent,
        NzModalModule,
        NgZorroModule,
        NzDrawerModule,
        RuleDecisionConditionComponent,
        StructuredDataTableComponent,
        NotFoundComponent,
        AddNetworkComponent,
        AddCorePropertiesComponent,
        NgxDatatableWatcherDirective,
        PackagerConditionComponent,
        PackagerConditionBuilderComponent,
        IMFTreeStructureComponent,
        ReversalConditionBuilderComponent,
        CommonParameterComponent,
        MonacoEditorModule,
        ScriptOptionComponent,
        NewDatePipe,
        AddRoleComponent,
        JsonCompareComponent
    ],
    imports: [
        TreeviewModule,
        CommonModule,
        MaterialModule,
        TreeviewModule.forRoot(),
        NgSelectModule,
        FormsModule,
        NzToolTipModule,
        NzSwitchModule,
        NzCheckboxModule,
        FileUploadModule,
        NzModalModule,
        NgZorroModule,
        MonacoEditorModule,
        ReactiveFormsModule,
        NzDrawerModule,
        NgxObjectDiffModule,
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MyMissingTranslationHandler,
            },
            useDefaultLang: true,
        }),
    ]
})
export class SharedModule {}
