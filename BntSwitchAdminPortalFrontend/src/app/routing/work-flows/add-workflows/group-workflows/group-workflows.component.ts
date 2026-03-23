import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeService } from '@app/services/subscribe.services';
import { WorkflowEventService } from '@app/services/workflows.services';
import { DicisonDialogComponent } from '@app/shared/decision-dialog/decision-dialog.component';
import { SCREEN_NAME, WorkflowSafComponent } from '../../workflow-saf/workflow-saf.component';

@Component({
  selector: 'app-group-workflows',
  templateUrl: './group-workflows.component.html',
  styleUrls: ['./group-workflows.component.scss'],
})
export class GroupWorkflowsComponent implements OnInit {
  @Input() globalList;
  @Input() items = [];
  @Input() decisionGroup = [];
  @Input() parentIndex = 0;
  @Output() valueChange = new EventEmitter();
  @Input() usedList;
  @Input() servicelist;
  @Input() tempService;
  @Input() readOnlyFlag = false;
  public currentitem: any;
  public oldValue: any;
  public currentGroup;
  @Input() groupJson;
  @Input() workflowObj;
  constructor(private workflowEventService: WorkflowEventService,
    public dialog: MatDialog,
    private subscribeService: SubscribeService) {  }

  ngOnInit() {}

  AddParallel(items) {
    const itemlist = {
      id: null,
      serviceType: 'SERVICE',
      serviceName: null,
      ordinal: 1,
      groupName: null,
      postDecisionRuleJsonUi: null,
      precedingDecisionUi: null,
      services: [],
    };
    if (this.globalList.length) {
      itemlist.id = this.globalList[0].id;
      itemlist.serviceName = this.globalList[0].name;
      this.usedList.push(itemlist.serviceName);
      this.globalList = this.removeUsedService();
      items.push(itemlist);
    }
  }

  public isGroup(name) {
    return this.workflowObj.serviceGroupJson.find((it) => it.name === name)
  }
  public showGroup(name) {
    this.currentGroup = this.workflowObj.serviceGroupJson.find((it) => it.name === name)
    this.subscribeService.setWorkFlowGroupMode(this.currentGroup)
  }

  removeUsedService() {
    this.globalList = this.globalList.filter(item => {
      return !(this.usedList.indexOf(item.name) > -1);
    });
    this.workflowEventService.sendGroupItems(this.globalList);
    return this.globalList;
  }

  AddSequential(item) {
    const itemlist = {
      id: null,
      serviceType: 'SERVICE',
      serviceName: null,
      ordinal: 1,
      groupName: null,
      postDecisionRuleJsonUi: null,
      precedingDecisionUi: null,
      services: [],
    };
    if (this.globalList.length) {
      itemlist.id = this.globalList[0].id;
      itemlist.serviceName = this.globalList[0].name;
      this.usedList.push(itemlist.serviceName);
      this.globalList = this.removeUsedService();
      item.services.push(itemlist);
    }
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
    this.workflowEventService.sendGroupUsedItems(this.usedList);
    this.workflowEventService.sendGroupItems(this.globalList);
  }

  AddDecision(item) {
    this.subscribeService.sendReadOnlyFlag(this.readOnlyFlag);
    this.currentitem = item;
    const removeElement = ['GATEWAY_SERVICE']
    removeElement.push(item.groupName)
    if (item.serviceType === 'SERVICE') {
      removeElement.push(item.serviceName)
    }
    else if (item.serviceType === 'GROUP') {
      removeElement.push(item.groupName)
    }
    const precedingServices = this.handlePrecedingServices(item);
    item.tempService = this.tempService;
    /* let output = this.globalList.map(el => el.name).filter(el => precedingServices.includes(el));
    output = output.concat(this.usedList); */
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

  // updated traversing dropdown services
  public getDependsOn(event: any): void {
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
    this.workflowEventService.sendGroupUsedItems(this.usedList);
    this.workflowEventService.sendGroupItems(this.globalList);
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
