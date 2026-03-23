import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuntimePropertiesRoutingModule } from './runtime-properties-routing.module';
import { RuntimePropertiesComponent } from './runtime-properties.component';
import { FileManagerModule } from '@app/file-manager/file-manager.module';
import { MatCardModule } from '@angular/material/card';
import { FileService } from '@app/services/file.service';
import { PropertyFileDialogComponent } from './property-file-dialog/property-file-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [RuntimePropertiesComponent, PropertyFileDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RuntimePropertiesRoutingModule,
    FileManagerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NzTableModule,
    NzCardModule,
    NzIconModule
  ],
  providers: [FileService],
})
export class RuntimePropertiesModule { }
