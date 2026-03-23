import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  InputGroupModule,
  InputTextModule as mkInputTextModule,
  BoxModule,
  AlertModule,
  InputRvModule,
} from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [CountriesComponent],
  imports: [
    SharedModule,
    AlertModule,
    BoxModule,
    InputRvModule,
    CommonModule,
    CountriesRoutingModule,
    FormsModule,
    InputGroupModule,
    mkInputTextModule,
    NgxDatatableModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
})
export class CountriesModule {}
