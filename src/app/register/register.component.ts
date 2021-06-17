import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInfor = {    
    name : '',
    email : '',
    password : '',
    rePassword : '',
  }

  error = '';

  url = "http://localhost:3333/api/user";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    const url = `${this.url}`;
    this.http.post<any>(url, {email: "caonhungoc@gmail.com", name: "ngoc", password: "123"}, this.httpOptions).pipe(
      tap(_ => this.log(`added`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  register(userInfor: any) {
    if (userInfor.password !== userInfor.rePassword) {
      this.error = "password should be the same";
      return;
    }
    this.error = '';
    const url = `${this.url}`;
    return this.http.post<any>(url, userInfor, this.httpOptions).pipe(
      tap(_ => this.log(`added`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
