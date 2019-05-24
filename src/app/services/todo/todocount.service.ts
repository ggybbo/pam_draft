import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { settings } from '../../../environments/global';

@Injectable({
  providedIn: 'root'
})
export class TodoCountService {
  count: number;
  currentUser: any;
  userId: number;

  constructor(private _httpClient: HttpClient) {}

  getTodosCount(id, mtype): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/todos/user/count/${id}`)
        .subscribe(result => {
          // console.log(result);
          const newResult = Object.assign(
            { count: result[0].COUNT },
            {
              rules: mtype
            }
          );
          resolve(newResult);
        }, reject);
    });
  }
}
