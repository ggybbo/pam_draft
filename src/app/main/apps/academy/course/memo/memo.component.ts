import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatColors } from '@fuse/mat-colors';

import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '../../../../../../ckeditor/ckeditor';
import {
  ChangeEvent,
  FocusEvent,
  BlurEvent
} from '../../../../../../ckeditor/ckeditor.component';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemoComponent {
  dialogTitle: string;
  dialogInfo: string;
  memoForm: FormGroup;
  presetColors = MatColors.presets;
  userId: number;

  public Editor = ClassicEditorBuild;
  public isDisabled = false;
  public editorData = '';
  public componentEvents: string[] = [];
  public config = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedlist',
      'numberedlist',
      '|',
      'blockquote',
      'inserttable',
      '|',
      'undo',
      'redo'
    ]
  };

  constructor(
    public matDialogRef: MatDialogRef<MemoComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.dialogTitle =
      JSON.parse(sessionStorage.getItem('userInfo')).id + '_MEMO';
    this.dialogInfo =
      JSON.parse(sessionStorage.getItem('userInfo')).id + +new Date();

    this.memoForm = this.createEventForm();
  }

  createEventForm(): FormGroup {
    const Usermemo = sessionStorage.getItem('Usermemo');
    return new FormGroup({
      title: new FormControl(),
      key: new FormControl({ value: this.dialogInfo, disabled: true }),
      content: new FormControl()
    });
  }

  toggleDisableEditors() {
    this.isDisabled = !this.isDisabled;
  }

  onReady(editor: CKEditor5.Editor): void {
    console.log('The editor is ready.');
    this.memoForm.setValue({
      title: JSON.parse(sessionStorage.getItem('Usermemo')).title
        ? ''
        : JSON.parse(sessionStorage.getItem('Usermemo')).title,
      key: this.dialogInfo,
      content: JSON.parse(sessionStorage.getItem('Usermemo')).content
    });
    // this.componentEvents.push('The editor is ready.');
  }

  onChange(event: ChangeEvent): void {
    console.log('Editor model changed.');
    console.log(this.memoForm.getRawValue().content.length);
    if (this.memoForm.getRawValue().content.length > 500) {
      alert('글자수 제한을 초과하셨습니다');
      return;
    } else {
      sessionStorage.setItem(
        'Usermemo',
        JSON.stringify({
          title: this.memoForm.getRawValue().title,
          timestamp: new Date(),
          content: this.memoForm.getRawValue().content
        })
      );
    }
    // this.componentEvents.push('Editor model changed.');
  }

  onFocus(event: FocusEvent): void {
    console.log('Focused the editing view.');
    // this.componentEvents.push('Focused the editing view.');
  }

  onBlur(event: BlurEvent): void {
    console.log('Blurred the editing view.');
    // this.componentEvents.push('Blurred the editing view.');
  }
}
