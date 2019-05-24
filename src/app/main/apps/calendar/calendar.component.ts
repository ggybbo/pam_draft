import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { Subject } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarService } from './calendar.service';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarMonthViewDay,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

import { CalendarEventModel } from 'app/main/apps/calendar/calendar.model';
import { EventFormComponent } from 'app/main/apps/calendar/event-form/event-form.component';
import { ContentFormComponent } from 'app/main/apps/calendar/content-form/content-form.component';
import { AddPersonFormComponent } from 'app/main/apps/calendar/add-person-form/add-person-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  deleteRef: Subject<any> = new Subject();
  activeDayIsOpen: boolean;
  selectedDay: any;
  events: CalendarEvent[];
  actions: CalendarEventAction[];
  dialogRef: any;
  view: string;
  viewDate: Date;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private _matDialog: MatDialog,
    private _calendarService: CalendarService,
    // private route: ActivatedRoute,
    private router: Router,
    private _matSnackBar: MatSnackBar
  ) {
    this.view = 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = true;
    this.selectedDay = { date: startOfDay(new Date()) };

    this.actions = [
      {
        label: '<i class="material-icons s-16">person_add</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.personAdd(event);
        }
      },
      {
        label: '<i class="material-icons s-16">add_to_queue</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.addContent(event);
        }
      },
      {
        label: '<i class="material-icons s-16">edit</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.editEvent('edit', event);
        }
      },
      {
        label: '<i class="material-icons s-16">delete</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.deleteEvent(event);
        }
      }
    ];

    this.setEvents();
  }

  ngOnInit(): void {
    this.refresh.subscribe(updateDB => {
      if (updateDB) {
        this._calendarService.updateEvents(updateDB).then(data => {
          if (!data) {
            console.log('update failed');
          }
        });
      }
    });

    this.deleteRef.subscribe(deleteDB => {
      if (deleteDB) {
        this._calendarService.deleteEvents(deleteDB).then(data => {
          console.log(data);
          if (!data) {
            console.log('update failed');
          }
        });
      }
    });

    this._calendarService.onEventsUpdated.subscribe(events => {
      this.setEvents();
      this.refresh.next();
    });
  }

  setEvents(): void {
    this.events = this._calendarService.events.map(item => {
      item.actions = this.actions;
      return new CalendarEventModel(item);
    });
  }

  addEvent(): void {
    this.dialogRef = this._matDialog.open(EventFormComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        date: this.selectedDay.date
      }
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
        return;
      }
      const newEvent = response.getRawValue();
      newEvent.actions = this.actions;
      // this.events.push(newEvent);
      this.refresh.next(newEvent);
    });
  }

  beforeMonthViewRender({ header, body }): void {
    const _selectedDay = body.find(_day => {
      return _day.date.getTime() === this.selectedDay.date.getTime();
    });

    if (_selectedDay) {
      _selectedDay.cssClass = 'cal-selected';
    }
  }

  dayClicked(day: CalendarMonthViewDay): void {
    const date: Date = day.date;
    const events: CalendarEvent[] = day.events;
    // console.log('day clicked');
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
      this.selectedDay = day;
      this.refresh.next();
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(true);
  }

  editEvent(action: string, event: CalendarEvent): void {
    const eventIndex = this.events.indexOf(event);
    this.dialogRef = this._matDialog.open(EventFormComponent, {
      panelClass: 'event-form-dialog',
      data: {
        event: event,
        action: action
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }
      const actionType: string = response[0];
      const formData: FormGroup = response[1];

      switch (actionType) {
        case 'save':
          this.events[eventIndex] = Object.assign(
            this.events[eventIndex],
            formData.getRawValue()
          );
          // console.log('save and update');
          // console.log(this.events[eventIndex]);
          this.refresh.next(this.events[eventIndex]);

          break;

        case 'delete':
          // console.log('delete calendar');
          this.events[eventIndex] = Object.assign(
            this.events[eventIndex],
            formData.getRawValue()
          );
          this.deleteEvent(this.events[eventIndex]);
          break;
      }
    });
  }

  deleteEvent(event): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.confirmMessage =
      'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(event);
        const eventIndex = this.events.indexOf(event);
        this.events.splice(eventIndex, 1);
        this.deleteRef.next(event.meta.key);
      }
      this.confirmDialogRef = null;
    });
  }

  // 수업자료 등록
  addContent(event: CalendarEvent): void {
    // console.log('add content');
    this.dialogRef = this._matDialog.open(ContentFormComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        event: event
      }
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      // console.log('close add content');
      if (!response) {
        return;
      }
      const newEvent = response.getRawValue();
      // console.log(Object.values(newEvent));
      this._calendarService
        .updateMaterials(Object.values(newEvent))
        .then(response =>
          this._matSnackBar.open('Material saved', 'OK', {
            verticalPosition: 'top',
            duration: 2000
          })
        )
        .catch(err => console.error('update error'));
    });
  }

  // 학생 등록
  personAdd(event: CalendarEvent): void {
    this.dialogRef = this._matDialog.open(AddPersonFormComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        event: event
      }
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      console.log('close personAdd content');
    });
  }
}
