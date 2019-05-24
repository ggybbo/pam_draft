import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { settings } from '../../../../environments/global';

@Injectable()
export class CoursesService implements Resolve<any> {
  // 나중에 any에 courses 모델을 넣어주어야 한다
  onCategoriesChanged: BehaviorSubject<any>;
  onCoursesChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient, private _router: Router) {
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
    let apiUrl = '';
    const userType = JSON.parse(sessionStorage.getItem('userInfo')) || '';
    if (!userType) {
      this._router.navigate(['/pages/auth/login']);
      location.reload();
      return;
    }
    if (userType.userData.mtype >= 5) {
      apiUrl = `http://${settings.apiUrl}:3000/classes/teacher/${
        userType.userData.id
      }`;
    } else if (userType.userData.mtype >= 10) {
      apiUrl = `http://${settings.apiUrl}:3000/classes`;
    } else {
      apiUrl = `http://${settings.apiUrl}:3000/classes/user/${
        userType.userData.id
      }`;
    }
    return new Promise((resolve, reject) => {
      this._httpClient.get(apiUrl).subscribe((response: any) => {
        this.onCoursesChanged.next(response);
        resolve(response);
      }, reject);
    });
  }
}
