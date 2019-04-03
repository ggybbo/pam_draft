import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
  refresh: Subject<any> = new Subject();
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
    private router: Router
  ) {
    this.view = 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = true;
    this.selectedDay = { date: startOfDay(new Date()) };

    this.actions = [
      {
        label: '<i class="material-icons s-16">add_to_queue</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          // this.router.navigate(['/apps/academy/courses/2/1']);
          this.addContent();
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
        this._calendarService.updateEvents(this.events);
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
      // console.log(newEvent);
      newEvent.actions = this.actions;
      this.events.push(newEvent);
      this.refresh.next(true);
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
    console.log(eventIndex);
    // console.log(event);
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
            formData.getRawValue
          );
          this.refresh.next(true);

          break;

        case 'delete':
          this.deleteEvent(event);
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
        const eventIndex = this.events.indexOf(event);
        this.events.splice(eventIndex, 1);
        this.refresh.next(true);
      }
      this.confirmDialogRef = null;
    });
  }

  addContent(): void {
    console.log('add content');
    this.dialogRef = this._matDialog.open(ContentFormComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        date: this.selectedDay.date
      }
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      console.log('close add content');
      if (!response) {
        return;
      }
      const newEvent = response.getRawValue();
      console.log(newEvent);
      // newEvent.actions = this.actions;
      // this.events.push(newEvent);
      // this.refresh.next(true);
    });
  }
}
