import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

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

    console.log(this.url + 'register' + params, {
      headers: headers,
    });

    return this.http.post(this.url + 'register', params, {
      headers: headers,
    });
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

  update(token, user): Observable<any> {
    // limpiar campo user.description pasando las html entities a utf8
    user.description = global.htmlEntities(user.description);
    user.description = global.htmlEntities(user.description);
    user.description = global.htmlEntities(user.description);
    user.description = global.htmlEntities(user.description);
    user.description = global.htmlEntities(user.description);
    // convertimos el objeto de javascript a un json que podemos enviar al api
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.put(this.url + 'user/update', params, {
      headers: headers,
    });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    // console.log(identity.name);
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
