import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  IDestinationRouterList,
  IDestinationRoutingVersion,
} from '@app/models/destination-router.interface';
import { selectPermissionsData } from '@app/store/selectors/permission.selectors';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-destination-table',
  templateUrl: './destination-table.component.html',
  styleUrls: ['./destination-table.component.scss'],
})
export class DestinationTableComponent {
  @Input() routerList: IDestinationRouterList[];
  @Input() loading: boolean;
  @Input() editType;
  @Output() showVersion: EventEmitter<IDestinationRoutingVersion> = new EventEmitter();
  @Output() toggleLive: EventEmitter<IDestinationRoutingVersion> = new EventEmitter();
  @Output() editCurrentRouter: EventEmitter<IDestinationRoutingVersion> = new EventEmitter();
  @Output() deleteCurrentRouter: EventEmitter<IDestinationRouterList> = new EventEmitter();
  public permission: any;
  public permissionObject = {
    check: null,
    delete: null,
    id: '',
    read: null,
    update: null,
    write: null,
  };
  public routingDestinationRouterId = 'link_routing_router';
  public workflowRouterId = 'link_workflow_router';

  constructor(private _store: Store<IAppState>) {
    this._store.pipe(select(selectPermissionsData)).subscribe((response: any) => {      
      if (response) {
        if (this.editType === 'workflow') {
          this.permission = response.data.find(item => item.id === this.workflowRouterId);
        } else {
          this.permission = response.data.find(item => item.id === this.routingDestinationRouterId);
        }
        this.permissionObject = this.permission;
      }
    });
  }

  openVersion(version: IDestinationRoutingVersion): void {
    this.showVersion.emit(version);
  }

  editLive(version: IDestinationRoutingVersion): void {
    this.toggleLive.emit(version);
  }

  edit(version: IDestinationRoutingVersion): void {
    this.editCurrentRouter.emit(version);
  }

  deleteRoute(router: IDestinationRouterList) {
    this.deleteCurrentRouter.emit(router);
  }
}
