import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule, InputRvModule } from 'bnt';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

import { CountryStatesRoutingModule } from './country-states-routing.module';
import { CountryStatesComponent } from './country-states.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [CountryStatesComponent],
  imports: [
    SharedModule,
    AlertModule,
    InputRvModule,
    CommonModule,
    CountryStatesRoutingModule,
    FormsModule,
    NgSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
})
export class CountryStatesModule {}
