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
  MatTooltipModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import {
  CalendarModule as AngularCalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { EventFormComponent } from './event-form/event-form.component';
import { ContentFormComponent } from './content-form/content-form.component';
import { AddPersonFormComponent } from './add-person-form/add-person-form.component';

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
  declarations: [
    CalendarComponent,
    EventFormComponent,
    ContentFormComponent,
    AddPersonFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,

    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,

    FuseSharedModule,
    FuseConfirmDialogModule,

    CKEditorModule
  ],
  providers: [CalendarService],
  entryComponents: [
    EventFormComponent,
    ContentFormComponent,
    AddPersonFormComponent
  ]
})
export class CalendarModule {}
