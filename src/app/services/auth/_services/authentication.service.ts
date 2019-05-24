import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models';
import { map } from 'rxjs/operators';

import { settings } from '../../../../environments/global';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserTokenSubject: BehaviorSubject<string>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private _router: Router) {
    const userTokenValue =
      JSON.parse(sessionStorage.getItem('currentUser')) || null;
    const userInfoValue =
      JSON.parse(sessionStorage.getItem('userInfo')) || null;

    this.currentUserTokenSubject = new BehaviorSubject<string>(userTokenValue);
    this.currentUserSubject = new BehaviorSubject<User>(userInfoValue);

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentuserToken(): any {
    return this.currentUserTokenSubject.value;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(): any {
    const userValue = JSON.parse(sessionStorage.getItem('currentUser')) || '';

    if (!userValue) {
      return;
    }
    return this.http
      .post(`http://${settings.apiUrl}:3000/users/profile`, {
        accessToken: userValue.access_token
      })
      .subscribe((user: any) => {
        if (user && user.userData) {
          this.currentUserSubject.next(user);
          sessionStorage.setItem('userInfo', JSON.stringify(user));
          this._router.navigate(['/pages/profile']);
        }
      });
  }

  logout(): void {
    // localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
