// import { SCREEN_NAME } from '../add-workflows/child-workflows/child-workflows-v1.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscribeService } from '@app/services/subscribe.services';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
// import { GetRuleCondition } from '@app/store/actions/router.actions';
// import { selectGetRuleCondition } from '@app/store/selectors/router.selectors';
import { GetMessageContextList } from '../../../store/actions/l1-adapter.action';
import { SelectMessageContextList } from '../../../store/selectors/l1-adapter.selectors';
// import { takeUntil } from 'rxjs/operators';

export enum SCREEN_NAME {
  ExceptionDecison = 'EXCEPTION_DECISION',
  SafDecision = 'SAF_DECISION',
  AutoReversalEligibilityCondition = 'Auto Reversal Eligibility Condition',
  AutoReversalFinalCondition = 'Auto Reversal Final Condition'
}

@Component({
  selector: 'app-workflow-saf',
  templateUrl: './workflow-saf.component.html',
  styleUrls: ['./workflow-saf.component.scss'],
})
export class WorkflowSafComponent implements OnInit {
  public onTrue = null;
  public onFalse = null;
  error = false;
  componetDestroyed = new Subject();
  public ruleData: any = null;
  public postDecisionRuleJson;
  public serviceList: any = [];
  errNodes: number = 0;
  screen = SCREEN_NAME;
  public jsonData;
  constructor(
    // private _alertService: AlertService,
    public dialogRef: MatDialogRef<WorkflowSafComponent>,
    private _store: Store<IAppState>,
    private subscribeService: SubscribeService,
    @Inject(MAT_DIALOG_DATA) public item: any,
  ) {
    this._store.dispatch(new GetMessageContextList(0));
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.jsonData = response.data.messageContextFieldsByVersion;
      }
    });
  }

  ngOnInit() {
    const item = JSON.parse(JSON.stringify(this.item));
    if (item.screen === SCREEN_NAME.SafDecision) {
      this.postDecisionRuleJson = item.safingConditionJson;
    } else if (item.screen === SCREEN_NAME.ExceptionDecison) {
      this.postDecisionRuleJson = item.safingExceptionConditionJson;
    } else if (item.screen === SCREEN_NAME.AutoReversalEligibilityCondition) {
      this.postDecisionRuleJson = item.autoReversalEligibilityCondition;
    } else if (item.screen === SCREEN_NAME.AutoReversalFinalCondition) {
      this.postDecisionRuleJson = item.autoReversalFinalCondition;
    }
    // this._store.dispatch(new GetRuleCondition());
    // this._store
    //     .pipe(takeUntil(this.componetDestroyed), select(selectGetRuleCondition))
    //     .subscribe((ruleData: any) => {
    //         if (ruleData && ruleData.data !== null) {
    //             this.ruleData = ruleData.data;
    //             this.serviceList = ruleData.data.service;
    //         }
    //     });
  }

  public close(): void {
    this.dialogRef.close(this.item);
  }

  hasNull(target) {
    for (var member in target) {
      if (target[member] === null) return true;
    }
    return false;
  }

  // public Submit(): void {
  //     this.errNodes = 0;
  //     // const decisions = JSON.parse(JSON.stringify(this.postDecisionRuleJson));
  //     this.checkRulesAvailable(this.postDecisionRuleJson);
  //     if (!this.errNodes) {
  //         if (this.item.screen === SCREEN_NAME.ExceptionDecison) {
  //             this.item.safingExceptionConditionJson = this.postDecisionRuleJson;
  //         } else if (this.item.screen === SCREEN_NAME.SafDecision) {
  //             this.item.safingConditionJson = this.postDecisionRuleJson;
  //         }
  //         this.dialogRef.close(this.item);
  //     } else {
  //         this._alertService.responseMessage({
  //             status: 'failure',
  //             message: 'Please fill all the fields.',
  //         });
  //     }
  // }

  deleteElement(event) {
    this.error = event;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }

  public getRule(value) {
    this.postDecisionRuleJson = value.condition;
    if (this.item.screen === SCREEN_NAME.ExceptionDecison) {
      this.item.safingExceptionConditionJson = this.postDecisionRuleJson;
    } else if (this.item.screen === SCREEN_NAME.SafDecision) {
      this.item.safingConditionJson = this.postDecisionRuleJson;
    }
    else if (this.item.screen === SCREEN_NAME.AutoReversalEligibilityCondition){
      this.item.autoReversalEligibilityCondition = this.postDecisionRuleJson;
    }
    else if (this.item.screen === SCREEN_NAME.AutoReversalFinalCondition){
      this.item.autoReversalFinalCondition = this.postDecisionRuleJson;
    }
    this.dialogRef.close(this.item);
  }


  public removeAllCondition(){
     this.subscribeService.sendItems('removeAll');
}
}
