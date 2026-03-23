import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnOffSwitchComponent } from './on-off-switch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OnOffSwitchComponent],
  exports: [OnOffSwitchComponent],
  imports: [CommonModule, FormsModule],
})
export class OnOffSwitchModule {}
