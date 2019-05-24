import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { TodoService } from 'app/main/apps/todo/todo.service';

@Component({
  selector: 'todo-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TodoMainSidebarComponent implements OnInit, OnDestroy {
  folders: any[];
  filters: any[];
  tags: any[];
  accounts: object;
  selectedAccount: string;
  isTeacher: boolean;
  mData: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {TodoService} _todoService
   * @param {Router} _router
   */
  constructor(private _todoService: TodoService, private _router: Router) {
    // Set the defaults
    // this.accounts = {
    //   creapond: 'johndoe@creapond.com',
    //   withinpixels: 'johndoe@withinpixels.com'
    // };
    // this.selectedAccount = 'creapond';

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

    this._todoService.onFiltersChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(filters => {
        this.filters = filters;
      });

    this._todoService.onTagsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(tags => {
        this.tags = tags;
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
   * New todo
   */
  newTodo(): void {
    this._router.navigate(['/apps/todo/all']).then(() => {
      setTimeout(() => {
        this._todoService.onNewTodoClicked.next('');
      });
    });
  }
}
