import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService {
  public url: string;
  // public category: Category;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  create(token, category): Observable<any> {
    let json = JSON.stringify(category);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    // console.log(this.url + 'category', params, {
    //   headers: headers,
    // });

    return this.http.post(this.url + 'category', params, {
      headers: headers,
    });

    // return this.http.post(
    //   'http://api-rest-laravel.test/api/categoryjson={"id":1,"name":ccc"}',
    //   { headers: headers }
    // );
  }

  getCategory(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // console.log('esta es la peticion desde category.service');
    // console.log(this.url + 'category' + { headers: headers });
    // hay que quitarle headers para que funcione
    return this.http.get(this.url + 'category/' + id, { headers: headers });
  }

  getPosts(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // console.log('esta es la peticion desde category.service');
    // console.log(this.url + 'category' + { headers: headers });
    // hay que quitarle headers para que funcione
    return this.http.get(this.url + 'post/category/' + id, {
      headers: headers,
    });
  }

  getCategories(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    // console.log('esta es la peticion desde category.service');
    // console.log(this.url + 'category' + { headers: headers });
    // hay que quitarle headers para que funcione
    return this.http.get(this.url + 'category', { headers: headers });
  }
}
