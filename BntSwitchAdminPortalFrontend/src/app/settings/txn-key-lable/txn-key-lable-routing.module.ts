import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TxnKeyLableCreateComponent } from './txn-key-lable-create/txn-key-lable-create.component';
import { TxnKeyLableComponent } from './txn-key-lable.component';

const routes: Routes = [
  {
    component: TxnKeyLableComponent,
    data: {
      title: 'TXNKEYLABLE',
    },
    path: '',
  },
  {
    component: TxnKeyLableCreateComponent,
    data: {
      title: 'TXNKEYLABLECREATE',
    },
    path: 'create',
  },
  {
    component: TxnKeyLableCreateComponent,
    data: {
      title: 'TXNKEYLABLEEDIT',
    },
    path: 'edit/:id',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TxnKeyLableRoutingModule {}
