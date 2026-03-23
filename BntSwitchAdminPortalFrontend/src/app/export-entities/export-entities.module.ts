import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportEntitiesRoutingModule } from './export-entities-routing.module';
import { ExportEntitiesComponent } from './export-entities.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule } from '@angular/forms';
import { AlertModule, PrettyJsonRvModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { ImportExportComponent } from './import-export/import-export.component';
import { CreateEntitiesComponent } from './create-entities/create-entities.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [ExportEntitiesComponent, ImportExportComponent, CreateEntitiesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExportEntitiesRoutingModule,
    NgxDatatableModule,
    NgxJsonViewerModule,
    PrettyJsonRvModule,
    FormsModule,
    AlertModule,
    ClipboardModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
})
export class ExportEntitiesModule {}
