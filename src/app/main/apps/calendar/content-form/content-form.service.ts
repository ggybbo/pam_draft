import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { settings } from '../../../../../environments/global';

@Injectable({
  providedIn: 'root'
})
export class ContentFormService {
  onEventsUpdated: Subject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onEventsUpdated = new Subject();
  }

  getMaterials(ckey): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`http://${settings.apiUrl}:3000/materials/${ckey}`)
        .subscribe(response => {
          resolve(response);
        }, reject);
    });
  }
}
