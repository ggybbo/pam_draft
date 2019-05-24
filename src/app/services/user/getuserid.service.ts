import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../environments/global';
import { AuthenticationService } from '../auth/_services';

@Injectable({
  providedIn: 'root'
})
export class GetUserIdService {
  currentUser: any;
  userId: number;

  constructor(
    private _httpClient: HttpClient,
    private _authenticationService: AuthenticationService
  ) {
    this.currentUser = this._authenticationService.currentUserValue;
  }

  getUserId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(
          `http://${settings.apiUrl}:3000/users/${this.currentUser.userData.id}`
        )
        .subscribe(result => resolve(result), reject);
    });
  }
}
