import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Url = 'http://localhost:3333/api/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createUSer(user: any) {
    return this.http.post(this.Url, user).pipe().toPromise();
  }

  constructor(private http: HttpClient) { }
}
