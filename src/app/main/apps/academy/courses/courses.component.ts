import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { CoursesService } from '../courses.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: fuseAnimations
})
export class CoursesComponent implements OnInit, OnDestroy {
  categories: { value: string; label: string }[];
  courses: any[];
  coursesFilteredByCategory: any[];
  filteredCourses: any[];
  currentCategory: string;
  searchTerm: string;

  private _unsubscribeAll: Subject<any>;

  constructor(private _academyCoursesService: CoursesService) {
    this.currentCategory = 'all';
    this.searchTerm = '';

    /* 초기 세팅 */
    this.categories = [];

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._academyCoursesService.onCategoriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(categories => {
        this.categories = categories;
      });

    this._academyCoursesService.onCoursesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(course => {
        this.filteredCourses = this.coursesFilteredByCategory = this.courses = course;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  filterCoursesByCategory(): void {
    console.log(this.currentCategory);
    if (this.currentCategory === 'all') {
      this.coursesFilteredByCategory = this.courses;
      this.filteredCourses = this.courses;
    } else {
      this.coursesFilteredByCategory = this.courses.filter(course => {
        return course.category === this.currentCategory;
      });

      this.filteredCourses = [...this.coursesFilteredByCategory];
    }
  }
}
