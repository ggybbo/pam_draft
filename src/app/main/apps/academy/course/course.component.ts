import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy,
  AfterViewInit,
  ViewChildren,
  QueryList
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { fuseAnimations } from '@fuse/animations';

import { CourseService } from 'app/main/apps/academy/course.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CourseComponent implements OnInit, OnDestroy, AfterViewInit {
  animationDirection: 'left' | 'right' | 'none';
  course: any;
  courseStepContent: any;
  currentStep: any;

  @ViewChildren(FusePerfectScrollbarDirective)
  @ViewChildren('swalInternet')
  private swalInternet: SwalComponent;
  private _unsubscribeAll: Subject<any>;

  fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

  constructor(
    private _academyCourseService: CourseService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseSidebarService: FuseSidebarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.animationDirection = 'none';
    this.currentStep = 0;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._academyCourseService.onCourseChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(course => {
        this.course = course;
        this.course.title = course[0].title;
      });
  }

  ngAfterViewInit(): void {
    this.courseStepContent = this.fuseScrollbarDirectives.find(
      fuseScrollbarDirectives => {
        return (
          fuseScrollbarDirectives.elementRef.nativeElement.id ===
          'course-step-content'
        );
      }
    );
    this.course.title = this.course[this.currentStep].title;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  gotoStep(step): void {
    this.animationDirection = this.currentStep < step ? 'left' : 'right';
    this._changeDetectorRef.detectChanges();
    this.currentStep = step;
    this.course.title = this.course[this.currentStep].title;
  }

  gotoPreviousStep(): void {
    if (this.currentStep === 0) {
      return;
    }
    this.animationDirection = 'right';

    this._changeDetectorRef.detectChanges();
    this.currentStep--;
    this.course.title = this.course[this.currentStep].title;
  }

  gotoNextStep(): void {
    if (this.currentStep === this.course.length - 1) {
      return;
    }

    this.animationDirection = 'left';

    this._changeDetectorRef.detectChanges();

    this.currentStep++;
    this.course.title = this.course[this.currentStep].title;
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  finishCourse(): void {
    this.router.navigate(['/apps/academy/courses']);
  }
}
