import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(accessToken) {
    return this.http.post('http://localhost:3000/users/profile', {
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
