import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  pruebas() {
    return 'hola desde el servicio de post';
  }

  create(token, post): Observable<any> {
    // limpiar campo post.content pasando las html entities a utf8
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    let json = JSON.stringify(post);
    let params = `json=${json}`;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.post(this.url + 'post', params, { headers: headers });
  }

  getPosts(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.get(this.url + 'post', { headers: headers });
  }

  getPost(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.get(this.url + 'post/' + id, { headers: headers });
  }

  update(token, post, id): Observable<any> {
    // limpiar campo post.content pasando las html entities a utf8
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    post.content = global.htmlEntities(post.content);
    let json = JSON.stringify(post);
    let params = `json=${json}`;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.put(this.url + 'post/' + id, params, { headers: headers });
  }

  delete(token, id) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.delete(this.url + 'post/' + id, { headers: headers });
  }
}
