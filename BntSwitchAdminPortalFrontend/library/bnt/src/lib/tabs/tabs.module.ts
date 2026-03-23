import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorModule } from '../color/color.module';

import { TabToggleDirective } from './tabs.directive';
import {
  TabsComponent,
  TabsHeaderComponent,
  TabComponent,
  TabHeaderComponent,
  TabContentComponent,
} from './tabs.component';

@NgModule({
  declarations: [
    TabToggleDirective,
    TabsComponent,
    TabsHeaderComponent,
    TabComponent,
    TabHeaderComponent,
    TabContentComponent,
  ],
  exports: [
    TabsComponent,
    TabsHeaderComponent,
    TabComponent,
    TabHeaderComponent,
    TabContentComponent,
  ],
  imports: [CommonModule, ColorModule],
})
export class TabsModule {}
