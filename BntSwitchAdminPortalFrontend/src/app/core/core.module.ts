import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BoxModule, TabsModule, DropdownModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';

import { HeaderInnerComponent } from './header-inner/header-inner.component';
import { SidebarLeftInnerComponent } from './sidebar-left-inner/sidebar-left-inner.component';
import { SidebarRightInnerComponent } from './sidebar-right-inner/sidebar-right-inner.component';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// fix for the Ivy
@Pipe({
  name: 'timeAgo',
  pure: false,
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {}

@NgModule({
  declarations: [
    HeaderInnerComponent,
    SidebarLeftInnerComponent,
    SidebarRightInnerComponent,
    // TimeAgoPipe,
    TimeAgoExtendsPipe,
  ],
  exports: [
    BoxModule,
    TabsModule,
    HeaderInnerComponent,
    SidebarLeftInnerComponent,
    SidebarRightInnerComponent,
  ],
  imports: [
    NgbModule,
    BoxModule,
    NgbModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    TabsModule,
    RouterModule,
    SharedModule,
  ],
})
export class CoreModule {}
