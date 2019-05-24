import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path: 'dashboards/analytics',
    loadChildren:
      './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
  },
  {
    path: 'dashboards/project',
    loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
  },
  { path: 'academy', loadChildren: './academy/academy.module#AcademyModule' },
  {
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarModule'
  },
  {
    path: 'e-commerce',
    loadChildren: './e-commerce/e-commerce.module#EcommerceModule'
  },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoModule'
  },
  {
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
  },
  {
    path: 'scrumboard',
    loadChildren: './scrumboard/scrumboard.module#ScrumboardModule'
  }
];

@NgModule({
  declarations: [],
  imports: [FuseSharedModule, RouterModule.forChild(routes)]
})
export class AppsModule {}
