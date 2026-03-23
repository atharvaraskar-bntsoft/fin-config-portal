import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrettyJsonRvModule } from 'bnt';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagRoutingModule } from './tag-routing.module';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [TagListComponent, CreateTagComponent],
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule,
    PrettyJsonRvModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ],
  providers: [AuthGuard],
})
export class TagModule {}
