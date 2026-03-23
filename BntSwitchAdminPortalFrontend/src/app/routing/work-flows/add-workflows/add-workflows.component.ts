import { IsValidWorkflowName } from './../../../store/actions/workflows.actions';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { EventEmitter } from 'events';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { WorkflowEventService } from '@app/services/workflows.services';
import { Subscription, Subject } from 'rxjs';
import { combineLatest, takeUntil, takeWhile } from 'rxjs/operators';
import { ViewSettingGetObject } from '@app/models/view-settings.interface';
import { selectViewSettingsList } from '@app/store/selectors/view-settings.selector';
import {
  GetLatestWorkFlowService,
  AddLatestWorkflow,
  GetSingleLatestWorkflow,
  ClearState,
  PublishLatestWorkflow,
  GetReversalFields,
} from '@app/store/actions/workflows.actions';
import {
  selectLatestWorkflowService,
  selectWorkflowAdd,
  selectSingkeWorkflow,
  selectWorkflowPublish,
  selectWorkFlowDropDown,
  isValidWorklowName,
} from '@app/store/selectors/workflows.selectors';
import { GetInternalCode, GetMessageContextList } from '@app/store/actions/l1-adapter.action';
import { selectInternalCode, SelectMessageContextList } from '@app/store/selectors/l1-adapter.selectors';
import { AlertService } from '@app/services/alert.service';
import { GetRuleCondition } from '@app/store/actions/router.actions';
import { selectGetRuleCondition } from '@app/store/selectors/router.selectors';
import { ReversibleDialogComponent } from '../reversible-dialog/reversible-dialog.component';
import { SubscribeService } from '@app/services/subscribe.services';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-add-workflows',
  styleUrls: ['./add-workflows.component.scss'],
  templateUrl: './add-workflows.component.html',
})
export class AddWorkflowsComponent implements OnInit, OnDestroy {
  @Output() addnewoutput = new EventEmitter();
  @Input() workflowGroup: any;
  @Input() editData: any;
  public currentLang: string;
  isAlive = true;
  public currentPagination = '20';
  public servicelist = [];
  public globalList = [];
  public menuList = [];
  public menuListCopy = [];
  public exportMenuList = [];
  public usedList = [];
  public workflowName = null;
  public nodes = [];
  public workflowObj = {
    id: null,
    name: null,
    responseCode: null,
    version: 0,
    workflowId: null,
    workflowJson: '{}',
    serviceGroupJson: [],
    deleted: '0',
    workFlowServices: [],
    reverseCondition: {
      reverseCondition: [],
      services: [],
    },
  };
  public usedGroup = [];
  id = null;
  subscription: Subscription;
  itemlist = {};
  componetDestroyed = new Subject();
  public isVisible = false;
  public isReversalVisible = false;
  public valid = true;
  public readOnlyFlag = false;
  public groupServicelist = [];
  public groupGlobalList = [];
  public groupUsedList = [];
  public items: any = [];
  public internalCodeList: any = [];
  public services: any = null;
  public ipc: any = null;
  public selectedServiceList: any = '';
  public selectedValue = 'option1';
  public editGroupIndex = -1;
  public groupJson = {
    name: null,
    workFlowServices: [],
    isDelete: true,
  };
  public decisionGroup = [];
  public tempService: any = [];
  public serviceList: any;
  public ruleData: any;
  public textBoxStatus = false;
  public responseCode = 'Response Code Rule';
  menuListReversal: any = [];
  selectedMenuListReversal: any[];
  errorCount = 0;
  reversalData: any;
  isSaveEnable: boolean;
  public updateReverse = false;
  public ruleNameRegex = '^[a-zA-Z0-9-_]+$';
  public showGroupTree = false;
  public currentGroup: any;
  public isSpinning = true;
  constructor(
    private _store: Store<IAppState>,
    private route: ActivatedRoute,
    private subscribeService: SubscribeService,
    private _alertService: AlertService,
    private workflowEventService: WorkflowEventService,
    translate: TranslateService,
    protected router: Router,
    private alertService: AlertService,
    private dialog: MatDialog,
  ) {
    const dropDownTables = ['TransactionType', 'IPC'];
    this.id = this.route.snapshot.paramMap.get('id');
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectLatestWorkflowService))
      .subscribe((response: any) => {
        if (response) {
          this.resetObject();
          let servicelist = JSON.parse(JSON.stringify(response.servicelist));
          servicelist = servicelist.map((item, index) => {
            return {
              id: index + 1,
              name: item,
              isService: true,
            };
          });
          this.tempService = JSON.parse(JSON.stringify(servicelist));
          this.servicelist = JSON.parse(JSON.stringify(servicelist));
          this.groupServicelist = JSON.parse(JSON.stringify(servicelist));
          this.globalList = servicelist;
          this.groupGlobalList = servicelist;
          this.menuList = this.tempService.map(item => {
            item.status = false;
            return item;
          });
          this.menuListCopy = this.menuList;
          this.groupGlobalList = servicelist;
          if (this.id) {
            this._store.dispatch(new GetSingleLatestWorkflow({ id: this.id }));
            this.textBoxStatus = true;
          } else {
            this.addFirstElement();
            this.textBoxStatus = false;
            this.addFirstGroupElement();
          }
        }
      });
    
    this._store.dispatch(new GetReversalFields());
    this._store.dispatch(new GetRuleCondition());
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectGetRuleCondition))
      .subscribe((ruleData: any) => {
        if (ruleData && ruleData.data !== null) {
          this.ruleData = {
            fields: ruleData.data.fields,
            // .filter(ele => {
            // return dropDownTables.includes(ele.label);
            // }),
          };
          this.serviceList = ruleData.data.service;
        }
      });
      this._store.dispatch(new GetMessageContextList(0));
    this._store.pipe(select(SelectMessageContextList)).subscribe((response: any) => {
      if (response && response.data) {
        this.isSpinning = false;
      }
    });
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectWorkFlowDropDown))
      .subscribe(result => {
        this.reversalData = result;
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectViewSettingsList))
      .subscribe((response: ViewSettingGetObject) => {
        if (response) {
          this.currentPagination = response.data.settingDto.pagination;
          this.currentLang = response.data.settingDto.language;
          translate.setDefaultLang(this.currentLang);
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectWorkflowAdd))
      .subscribe((response: any) => {
        if (response) {
          if (response.status === 'success') {
            this.router.navigate(['/routing/workflow-new']);
          }
        }
      });

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectWorkflowPublish))
      .subscribe((response: any) => {
        if (response) {
          if (response.status === 'success') {
            this.router.navigate(['/routing/workflow-new']);
          }
        }
      });
      

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectSingkeWorkflow))
      .subscribe((response: any) => {
        if (response) {
          this.workflowObj = response.data.workflow;
          if (
            (Array.isArray(response.data.workflow.reverseCondition.reverseCondition) &&
              response.data.workflow.reverseCondition.reverseCondition.length > 0) ||
            (response.data.workflow.reverseCondition.reverseCondition &&
              !Array.isArray(response.data.workflow.reverseCondition.reverseCondition))
          ) {
            this.updateReverse = true;
          }
          this.workflowObj.workFlowServices = this.jsonParse(this.workflowObj.workFlowServices);
          this.groupAddInServiceList(this.workflowObj.serviceGroupJson);
          if (this.workflowObj.responseCode) {
            this.selectedValue = this.workflowObj.responseCode.type;
            switch (this.workflowObj.responseCode.type) {
              case 'option1':
                this.services = this.workflowObj.responseCode.value.replace(/^'|'$/g, '');
                break;
              case 'option2':
                this.ipc = this.workflowObj.responseCode.value.replace(/^'|'$/g, '');
                break;
              case 'option3':
                let output = this.workflowObj.responseCode.value;
                output = output.split(',');
                this.exportMenuList = output.map((item: any) => {
                  return {
                    name: item.replace(/^'|'$/g, ''),
                    status: true,
                  };
                });
                this.menuList = this.menuList.filter(
                  (listElement: any) => output.indexOf(listElement.name) === -1,
                );
                break;
              default:
                break;
            }
          }
          this.globalList = this.removeUsedService();

        }
      });
    

    this._store.dispatch(new GetInternalCode());

    this._store
      .pipe(takeUntil(this.componetDestroyed), select(selectInternalCode))
      .subscribe((response: any) => {
        if (response) {
          this.internalCodeList = response;
        }
      });

    // Selector to check if workflow name exist;
    this._store
      .pipe(takeUntil(this.componetDestroyed), select(isValidWorklowName))
      .subscribe(res => {
        if (res && res.data) {
          this.isSaveEnable = res.data;
        }
      });


  }



  deleteElement(event) {
    console.log(event, 'event is');
  }

  removeGroup(index, item) {
    this.decisionGroup = this.decisionGroup.filter((el) => el !== item.name)
    this.workflowObj.serviceGroupJson.splice(index, 1);
  }

  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  resetObject() {
    this.tempService = [];
    this.servicelist = [];
    this.groupServicelist = [];
    this.globalList = [];
    this.groupGlobalList = [];
    this.workflowObj = {
      id: null,
      name: null,
      responseCode: null,
      version: 0,
      workflowId: null,
      workflowJson: '{}',
      serviceGroupJson: [],
      deleted: '0',
      workFlowServices: [],
      reverseCondition: {
        reverseCondition: [],
        services: [],
      },
    };
    this.groupJson = {
      name: null,
      isDelete: true,
      workFlowServices: [],
    };
  }

  public openModal() {
    this.isVisible = true;
  }

  public openReversalModal() {
    this.getreversalServices();
    this.isReversalVisible = true;
  }

  private getreversalServices(): void {
    const selectedServices = [];
    const copiedSelectedServicesList = JSON.parse(
      JSON.stringify(this.workflowObj.workFlowServices),
    );
    // const savedServices = this.workflowObj.reverseCondition.services;
    const copiedMenu = JSON.parse(JSON.stringify(this.menuList));
    const retreivedSelectedFields = this.getSelectedServices(
      copiedSelectedServicesList,
      selectedServices,
    );
    this.menuListReversal = copiedMenu
      .filter(ele => retreivedSelectedFields.includes(ele.name))
      .filter(ele => {
        if (this.workflowObj.reverseCondition && this.workflowObj.reverseCondition.services) {
          return !this.workflowObj.reverseCondition.services.includes(ele.name);
        } else {
          return ele.name;
        }
      });
    this.selectedMenuListReversal = this.menuList.filter((ele, idx) => {
      if (this.workflowObj.reverseCondition && this.workflowObj.reverseCondition.services) {
        return this.workflowObj.reverseCondition.services.includes(ele.name);
      }
    });
  }

  private getSelectedServices(list, insertedFields) {
    list.forEach(element => {
      if (element && element.services && element.services.length) {
        insertedFields.push(element.serviceName);
        this.getSelectedServices(element.services, insertedFields);
      } else {
        return insertedFields.push(element.serviceName);
      }
    });
    return insertedFields;
  }

  public dataTransformation(data) {
    return [{
      title: `Name: ${data.name}`,
      key: data.id,
      expanded: true,
      parent: true,
      children: this.recursiveTree(data.workFlowServices)
    }]
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  public recursiveTree(data) {
    return data.map((item) => {
      if (item.services?.length) {
        return {
          title: (item.serviceType === 'SERVICE') ? item.serviceName : item.groupName, key: item.id,
          icon: 'smile', children: this.recursiveTree(item.services), expanded: true, isDecison: (item.precedingDecisionUi) ? true : false, parent: false
        }
      } else {
        return { title: (item.serviceType === 'SERVICE') ? item.serviceName : item.groupName, key: item.id, parent: false, isLeaf: true, isDecison: (item.precedingDecisionUi) ? true : false }
      }
    })
  }
  ngOnInit() {
    this.subscribeService.getWorkFlowGroupMode().subscribe((element) => {
      if (element) {
        this.showGroupTree = true
        this.currentGroup = JSON.parse(JSON.stringify(element))
        this.nodes = this.dataTransformation(this.currentGroup)
      } else {
        this.showGroupTree = false
        this.currentGroup = null
      }
    })
    this.route.params.pipe(takeUntil(this.componetDestroyed)).subscribe(params => {
      if ('view' in params) {
        this.readOnlyFlag = true;
      }
    });
    this._store.dispatch(new GetLatestWorkFlowService());
    this.subscription = this.workflowEventService
      .getItems()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(obj => {
        this.globalList = obj;
      });

    this.workflowEventService
      .getUsedItems()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(obj => {
        this.usedList = obj;
      });

    this.workflowEventService
      .getGroupItems()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(obj => {
        this.groupGlobalList = obj;
      });

    this.workflowEventService
      .getGroupUsedItems()
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe(obj => {
        this.groupUsedList = obj;
      });
  }

  public addFirstGroupElement(): void {
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
    if (this.groupGlobalList.length) {
      itemlist.id = this.groupGlobalList[0].id;
      itemlist.serviceName = this.groupGlobalList[0].name;
      this.groupUsedList.push(itemlist.serviceName);
      this.groupGlobalList = this.removeUsedGroupService();
      this.groupJson.workFlowServices.push(itemlist);
    }
  }

  removeUsedGroupService() {
    return this.groupGlobalList.filter(item => {
      return !(this.groupUsedList.indexOf(item.name) > -1);
    });
  }

  public addFirstElement(): void {
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
      this.workflowObj.workFlowServices.push(itemlist);
    }
  }

  addService() {
    this.addFirstElement();
  }

  addGroupService() {
    this.addFirstGroupElement();
  }

  removeUsedService() {
    return this.globalList.filter(item => {
      return !(this.usedList.indexOf(item.name) > -1);
    });
  }

  public jsonParse(services): any {
    return services.map(item => {
      this.usedList.push(item.serviceName);
      if (item.services?.length) {
        this.jsonParse(item.services);
      }
      return item;
    });
  }

  public groupAddInServiceList(item) {
    item.forEach(it => {
      this.decisionGroup.push(it.name)
      const groupService = {
        id: this.tempService.length + 1,
        name: it.name,
        isService: false,
      };
      this.globalList.push(groupService);
      this.servicelist.push(groupService);
    });
  }

  public jsonGroupParse(services): any {
    return services.map(item => {
      this.groupUsedList.push(item.serviceName);
      if (item.services.length) {
        this.jsonGroupParse(item.services);
      }
      return item;
    });
  }

  editGroup(index) {
    this.editGroupIndex = index;
    let output = JSON.stringify(this.workflowObj.serviceGroupJson[index]);
    output = JSON.parse(output);
    this.groupJson.name = output['name'];
    this.groupJson.workFlowServices = output['workFlowServices'];
    this.groupJson.workFlowServices = this.jsonGroupParse(this.groupJson.workFlowServices);
    this.groupGlobalList = this.removeUsedGroupService();
  }

  tabClick(index) {
    if (index === 1) {
      const output = [];
      this.workflowObj.workFlowServices.map(item => {
        this.usedGroup = this.getGroupService(item, output);
      });
      this.workflowObj.serviceGroupJson = this.workflowObj.serviceGroupJson.map(item => {
        if (this.usedGroup.indexOf(item.name) < 0) {
          item.isDelete = true;
        } else {
          item.isDelete = false;
        }
        return item;
      });
    }
    if (index === 0) {
      this.removeUsedServiceFormList();
    }
  }

  removeUsedServiceFormList() {
    this.globalList = this.globalList.filter(item => {
      return !(this.usedList.indexOf(item.name) > -1);
    });
    this.workflowEventService.sendItems(this.globalList);
    return this.globalList;
  }

  getGroupService(item, output) {
    if (item.groupName) {
      output.push(item.serviceName);
    }
    if (item.services.length) {
      item.services.map(element => {
        if (item.groupName) {
          output.push(element.serviceName);
        }
        this.getGroupService(element, output);
      });
    }
    return output;
  }

  public isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  // save workflow
  public saveWorkflow(): void {
    if (!this.workflowObj.name) {
      this.errorToaster('Please enter workflow name');
    } else if (this.isEmptyOrSpaces(this.workflowObj.name)) {
      this.errorToaster('Please enter valid workflow name');
    } else {
      if (this.isSaveEnable || this.id) {
        if (this.workflowObj.workFlowServices.length > 0) {
          this.ipc = null;
          this.services = null;
          this.exportMenuList = [];
          this.menuList = this.menuListCopy;
          if (this.id) {
            this.workflowObj.id = this.id;
            this.workflowObj.serviceGroupJson.concat(this.groupJson);
            this._store.dispatch(new AddLatestWorkflow(this.workflowObj));
          } else {
            this.workflowObj.serviceGroupJson.concat(this.groupJson);
            this._store.dispatch(new AddLatestWorkflow(this.workflowObj));
          }
        } else {
          this.errorToaster('Please select atleast one workflow service');
        }
      } else {
        this.errorToaster(`${this.workflowObj.name} already Exist.`);
        console.log(this.workflowObj.name.length);
      }
    }
  }

  public publishWorkflow(): void {
    if (!this.workflowObj.name) {
      this.errorToaster('Please enter workflow name');
    } else {
      if (this.isSaveEnable || this.id) {
        if (this.workflowObj.workFlowServices.length > 0) {
          this.ipc = null;
          this.services = null;
          this.exportMenuList = [];
          this.menuList = this.menuListCopy;
          if (this.id) {
            this.workflowObj.id = this.id;
            this.workflowObj.serviceGroupJson.concat(this.groupJson);
            this._store.dispatch(new PublishLatestWorkflow(this.workflowObj));
          } else {
            this.workflowObj.serviceGroupJson.concat(this.groupJson);
            this._store.dispatch(new PublishLatestWorkflow(this.workflowObj));
          }
        } else {
          this.errorToaster('Please select atleast one workflow service');
        }
      } else {
        this.errorToaster(`${this.workflowObj.name} already Exist.`);
      }
    }
  }

  private isGroupNameExist(): boolean {
    return (
      this.workflowObj.serviceGroupJson.findIndex(({ name }) => name === this.groupJson.name) === -1
    );
  }

  private errorToaster(message): void {
    console.log('message', message);
    this._alertService.responseMessage({
      status: 'failure',
      message,
    });
  }


  public saveGroup(): void {
    if (this.isGroupNameExist() || this.editGroupIndex !== -1) {
      if (this.groupJson.name && this.groupJson.workFlowServices.length > 0) {
        if (this.editGroupIndex === -1) {
          this.decisionGroup.push(this.groupJson.name)
          this.groupJson.workFlowServices = this.groupDataTransform(
            this.groupJson.name,
            this.groupJson.workFlowServices,
          );
          this.workflowObj.serviceGroupJson.push(this.groupJson);
        } else {
          this.workflowObj.serviceGroupJson[this.editGroupIndex] = this.groupJson;
        }
        this.editGroupIndex = -1;
        this.groupJson = {
          name: null,
          isDelete: true,
          workFlowServices: [],
        };
        this.groupUsedList = [];
        this.groupServicelist = this.tempService;
        this.groupGlobalList = this.tempService;
        this.addFirstGroupElement();
        this.addGroupInList();
      } else if (this.groupJson.name && this.groupJson.workFlowServices.length == 0) {
        this.errorToaster('Please enter Group Service');
      } else {
        this.errorToaster('Please enter Group Name');
      }
    } else {
      this.errorToaster(`${this.groupJson.name} Group Name Already Exist`);
    }
  }

  public addGroupInList() {
    const output = this.workflowObj.serviceGroupJson.map((item, index) => {
      return {
        id: index + 1,
        name: item.name,
        isService: false,
      };
    });
    this.servicelist = this.servicelist.concat(output);
    this.globalList = this.globalList.concat(output);
  }

  // recursive call to assign group name
  public groupDataTransform(groupName, data) {
    return data.map(item => {
      item.groupName = groupName;
      if (data.length) {
        this.groupDataTransform(groupName, item.services);
      }
      return item;
    });
  }

  public getSelectedLeft(index: number) {
    this.menuList[index]['status'] = !this.menuList[index]['status'];
  }

  public getSelectedReversalLeft(index: number) {
    this.menuListReversal[index]['status'] = !this.menuListReversal[index]['status'];
  }

  public getSelectedRight(index: number) {
    this.exportMenuList = this.exportMenuList.map(it => {
      it.status = false;
      return it;
    });
    this.exportMenuList[index]['status'] = !this.exportMenuList[index]['status'];
  }

  public getSelectedRightTraversal(index: number) {
    this.selectedMenuListReversal = this.selectedMenuListReversal.map(it => {
      it.status = false;
      return it;
    });
    this.selectedMenuListReversal[index]['status'] =
      !this.selectedMenuListReversal[index]['status'];
  }

  public moveArrayItemToNewIndex(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  moveToUpElement() {
    const index = this.exportMenuList.findIndex(it => it.status);
    if (index !== 0) {
      this.exportMenuList = this.moveArrayItemToNewIndex(this.exportMenuList, index, index - 1);
    }
  }

  moveToDownElement() {
    const index = this.exportMenuList.findIndex(it => it.status);
    if (index !== this.exportMenuList.length && index + 1 !== this.exportMenuList.length) {
      this.exportMenuList = this.moveArrayItemToNewIndex(this.exportMenuList, index, index + 1);
    }
  }

  public getElement() {
    const selectedItems = this.exportMenuList;
    const selectList = this.menuList.filter((listElement: any) => listElement.status);
    this.exportMenuList = selectedItems.concat(selectList);
    this.menuList = this.menuList.filter((listElement: any) => !listElement.status);
    this.exportMenuList.map((item: any) => (item.status = false));
  }

  public getReversalElement() {
    const selectedItems = this.selectedMenuListReversal;
    const selectList = this.menuListReversal.filter((listElement: any) => listElement.status);
    this.selectedMenuListReversal = selectedItems.concat(selectList);
    this.menuListReversal = this.menuListReversal.filter((listElement: any) => !listElement.status);
    this.selectedMenuListReversal.map((item: any) => (item.status = false));
  }

  public removeElement() {
    const selectedItems = this.menuList;
    const selectList = this.exportMenuList.filter((listElement: any) => listElement.status);
    this.menuList = selectedItems.concat(selectList);
    this.exportMenuList = this.exportMenuList.filter((listElement: any) => !listElement.status);
    this.menuList.map((item: any) => (item.status = false));
    //  this.menuList.sort((a, b) => a['name'].localeCompare(b['name']));
  }

  public removeReversalElement() {
    const selectedItems = this.menuListReversal;
    const selectList = this.selectedMenuListReversal.filter(
      (listElement: any) => listElement.status,
    );
    this.menuListReversal = selectedItems.concat(selectList);
    this.selectedMenuListReversal = this.selectedMenuListReversal.filter(
      (listElement: any) => !listElement.status,
    );
    this.menuListReversal.map((item: any) => (item.status = false));
    //  this.menuList.sort((a, b) => a['name'].localeCompare(b['name']));
  }

  public validation() {
    if (this.selectedValue == 'option1') {
      if (!this.services) {
        this.valid = false;
        this.alertService.responseMessage({
          message: 'Please select Services',
          status: 'failure',
        });
      } else {
        this.valid = true;
      }
    } else if (this.selectedValue == 'option2') {
      if (!this.ipc) {
        this.valid = false;
        this.alertService.responseMessage({
          message: 'Please select IPC',
          status: 'failure',
        });
      } else {
        this.valid = true;
      }
    } else if (this.selectedValue == 'option3') {
      if (this.exportMenuList.length < 1) {
        this.valid = false;
        this.alertService.responseMessage({
          message: 'Please add Services',
          status: 'failure',
        });
      } else {
        this.valid = true;
      }
    }
    if (this.valid) {
      this.save();
    }
  }

  public save() {
    let finalData = {
      type: null,
      value: null,
      text: null,
    };
    if (this.selectedValue == 'option1') {
      finalData.type = this.selectedValue;
      finalData.value = this.services;
      finalData.text = `setResponseOfService('${this.services}')`;
    } else if (this.selectedValue == 'option2') {
      finalData.type = this.selectedValue;
      finalData.value = this.ipc;
      finalData.text = `setResponseOfService('${this.ipc}')`;
    } else if (this.selectedValue == 'option3') {
      const list = this.exportMenuList.map(item => `'${item.name}'`);
      finalData.type = this.selectedValue;
      finalData.value = list.join(',');
      finalData.text = `setResponseOfService(${finalData.value})`;
    }
    this.workflowObj.responseCode = finalData;
    this.isVisible = false;
  }

  public onChange(event) {
    if (event.value == 'option1') {
      this.ipc = null;
      this.exportMenuList = [];
      this.menuList = this.menuListCopy;
    } else if (event.value == 'option2') {
      this.services = null;
      this.exportMenuList = [];
      this.menuList = this.menuListCopy;
    } else if (event.value == 'option3') {
      this.services = null;
      this.ipc = null;
    }
  }

  public closeModal() {
    this.isVisible = false;
  }

  public closeReversalModal(operation?: string) {
    this.errorCount = 0;
    this.checkRulesAvailable(this.workflowObj.reverseCondition.reverseCondition);
    if (
      operation === 'save' &&
      (!this.selectedMenuListReversal.length ||
        !this.workflowObj.reverseCondition.reverseCondition.length ||
        this.errorCount)
    ) {
      const messages = {
        condn: 'Please Select All the Required Fields from the Condition',
        default: 'Please Select all the Required Conditions and Services',
      };
      this._alertService.responseMessage({
        status: 'failure',
        message: this.errorCount ? messages.condn : messages.default,
      });
      return false;
    }
    this.workflowObj.reverseCondition.services = this.selectedMenuListReversal.map(
      ({ name }) => name,
    );
    this.isReversalVisible = false;
  }

  private checkRulesAvailable(params) {
    params.reduce((acc, val) => {
      if (val.group) {
        val.nodes = val.nodes[0].nodes;
      }
      if (val.nodes) {
        this.checkRulesAvailable(val.nodes);
      }
      if (!val.key || !val.relation || !val.value) {
        this.errorCount++;
      }
      delete val.error;
      delete val.validation_Type;
    }, []);
  }

  openReversalDialog() {
    this.getreversalServices();
    const data = {
      ruleData: this.reversalData.data ?? [],
      nodes: this.workflowObj?.reverseCondition?.reverseCondition || [],
      serviceList: this.serviceList,
      menuListReversal: this.menuListReversal,
      selectedMenuListReversal: this.selectedMenuListReversal,
    };
    const dialogRef = this.dialog.open(ReversibleDialogComponent, {
      data,
      disableClose: true,
      panelClass: 'reversal-dialog',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.workflowObj.reverseCondition = res;
      }
    });
  }

  public isNameValid(event) {
    if (!this.id) {
      this._store.dispatch(new IsValidWorkflowName(event.target.value));
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this._store.dispatch(new ClearState());
    this.componetDestroyed.next();
    this.showGroupTree = false;
    this.currentGroup = null;
    this.subscribeService.setWorkFlowGroupMode(null)
    this.componetDestroyed.complete();
    this.componetDestroyed.unsubscribe();
  }
}
