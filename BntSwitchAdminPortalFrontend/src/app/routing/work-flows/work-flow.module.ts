import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'angular-custom-modal';
import { SharedModule } from '@app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChildWorkflowComponent } from './child-workflow/child-workflow.component';
import { AddWorkflowsComponent } from './add-workflows/add-workflows.component';
import { ChildWorkflowsV1Component } from './add-workflows/child-workflows/child-workflows-v1.component';
import { GroupWorkflowsComponent } from './add-workflows/group-workflows/group-workflows.component';
import { DisplayWorkflowComponent } from './add-workflows/display-workflow/display-workflow.component';
import { GroupDisplayWorkflowComponent } from './add-workflows/group-display-workflow/group-display-workflow.component';
import { ReversibleDialogComponent } from './reversible-dialog/reversible-dialog.component';
import { WorkflowSafComponent } from './workflow-saf/workflow-saf.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        GroupDisplayWorkflowComponent,
        ChildWorkflowsV1Component,
        WorkflowComponent,
        DisplayWorkflowComponent,
        ChildWorkflowComponent,
        AddWorkflowsComponent,
        GroupWorkflowsComponent,
        ReversibleDialogComponent,
        WorkflowSafComponent
    ],
    imports: [
        InfiniteScrollModule,
        SharedModule,
        CommonModule,
        WorkflowRoutingModule,
        NgSelectModule,
        ModalModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule
    ],
    providers: [AuthGuard]
})
export class WorkflowModule { }
