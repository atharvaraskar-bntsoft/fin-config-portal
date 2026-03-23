import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent],
  exports: [HeaderComponent, HeaderLogoComponent, HeaderLogoMiniComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class HeaderModule {}
