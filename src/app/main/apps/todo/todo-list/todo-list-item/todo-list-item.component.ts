import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Todo } from 'app/main/apps/todo/todo.model';
import { TodoService } from 'app/main/apps/todo/todo.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListItemComponent implements OnInit, OnDestroy {
  tags: any[];

  @Input()
  todo: Todo;

  @HostBinding('class.selected')
  selected: boolean;

  @HostBinding('class.completed')
  completed: boolean;

  @HostBinding('class.move-disabled')
  moveDisabled: boolean;

  mData: any;
  isTeacher: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {TodoService} _todoService
   * @param {ActivatedRoute} _activatedRoute
   */
  constructor(
    private _todoService: TodoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    // Disable move if path is not /all
    if (_activatedRoute.snapshot.url[0].path !== 'all') {
      this.moveDisabled = true;
    }

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
    // Set the initial values
    this.todo = new Todo(this.todo);
    this.completed = this.todo.completed;

    this.mData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (!this.mData) {
      this._router.navigate(['/pages/auth/login']);
      return;
    }
    this.isTeacher = this.mData.userData.mtype >= 5 ? true : false;

    // Subscribe to update on selected todo change
    this._todoService.onSelectedTodosChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedTodos => {
        this.selected = false;

        if (selectedTodos.length > 0) {
          for (const todo of selectedTodos) {
            if (todo.key === this.todo.key) {
              this.selected = true;
              break;
            }
          }
        }
      });

    // Subscribe to update on tag change
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
   * On selected change
   */
  onSelectedChange(): void {
    this._todoService.toggleSelectedTodo(this.todo.key);
  }

  /**
   * Toggle star
   */
  toggleStar(event): void {
    event.stopPropagation();

    this.todo.toggleStar();
    this._todoService.updateTodo(this.todo);
  }

  /**
   * Toggle Important
   */
  toggleImportant(event): void {
    event.stopPropagation();

    this.todo.toggleImportant();
    this._todoService.updateTodo(this.todo);
  }

  /**
   * Toggle Completed
   */
  toggleCompleted(event): void {
    event.stopPropagation();

    this.todo.toggleCompleted();
    this._todoService.updateTodo(this.todo);
  }
}
