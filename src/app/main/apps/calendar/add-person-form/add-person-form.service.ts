import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { settings } from '../../../../../environments/global';

@Injectable({
  providedIn: 'root'
})
export class AddPersonService {
  onEventsUpdated: Subject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onEventsUpdated = new Subject();
  }

  getMemberId(ckey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/attend/key/${ckey}`)
        .subscribe((response: any) => {
          const userId = response.map(e => e.userId);
          resolve(userId);
        }, reject);
    });
  }

  getMember(): Promise<any> {
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

  addMember(cid, userId, thumbnail_image): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`http://${settings.apiUrl}:3000/attend`, {
          ckey: cid,
          userId: userId,
          thumbnail_image: thumbnail_image
        })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  deleteMember(cid, userId): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .delete(`http://${settings.apiUrl}:3000/attend/${cid}/${userId}`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
