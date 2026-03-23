import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';

import { BoxModule } from 'bnt';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [CommonModule, ConfigurationRoutingModule, BoxModule],
})
export class ConfigurationModule {}
