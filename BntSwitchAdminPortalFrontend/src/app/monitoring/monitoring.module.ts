import { NgModule } from '@angular/core';
import { AlertModule } from 'bnt';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '@app/shared/shared.module';
import { MonitoringScreenComponent } from './monitoring-screen/monitoring-screen.component';
import { ChartJsModule, TabsModule, BoxModule, BoxInfoModule } from 'bnt';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringItemComponent } from './monitoring-item/monitoring-item.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

@NgModule({
  declarations: [MonitoringScreenComponent, MonitoringItemComponent],
  imports: [
    SharedModule,
    AlertModule,
    CommonModule,
    CountdownModule,
    ChartJsModule,
    BoxModule,
    TabsModule,
    BoxInfoModule,
    MonitoringRoutingModule,
    FormsModule,
  ],
  providers: [AuthGuard],
})
export class MonitoringModule {}
