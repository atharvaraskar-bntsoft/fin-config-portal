import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SubscribeService } from '@app/services/subscribe.services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-connection-managment',
  templateUrl: './connection-managment.component.html',
  styleUrls: ['./connection-managment.component.scss'],
})
export class ConnectionManagmentComponent implements OnInit {
  public listOfConnectionName: any = [];
  public usedConnectionName: any = [];
  public loadBalancerList: any = [];
  public listOfGroupName: any = [];
  public usedlistOfGroupName: any = [];
  public connectionsModel: any = [];
  public loadBalancerUsedList: any = [];
  public connectiondata: any = {};
  public connectionManangement = {
    connections: [
      {
        connection: null,
        ip: null,
        port: null,
        label: null,
        timeOut: null,
      },
    ],
    strategyConnections: {
      strategyConnections: null,
      stationGroupStrategy: {
        inMessage: 'N',
        groupConnections: [
          {
            group: null,
            connections: [],
            isLBGroup: false,
          },
        ],
        strategyIntraGroups: null,
        strategyGroups: null,
        dataCenters: [
          {
            dataCenter: null,
            loadBalancer: null,
            stationGroup: [],
          },
        ],
        strategyLoadBalancers: null,
        strategyDataCenter: null,
      },
      custumStrategy: null,
    },
    alternateConnection: 'N',
  };
  public options = ['Service', 'Client'];
  public strategy = ['FIRST_AVAILABLE', 'STATION_GROUPS', 'ROUND_ROBIN', 'CUSTOM'];
  public interGroupStrategy = ['ROUND_ROBIN', 'FIRST_AVAILABLE'];
  public groupStrategy = ['ROUND_ROBIN', 'FIRST_AVAILABLE'];
  public lbStrategy = ['ROUND_ROBIN', 'FIRST_AVAILABLE'];
  public dcStrategy = ['ROUND_ROBIN', 'FIRST_AVAILABLE'];

  public selectedValue: any;
  public selectedStrategy: any;
  public selectedInterGroupStrategy: any;
  public selectedGroupStrategy: any;
  public selectedLBStratagy: any;
  public selectedDCStratagy: any;
  public ipReg = /^([$]({[a-zA-Z0-9_]+:(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+})|((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)|[a-zA-Z]+|([$]{[a-zA-Z_]+:[a-zA-Z]+}))$/
  // public ipReg = /^([$]({[a-zA-Z0-9_]+:(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+})|((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)|[a-zA-Z]+|([$]{[a-zA-Z_]+:[a-zA-Z]+})|([$][{][a-zA-Z0-9_:]+[}][:][$][{][a-zA-Z_:0-9.]+[}][#][$][{][a-zA-Z_0-9:]+[}][#][$][{][a-zA-Z_:0-9]+[}][#][$][{][a-zA-Z_:0-9]+[}]))$/
  public portReg = /^(([$][{][a-zA-Z_]+:[0-9]{4,6}[}])|([0-9]{4,6})|[$][{][a-zA-Z0-9:_]+[}])$/;
  public form: UntypedFormGroup;
  public form2: UntypedFormGroup;
  public connectionList: UntypedFormArray;
  public stationGroupList: UntypedFormArray;
  public stationDataCenterList: UntypedFormArray;
  @Input() public readOnlyFlag = false;
  constructor(
    private fb: UntypedFormBuilder,
    public __alertService: AlertService,
    private subscribeService: SubscribeService,
    public dialogRef: MatDialogRef<ConnectionManagmentComponent>,
    @Inject(MAT_DIALOG_DATA) public sharedData: any,
  ) {}

  ngOnInit(): void {
    if (this.sharedData && this.sharedData.connectionType) {
      if (this.sharedData.connectionType === 'client') {
        this.selectedValue = false;
      } else {
        this.selectedValue = true;
      }
    }

    this.form = this.fb.group({
      strategyConnections: ['', Validators.required],
      inMessage: null,
      custumStrategy: null,
      connections: this.fb.array([
        this.createConnections({
          connection: null,
          ip: null,
          port: null,
          label: null,
          timeOut: null,
        }),
      ]),
    });

    this.connectionList = this.form.get('connections') as UntypedFormArray;
    //  this.form2 = new FormGroup({ isNotNull: new FormControl(false) });

    this.form2 = this.fb.group({
      isNotNull: new UntypedFormControl(true),
      strategyIntraGroups: [null, Validators.required],
      strategyGroups: [null, Validators.required],
      strategyLoadBalancers: [null, Validators.required],
      strategyDataCenter: [null, Validators.required],
      stationGroup: this.fb.array([
        this.createStationGroupList({
          group: null,
          connections: null,
          isLBGroup: false,
        }),
      ]),
      stationDataCenter: this.fb.array([
        this.createStationDataCenterList({
          dataCenter: null,
          loadBalancer: null,
          group: null,
        }),
      ]),
    });
    this.stationGroupList = this.form2.get('stationGroup') as UntypedFormArray;
    this.stationDataCenterList = this.form2.get('stationDataCenter') as UntypedFormArray;

    this.getstrategyConnections().valueChanges.subscribe(res => {
      if (res) {
        switch (res) {
          case 'FIRST_AVAILABLE': {
            this.form.controls['custumStrategy'].setValidators(null);
            this.form.controls['custumStrategy'].disable();
            this.form2 = new UntypedFormGroup({ isNotNull: new UntypedFormControl(false) });
            break;
          }
          case 'STATION_GROUPS': {
            this.form.controls['custumStrategy'].setValidators(null);
            this.form.controls['custumStrategy'].disable();
            this.form2 = this.fb.group({
              isNotNull: new UntypedFormControl(true),
              strategyIntraGroups: [null, Validators.required],
              strategyGroups: [null, Validators.required],
              strategyLoadBalancers: [null, Validators.required],
              strategyDataCenter: [null, Validators.required],
              stationGroup: this.fb.array([
                this.createStationGroupList({
                  group: null,
                  connections: null,
                  isLBGroup: false,
                }),
              ]),
              stationDataCenter: this.fb.array([
                this.createStationDataCenterList({
                  dataCenter: null,
                  loadBalancer: null,
                  group: null,
                }),
              ]),
            });
            this.stationGroupList = this.form2.get('stationGroup') as UntypedFormArray;
            this.stationDataCenterList = this.form2.get('stationDataCenter') as UntypedFormArray;
            break;
          }
          case 'CUSTOM': {
            this.form2 = new UntypedFormGroup({ isNotNull: new UntypedFormControl(false) });
            this.form.controls['custumStrategy'].enable();
            this.form.controls['custumStrategy'].setValidators([Validators.required, Validators.pattern("(?!^ +$)^.+$")]);

            break;
          }
          default: {
            this.form2 = new UntypedFormGroup({ isNotNull: new UntypedFormControl(false) });
            this.form.controls['custumStrategy'].setValidators(null);
            this.form.controls['custumStrategy'].disable();
            break;
          }
        }
        if(!this.sharedData.readOnlyFlag){
          this.disableFieldsconnection();
        }
        
      }
    });

    if (this.sharedData && this.sharedData.connectionDetailsFormFlag) {
      this.setValueform(this.sharedData.connectionManagement);
    }
  }

  getstrategyConnections() {
    return this.form.get('strategyConnections') as UntypedFormControl;
  }

  private setValueform(data) {
    this.form.patchValue({
      strategyConnections: data.strategyConnections.strategyConnections,
    });
    this.selectedStrategy = data.strategyConnections.strategyConnections;

    if (data.strategyConnections.custumStrategy) {
      this.form.patchValue({
        custumStrategy: data.strategyConnections.custumStrategy.replace(/^\s+/, '').replace(/\s+$/, ''),
      });
    }

    if (data.strategyConnections.stationGroupStrategy) {
      if (
        data.strategyConnections.stationGroupStrategy.inMessage &&
        data.strategyConnections.stationGroupStrategy.inMessage === 'Y'
      ) {
        this.form.patchValue({
          inMessage: true,
        });
      } else {
        this.form.patchValue({
          inMessage: false,
        });
      }
    }

    if (data.connections) {
      this.connectionList.removeAt(0);
      data.connections.forEach((item, index) => {
        this.connectionList.push(this.createConnections(item, index));
      });
    }

    for (var i = 0; i < this.connectionList.value.length; i++) {
      if (!this.listOfConnectionName.includes(this.connectionList.value[i].connection)) {
        this.listOfConnectionName.push(this.connectionList.value[i].connection);
      }
    }

    if (this.sharedData.readOnlyFlag) {
      this.form.disable()
    }
  }

  private setValueform2(data) {
    if (data.strategyConnections.stationGroupStrategy) {
      this.form2.patchValue({
        strategyIntraGroups: data.strategyConnections.stationGroupStrategy.strategyIntraGroups,
      });
    }

    if (data.strategyConnections.stationGroupStrategy) {
      this.form2.patchValue({
        strategyGroups: data.strategyConnections.stationGroupStrategy.strategyGroups,
      });
    }

    if (data.strategyConnections.stationGroupStrategy) {
      this.form2.patchValue({
        strategyLoadBalancers: data.strategyConnections.stationGroupStrategy.strategyLoadBalancers,
      });
    }

    if (data.strategyConnections.stationGroupStrategy) {
      this.form2.patchValue({
        strategyDataCenter: data.strategyConnections.stationGroupStrategy.strategyDataCenter,
      });
    }

    if (data.strategyConnections.stationGroupStrategy) {
      this.stationGroupList.removeAt(0);
      data.strategyConnections.stationGroupStrategy.groupConnections.forEach((item, index) => {
        if (item['isLBGroup'] || item['isLBGroup'] === 'Y') {
          item['isLBGroup'] = true;
        } else {
          item['isLBGroup'] = false;
        }
        this.stationGroupList.push(this.createStationGroupList(item, index));
        this.setValue(item['isLBGroup'], index);
      });
    }

    for (var i = 0; i < this.stationGroupList.value.length; i++) {
      if (!this.listOfGroupName.includes(this.stationGroupList.value[i].group)) {
        this.listOfGroupName.push(this.stationGroupList.value[i].group);
      }
    }

    this.stationGroupList.value.forEach(element => {
      if (element.connections !== null) {
        element.connections.forEach(items => {
          if (!this.usedConnectionName.includes(items)) {
            this.usedConnectionName.push(items);
          }
        });
      }
    });

    if (data.strategyConnections.stationGroupStrategy) {
      this.stationDataCenterList.removeAt(0);
      data.strategyConnections.stationGroupStrategy.dataCenters.forEach((item, index) => {
        this.stationDataCenterList.push(this.createStationDataCenterList(item, index));
      });
    }


    this.stationDataFormGroup.value.forEach(element => {
      if (element.group !== null) {
        element.group.forEach(items => {
          if (!this.usedlistOfGroupName.includes(items)) {
            this.usedlistOfGroupName.push(items);
          }
        });
      }
      if (element.loadBalancer !== null) {
        if (!this.usedlistOfGroupName.includes(element.loadBalancer)) {
          this.usedlistOfGroupName.push(element.loadBalancer);
        }
      }
    });
      
    
   
    if (this.sharedData.readOnlyFlag) {
       this.stationDataFormGroup.disable();
       this.form2.disable();
       this.form.disable();
    }else{
      this.disableFieldsconnection();
      this.disableFieldsGroup();
    }
  }

  ngAfterViewInit(): void {
    if (this.selectedStrategy === 'STATION_GROUPS') {
      this.setValueform2(this.sharedData.connectionManagement);
    }
  }

  get connectionFormGroup() {
    return this.form.get('connections') as UntypedFormArray;
  }

  openChange(event) {
    if (event) {
      this.listOfConnectionName = [];
      for (var i = 0; i < this.connectionList.value.length; i++) {
        if (!this.listOfConnectionName.includes(this.connectionList.value[i].connection) &&
        this.connectionList.value[i].connection!==null && 
        this.connectionList.value[i].connection!=""
          && this.connectionList.value[i].hasOwnProperty("connection")) {
          this.listOfConnectionName.push(this.connectionList.value[i].connection);
        }
      }
      this.usedConnectionName.forEach(element => {
        if (this.listOfConnectionName.indexOf(element) !== -1) {
          this.listOfConnectionName.splice(this.listOfConnectionName.indexOf(element), 1);
        }
      });
    } else {
      this.usedConnectionName = [];
      this.stationGroupList.value.forEach(element => {
        if (element.connections !== null) {
          element.connections.forEach(items => {
            if (!this.usedConnectionName.includes(items)) {
              this.usedConnectionName.push(items);
            }
          });
        }
      });
    }
  }

  openChangeGroup(event) {
    if (event) {
      this.listOfGroupName = [];
      for (var i = 0; i < this.stationGroupList.value.length; i++) {
        if (!this.listOfGroupName.includes(this.stationGroupList.value[i].group) && 
        this.stationGroupList.value[i].group!==null && 
        this.stationGroupList.value[i].group!=="" && this.stationGroupList.value[i].hasOwnProperty("group")) {
          this.listOfGroupName.push(this.stationGroupList.value[i].group);
        }
      }
      this.usedlistOfGroupName.forEach(element => {
        if (this.listOfGroupName.indexOf(element) !== -1) {
          this.listOfGroupName.splice(this.listOfGroupName.indexOf(element), 1);
        }
      });
      this.loadBalancerList.forEach(element => {
        if (this.listOfGroupName.indexOf(element) !== -1) {
          this.listOfGroupName.splice(this.listOfGroupName.indexOf(element), 1);
        }
      });
    } else {
      this.usedlistOfGroupName = [];
      this.stationDataFormGroup.value.forEach(element => {
        if (element.group !== null) {
          element.group.forEach(items => {
            if (!this.usedlistOfGroupName.includes(items)) {
              this.usedlistOfGroupName.push(items);
            }
          });
        }
        if (element.loadBalancer !== null) {
          if (!this.usedlistOfGroupName.includes(element.loadBalancer)) {
            this.usedlistOfGroupName.push(element.loadBalancer);
          }
        }
      });
    }
  }


  openChangeLoadBalancer(event) {
    if (event) {
       this.stationGroupList.value.forEach((obj,index)=> {
            if(obj.isLBGroup){
          this.getStatonFormGroup(index).controls.group.enable();
          this.getStatonFormGroup(index).controls.isLBGroup.enable();
        }
      });
      this.stationGroupList.value.forEach(element => {
        if (element.isLBGroup !== null && element.hasOwnProperty("isLBGroup") && element.isLBGroup) {
          if (!this.loadBalancerList.includes(element.group)) {
            this.loadBalancerList.push(element.group);
          }
        }
      }); 
      this.loadBalancerUsedList.forEach(element => {
        if (this.loadBalancerList.indexOf(element) !== -1) {
          this.loadBalancerList.splice(this.loadBalancerList.indexOf(element), 1);
        }
      });

    } else {
      this.loadBalancerUsedList = [];
      this.stationDataFormGroup.value.forEach(element => {
        if (element.loadBalancer !== null && element.hasOwnProperty("loadBalancer")) {
          if (!this.loadBalancerUsedList.includes(element.loadBalancer)) {
            this.loadBalancerUsedList.push(element.loadBalancer);
          }
        }
      });
    }
  }

  isSelectedConnectionName() {
    this.usedConnectionName = [];
    this.stationGroupList.value.forEach(element => {
      if (element.connections !== null) {
        element.connections.forEach(items => {
          if (!this.usedConnectionName.includes(items)) {
            this.usedConnectionName.push(items);
          }
        });
      }
    });
    this.disableFieldsconnection();
  }

  isSelectedGroupName() {
    this.usedlistOfGroupName = [];
    this.stationDataCenterList.value.forEach(element => {
      if (element.group !== null) {
        element.group.forEach(items => {
          if (!this.usedlistOfGroupName.includes(items)) {
            this.usedlistOfGroupName.push(items);
          }
        });
      }
    });
    this.disableFieldsGroup();
  }


  isSelectedloadBalancer(event) {
    this.usedlistOfGroupName = [];
    this.stationDataCenterList.value.forEach(element => {
      if (element.loadBalancer !== null) {
        if (!this.usedlistOfGroupName.includes(element.loadBalancer)) {
          this.usedlistOfGroupName.push(element.loadBalancer);
        }
      }
    });
    this.disableFieldsGroup()
  }

  disableFieldsGroup(){
    this.stationGroupList.value.forEach((obj,index)=> {
      this.getStatonFormGroup(index).controls.group.enable();
      this.getStatonFormGroup(index).controls.isLBGroup.enable();
    });

    this.stationDataCenterList.value.forEach(element => {
      if (element.loadBalancer !== null) {
             this.stationGroupList.value.forEach((obj,index)=> {
              if(obj.group === element.loadBalancer){
            this.getStatonFormGroup(index).controls.isLBGroup.disable();
            this.getStatonFormGroup(index).controls.group.disable();
          }
        });
      }
      if (element.group !== null) {
        element.group.forEach(items => {
            this.stationGroupList.value.forEach((obj,index)=> {
              if(obj.group === items){
              this.getStatonFormGroup(index).controls.group.disable();
              this.getStatonFormGroup(index).controls.isLBGroup.disable();
            }
          });
        });
      }
    });
  }

  disableFieldsconnection(){
      this.connectionList.value.forEach((obj,index)=> {
      this.getConnectionFormGroup(index).controls.connection.enable();
    });
    this.stationGroupList.value.forEach(element => {
      if (element.connections !== null) {
        element.connections.forEach(items => {
          this.connectionList.value.forEach((obj,index)=> {
              if(obj.connection === items){
              this.getConnectionFormGroup(index).controls.connection.disable();
            }
          });
        });
      }
    });
    
  }

  checkValue(event, index) {
    if (event.target.checked) {
      if (
        this.stationGroupList.value[index].group !== null &&
        this.stationGroupList.value[index].group !== ''
      ) {
        if (!this.loadBalancerList.includes(this.stationGroupList.value[index].group)) {
          this.loadBalancerList.push(this.stationGroupList.value[index].group);
        }
        if (this.listOfGroupName.includes(this.stationGroupList.value[index].group)) {
          this.listOfGroupName.splice(this.stationGroupList.value[index].group, 1);
        }
      }
    } else {
      if (
        this.stationGroupList.value[index].group !== null &&
        this.stationGroupList.value[index].group !== ''
      ) {
        if (this.loadBalancerList.includes(this.stationGroupList.value[index].group)) {
          this.loadBalancerList.splice(this.stationGroupList.value[index].group, 1);
        }
        if (!this.listOfGroupName.includes(this.stationGroupList.value[index].group)) {
          this.listOfGroupName.push(this.stationGroupList.value[index].group);
        }
      }
    }
  }

  setValue(flag, index) {
    if (flag) {
      if (
        this.stationGroupList.value[index].group !== null &&
        this.stationGroupList.value[index].group !== ''
      ) {
        if (!this.loadBalancerList.includes(this.stationGroupList.value[index].group)) {
          this.loadBalancerList.push(this.stationGroupList.value[index].group);
        }
        if (this.listOfGroupName.includes(this.stationGroupList.value[index].group)) {
          this.listOfGroupName.splice(this.stationGroupList.value[index].group, 1);
        }
      }
    } else {
      if (
        this.stationGroupList.value[index].group !== null &&
        this.stationGroupList.value[index].group !== ''
      ) {
        if (this.loadBalancerList.includes(this.stationGroupList.value[index].group)) {
          this.loadBalancerList.splice(this.stationGroupList.value[index].group, 1);
        }
        if (!this.listOfGroupName.includes(this.stationGroupList.value[index].group)) {
          this.listOfGroupName.push(this.stationGroupList.value[index].group);
        }
      }
    }
  }

  get statonFormGroup() {
    return this.form2.get('stationGroup') as UntypedFormArray;
  }

  get stationDataFormGroup() {
    return this.form2.get('stationDataCenter') as UntypedFormArray;
  }

  getConnectionFormGroup(index): UntypedFormGroup {
    const formGroup = this.connectionList.controls[index] as UntypedFormGroup;
    return formGroup;
  }

  getStatonFormGroup(index): UntypedFormGroup {
    const formGroup = this.stationGroupList.controls[index] as UntypedFormGroup;
    return formGroup;
  }

  getstationDataFormGroup(index): UntypedFormGroup {
    const formGroup = this.stationDataCenterList.controls[index] as UntypedFormGroup;
    return formGroup;
  }

  createConnections(item, index?): UntypedFormGroup {
    return this.fb.group({
      connection: [
        item.connection,[Validators.required, RxwebValidators.unique(),Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9_-]+|[$][{][a-zA-Z0-9:_]+[}]')],
      ],
      ip: this.selectedValue ? null : [item.ip, Validators.compose([Validators.required, Validators.pattern(this.ipReg)])],
      port: [item.port, Validators.compose([Validators.required, Validators.pattern(this.portReg)])],
      label: [item.label, Validators.pattern('[a-zA-Z0-9 ]+|[$][{][a-zA-Z0-9:._]+[}]')],
      timeOut: [item.timeOut, Validators.pattern('[0-9]+|[$][{][a-zA-Z0-9:_]+[}]')],
    });
  }

  createStationGroupList(item, index?): UntypedFormGroup {
    return this.fb.group({
      group: [item.group, Validators.compose([Validators.required, Validators.maxLength(20) ,RxwebValidators.unique(), Validators.pattern('[a-zA-Z0-9_-]+')])],
      connections: [item.connections, Validators.compose([Validators.required])],
      isLBGroup: [item.isLBGroup],
    });
  }

  createStationDataCenterList(item, index?): UntypedFormGroup {
    return this.fb.group({
      dataCenter: [
        item.dataCenter,
        Validators.compose([Validators.required,Validators.maxLength(20), RxwebValidators.unique(), Validators.pattern('[a-zA-Z0-9_-]+')]),
      ],
      loadBalancer: [item.loadBalancer],
      group: [item.group, Validators.compose([Validators.required])],
    });
  }

  addconnectionList() {
    this.connectionList.push(
      this.createConnections({
        connectionName: null,
        ip: null,
        port: null,
        label: null,
        timeout: null,
      }),
    );
  }

  addStationGroupList() {
    this.stationGroupList.push(
      this.createStationGroupList({
        group: null,
        connection: null,
        isLBGroup: false,
      }),
    );
  }

  //   checkisLBGroup() {
  //     this.statonFormGroup.isLBGroup = !this.statonFormGroup.isLBGroup;
  //   }

  addStationDataCenterList() {
    this.stationDataCenterList.push(
      this.createStationDataCenterList({
        dataCenter: null,
        loadBalancer: null,
        group: null,
      }),
    );
  }

  saveForm(): void {
    if(this.form.value.custumStrategy != undefined){
      this.form.value.custumStrategy =  this.form.value.custumStrategy.replace(/<[^>]*>/g, '');
    }
    this.stationGroupList.value.forEach((obj,index)=> {
      this.getStatonFormGroup(index).controls.group.enable();
      this.getStatonFormGroup(index).controls.isLBGroup.enable();
    });
    this.connectionList.value.forEach((obj,index)=> {
      this.getConnectionFormGroup(index).controls.connection.enable();
    });
    this.connectionManangement.connections = this.form.value.connections;
    this.connectionManangement.strategyConnections.strategyConnections =
      this.form.value.strategyConnections;
    this.connectionManangement.strategyConnections.custumStrategy = this.form.value.custumStrategy;
    if (this.form.value.inMessage) {
      this.connectionManangement.strategyConnections.stationGroupStrategy.inMessage = 'Y';
    } else {
      this.connectionManangement.strategyConnections.stationGroupStrategy.inMessage = 'N';
    }

    if (this.form2.value.isNotNull) {
      this.saveForm2();
    } else {
      this.connectiondata = {};
      this.connectiondata['connectionManagement'] = this.connectionManangement;
      this.connectiondata['connectionDetailsFormFlag'] = true;
      this.dialogRef.close(this.connectiondata);
    }
  }

  saveForm2(): void {
    this.connectionManangement.strategyConnections.stationGroupStrategy.groupConnections =
      this.form2.value.stationGroup;
    this.connectionManangement.strategyConnections.stationGroupStrategy.dataCenters =
      this.form2.value.stationDataCenter;
    this.connectionManangement.strategyConnections.stationGroupStrategy.strategyDataCenter =
      this.form2.value.strategyDataCenter;
    this.connectionManangement.strategyConnections.stationGroupStrategy.strategyGroups =
      this.form2.value.strategyGroups;
    this.connectionManangement.strategyConnections.stationGroupStrategy.strategyIntraGroups =
      this.form2.value.strategyIntraGroups;
    this.connectionManangement.strategyConnections.stationGroupStrategy.strategyLoadBalancers =
      this.form2.value.strategyLoadBalancers;
    this.connectiondata = {};
    this.connectiondata['connectionManagement'] = this.connectionManangement;
    this.connectiondata['connectionDetailsFormFlag'] = true;
    this.dialogRef.close(this.connectiondata);
  }

  public close(): void {
    this.connectiondata = {};
    this.connectiondata['connectionDetailsFormFlag'] = this.sharedData.connectionDetailsFormFlag;
    if (this.sharedData.connectionDetailsFormFlag) {
      this.connectiondata['connectionManagement'] = this.sharedData.connectionManagement;
    }
    this.dialogRef.close(this.connectiondata);
  }

  removeconnectionList(index) {
    if(this.connectionList.length > 1){
      if (this.usedConnectionName.includes(this.connectionList.controls[index].value.connection)) {
        this.__alertService.responseMessage({
          status: 'failure',
          message: this.connectionList.controls[index].value.connection + ' already used',
        });
      } else {
        this.connectionList.removeAt(index);
      }
    }
  }

  removeStationGroupList(index) {
    if(this.stationGroupList.length > 1){
      if (this.usedlistOfGroupName.includes(this.stationGroupList.controls[index].value.group)) {
        this.__alertService.responseMessage({
          status: 'failure',
          message: this.stationGroupList.controls[index].value.group + ' already used',
        });
      } else {
        this.disableFieldsGroup();
        this.stationGroupList.removeAt(index);
      }
      this.isSelectedConnectionName();
    }
  }

  removeStationDataCenterList(index) {
    if(this.stationDataCenterList.length > 1){
      this.disableFieldsGroup();
      this.stationDataCenterList.removeAt(index);
    }
  }
}
