import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { AcquirerIdConfigRoutingModule } from './acquirer-id-config-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule, DatePickerRvModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';
import { AcquirerIdConfigComponent } from './acquirer-id-config.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { AcquirerIdConfigInfoComponent } from './acquirer-id-config-info/acquirer-id-config-info.component';
import { AcquirerIdConfigDetailsComponent } from './acquirer-id-config-details/acquirer-id-config-details.component';

@NgModule({
  declarations: [
    AcquirerIdConfigComponent,
    AcquirerIdConfigInfoComponent,
    AcquirerIdConfigDetailsComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AlertModule,
    SharedModule,
    DatePickerRvModule,
    AcquirerIdConfigRoutingModule,
    OverlayModule,
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AcquirerIdConfigModule {}
