import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertModule, DatePickerRvModule, PrettyJsonRvModule, TabsModule } from 'bnt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'angular-custom-modal';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsDetailsComponent } from './notifications-details/notifications-details.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [NotificationsComponent, NotificationsDetailsComponent],
  imports: [
    SharedModule,
    AlertModule,
    DatePickerRvModule,
    CommonModule,
    FormsModule,
    ModalModule,
    NgbAlertModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    NotificationsRoutingModule,
    TabsModule,
    PrettyJsonRvModule,
  ],
  providers: [DatePipe, AuthGuard],
})
export class NotificationsModule {}
