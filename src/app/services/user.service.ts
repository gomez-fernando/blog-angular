import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  test() {
    return 'Hola mundo desde user service !!';
  }

  register(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = `json=${json}`;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post(this.url + 'register', params, { headers: headers });
  }

  signIn(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = 'true';
    }

    let json = JSON.stringify(user);
    let params = `json=${json}`;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post(this.url + 'login', params, { headers: headers });
  }
}
