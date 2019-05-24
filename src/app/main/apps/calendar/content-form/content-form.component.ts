import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MatColors } from '@fuse/mat-colors';

import { CalendarEventModel } from '../calendar.model';
import { ContentFormService } from './content-form.service';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {
  contentForm: FormGroup;
  dialogTitle: string;
  key: string;
  mData: Array<string>;
  presetColors = MatColors.presets;

  constructor(
    public matDialogRef: MatDialogRef<ContentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _contentformService: ContentFormService
  ) {
    this.dialogTitle = 'Content upload';
    this.key = _data.event.meta.key;
    this.contentForm = this.createContentForm();
  }

  ngOnInit(): void {
    this._contentformService
      .getMaterials(this.key)
      .then(data => {
        this.mData = data[0].contentId.split(',');
        this.contentForm.patchValue({
          first: this.mData[0],
          second: this.mData[1],
          third: this.mData[2]
        });
      })
      .catch(err => console.log('get matrials error'));
  }

  createContentForm(): FormGroup {
    return new FormGroup({
      key: new FormControl(this.key),
      first: new FormControl(),
      second: new FormControl(),
      third: new FormControl()
    });
  }
}
