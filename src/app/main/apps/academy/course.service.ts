import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { settings } from '../../../../environments/global';

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
      Promise.all([this.getCourse(route.params.cId)]).then(() => {
        resolve();
      }, reject);
    });
  }

  getCourse(cId): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/courses/` + cId)
        .subscribe((response: any) => {
          console.log(response);
          this.onCourseChanged.next(response);
          resolve(response);
        }, reject);
    });
  }
}
