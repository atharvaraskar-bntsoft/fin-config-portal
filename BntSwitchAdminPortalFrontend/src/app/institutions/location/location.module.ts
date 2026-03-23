import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import { AlertModule, TabsModule, InputRvModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocationInfoComponent } from './location-info/location-info.component';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { SharedModule } from '@app/shared/shared.module';
import { LocationDetailsComponent } from './location-details/location-details.component';

@NgModule({
  declarations: [LocationComponent, LocationInfoComponent, LocationDetailsComponent],
  imports: [
    InputRvModule,
    CommonModule,
    LocationRoutingModule,
    SharedModule,
    NgxDatatableModule,
    ModalModule,
    AlertModule,
    FormsModule,
    NgbModule,
    NgbAlertModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    TabsModule,
    NzDescriptionsModule
  ],
  providers: [DatePipe, AuthGuard],
})
export class LocationModule {}
