import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { ProjectDashboardComponent } from 'app/main/apps/dashboards/project/project.component';
import { ProjectDashboardService } from 'app/main/apps/dashboards/project/project.service';

const routes: Routes = [
  {
    path: '**',
    component: ProjectDashboardComponent,
    resolve: {
      data: ProjectDashboardService
    }
  }
];

@NgModule({
  declarations: [ProjectDashboardComponent],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPeswLj1yZDM6-0DYPmXH0MSohEmEozqc'
    }),
    NgxChartsModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule
  ],
  providers: [ProjectDashboardService]
})
export class ProjectDashboardModule {}
