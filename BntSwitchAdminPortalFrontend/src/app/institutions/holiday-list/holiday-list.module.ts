import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayListComponent } from './holiday-list.component';
import { HolidayRoutingModule } from './holiday-list-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HolidayService } from '@app/services/holiday.service';
import { NzTableModule} from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [ HolidayListComponent],
  imports: [
    CommonModule,
    HolidayRoutingModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    NzTableModule,
    NzCollapseModule,
    SharedModule
  ],
  providers: [
    HolidayService,
    //AuthGuard,
  ],
})
export class HolidayListModule { }
