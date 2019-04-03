import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CoursesService implements Resolve<any> {
  // 나중에 any에 courses 모델을 넣어주어야 한다
  onCategoriesChanged: BehaviorSubject<any>;
  onCoursesChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onCategoriesChanged = new BehaviorSubject({});
    this.onCoursesChanged = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getCategories(), this.getCourses()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      // this._httpClient
      //   .get('api/courses/categories')
      //   .subscribe((response: any) => {
      this.onCategoriesChanged.next([
        {
          label: 'beginner',
          value: '1'
        },
        {
          label: 'speaker',
          value: '2'
        },
        {
          label: 'fluent',
          value: '3'
        }
      ]);
      //     resolve(response);
      //   }, reject);
      resolve('Category for courses');
    });
  }

  getCourses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get('http://localhost:3000/classes')
        .subscribe((response: any) => {
          this.onCoursesChanged.next(response);
          resolve(response);
        }, reject);
    });
  }
}
