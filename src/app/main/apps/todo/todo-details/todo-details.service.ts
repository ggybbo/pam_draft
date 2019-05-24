import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { settings } from '../../../../../environments/global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailsService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  getMember(): Promise<any> {
    if (!JSON.parse(sessionStorage.getItem('userInfo'))) {
      this._router.navigate(['/pages/auth/login']);
      return;
    }
    const tid =
      JSON.parse(sessionStorage.getItem('userInfo')).userData.mtype >= 5
        ? JSON.parse(sessionStorage.getItem('userInfo')).userData.id
        : 0;
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/users/tid/${tid}`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
