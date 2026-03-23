import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '@app/services/alert.service';
import { SubscribeService } from '@app/services/subscribe.services';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-l1-connection-managment',
  templateUrl: './l1-connection-managment.component.html',
  styleUrls: ['./l1-connection-managment.component.css'],
})
export class L1ConnectionManagmentComponent implements OnInit {
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
  public ipReg = /^([$]({[a-zA-Z0-9_]+:(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+})|((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)|[a-zA-Z]+|([$]{[a-zA-Z_]+:[a-zA-Z]+}))$/;
  // public ipReg = /^([$]({[a-zA-Z0-9_]+:(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+})|((?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)|[a-zA-Z]+|([$]{[a-zA-Z_]+:[a-zA-Z]+})|([$][{][a-zA-Z0-9_:]+[}][:][$][{][a-zA-Z_:0-9.]+[}][#][$][{][a-zA-Z_0-9:]+[}][#][$][{][a-zA-Z_:0-9]+[}][#][$][{][a-zA-Z_:0-9]+[}]))$/
  public portReg = /^(([$][{][a-zA-Z_]+:[0-9]{4,6}[}])|([0-9]{4,6})|[$][{][a-zA-Z0-9:_]+[}])$/;
  public form: UntypedFormGroup;
  public connectionList: UntypedFormArray;
  public stationGroupList: UntypedFormArray;
  public stationDataCenterList: UntypedFormArray;
  constructor(
    private fb: UntypedFormBuilder,
    public __alertService: AlertService,
    private subscribeService: SubscribeService,
    public dialogRef: MatDialogRef<L1ConnectionManagmentComponent>,
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
      alternateConnection: null,
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
    if (this.sharedData && this.sharedData.connectionDetailsFormFlag) {
      this.setValueform(this.sharedData.connectionManagement);
    }
  }

  private setValueform(data) {
   
    if (data.alternateConnection) {
      if (
        data &&
        data.alternateConnection === 'Y'
      ) {
        this.form.patchValue({
          alternateConnection: true,
        });
      } else {
        this.form.patchValue({
          alternateConnection: false,
        });
      }
    }

    if (data.connections) {
      this.connectionList.removeAt(0);
      data.connections.forEach((item, index) => {
        this.connectionList.push(this.createConnections(item, index));
      });
    }
    if (this.sharedData.readOnlyFlag) {
      this.form.disable()
    }
  }

  get connectionFormGroup() {
    return this.form.get('connections') as UntypedFormArray;
  }

  checkValue(event, index) {
    if (event.target.checked) {

    }
      
  }

  createConnections(item, index?): UntypedFormGroup {
    return this.fb.group({
      connection: [
        item.connection,
        Validators.compose([Validators.required, RxwebValidators.unique(), Validators.pattern('[a-zA-Z0-9_-]+|[$][{][a-zA-Z0-9:_]+[}]')]),
      ],
      ip: this.selectedValue ? null : [item.ip, Validators.compose([Validators.required, Validators.pattern(this.ipReg)])],
      port: [item.port, Validators.compose([Validators.required, Validators.pattern(this.portReg)])],
      label: [item.label, Validators.pattern('[a-zA-Z0-9 ]+|[$][{][a-zA-Z0-9:._]+[}]')],
      timeOut: [item.timeOut, Validators.pattern('[0-9]+|[$][{][a-zA-Z0-9:_]+[}]')],
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

  getConnectionFormGroup(index): UntypedFormGroup {
    const formGroup = this.connectionList.controls[index] as UntypedFormGroup;
    return formGroup;
  }

  saveForm(): void {
    this.connectionManangement.connections = this.form.value.connections;
    this.connectionManangement.alternateConnection = this.form.value.alternateConnection;
    if (this.form.value.alternateConnection) {
      this.connectionManangement.alternateConnection = 'Y';
    } else {
      this.connectionManangement.alternateConnection = 'N';
    }
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
    if (this.connectionList.length > 1) {
      this.connectionList.removeAt(index);
    }
  }
}
