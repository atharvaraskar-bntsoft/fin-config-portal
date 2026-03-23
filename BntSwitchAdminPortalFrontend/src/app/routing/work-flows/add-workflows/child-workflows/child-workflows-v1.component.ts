import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkflowEventService } from '@app/services/workflows.services';
import { MatDialog } from '@angular/material/dialog';
import { DicisonDialogComponent } from '@app/shared/decision-dialog/decision-dialog.component';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { TranslateService } from '@ngx-translate/core';
import { SCREEN_NAME, WorkflowSafComponent } from '../../workflow-saf/workflow-saf.component';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { SubscribeService } from '@app/services/subscribe.services';

@Component({
  selector: 'app-child-workflows-v1',
  templateUrl: './child-workflows-v1.component.html',
  styleUrls: ['./child-workflows-v1.component.scss'],
})
export class ChildWorkflowsV1Component implements OnInit {
  @Input() globalList;
  @Input() items = [];
  @Output() valueChange = new EventEmitter();
  @Input() usedList;
  @Input() servicelist;
  @Input() tempService;
  @Input() readOnlyFlag = false;
  @Input() workflowObj;
  @Input() decisionGroup = [];
  nodes = [
  ];
  componetDestroyed = new Subject();
  public oldValue: any;
  public currentitem: any;
  public currentLang: string;
  public currentGroup;
  constructor(
    private workflowEventService: WorkflowEventService,
    public dialog: MatDialog,
    private _store: Store<IAppState>,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private subscribeService: SubscribeService,
  ) {
    this._store.pipe(select(selectViewSettingsList)).subscribe((response: ViewSettingGetObject) => {
      if (response) {
        this.currentLang = response.data.settingDto.language;
        translate.setDefaultLang(this.currentLang);
      }
    });
  }

  ngOnInit() {

  }

  public isGroup(name) {
    let text = '_GROUP';
    return (name.search(text) < 0) ? false : true;
  }

  public showGroup(name) {
    this.currentGroup = this.workflowObj.serviceGroupJson.find((it) => it.name === name)
    this.subscribeService.setWorkFlowGroupMode(this.currentGroup)
  }

  ngOnChanges() {
    this.globalList =
      this.globalList &&
      this.globalList.filter((ele, idx, self) => {
        return self.findIndex(item => item.name === ele.name) === idx;
      });
  }

  AddParallel(items) {
    const itemlist = {
      id: null,
      serviceType: null,
      serviceName: null,
      ordinal: 0,
      groupName: null,
      postDecisionRuleJsonUi: null,
      precedingDecisionUi: null,
      safingConditionJson: null,
      safingExceptionConditionJson: null,
      autoReversalEligibilityCondition: null,
      autoReversalFinalCondition: null,
      services: [],
    };
    if (this.globalList.length) {
      if (this.globalList[0].isService) {
        itemlist.serviceType = 'SERVICE';
      } else {
        itemlist.serviceType = 'GROUP';
        itemlist.groupName = this.globalList[0].name;
      }
      itemlist.id = this.globalList[0].id;
      itemlist.serviceName = this.globalList[0].name;
      this.usedList.push(itemlist.serviceName);
      this.globalList = this.removeUsedService();
      itemlist.ordinal = items.length + 1;
      items.push(itemlist);
    }
  }

  removeUsedService() {
    this.globalList = this.globalList.filter(item => {
      return !(this.usedList.indexOf(item.name) > -1);
    });
    this.workflowEventService.sendItems(this.globalList);
    return this.globalList;
  }

  AddSequential(item) {
    const itemlist = {
      id: null,
      serviceType: 'SERVICE',
      serviceName: null,
      ordinal: 0,
      groupName: null,
      postDecisionRuleJsonUi: null,
      precedingDecisionUi: null,
      services: [],
    };
    if (this.globalList.length) {
      if (this.globalList[0].isService) {
        itemlist.serviceType = 'SERVICE';
      } else {
        itemlist.serviceType = 'GROUP';
        itemlist.groupName = this.globalList[0].name;
      }
      itemlist.id = this.globalList[0].id;
      itemlist.serviceName = this.globalList[0].name;
      this.usedList.push(itemlist.serviceName);
      this.globalList = this.removeUsedService();
      item.services.push(itemlist);
    }
  }

  handlePrecedingServices(item) {
    const precedingUniqueServices = new Set();
    let precedingServices;
    this.items &&
      this.items.forEach((ele, idx) => {
        precedingUniqueServices.add(ele.serviceName);
        if (ele && ele.precedingDecisionUi && Object.keys(ele.precedingDecisionUi).length) {
          precedingUniqueServices.add(ele.precedingDecisionUi.onfalse);
          precedingUniqueServices.add(ele.precedingDecisionUi.ontrue);
        }
      });
    precedingServices = [...precedingUniqueServices];
    return precedingServices;
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  AddDecision(item) {
    this.subscribeService.sendReadOnlyFlag(this.readOnlyFlag);
    this.currentitem = item;
    const removeElement = ['GATEWAY_SERVICE']
    if (item.serviceType === 'SERVICE') {
      removeElement.push(item.serviceName)
    }
    else if (item.serviceType === 'GROUP') {
      removeElement.push(item.groupName)
    }
    const precedingServices = this.handlePrecedingServices(item);
    item.tempService = this.tempService;
    //let output = this.globalList.map(el => el.name).filter(el => precedingServices.includes(el));
    let output = this.globalList.map(el => el.name).concat(this.decisionGroup).filter((el) => removeElement.indexOf(el) < 0);
    item.output = output.filter((v, i, a) => a.indexOf(v) === i);
    item.output1 = output.filter((v, i, a) => a.indexOf(v) === i);
    if (!item.output1.includes('END')) {
      item.output1.unshift('END');
    }
    item.output1 = item.output1.filter((v, i, a) => a.indexOf(v) === i);
    item.workFlowService = this.usedList;
    item.readOnlyFlag = this.readOnlyFlag
    const dialogRef = this.dialog.open(DicisonDialogComponent, {
      data: item,
      disableClose: true,
      panelClass: 'decision-dialog',
    });
    dialogRef.afterClosed().subscribe(item => {
      delete item.tempService;
      delete item.output;
      item = item;
    });
  }

  addExceptionSafDecision(result) {
    const data = { ...result, screen: SCREEN_NAME.ExceptionDecison };
    const dialogRef = this.dialog.open(WorkflowSafComponent, {
      data,
      disableClose: true,
      panelClass: 'decision-dialog',
    });
    dialogRef.afterClosed().subscribe(item => {
      delete item.tempService;
      delete item.output;
      delete item.screen;
      Object.assign(result, item);
    });
  }

  addSafDecision(result) {
    const data = { ...result, screen: SCREEN_NAME.SafDecision };
    const dialogRef = this.dialog.open(WorkflowSafComponent, {
      data,
      disableClose: true,
      panelClass: 'decision-dialog',
    });
    dialogRef.afterClosed().subscribe(item => {
      delete item.tempService;
      delete item.output;
      delete item.screen;
      Object.assign(result, item);
    });
  }

  addAutoReversalEligibilityCondition(result) {
    const data = { ...result, screen: SCREEN_NAME.AutoReversalEligibilityCondition };
    const dialogRef = this.dialog.open(WorkflowSafComponent, {
      data,
      disableClose: true,
      panelClass: 'decision-dialog',
    });
    dialogRef.afterClosed().subscribe(item => {
      delete item.tempService;
      delete item.output;
      delete item.screen;
      Object.assign(result, item);
    });
  }
  addAutoReversalFinalCondition(result) {
    const data = { ...result, screen: SCREEN_NAME.AutoReversalFinalCondition };
    const dialogRef = this.dialog.open(WorkflowSafComponent, {
      data,
      disableClose: true,
      panelClass: 'decision-dialog',
    });
    dialogRef.afterClosed().subscribe(item => {
      delete item.tempService;
      delete item.output;
      delete item.screen;
      Object.assign(result, item);
    });
  }

  removeParent(result, index) {
    const ouptput = this.items.indexOf(result);
    this.items.splice(ouptput, 1);
    const output = this.getTreeAllTreeService(result);
    this.usedList = this.usedList.filter(item => {
      return !(output.indexOf(item) > -1);
    });
    this.globalList = JSON.parse(
      JSON.stringify(
        this.servicelist.filter(item => {
          return !(this.usedList.indexOf(item.name) > -1);
        }),
      ),
    );
    this.workflowEventService.sendUsedItems(this.usedList);
    this.workflowEventService.sendItems(this.globalList);
  }

  // updated traversing dropdown services
  public getDependsOn(result, event: any): void {
    if (event.isService) {
      result.serviceType = 'SERVICE';
    } else {
      result.serviceType = 'GROUP';
      result.groupName = event.name;
      result.serviceName = event.name;
    }
    this.usedList.push(event.name);
    this.usedList = this.usedList.filter(item => {
      return this.oldValue !== item;
    });
    this.globalList = JSON.parse(
      JSON.stringify(
        this.servicelist.filter(item => {
          return !(this.usedList.indexOf(item.name) > -1);
        }),
      ),
    );
    this.workflowEventService.sendUsedItems(this.usedList);
    this.workflowEventService.sendItems(this.globalList);
  }

  getOldValue(result) {
    this.oldValue = result.serviceName;
  }

  getTreeAllTreeService(item) {
    const output = [];
    output.push(item.serviceName);
    if (item.services.length) {
      item.services.map(element => {
        output.push(element.serviceName);
        this.getRecursiveService(output, element);
      });
    }
    return output;
  }

  getRecursiveService(output, item) {
    if (item.services.length) {
      item.services.map(element => {
        output.push(element.serviceName);
        this.getRecursiveService(output, element);
      });
    }
  }
}
