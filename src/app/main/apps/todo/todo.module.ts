import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatRippleModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSliderModule
} from '@angular/material';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseProgressBarModule } from '@fuse/components';
import { MatFileUploadModule } from 'angular-material-fileupload';

import { TodoService } from 'app/main/apps/todo/todo.service';
import { TodoComponent } from 'app/main/apps/todo/todo.component';
import { TodoMainSidebarComponent } from 'app/main/apps/todo/sidebars/main/main-sidebar.component';
import { TodoListItemComponent } from 'app/main/apps/todo/todo-list/todo-list-item/todo-list-item.component';
import { TodoListComponent } from 'app/main/apps/todo/todo-list/todo-list.component';
import { TodoDetailsComponent } from 'app/main/apps/todo/todo-details/todo-details.component';

const routes: Routes = [
  {
    path: 'all',
    component: TodoComponent,
    resolve: {
      todo: TodoService
    }
  },
  {
    path: 'all/:todoKey',
    component: TodoComponent,
    resolve: {
      todo: TodoService
    }
  },
  {
    path: 'tag/:tagHandle',
    component: TodoComponent,
    resolve: {
      todo: TodoService
    }
  },
  {
    path: 'tag/:tagHandle/:todoKey',
    component: TodoComponent,
    resolve: {
      todo: TodoService
    }
  },
  {
    path: 'filter/:filterHandle',
    component: TodoComponent,
    resolve: {
      todo: TodoService
    }
  },
  {
    path: 'filter/:filterHandle/:todoKey',
    component: TodoComponent,
    resolve: {
      todo: TodoService
    }
  },
  {
    path: '**',
    redirectTo: 'all'
  }
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoMainSidebarComponent,
    TodoListItemComponent,
    TodoListComponent,
    TodoDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatFileUploadModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSliderModule,

    NgxDnDModule,
    NgxAudioPlayerModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseProgressBarModule
  ],
  providers: [TodoService]
})
export class TodoModule {}
