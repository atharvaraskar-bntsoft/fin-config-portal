import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/services/guards/auth-guard.service';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { TagListComponent } from './tag-list/tag-list.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    component: TagListComponent,
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: CreateTagComponent,
    data: {
      id: 'link_tag_rule',
      permission: 'write',
      title: ' Create Rule for Tag',
    },
    path: 'create',
  },
  {
    canActivate: [AuthGuard],
    component: CreateTagComponent,
    data: {
      id: 'link_tag_rule',
      permission: 'update',
      title: 'Edit Rule for Tag',
    },
    path: 'edit/:id',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagRoutingModule {}
