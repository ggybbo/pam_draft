import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { subDays, startOfDay, addDays, endOfMonth, addHours } from 'date-fns';

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
    return new Promise((resolve, reject) => {
      this._httpClient
        .get('http://localhost:3000/classes')
        .subscribe((response: any) => {
          this.events = response.map(classes => {
            return classes.time;
          });
          this.onEventsUpdated.next(this.events);
          resolve(this.events);
        }, reject);
    });
  }

  updateEvents(events): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post('http://localhost:3000/classes', {
          id: 'events',
          data: [...events]
        })
        .subscribe((response: any) => {
          this.getEvents();
        }, reject);
    });
  }
}
