import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemeImfMappingComponent } from './scheme-imf-mapping.component';
import { SchemeImfMappingRoutingModule } from './scheme-imf-mapping-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SchemeImfMappingCreateComponent } from './scheme-imf-mapping-create/scheme-imf-mapping-create.component';

@NgModule({
  declarations: [SchemeImfMappingComponent, SchemeImfMappingCreateComponent],
  imports: [
    CommonModule,
    SchemeImfMappingRoutingModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    NgxDatatableModule,
  ],
})
export class SchemeImfMappingModule {}
