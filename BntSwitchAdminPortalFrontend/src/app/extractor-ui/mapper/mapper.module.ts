import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CopyasComponent } from './copyas/copyas.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MainService } from './main.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NgZorroModule } from '../../shared/ng-zorro-module';
import {PackagerConditionBuilderComponent} from './packager_condition_builder/packager_condition_builder.component'
import {
  TranslateLoader,
  TranslateModule,
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { en } from '../../shared/en_EN';
import { ExtractComponent } from './extract/extract.component';
import { ScriptComponent } from './script/script.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CommonParameterComponent } from './commonParameter/commonParameter.component';
import { IMFStructureComponent } from './tree-structure/tree-structure.component';
import { MapperOptionReqComponent } from './mapper-option-req/mapper-option-req.component';
import { IMFExtractComponent } from './imf-tree-structure/imf-tree-structure.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { PostValidationComponent } from './post-validation/post-validation.component';
import { JoinResponseComponent } from './join/response/response.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { StepComponent } from './step/step.component';
import { CustomMapperComponent } from './custom-mapper/custom-mapper.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

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
        CopyasComponent,
        PackagerConditionBuilderComponent,
        ExtractComponent,
        CopyasComponent,
        CommonParameterComponent,
        IMFStructureComponent,
        ScriptComponent,
        MapperOptionReqComponent,
        IMFExtractComponent,
        JoinResponseComponent,
        EvaluateComponent,
        PostValidationComponent,
        StepComponent,
        CustomMapperComponent
    ],
    exports: [ExtractComponent, CopyasComponent, JoinResponseComponent, MapperOptionReqComponent, IMFExtractComponent, ScriptComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NzModalModule,
        NzSelectModule,
        NzRadioModule,
        NzDrawerModule,
        NgZorroModule,
        TranslateModule,
        NzToolTipModule,
        MonacoEditorModule,
        NzDividerModule,
        NzCheckboxModule,
        NzInputModule,
        NzCollapseModule,
        NzPopconfirmModule,
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
    ],
    providers: [MainService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapperModule { }
