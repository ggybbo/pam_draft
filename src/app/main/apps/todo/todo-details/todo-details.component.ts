import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

import { Todo } from 'app/main/apps/todo/todo.model';
import { TodoService } from 'app/main/apps/todo/todo.service';
import { Location } from '@angular/common';
import { TodoDetailsService } from './todo-details.service';
import { S3UploadService } from 'app/services/aws/s3/s3upload.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  todo: Todo;
  tags: any[];
  formType: string;
  todoForm: FormGroup;
  isTeacher: Boolean;
  mData: any;
  selectedValue: string;
  users: any;
  pValue: number;
  pcValue: number;
  uploadUrl: string;
  tuploadUrl: string;
  pcTitle: string;
  msbapTitle: string;
  showProgreeBar: boolean;

  @ViewChild('titleInput')
  titleInputField;

  selectedFiles: FileList;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {TodoService} _todoService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _todoService: TodoService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _tododetailsService: TodoDetailsService,
    private _uploadService: S3UploadService,
    private _matSnackBar: MatSnackBar
  ) {
    this._tododetailsService
      .getMember()
      .then(data => {
        this.users = data;
        // console.log(this.users);
      })
      .catch(err => console.log('fail to get user info'));

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.mData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.isTeacher = this.mData.userData.mtype >= 5 ? true : false;

    // Subscribe to update the current todo
    this._todoService.onCurrentTodoChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(([todo, formType]) => {
        if (todo && formType === 'edit') {
          this.formType = 'edit';
          this.todo = todo;
          this.todoForm = this.createTodoForm();
          // this.todoForm.valueChanges
          //   .pipe(
          //     takeUntil(this._unsubscribeAll),
          //     debounceTime(500),
          //     distinctUntilChanged()
          //   )
          //   .subscribe(data => {
          //     this._todoService.updateTodo(data);
          //   });
        }
      });

    // Subscribe to update on tag change
    this._todoService.onTagsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(labels => {
        this.tags = labels;
      });

    // Subscribe to update on tag change
    this._todoService.onNewTodoClicked
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.todo = new Todo({});
        this.todo.key = FuseUtils.generateGUID();
        this.todo.tid = this.isTeacher ? this.mData.userData.id : 0;
        this.formType = 'new';
        this.todoForm = this.createTodoForm();
        this.focusTitleField();
        this._todoService.onCurrentTodoChanged.next([this.todo, 'new']);
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Focus title field
   */
  focusTitleField(): void {
    setTimeout(() => {
      this.titleInputField.nativeElement.focus();
    });
  }

  /**
   * Create todo form
   *
   * @returns {FormGroup}
   */
  createTodoForm(): FormGroup {
    return this._formBuilder.group({
      key: [this.todo.key],
      tid: [this.todo.tid],
      userId: [this.todo.userId],
      title: [this.todo.title],
      notes: [this.todo.notes],
      question: [this.todo.question],
      answer: [this.todo.answer],
      startDate: [this.todo.startDate],
      dueDate: [this.todo.dueDate],
      completed: [this.todo.completed],
      starred: [this.todo.starred],
      important: [this.todo.important],
      deleted: [this.todo.deleted],
      tmp3Title: [this.todo.tmp3Title],
      tmp3Url: [this.todo.tmp3Url],
      ump3Title: [this.todo.ump3Title],
      ump3Url: [this.todo.ump3Url],
      tags: [this.todo.tags]
    });
  }

  /**
   * Toggle star
   *
   * @param event
   */
  toggleStar(event): void {
    event.stopPropagation();
    this.todo.toggleStar();
    this._todoService.updateTodo(this.todo);
  }

  /**
   * Toggle important
   *
   * @param event
   */
  toggleImportant(event): void {
    event.stopPropagation();
    this.todo.toggleImportant();
    this._todoService.updateTodo(this.todo);
  }

  /**
   * Toggle Completed
   *
   * @param event
   */
  toggleCompleted(event): void {
    event.stopPropagation();
    this.todo.toggleCompleted();
    this._todoService.updateTodo(this.todo);
  }

  /**
   * Toggle Deleted
   *
   * @param event
   */
  toggleDeleted(event): void {
    event.stopPropagation();
    this.todo.toggleDeleted();
    this._todoService.updateTodo(this.todo);
  }

  /**
   * Toggle tag on todo
   *
   * @param tagId
   */
  toggleTagOnTodo(tagId): void {
    this._todoService.toggleTagOnTodo(tagId, this.todo);
  }

  /**
   * Has tag?
   *
   * @param tagId
   * @returns {any}
   */
  hasTag(tagId): any {
    return this._todoService.hasTag(tagId, this.todo);
  }

  /**
   * Add todo
   */
  addTodo(): void {
    this._todoService
      .updateTodo(this.todoForm.getRawValue())
      .then(() => {
        this._todoService.onCurrentTodoChanged.next([null, null]);
        this._location.go('apps/todo/all/');
      })
      .catch(err => console.log(err));
  }

  /**
   * S3 upload
   * AWS SDK
   */

  upload() {
    if (this.selectedFiles === undefined) return;

    const file = this.selectedFiles.item(0);
    const allowdFiletype = ['audio/mp3', 'audio/mp4', 'video/mp4'];
    if (!allowdFiletype.includes(file.type)) {
      this._matSnackBar.open('MP3 file을 업로드 해주세요', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
      return;
    }

    this._uploadService
      .uploadFile(file)
      .on('httpUploadProgress', evt => {
        // console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
        this.pcValue = Math.round((evt.loaded / evt.total) * 100);
        this.setPvalue(this.pcValue);
      })
      .send((err, data) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
        this._matSnackBar.open('Upload Completed', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this.tuploadUrl = data.Location;
        this.pcTitle = data.key;
        this.showProgreeBar = false;
        this.todoForm.patchValue({
          tmp3Title: data.key,
          tmp3Url: data.Location
        });
        return true;
      });
  }

  userMp3upload() {
    if (this.selectedFiles === undefined) return;

    const file = this.selectedFiles.item(0);
    const allowdFiletype = ['audio/mp3', 'audio/mp4', 'video/mp4'];
    if (!allowdFiletype.includes(file.type)) {
      this._matSnackBar.open('MP3 file을 업로드 해주세요', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
      return;
    }

    this._uploadService
      .uploadFile(file)
      .on('httpUploadProgress', evt => {
        // console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
        this.pValue = Math.round((evt.loaded / evt.total) * 100);
        this.setPvalue(this.pValue);
      })
      .send((err, data) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
        this._matSnackBar.open('Upload Completed', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
        this.uploadUrl = data.Location;
        this.msbapTitle = data.key;
        this.showProgreeBar = false;
        this.todoForm.patchValue({
          ump3Title: data.key,
          ump3Url: data.Location
        });
        return true;
      });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.showProgreeBar = true;
  }

  setPvalue(value): void {
    this.pValue = value;
  }
}
