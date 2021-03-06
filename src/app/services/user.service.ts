import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { User } from './../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: any = '';
  private Url = 'http://localhost:3333/api/user';
  private UrlLogin = 'http://localhost:3333/api/login';
  private UrlTask = 'http://localhost:3333/api/task';

  token: String = '';
  isLogin = localStorage.getItem('userName');

  httpOptions: any = 
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('access_token')}` }),
    // headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.token}` }),
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  public createUser(user: any): Promise<any> {
    return this.http.post(this.Url, user).pipe().toPromise();
  }

  public getUsers(page: number): Promise<any> {
    return this.http.get(`${this.Url}/?page=${page}`, this.httpOptions).toPromise().then(data => console.log(data));
  }

  public getUser(page: number): Promise<any> {
    return this.http.get(`${this.Url}/?page=${page}`, this.httpOptions).toPromise();
  }

  public login(user: any): Promise<any> {
    return this.http.post(this.UrlLogin, user, {headers: new HttpHeaders({ 
      'Content-Type': 'application/json' }),
      withCredentials: true
    }).pipe().toPromise();
  }

  public logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
  }

  public getAllTask() {
    return this.http.get(this.UrlTask, this.httpOptions).toPromise();
  }

  public createTask(task: any) {
    return this.http.post(this.UrlTask, task, this.httpOptions).toPromise();
  }

  public editTask(task: any) {
    return this.http.put(this.UrlTask, task, this.httpOptions).toPromise();
  }

  public deleteTask(taskId: any) {
    let deleteUrl = `${this.UrlTask}/${taskId}`;
    return this.http.delete(deleteUrl, this.httpOptions).toPromise();
  }

  public closeTask(taskId: any) {
    let deleteUrl = `${this.UrlTask}/close/${taskId}`;
    return this.http.delete(deleteUrl, this.httpOptions).toPromise();
  }

  public reopenTask(taskId: any) {
    let reopenUrl = `${this.UrlTask}/reopen/${taskId}`;
    return this.http.put(reopenUrl, {}, this.httpOptions).toPromise();
  }

  // public getTaskByType1(type: number) {
  //   let Url = `${this.UrlTask}/${type}`;
  //   return this.http.get(Url, this.httpOptions).toPromise();
  // }

  public getTaskByType(type: number, page: number) {
    let Url = `${this.UrlTask}/${type}/?page=${page}`;
    return this.http.get(Url, this.httpOptions).toPromise();
  }

  constructor(private http: HttpClient, private router: Router) { }
}
