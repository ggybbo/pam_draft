import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { settings } from '../environments/global';

@Injectable()
export class UserInfoService implements Resolve<any> {
  onUserDataChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private _router: Router) {
    this.onUserDataChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getUserData()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getUserData(): Promise<any> {
    const userValue = JSON.parse(sessionStorage.getItem('currentUser')) || '';
    if (!userValue) {
      this._router.navigate(['/pages/auth/login']);
      return;
    }
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(
          `http://${settings.apiUrl}:3000/users/profile/${
            userValue.access_token
          }`
        )
        .subscribe((response: any) => {
          this.onUserDataChanged.next(response);
          console.log(response);
          resolve(response);
        }, reject);
    });
  }
}
