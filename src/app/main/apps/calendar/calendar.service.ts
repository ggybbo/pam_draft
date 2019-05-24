import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';

import { settings } from '../../../../environments/global';

@Injectable()
export class CalendarService implements Resolve<any> {
  events: any;
  onEventsUpdated: Subject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onEventsUpdated = new Subject();
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getEvents()]).then(([events]: [any]) => {
        resolve();
      }, reject);
    });
  }

  getEvents(): Promise<any> {
    let apiUrl = '';
    const userType = JSON.parse(sessionStorage.getItem('userInfo'));

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
        this.events = response.map(classes => {
          return Object.assign(
            { id: classes.id, tId: classes.tid, userId: classes.userId },
            classes.time
          );
        });
        this.onEventsUpdated.next(this.events);
        resolve(this.events);
      }, reject);
    });
  }

  updateEvents(events): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`http://${settings.apiUrl}:3000/classes`, {
          id: 'events',
          data: events
        })
        .subscribe((response: any) => {
          console.log(response);
          if (response.code === -401) {
            resolve(false);
          } else {
            this.getEvents();
          }
        }, reject);
    });
  }

  deleteEvents(key): Promise<any> {
    console.log(key);
    return new Promise((resolve, reject) => {
      this._httpClient
        .delete(`http://${settings.apiUrl}:3000/classes/${key}`)
        .subscribe((response: any) => {
          this.getEvents();
        }, reject);
    });
  }

  updateMaterials(e): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`http://${settings.apiUrl}:3000/materials/`, { data: e })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
