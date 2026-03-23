import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {  NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatIconModule,
        MatGridListModule,
        MatMenuModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        CommonModule,
        NzSelectModule,
        NzTableModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [FileManagerComponent],
    exports: [FileManagerComponent]
})
export class FileManagerModule {}
