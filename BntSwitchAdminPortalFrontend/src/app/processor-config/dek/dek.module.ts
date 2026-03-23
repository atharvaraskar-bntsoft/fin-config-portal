import { NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DekRoutingModule } from "./dek-routing.module";
import { DekComponent } from "./dek.component";
import { DekCreateComponent } from "./dek-create/dek-create.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { AlertModule, DatePickerRvModule } from "bnt";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
    declarations: [DekComponent, DekCreateComponent],
    imports: [
        CommonModule,
        DekRoutingModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        AlertModule,
        SharedModule,
        DatePickerRvModule
    ],
})

export class DekModule {}