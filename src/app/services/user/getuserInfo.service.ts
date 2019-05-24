import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { settings } from '../../../environments/global';

@Injectable({
  providedIn: 'root'
})
export class GetUserInfoService {
  currentUser: any;
  userId: number;

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  getUserInfo(): Promise<any> {
    const userValue = JSON.parse(sessionStorage.getItem('currentUser')) || '';

    if (!userValue) {
      this._router.navigate(['/pages/auth/login']);
    }
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`http://${settings.apiUrl}:3000/users/profile`, {
          accessToken: userValue.access_token
        })
        .subscribe((user: any) => {
          if (user && user.userData) {
            resolve(user);
          } else {
            reject();
          }
        });
    });
  }
}
