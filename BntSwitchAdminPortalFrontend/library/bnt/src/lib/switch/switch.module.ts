import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSwitchComponent } from './ui-switch/ui-switch.component';

@NgModule({
  declarations: [UiSwitchComponent],
  exports: [UiSwitchComponent],
  imports: [CommonModule],
})
export class SwitchModule {}
