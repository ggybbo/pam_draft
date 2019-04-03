import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { MatColors } from '@fuse/mat-colors';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { CalendarEventModel } from '../calendar.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  public Editor = ClassicEditor;
  action: string;
  event: CalendarEvent;
  eventForm: FormGroup;
  dialogTitle: string;
  presetColors = MatColors.presets;
  startTime?: string;
  endTime?: string;

  constructor(
    public matDialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) {
    this.event = _data.event;
    this.action = _data.action;
    // console.log(_data.event);
    if (this.action === 'edit') {
      const startHours = new Date(this.event.start).getHours();
      const startMinutes =
        (new Date(this.event.start).getMinutes() < 10 ? '0' : '') +
        new Date(this.event.start).getMinutes();
      const endHours = new Date(this.event.end).getHours();
      const endMinutes =
        (new Date(this.event.end).getMinutes() < 10 ? '0' : '') +
        new Date(this.event.end).getMinutes();

      this.startTime = startHours + ':' + startMinutes;
      this.endTime = endHours + ':' + endMinutes;
      this.dialogTitle = this.event.title;
    } else {
      this.dialogTitle = 'New Event';
      this.event = new CalendarEventModel({
        start: _data.date,
        end: _data.date
      });
    }

    this.eventForm = this.createEventForm();
  }

  createEventForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(this.event.title),
      start: new FormControl(this.event.start),
      end: new FormControl(this.event.end),
      startTime: new FormControl(this.startTime),
      endTime: new FormControl(this.endTime),
      allDay: new FormControl(this.event.allDay),
      color: this._formBuilder.group({
        primary: new FormControl(this.event.color.primary),
        secondary: new FormControl(this.event.color.secondary)
      }),
      meta: this._formBuilder.group({
        location: new FormControl(this.event.meta.location),
        notes: new FormControl(this.event.meta.notes),
        level: new FormControl(this.event.meta.level)
      })
    });
  }

  applyTime(time, type): void {
    const targetTime = time.target.value.split(':');
    const hours = targetTime[0];
    const minute = targetTime[1];
    if (type === 'start') {
      this.eventForm.patchValue({
        start: new Date(
          startOfDay(this.eventForm.value.start).setHours(hours, minute)
        )
      });
    } else {
      this.eventForm.patchValue({
        end: new Date(
          startOfDay(this.eventForm.value.end).setHours(hours, minute)
        )
      });
    }
  }
}
