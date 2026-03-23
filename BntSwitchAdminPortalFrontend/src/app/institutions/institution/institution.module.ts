import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { InstitutionInfoComponent } from './institution-info/institution-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, TabsModule, InputRvModule, DropdownModule } from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerRvModule } from 'bnt';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { InstituionDetailsComponent } from './instituion-details/instituion-details.component';

@NgModule({
  declarations: [InstitutionComponent, InstitutionInfoComponent, InstituionDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    DropdownModule,
    InputRvModule,
    InstitutionRoutingModule,
    NgxDatatableModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    NgSelectModule,
    TabsModule,
    DatePickerRvModule,
    NzDrawerModule,
  ],
  providers: [AuthGuard],
})
export class InstitutionModule {}
