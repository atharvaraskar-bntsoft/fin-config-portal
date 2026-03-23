import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionLogComponent } from './transaction-log.component';
import { RequestMatrixComponent } from './request-matrix/request-matrix.component';
import { ResponseMatrixComponent } from './response-matrix/response-matrix.component';
import { TransactionLogDetailsComponent } from './transaction-log-details/transaction-log-details.component';
import { AuthGuard } from '@app/services/guards/auth-guard.service';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: ResponseMatrixComponent,
    data: {
      id: 'link_txn_log',
      permission: 'read',
      title: 'RESPONSE_MATRIX',
    },
    path: 'response-matrix',
  },
  {
    canActivate: [AuthGuard],
    component: RequestMatrixComponent,
    data: {
      id: 'link_txn_log',
      permission: 'read',
      title: 'REQUEST_MATRIX',
    },
    path: 'request-matrix',
  },
  {
    canActivate: [AuthGuard],
    component: TransactionLogDetailsComponent,
    data: {
      id: 'link_txn_log',
      permission: 'read',
      title: 'LogsDetails',
    },
    path: ':id',
  },
  {
    canActivate: [AuthGuard],
    component: TransactionLogComponent,
    data: {
      id: 'link_txn_log',
      permission: 'read',
    },
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TransactionLogRoutingModule {}
