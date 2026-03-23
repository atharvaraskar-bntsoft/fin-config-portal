import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterComponent } from './router.component';
import { CreateRouterComponent } from './create-router/create-router.component';
// import { AddRouterVersionComponent } from './add-router-version/add-router-version.component';
// import { RouterDetailsComponent } from './router-details/router-details.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { DestinationTableComponent } from './destination-table/destination-table.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    data: {
      id: 'link_router',
      permission: 'write',
      title: 'CREATE_DESTINATION_ROUTER',
    },
    component: RouterComponent,
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: CreateRouterComponent,
    data: {
      id: 'link_router',
      permission: 'write',
      title: 'CREATE_PAYMENT_ROUTER',
    },
    path: 'payment/create-router',
  },
  {
    canActivate: [AuthGuard],
    component: CreateRouterComponent,
    data: {
      id: 'link_router',
      permission: 'write',
      title: 'CREATE_DESTINATION_ROUTER',
    },
    path: 'destination/create-router',
  },
  /*
  {
    canActivate: [AuthGuard],
    component: RouterDetailsComponent,
    data: {
      id: 'link_router',
      permission: 'read',
      title: 'DESTINATION_VIEW_DETAILS',
    },
    path: 'view-details/route/:id',
  },
  {
    canActivate: [AuthGuard],
    component: RouterDetailsComponent,
    data: {
      id: 'link_router',
      permission: 'read',
      title: 'WORKFLOW_VIEW_DETAILS',
    },
    path: 'view-details/workflow/:id',
  },
  */
  {
    canActivate: [AuthGuard],
    component: CreateRouterComponent,
    data: {
      id: 'link_router',
      permission: 'update',
      title: 'WORKFLOW_ROUTER_EDIT',
    },
    path: 'edit/workflow/:id',
  },
  {
    canActivate: [AuthGuard],
    component: CreateRouterComponent,
    data: {
      id: 'link_router',
      permission: 'update',
      title: 'DESTINATION_ROUTER_EDIT',
    },
    path: 'edit/route/:id',
  },
  /*
  {
    canActivate: [AuthGuard],
    component: AddRouterVersionComponent,
    data: {
      id: 'link_router',
      permission: 'update',
      title: 'ROUTER_EDIT',
    },
    path: 'editversion/:id',
  },
  */
  {
    canActivate: [AuthGuard],
    component: DestinationTableComponent,
    data: {
      id: 'link_routing_router',
      permission: 'write',
      title: 'DESTINATION_ROUTER',
    },
    path: '',
  },
  // {
  //   canActivate: [AuthGuard],
  //   component: DestinationTableComponent,
  //   data: {
  //     id: 'link_workflow_router',
  //     permission: 'write',
  //     title: 'WORKFLOW_ROUTER',
  //   },
  //   path: '',
  // },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class RouterRoutingModule {}
