import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookUpConfigurationRoutingModule } from './look-up-configuration-routing.module';
import { LookUpConfigurationComponent } from './look-up-configuration.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'bnt';
import { ValueConfigurationComponent } from './value-configuration/value-configuration.component';
import { ModalModule } from 'angular-custom-modal';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [LookUpConfigurationComponent, ValueConfigurationComponent],
  imports: [
    CommonModule,
    LookUpConfigurationRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    ModalModule,
  ],
  providers: [AuthGuard],
})
export class LookUpConfigurationModule {}
