import { Component, ViewEncapsulation, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAppState } from '@app/store/state/app.state.js';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
import { AlertService } from '@app/services/alert.service';
import { SelectMessageContextList } from '../../store/selectors/l1-adapter.selectors';
import { ActivatedRoute } from '@angular/router';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'app-decision-dialog',
  templateUrl: './decision-dialog.component.html',
  styleUrls: ['./decision-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DicisonDialogComponent implements OnInit {
  public onTrue = null;
  public onFalse = null;
  error = false;
  componetDestroyed = new Subject();
  public ruleData: any = null;
  public postDecisionRuleJson;
  public serviceList: any = [];
  errNodes: number = 0;
  public jsonData;
  public readOnlyFlag = false
  constructor(
    private _alertService: AlertService,
    public dialogRef: MatDialogRef<DicisonDialogComponent>,
    private _store: Store<IAppState>,
    private route: ActivatedRoute,
    private subscribeService: SubscribeService,
    @Inject(MAT_DIALOG_DATA) public item: any,
  ) {
    
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.jsonData = response.data.messageContextFieldsByVersion;
      }
    });
  }

  ngOnInit() {
    const item = JSON.parse(JSON.stringify(this.item));
    if (item.precedingDecisionUi) {
      this.onFalse = item.precedingDecisionUi.onfalse;
      this.onTrue = item.precedingDecisionUi.ontrue;
    }
    this.readOnlyFlag = item.readOnlyFlag
    this.postDecisionRuleJson = item.postDecisionRuleJsonUi;
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

  public Submit(value) {
    this.postDecisionRuleJson = value.condition;
    if (!this.onTrue || !this.onFalse || this.error) {
      this._alertService.responseMessage({
        status: 'failure',
        message: 'please enter valid data in all fields.',
      });
    } else if (this.onTrue && this.onFalse && this.onTrue !== this.onFalse) {
      this.item.precedingDecisionUi = {
        ontrue: null,
        onfalse: null,
      };
      this.item.precedingDecisionUi.ontrue = this.onTrue;
      this.item.precedingDecisionUi.onfalse = this.onFalse;
      this.item.postDecisionRuleJsonUi = this.postDecisionRuleJson;
      this.dialogRef.close(this.item);
    } else if (this.onTrue === this.onFalse) {
      this._alertService.responseMessage({
        status: 'failure',
        message: 'Both services should not be same',
      });
    }
  }
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

  public validationCheck(val) {
    if (!val.key || !val.operator || !val.value) {
      return true;
    } else if (val.hasOwnProperty('service') && val.service === undefined) {
      return true;
    }
    return false;
  }

  private checkRulesAvailable(params) {
    params.reduce((acc, val) => {
      // if (val.group) {
      //     val.nodes = val.nodes[0].nodes;
      // }
      if (!val.group) {
        if (this.validationCheck(val) || val.error) {
          this.errNodes++;
        }
      }
      if (val.nodes) {
        this.checkRulesAvailable(val.nodes);
      }
      delete val.error;
      delete val.validation_Type;
    }, []);
  }
}
