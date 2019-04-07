import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<User[]>(`http://localhost:4200/Users`);
  }
}
