import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImfJsonRoutingModule } from './imf-json-routing.module';
import { ImfJsonComponent } from './imf-json.component';
import { ImfJsonChildComponent } from './imf-json-create/imf-json-child/imf-json-child.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PrettyJsonRvModule } from 'bnt';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImfJsonCreateComponent } from './imf-json-create/imf-json-create.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClipboardModule } from 'ngx-clipboard';
import { DisplayDetailsComponent } from './imf-json-create/display-details/display-details.component';
import { ImfCreationTableComponent } from './imf-json-create/imf-creation-table/imf-creation-table.component';
import { ImfHierarchyTreeComponent } from './imf-json-create/imf-hierarchy-tree/imf-hierarchy-tree.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [
    ImfJsonComponent,
    ImfJsonChildComponent,
    ImfJsonCreateComponent,
    DisplayDetailsComponent,
    ImfCreationTableComponent,
    ImfHierarchyTreeComponent,
  ],
  imports: [
    CommonModule,
    ImfJsonRoutingModule,
    SharedModule,
    FormsModule,
    PrettyJsonRvModule,
    NgSelectModule,
    NgxDatatableModule,
    ClipboardModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [AuthGuard],
})
export class ImfJsonModule {}
