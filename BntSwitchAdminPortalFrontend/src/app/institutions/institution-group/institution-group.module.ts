import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'angular-custom-modal';
import { TabsModule, AlertModule, DatePickerRvModule, InputRvModule } from 'bnt';
import { InstitutionGroupComponent } from './institution-group.component';
import { InstitutonGroupRoutingModule } from './institution-group-routing.module';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';
import { InstitutionGroupDetailsComponent } from './institution-group-details/institution-group-details.component';

@NgModule({
  declarations: [InstitutionGroupComponent, InstitutionGroupDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    InputRvModule,
    NgxDatatableModule,
    InstitutonGroupRoutingModule,
    ModalModule,
    TabsModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    AlertModule,
    DatePickerRvModule,
  ],
  providers: [AuthGuard],
})
export class InstitutionGroupModule {}
