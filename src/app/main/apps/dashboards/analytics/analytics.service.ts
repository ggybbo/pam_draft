import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { settings } from '../../../../../environments/global';

@Injectable()
export class AnalyticsDashboardService implements Resolve<any> {
  widgets: any[];

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private _router: Router) {}

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
      Promise.all([this.getWidgets()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get widgets
   *
   * @returns {Promise<any>}
   */
  getWidgets(): Promise<any> {
    let userId = '';
    try {
      userId = JSON.parse(sessionStorage.getItem('userInfo')).userData.id || '';
    } catch (e) {
      console.log(e);
      this._router.navigate(['/pages/auth/login']);
      location.reload();
    }

    if (!userId) {
      this._router.navigate(['/pages/auth/login']);
      return;
    }
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/analytics/${userId}`)
        .subscribe((response: any) => {
          this.widgets = response;
          resolve(response);
        }, reject);
    });
  }
}
