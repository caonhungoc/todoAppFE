import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInfor = {    
    name : '',
    email : '',
    password : '',
    rePassword : '',
  }
  // token = '';
  error = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(userInfor: any) {
    this.userService.login(userInfor)
    .then(data => {
      let jsonRes = JSON.parse(JSON.stringify(data));
      // console.log("raw data = " + jsonRes);
      // this.token = jsonRes.token;
      this.userService.token = jsonRes.token;
      localStorage.setItem('access_token', jsonRes.token);
      this.router.navigate(['todos']);
      // console.log("token = " + this.token + ", message = " + jsonRes.message);
    })
    .catch(e => {
      console.log("error=" +JSON.stringify(e))
      this.error = e;
    })
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
