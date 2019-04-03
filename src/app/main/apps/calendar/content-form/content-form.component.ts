import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';

import { CalendarEventModel } from '../calendar.model';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent {
  contentForm: FormGroup;
  event: CalendarEvent;
  dialogTitle: string;
  presetColors = MatColors.presets;

  constructor(
    public matDialogRef: MatDialogRef<ContentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) {
    this.dialogTitle = 'Content upload';
    this.event = new CalendarEventModel({
      start: _data.date,
      end: _data.date
    });
    this.contentForm = this.createContentForm();
  }

  ngOnInit() {}

  createContentForm(): FormGroup {
    return new FormGroup({
      first: new FormControl(this.event.meta.first),
      second: new FormControl(this.event.meta.second),
      third: new FormControl(this.event.meta.third)
    });
  }
}
