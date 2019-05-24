import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { settings } from '../../environments/global';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(accessToken): any {
    return this.http.post(`http://${settings.apiUrl}:3000/users/profile`, {
      accessToken: accessToken
    });
    // this.http.get('https://kapi.kakao.com/v2/user/me', {}).pipe(
    //   map(user => {
    //     console.log(user);
    //     return user;
    //   })
    // );
  }
}
