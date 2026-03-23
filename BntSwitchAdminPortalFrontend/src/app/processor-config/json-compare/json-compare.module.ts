import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
// import { JsonCompareComponent } from './json-compare.component';
import {JsonCompreRoutingModule} from './json-compare-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { JsonCompareService } from '@app/services/json-compare.service';
import { NgxObjectDiffModule } from 'ngx-object-diff';
import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  declarations: [
    // CompareComponent
    // JsonCompareComponent   
  ],
  imports: [
    CommonModule,
    FormsModule,
    // NzDividerModule,
    JsonCompreRoutingModule,    
    NgSelectModule,
    NzSelectModule,
    CommonModule,
    NzSelectModule,
    NgxObjectDiffModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [AuthGuard,JsonCompareService],
})
export class JsonCompareModule {}
