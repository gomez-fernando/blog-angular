import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(public http: HttpClient) {}

  test() {
    return 'Hola mundo desde user service !!';
  }
}
