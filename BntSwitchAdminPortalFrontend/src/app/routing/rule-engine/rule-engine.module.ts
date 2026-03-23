import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleEngineRoutingModule } from './rule-engine-routing.module';
import { RuleEngineComponent } from './rule-engine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChildRuleComponent } from './child-rule/child-rule.component';
import { TabsModule, AlertModule, DatePickerRvModule, InputRvModule } from 'bnt';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [RuleEngineComponent, ChildRuleComponent],

  imports: [
    SharedModule,
    CommonModule,
    RuleEngineRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    AlertModule,
    DatePickerRvModule,
    InputRvModule,
  ],
})
export class RuleEngineModule {}
