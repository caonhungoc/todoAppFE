import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('access_token')}` }),
    // headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.token}` }),
    // withCredentials: true
  };

  public createUSer(user: any): Promise<any> {
    return this.http.post(this.Url, user).pipe().toPromise();
  }

  public getUsers(): Promise<any> {
    return this.http.get(this.Url, this.httpOptions).toPromise();
  }

  public login(user: any): Promise<any> {
    return this.http.post(this.UrlLogin, user, this.httpOptions).pipe().toPromise();
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

  public getTaskByType(type: number) {
    let Url = `${this.UrlTask}/${type}`;
    return this.http.get(Url, this.httpOptions).toPromise();
  }

  constructor(private http: HttpClient) { }
}
