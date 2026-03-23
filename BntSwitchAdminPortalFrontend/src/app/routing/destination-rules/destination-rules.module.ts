import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationRulesRoutingModule } from './destination-rules-routing.module';
import { DestinationRulesComponent } from './destination-rules.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
// import { DestinationRulesAddComponent } from '../destination-rules-add/destination-rules-add.component';
import { PrettyJsonRvModule } from 'bnt';
import { FormsModule } from '@angular/forms';
import { DestinationRulesViewComponent } from './destination-rules-view/destination-rules-view.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DestinationRulesComponent,
    // DestinationRulesAddComponent,
    DestinationRulesViewComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DestinationRulesRoutingModule,
    NgxDatatableModule,
    NgxJsonViewerModule,
    PrettyJsonRvModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [AuthGuard],
})
export class DestinationRulesModule {}
