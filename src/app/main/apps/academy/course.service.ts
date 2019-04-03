import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService implements Resolve<any> {
  onCourseChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onCourseChanged = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> | Observable<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCourse(route.params.courseId, route.params.courseSlug)
      ]).then(() => {
        resolve();
      }, reject);
    });
  }

  getCourse(courseId, courseSlug): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get('http://localhost:3000/courses/' + courseSlug + '/' + courseId)
        .subscribe((response: any) => {
          this.onCourseChanged.next(response);
          resolve(response);
        }, reject);
    });
  }
}
