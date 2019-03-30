import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  { path: 'academy', loadChildren: './academy/academy.module#AcademyModule' },
  {
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarModule'
  }
];

@NgModule({
  declarations: [],
  imports: [FuseSharedModule, RouterModule.forChild(routes)]
})
export class AppsModule {}
