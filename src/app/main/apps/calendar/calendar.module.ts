import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  CalendarModule as AngularCalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { EventFormComponent } from './event-form/event-form.component';
import { ContentFormComponent } from './content-form/content-form.component';

const routes: Routes = [
  {
    path: '**',
    component: CalendarComponent,
    children: [],
    resolve: {
      chat: CalendarService
    }
  }
];

@NgModule({
  declarations: [CalendarComponent, EventFormComponent, ContentFormComponent],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,

    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,

    FuseSharedModule,
    FuseConfirmDialogModule
  ],
  providers: [CalendarService],
  entryComponents: [EventFormComponent]
})
export class CalendarModule {}
